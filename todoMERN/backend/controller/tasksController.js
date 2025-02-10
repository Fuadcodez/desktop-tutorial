import taskModel from "../schema/tasksSchema.js";
const getAllTasks = async (req, res, ) =>{
    const _id = req.user._id
    try {
        const task = await taskModel.find({user_id: _id}).sort({createdAt: -1});
        if (!task) return;
        // tasks.push(task);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
}
const createTasks = async (req, res)=>{
    const { inputTask } = req.body;
    try {
        const newTask = { id: Date.now(), inputTask, completedTask: false, user_id: req.user._id};
        // tasks.push(newTask);
        const createdTasks = await taskModel.create(newTask)
        res.status(201).send(createdTasks);
        
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteTasks = async (req, res)=>{
 const {id} = req.params
 const _id = req.user._id
 try {
     const task = await taskModel.findOneAndDelete({ user_id: _id , id });
     if (!task) {
         return res.status(404).send({ message: 'Task not found' });
     }
     const allTasks = await taskModel.find({user_id: _id}).sort({createdAt: -1});
     res.status(200).send(allTasks);
    
 } catch (error) {
    res.status(500).send(error);
 }
}
const updateTasks = async (req, res)=>{
    const { id } = req.params;
    const _id = req.user._id
    try {
        const task = await taskModel.findOne({ user_id: _id , id});
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        task.completedTask = !task.completedTask;
        const updatedTask = await task.save()
        const allTasks = await taskModel.find({user_id: _id}).sort({createdAt: -1});
        res.status(200).send(allTasks);
        
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteCompletedTasks = async (req, res)=>{
    const _id = req.user._id
    const check = taskModel.findOne({user_id: _id , completedTask: true});
    if (!check) return; 
 await taskModel.deleteMany({user_id: _id , completedTask:true})
 const remainingTasks = await taskModel.find({user_id: _id}).sort({createdAt: -1});
 res.status(200).send(remainingTasks)
}
export { createTasks, deleteTasks, updateTasks, deleteCompletedTasks, getAllTasks }