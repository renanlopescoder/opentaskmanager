  var mongoose =  require('mongoose');
    
  //--> Segurança
  //--> Security

  //--> Bcrypt para criptografar a senha do usuário
  //--> Bcrypt to encrypt user's password

  var bcrypt = require('bcrypt');
  const saltRounds = 15;
  
  //--> Autenticação por Token
  //--> Token Authentication
  var jwt = require('jsonwebtoken');

  module.exports = function(app) {

  var api = {};
  var model = mongoose.model('User');

  api.login = function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    
    model.findOne({username: req.body.username})
    .then(function(user){
      bcrypt.compare(req.body.password, user.password).then(function(result){
        if(result == true){
          var token = jwt.sign({user:user.username}, app.get('secret'),{
            expiresIn: 84600
          });
          console.log('Token criado e sendo enviado no header http');
          return res.status(200).json({nome: user.username, token: token, user_id: user._id});
        }
      }, function(error){
        console.log('Error, password incorreto para o usuário ' + user.username);
        res.sendStatus(401);        
      });
    },function(error){
      console.log('Error, usuário inexistente');
      res.sendStatus(401);
    })

  };


  api.createUser = function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
      req.body.password = hash;
      model.create(req.body).then(function(user){
      res.json(user);
    }, function(error){
        console.log(error);
        res.status(404).json(error);
      });
    });
  };


//next so podemos usar com use deixar usar o middleware
  api.verificaToken = function(req, res, next){
    var token = req.get('Autorization');
    if(token){
          console.log('Verificando Token');
      jwt.verify(token, app.get('secret'), function(error, decoded){
        // if(error){
        //   console.log('Token Rejeitado');
        //   res.sendStatus(401);
        // }
        req.user = decoded;
        console.log('Usuario aprovado');
        next();
      });
    } else{
      console.log('Token não enviado');
      res.sendStatus(401);
    }
  };
  return api;
};