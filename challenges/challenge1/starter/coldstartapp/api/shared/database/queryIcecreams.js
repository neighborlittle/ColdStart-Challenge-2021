const { Connection, Request } = require("tedious");
const dbConfig = require('./dbConfig');

async function queryIcecreams() {
  return new Promise((resolve, reject) => {
    const connection = new Connection(dbConfig);
    const result = [];
    const request = new Request(
      `SELECT Id, Name, Description, ImageUrl FROM [dbo].[Icecreams]`,
      (err, rowCount) => {
        if (err) { 
          console.error(err.message);
          reject(err);
        }
        else {
          resolve(result);
        }
  });

  request.on("row", columns => {
    
    const iceCream = {};
    columns.forEach(column => {
      iceCream[column.metadata.colName] = column.value;
    });
    result.push(iceCream);
  });

  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
      reject(err);
    } else {
      console.log('connection established: run query');
      connection.execSql(request);
    }
  });
  connection.connect();
});
}

module.exports = { queryIcecreams };
