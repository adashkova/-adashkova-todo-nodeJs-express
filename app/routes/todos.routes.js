module.exports = app => {
  const todos = require('../controllers/todos.controller.js');

  let router = require('express').Router();

  router.post('/', todos.create);

  router.get('/todos', todos.findAll);

  router.get('/isDone', todos.findAllIsDone);

  router.get('/inProgress', todos.findAllInProgress);

  

  router.put('/:id', todos.update);

  router.delete('/:id', todos.delete);

  router.delete('/', todos.deleteAllIsDone);

  app.use('/', router);
};
