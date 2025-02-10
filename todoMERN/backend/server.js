import Fastify from "fastify";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import allTaskUserRoutes from "./routes/taskUsersRoutes.js";
import cors from "@fastify/cors"
import { connectDB } from "./schema/tasksSchema.js";
export const server = Fastify({logger:false});
import fastifyJwt from "fastify-jwt";
dotenv.config()
const PORT = process.env.PORT
const main = async () => {
    server.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
        credentials: true 
    });
    server.register(connectDB)
    server.register(fastifyJwt, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    })
    server.register(allTaskUserRoutes, {prefix: 'api/tasksuser'})
    server.register(taskRoutes, {prefix: 'api/tasks'})
    try {
        server.listen({
            port:  PORT,
            host: "0.0.0.0"
        })
        console.log(`Server is running on port ${PORT}`)
    } catch (error) {
        console.error(err)
        process.exit(1)
    }
}
main()