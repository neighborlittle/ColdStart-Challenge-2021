const { queryIcecreams } = require('../shared/database/queryIcecreams');

module.exports = async function (context, req) {
  try {
    const icecreams = await queryIcecreams();
    context.res.status(200).send(icecreams);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
