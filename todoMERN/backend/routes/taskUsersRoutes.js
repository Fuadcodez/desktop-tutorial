import { createTaskUsers,loginTaskUsers } from "../controller/taskUserController.js";

const allTaskUserRoutes = async (server)=>{
    server.post('/signup',{
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: {type:'string'},
                    password: {type:'string'},
                }
                
        },
        response:{
            201: {
                type: 'object',
                properties: {
                    email: {type:'string'},
                    token: {type:'string'}
        }}}
    }}, createTaskUsers)
    server.post('/login',{schema:{
        response:{
            201: {
                type: 'object',
                properties: {
                    email: {type:'string'},
                    token: {type:'string'}
        }}}}
}, loginTaskUsers)}

export default allTaskUserRoutes;