import { Router } from "express";
import { ToddosController } from "./controller";

export class TodoRoutes{
    static get routes(): Router{
        const router = Router();
        const todoController = new ToddosController();
        //router.get('/api/todos',(req,res)=>todoController.getTodos(req,res));      
        router.get('/',todoController.getTodos);      
        router.get('/:id',todoController.getTodoByid);    
        router.post('/',todoController.createTodo);    
        router.put('/:id',todoController.UpdateTodo);    
        router.delete('/:id',todoController.deleteTodo);    

        return router;
    }
}