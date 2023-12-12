import { Router } from "express";
import { ToddosController } from './todos/controller';
import { TodoRoutes } from "./todos/routes";
import { TodoDAtasourceImpl } from "../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../infrastructure/repositories/todo.repository.impl";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        // const datasource = new TodoDAtasourceImpl();
        // const todoRepository = new TodoRepositoryImpl(datasource);
        // const todoController = new ToddosController(todoRepository);
        //router.get('/api/todos',(req,res)=>todoController.getTodos(req,res));      
        router.use('/api/todos',TodoRoutes.routes);      
        router.use('/api/auth',TodoRoutes.routes); 
        router.use('/api/products',TodoRoutes.routes); 
        router.use('/api/clients',TodoRoutes.routes); 

        return router;
    }
}