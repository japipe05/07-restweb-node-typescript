import { Router } from "express";
import { ToddosController } from './todos/controller';
import { TodoRoutes } from "./todos/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        const todoController = new ToddosController();
        //router.get('/api/todos',(req,res)=>todoController.getTodos(req,res));      
        router.use('/api/todos',TodoRoutes.routes);      
        router.use('/api/auth',TodoRoutes.routes); 
        router.use('/api/products',TodoRoutes.routes); 
        router.use('/api/clients',TodoRoutes.routes); 

        return router;
    }
}