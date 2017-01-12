var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Local database configuration
// Configuração da Base de dados local
// mongoose.connect('mongodb://localhost/oxtasks');

// Heroku open-source access database
// Acesso a base de dados open-source pelo Heroku
mongoose.connect('mongodb://opentaskmanager:openpassword@ds161018.mlab.com:61018/heroku_6gzfjvz0');

// Função para imprimir no console se a conxão com o banco foi efetuada
// Function to print in console if the database connection was a success

mongoose.connection.on('connected', function(){
	console.log('Conectado ao Banco MongoDB');
});

//Evitando derrubar aplicação caso não tenha conexão
//Avoiding close the application if not get the connection

mongoose.connection.on('error', function(error){
	console.log('Erro na conexão: ' + error);
});

//Evitando derrubar a app Caso perda de conexão
//Avoiding close the application if lost connection

mongoose.connection.on('disconnected', function(){
	console.log('Desconectado do banco MongoDB');
});

// Process pode ser usado em qualquer lugar de nossa aplicação
// process podemos acessar as informações e eventos de nossa app
// este caso estamos acessando o process para saber se a app foi finalizada
// e assim garantir a finalização da conexão com banco

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('conexão fechada pelo temino da aplicação');

		//Função esperada por finalização da aplicação
		//Function expected for finish the application

		process.exit(0);
	});
});