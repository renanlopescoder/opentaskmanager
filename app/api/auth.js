module.exports = function(app) {
  var mongoose =  require('mongoose');

  var jwt = require('jsonwebtoken');
  var api = {};


  var model = mongoose.model('User');

  api.autentica = function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);

    model.findOne({username: req.body.username, password: req.body.password})
    .then(function(user){
      if (!user) {
        console.log('username password Inválidos');
        res.sendStatus(401);
      } else {
        var token = jwt.sign({user:user.username}, app.get('secret'),{
          expiresIn: '1440'
        });
        console.log('Token criado e sendo enviado no header http');
        
        return res.status(200).json({nome: user.username, token: token, user_id: user._id});
      }
    },function(error){
      console.log('username password Inválidos');
      res.sendStatus(401);
    })

  };


  api.createUser = function(req,res){
    model.create(req.body).then(function(user){
      res.json(user);
    }, function(error){
        console.log(error);
        res.status(404).json(error);
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