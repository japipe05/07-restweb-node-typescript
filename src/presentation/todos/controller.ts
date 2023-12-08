import { Request,Response } from "express";
const todos=[
    {id: 1, text:'Buy Milk', completedAt: new Date()},
    {id: 2, text:'Buy Bread', completedAt: null},
    {id: 3, text:'Buy Butter', completedAt: new Date()},
];
export class ToddosController{
    // DI: Dependenci inyección
    constructor(){}
    //get  todos
    public getTodos =(req:Request, res:Response)=>{
        return res.json(todos);
    }
    //get id
    public getTodoByid =(req:Request, res:Response)=>{
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        //console.log(id,10)
        const todo= todos.find(todo=>todo.id==id);
        (todo)
            ? res.json(todo)
            : res.status(404).json({error:`Todo ${id} not found`});
         
    }
    //Post 
    public createTodo =(req:Request, res:Response)=>{
        const {text} = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'});
        const newTodo = {
            id: todos.length+1,
            text: text,
            completedAt:null
        };
        
        todos.push(newTodo);
        res.json(newTodo);
    }
    //PUT
    public UpdateTodo =(req:Request, res:Response)=>{
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        //console.log(id,10)
        const todo= todos.find(todo=>todo.id==id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});
        
        const {text, completedAt} = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'});

        todo.text = text || todo.text;
        (completedAt==='null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt||todo.completedAt);
        //! OJO, referencia

        res.json(todo);
    }

    //Delete
    public deleteTodo =(req:Request, res:Response)=>{
        
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});

        const todo= todos.find(todo=>todo.id==id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        todos.splice(todos.indexOf(todo),1);
        res.json(todos);
    }
}