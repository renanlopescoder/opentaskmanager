var mongoose = require('mongoose');

//Função construtora criando Schema usando banco orientado a documento
var schema = mongoose.Schema({
	//Atributos do documento
	username: {
		type: String,
		required: true
	},
	password : {
		type: String,
		required: true
	},
  email : {
		type: String,
		required: true
	}
});

//Compilando schema

mongoose.model('User', schema);
