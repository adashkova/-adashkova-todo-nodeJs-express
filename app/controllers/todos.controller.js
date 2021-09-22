const db = require('../models');
const Todo = db.todos;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const todo = new Todo({
    title: req.body.title,
    isDone: req.body.isDone ? req.body.isDone : false,
  });

  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Todo.',
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};

  Todo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else {
        res.send({
          message: 'Todo was deleted successfully!',
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Todo with id=' + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todo were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all todos.',
      });
    });
};
exports.deleteAllIsDone = (req, res) => {
  Todo.deleteMany({ isDone: true })
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todo were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all todos.',
      });
    });
};

exports.findAllIsDone = (req, res) => {
  Todo.find({ isDone: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

exports.findAllInProgress = (req, res) => {
  Todo.find({ isDone: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
