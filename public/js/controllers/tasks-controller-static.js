taskApp.factory('TaskFactory', function(){
  var id =1;
  var tasks = [
  {id : id++,title: 'Front-End Framework AngularJS',description : 'Single Page App with AngularJS',active:'false', progress:'pending'},
  {id : id++,title: 'Material Design for Bootstrap',description : 'UI (MDB) (Creative Tim)',active:'false',progress:'pending'},
  {id : id++,title: 'Cordova and PhoneGap',description : 'Application can be run in Smartphone',active:'false',progress:'pending'},
  {id : id++,title: 'Material Icons',description : 'Material Icons (Google)',active:'false',progress:'pending'},
  {id : id++,title: 'Task Completed Example',description : 'Just for example task done =)',active:'false',progress:'done'}
  ];
  var factory = {};

  factory.getTasks = function(){     
    return tasks;
  };

  factory.getId = function(){
    return id;
  };

  factory.incId = function(){
    id ++;
  };
  
  return factory;
});

taskApp.controller('TaskController', function($scope, TaskFactory,$routeParams, $http){
  $scope.tasks = [];
  
    $http.get('/list/progress')
    .success(function(retorno) {
      $scope.tasks = retorno;
    })
    .error(function(erro) {
      console.log(erro)
    });

  $scope.addTask = function(){
    $scope.tasks.push({
      id : TaskFactory.getId(),
      title : $scope.newTask.title,
      description : $scope.newTask.description,
      active : 'false',
      progress: 'pending'
    });
    TaskFactory.incId();
    $scope.newTask.title = '';
    $scope.newTask.description = '';
  };
  $scope.taskActive = function(task,active){
    $scope.tasks[$scope.tasks.indexOf(task)].active = active;
    $scope.saveTask.title = $scope.tasks[$scope.tasks.indexOf(task)].title;
    $scope.saveTask.description = $scope.tasks[$scope.tasks.indexOf(task)].description;
  };
  $scope.taskProgress = function(task,progress){
    $scope.tasks[$scope.tasks.indexOf(task)].progress = progress;
  };
  $scope.saveTask = function(task){
    $scope.tasks[$scope.tasks.indexOf(task)] = {id :  Number(task.id), title: $scope.saveTask.title, description: $scope.saveTask.description,progress: 'pending',active: 'false'};
    $scope.saveTask.title = "";
    $scope.saveTask.description = "";
    $scope.saveTask.description = "";
  };
  $scope.taskActive = function(task,active){
    $scope.tasks[$scope.tasks.indexOf(task)].active = active;
    $scope.saveTask.title = $scope.tasks[$scope.tasks.indexOf(task)].title;
    $scope.saveTask.description = $scope.tasks[$scope.tasks.indexOf(task)].description;
  };
  $scope.removeTask = function(task) { 
    var index = $scope.tasks.indexOf(task);
    $scope.tasks.splice(index, 1);     
  };

});


