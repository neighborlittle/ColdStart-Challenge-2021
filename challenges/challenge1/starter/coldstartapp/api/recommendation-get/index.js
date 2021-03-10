const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const { v1: uuidv1 } = require('uuid');
const dbConfig = require('../shared/dbConfig');

const { Connection, Request } = require("tedious");
const { getUser } = require('../shared/user-utils');


module.exports = async function (context, req) {
  const credentials = new CognitiveServicesCredentials(process.env['personalizer_key']);

  const personalizerClient = new Personalizer.PersonalizerClient(credentials, process.env["personalizer_uri"]);
  
  const actions = await loadActions();
  const rankRequest = {
    eventId: uuidv1(),
    contextFeatures: getContextFeatures(req),
    actions: actions,
    deferActivation: false
  };

  const rankResponse = await personalizerClient.rank(rankRequest);
  context.res.status(200).send(rankResponse.rewardActionId);
};


async function loadActions() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(dbConfig);
    const result = [];
    const request = new Request(
      `SELECT Id, Name FROM [dbo].[Icecreams]`,
      (err, rowCount) => {
        if (err) { 
          console.error(err.message);
          reject();
        }
        else {
          resolve(result);
        }
  });

  request.on("row", columns => {
    const action = {};
    columns.forEach(column => {
      if (column.metadata.colName == 'Id') {
        action.id = `${column.value}`;
      }
      else {
        action.features = [{ 'name': column.value }];
      }
    });
    result.push(action);
  });

  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
      context.res.status(500).send(error);
    } else {
      console.log('connection established: run query');
      connection.execSql(request);
    }
  });
  connection.connect();
});
}


function getContextFeatures(req) {
  let time = null;
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 7 || hour > 21) time = 'night';
  else if (hour >= 7 && hour < 12) time = 'morning';
  else if (hour < 17) time = 'day';
  else time = 'afternoon';

  const user = getUser(req);

  const day = new Date().getDay();
  const loggedIn = user.userId ? true : false;


  return [
    { time },
    { day },
    { loggedIn },
  ];
}


