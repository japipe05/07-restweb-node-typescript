import { Router } from "express";
import { ToddosController } from "./controller";
import { TodoDAtasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes{
    static get routes(): Router{
        const router = Router();
        const datasource = new TodoDAtasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController = new ToddosController(datasource);
        //router.get('/api/todos',(req,res)=>todoController.getTodos(req,res));      
        router.get('/',todoController.getTodos);      
        router.get('/:id',todoController.getTodoByid);    
        router.post('/',todoController.createTodo);    
        router.put('/:id',todoController.UpdateTodo);    
        router.delete('/:id',todoController.deleteTodo);    

        return router;
    }
}