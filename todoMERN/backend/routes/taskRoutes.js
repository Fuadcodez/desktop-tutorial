import { createTasks,deleteTasks,updateTasks, deleteCompletedTasks, getAllTasks } from "../controller/tasksController.js"
import requireAuth from "../utils/requireAuth.js";

const taskRoutes =  (server)=>{
server.addHook('preHandler', requireAuth);
server.get('/', getAllTasks)
server.post('/', createTasks)
server.delete('/:id', deleteTasks)
server.delete('/completed', deleteCompletedTasks)
server.patch('/:id', updateTasks)
}
export default taskRoutes