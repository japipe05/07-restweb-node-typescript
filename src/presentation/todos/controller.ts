
import { Request,Response } from "express";
import {prisma} from '../../data/postgres/index';
const todos=[
    {id: 1, text:'Buy Milk', completedAt: new Date()},
    {id: 2, text:'Buy Bread', completedAt: null},
    {id: 3, text:'Buy Butter', completedAt: new Date()},
];
export class ToddosController{
    // DI: Dependenci inyección
    constructor(){}
    //get  todos
    public getTodos = async(req:Request, res:Response)=>{
        //return res.json(todos);
        const selectTodo = await prisma.todo.findMany();
        return res.json(selectTodo);
    }
    //get id
    public getTodoByid = async(req:Request, res:Response)=>{
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        //console.log(id,10)
        //const todo= todos.find(todo=>todo.id==id);

        const selectIdTodo = await prisma.todo.findUnique({
            where:{
                id:id,
            },
        });
        (selectIdTodo)
            ? res.json(selectIdTodo)
            : res.status(404).json({error:`Todo ${id} not found`});
         
    }
    //Post 
    public createTodo = async(req:Request, res:Response)=>{
        const {text} = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'});


        const todo = await prisma.todo.create({
            data:{text}
        });

        // const newTodo = {
        //     id: todos.length+1,
        //     text: text,
        //     completedAt:null
        // };
        
        //todos.push(newTodo);
        res.json(todo);
    }
    //PUT
    public UpdateTodo = async(req:Request, res:Response)=>{
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        //console.log(id,10)
        //const todo= todos.find(todo=>todo.id==id);
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
              },
        });
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});
        
       
        // todo.text = text || todo.text;
        // (completedAt==='null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date(completedAt||todo.completedAt);
        //! OJO, referencia

        const {text, completedAt} = req.body;
        console.log(text,completedAt)
        if(!text) return res.status(400).json({error: 'Text property is required'});

        const updatetodo = await prisma.todo.update({
            where: {
                id: id,
              },
              data:{
                text: text,
                completedAt: (completedAt) ? new Date(completedAt): null
              }
        });
        //res.json(todo);
        res.json(updatetodo);
    }

    //Delete
    public deleteTodo = async(req:Request, res:Response)=>{
        
        const id= +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});

        //const todo= todos.find(todo=>todo.id==id);
        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
              },
        });
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        // const todo = await prisma.todo.create({
        //     data:{text}
        // });

        const deleteTodo = await prisma.todo.deleteMany({
            where: {
                id: id,
              }
        });
        //todos.splice(todos.indexOf(todo),1);
        //res.json(todos);
        (deleteTodo)
            ? res.json(deleteTodo)
            : res.status(404).json({error: `Todo with id ${id} not found 2`});
        

    }
}