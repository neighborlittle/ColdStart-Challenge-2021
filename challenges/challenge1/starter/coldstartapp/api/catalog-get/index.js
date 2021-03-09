const dbConfig = require('../shared/dbConfig');

const { Connection, Request } = require("tedious");
module.exports = function (context, req) {
  try {
    const connection = new Connection(dbConfig);
    const result = [];
    const request = new Request(
      `SELECT Id, Name, Description, ImageUrl FROM [dbo].[Icecreams]`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          context.res.status(200).send(result);
        }
      });
    request.on("row", columns => {
      const iceCream = {};
      columns.forEach(column => {
        iceCream[column.metadata.colName] = column.value;
      });
      result.push(iceCream);
    })
    
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
        
  } catch (error) {
    console.log(error)
    context.res.status(500).send(error);
  }
};
