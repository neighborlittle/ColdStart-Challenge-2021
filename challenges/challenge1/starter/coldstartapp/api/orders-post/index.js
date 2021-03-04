const { v4: uuid } = require('uuid');
const { getUser } = require('../shared/user-utils');


module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);
  const { address, orders } = req.body;

  const preorderDate = new Date();
  const preorderItems = [];
  console.log(orders, address);
  for (let iceCream of Object.keys(orders)) {
    for(let i = 0; i < orders[iceCream]; i++) {
      console.log(iceCream);
      preorderItems.push({
        Id: uuid(),
        User: user.userDetails,
        Date: preorderDate,
        IcecreamId: iceCream,
        Status: "New",
        DriverId: null,
        FullAddress: address,
        LastPosition: null
      });
    }
  }

  context.bindings.preorders = preorderItems;
  console.log(preorderItems);

  context.res.status(201);
};
