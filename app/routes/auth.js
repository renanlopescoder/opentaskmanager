module.exports = function (app){

	var api = app.app.api.auth;

	app.post('/autenticar', api.autentica);
  app.post('/createUser', api.createUser);

  app.use('/*', api.verificaToken); // Verificar após autenticação ordem necessária e aplicando a qualquer verbo http com use
  
};