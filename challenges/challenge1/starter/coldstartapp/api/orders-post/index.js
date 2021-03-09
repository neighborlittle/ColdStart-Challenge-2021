const { getUser } = require('../shared/user-utils');
const dbConfig = require('../shared/dbConfig');

const { Connection, TYPES } = require("tedious");

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);
  const { address, orders } = req.body;

  const preorderDate = new Date();
  const connection = new Connection(dbConfig);

  const bulkLoad = connection.newBulkLoad('Orders', (err, rowCount) => {
    console.log(err, rowCount);
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
