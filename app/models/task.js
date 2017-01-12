var mongoose = require('mongoose');

//Função construtora
var schema = mongoose.Schema({
	//Atributos do documento

	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description : {
		type: String,
		required: true
	},
	active: {
		type: String,
		required: true
	},
	progress: {
		type: String,
		required: true
	},
	taskDate: {
		type: String,
		required: true
	},
	updatedStatusDate: {
		type: String,
		required: false
	} 
});

//Compilando schema

mongoose.model('Task', schema);
