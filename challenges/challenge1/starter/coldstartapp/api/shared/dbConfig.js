module.exports = {
  authentication: {
    options: {
      userName: process.env['db_UserName'], 
      password: process.env['db_Password'] 
    },
    type: "default"
  },
  server: process.env['db_Server'], 
  options: {
    database: process.env['db_Name'],
    encrypt: true
  }
};