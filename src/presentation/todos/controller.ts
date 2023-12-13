
import { Request,Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetAllteTodo, GetTodo, TodoRepository, UpdateTodo } from "../../domain";
// const todos=[
//     {id: 1, text:'Buy Milk', completedAt: new Date()},
//     {id: 2, text:'Buy Bread', completedAt: null},
//     {id: 3, text:'Buy Butter', completedAt: new Date()},
// ];
export class ToddosController{
    // DI: Dependenci inyección
    constructor(
        private readonly todoRepository: TodoRepository
    ){}
    private handleError = (res: Response, error: unknown)=>{
        if(error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message});
            return;
        }
        res.status(500).json({error:'Internal server Error -check logs'});
    }
    //get  todos
    public getTodos = (req:Request, res:Response)=>{
        new GetAllteTodo(this.todoRepository)
            .execute()
            .then(todos=>res.json(todos))
            .catch(error => this.handleError(res,error));
            //.catch(error => res.status(400).json({error}))
    }
    //get id
    public getTodoByid = (req:Request, res:Response)=>{
        const id= +req.params.id;
         new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo=>res.json(todo))
            .catch(error => this.handleError(res,error));
            //.catch((error:CustomError) => res.status(error.statusCode).json({error:error.message}))
    }
    //Post 
    public createTodo = (req:Request, res:Response)=>{

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return  res.status(400).json({error});
        //console.log("controller",createTodoDto)
       new CreateTodo(this.todoRepository)
                    .execute(createTodoDto!)
                    .then(todo=>res.status(201).json(todo))
                    .catch(error => this.handleError(res,error));
                    //.catch(error => res.status(400).json({error}));
    }
    //PUT
    public UpdateTodo = (req:Request, res:Response)=>{
        const id= +req.params.id;
        const [error,updateTodoDTO] = UpdateTodoDto.create({...req.body,id});

        if (error) return res.status(400).json({error});
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDTO!)
            .then(todo=>res.json(todo))
            .catch(error => this.handleError(res,error));
            //.catch(error => res.status(400).json({error}));
    }

    //Delete
    public deleteTodo = (req:Request, res:Response)=>{
        
        const id= +req.params.id;
        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo=>res.json(todo))
            .catch(error => this.handleError(res,error));
            //.catch(error => res.status(400).json({error}));
    }
}