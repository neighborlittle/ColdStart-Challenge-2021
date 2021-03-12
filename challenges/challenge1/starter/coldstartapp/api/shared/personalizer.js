const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');

const getPersonalizerClient = () => {
  const credentials = new CognitiveServicesCredentials(process.env['personalizer_key']);
  return new Personalizer.PersonalizerClient(credentials, process.env["personalizer_uri"]);
}

module.exports = { getPersonalizerClient }