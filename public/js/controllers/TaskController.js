// Main Controller of Tasks
// Controle principal de tarefas

taskApp.controller('TaskController', function ($scope, $routeParams, $http, $location, dateFormat, $filter, auth) {
  $scope.tasks = [];
  var user = auth.getUser();
  $scope.date = $filter('date')(new Date(), 'yyyyMMddHH:mm');
  $scope.dateDay = $filter('date')(new Date(), 'yyyyMMdd');

// Função inicial para obter a lista de tarefas
// Initial function to get the list of tasks

  function init() {
    $http.get('/list', user)
      .success(function (retorno) {
        for(task in retorno){
          retorno[task].dateCompare = dateFormat.dateFormatCompare(retorno[task].taskDate);
          retorno[task].dateCompareDay = dateFormat.dateFormatCompareDay(retorno[task].taskDate);
        }
        $scope.tasks = retorno;
      })
      .error(function (erro) {
        console.log(erro)
      });
  }

// Executando a função para obter a lista de tarefas
// Running the function to get the task list

  init();

// Função para adicionar nova tarefa
// Function to create a new task

  $scope.createTask = function (task) {

    task.active = 'false';
    task.progress = 'progress';
    
    if(task.taskDate == undefined || task.taskDate == null){
      task.taskDate = $filter('date')(new Date(), 'dd/MM/yyyy HH:mm');
    }else{
      task.taskDate = $filter('date')(task.taskDate, 'dd/MM/yyyy HH:mm');
    }
    if(task.title == undefined || task.title == null){
      task.title = 'No Title';
    }
    
    if(task.description == undefined || task.description == null){
      task.description = 'No Description';
    }
    $scope.newTask = "";
    task.userId = user.headers.userId;
    $http.post('/create', task, user)
      .success(function (retorno) {
        init();     
      })
      .error(function (erro) {
        console.log(erro)
      });
  };

// Função para alterar estado da tarefa para mostrar formulário de alteração com dados da tarefa
// Function for chage task state to show the update form with the task data

  $scope.taskActive = function (task, active) {
    $scope.tasks[$scope.tasks.indexOf(task)].active = active;
    $scope.saveTask.title = $scope.tasks[$scope.tasks.indexOf(task)].title;
    $scope.saveTask.description = $scope.tasks[$scope.tasks.indexOf(task)].description;
    $scope.saveTask.taskDate = $scope.tasks[$scope.tasks.indexOf(task)].taskDate;
  };

// Função para efetuar alteração da tarefa
// Function to perform task change

  $scope.saveTask = function (task) {
    task.active = 'false';
    $http.post('/update/' + task._id, task, user)
      .success(function (retorno) {
        $scope.taskActive(task, 'false');
        init();
      })
      .error(function (erro) {
        console.log(erro)
      });
  };

// Função para alterar o progresso da tarefa (progress / done)
// Function for chage task progress (progress / done)

  $scope.taskProgress = function (task, param) {
    task.progress = param;
    var progressStatus;

    if(param == 'done'){
      progressStatus = 'Completed at ';
    }

    if(param == 'progress'){
      progressStatus = 'Recovered at ';
    }

    task.updatedStatusDate =  progressStatus + $filter('date')(new Date(), 'dd/MM/yyyy HH:mm');
    $http.post('/update/' + task._id, task, user)
      .success(function (retorno) {
        init();
      })
      .error(function (erro) {
        console.log(erro)
      });
  };

// Função para remover tarefa
// Function to delete the task

  $scope.removeTask = function (task) {
    $http.delete('/remove/' + task._id, user)
      .success(function (retorno) {
        init();
      })
      .error(function (erro) {
        console.log(erro)
      });
  };

});


