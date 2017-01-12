module.exports = function (app){

	var api = app.app.api.task;

	app.get('/list', api.lista);

	app.post('/create', api.create);

	app.post('/update/:id', api.update);

	app.get('/task/:id', api.buscaPorId);

	app.delete('/remove/:id', api.removePorId);
};