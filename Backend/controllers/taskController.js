const taskModel = require('../Model/TaskModel');
const mongoose = require('mongoose');
// create a task-POST
const createTask = async (req, res) => {
    
    const { title, description } = req.body
    try {

        const task = await taskModel.create({ title, description })
        
        res.status(200).json(task)

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
   
};


//to get tasks-GET

const getTasks = async (req, res) => {
    

    try {
    
        const tasks = await taskModel.find({});
        res.status(200).json(tasks);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }

};

//to get a single task-GET

const getSingleTask = async (req, res) => {

    //get the id in params
  const { id } = req.params;

  //valid id checking
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }

  try {
    const singleTask = await taskModel.findById(id);
    res.status(200).json(singleTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// To update a task - PATCH


const updateTask = async (req, res) => {
  //get the id in params
  const { id } = req.params;

  //valid id checking
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
    }
    
    try {

        const task = await taskModel.findByIdAndUpdate({
            

            _id: id
        }, {
            
            ...req.body
        })

        res.status(200).json(task);
        
    } catch (e) {
        res.status(400).json({error: e.message})
    }




}


//Delete Task - DELETE


const deleteTask = async (req, res) => {
  //get the id in params
  const { id } = req.params;

  //valid id checking
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
    }
    
    try {

        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(task)
    
    } catch (e) {
        
        res.status(400).json({error: e.message})
}


}


module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};