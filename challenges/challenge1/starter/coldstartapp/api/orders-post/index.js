const { getUser } = require('../shared/user-utils');
const dbConfig = require('../shared/database/dbConfig');

const { Connection, TYPES } = require("tedious");
const { getPersonalizerClient } = require('../shared/personalizer');

module.exports = async function (context, req) {
  const { address, orders, recommendation } = req.body;
  await scoreReward({orders, recommendation});
  const user = getUser(req);

  const preorderDate = new Date();
  const connection = new Connection(dbConfig);

  const bulkLoad = connection.newBulkLoad('Orders', (err, rowCount) => {
    if (err)
      context.res.status(500).send(err);
    else
      context.res.status(201);
  });

  bulkLoad.addColumn('User', TYPES.NVarChar, { nullable: false });
  bulkLoad.addColumn('Date', TYPES.Date, { nullable: false });
  bulkLoad.addColumn('IcecreamId', TYPES.Int, { nullable: false });
  bulkLoad.addColumn('DriverId', TYPES.Int, { nullable: true });
  bulkLoad.addColumn('FullAddress', TYPES.NVarChar, { length: 2000, nullable: true });
  bulkLoad.addColumn('LastPosition', TYPES.NVarChar, { length: 500, nullable: true });

  for (let iceCream of Object.keys(orders)) {
    for (let i = 0; i < orders[iceCream]; i++) {
      bulkLoad.addRow({
        User: user.userDetails,
        Date: preorderDate,
        IcecreamId: iceCream,
        DriverId: null,
        FullAddress: address,
        LastPosition: null
      });
    }
  }
  connection.connect((err) => {
    if (err)
      context.res.status(500).send(err);
    else
      connection.execBulkLoad(bulkLoad);
  });
};

async function scoreReward({orders, recommendation}) {
  const personalizerClient = getPersonalizerClient();
  const reward = Object.keys(orders).includes(recommendation.icecreamId) ? 1 : 0;
  await personalizerClient.events.reward(recommendation.eventId, {value: reward});
}