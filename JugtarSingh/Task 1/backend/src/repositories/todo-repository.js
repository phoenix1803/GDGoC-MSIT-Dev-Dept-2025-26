const { Task } = require('../models');
const CrudRepository = require('./crud-repository');

class TodoRepository extends CrudRepository{
    constructor(){
        // pass the actual Task model (not the whole models index object)
        super(Task);
    }
}

module.exports = TodoRepository;