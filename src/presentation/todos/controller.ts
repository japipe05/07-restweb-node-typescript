
import { Request,Response } from "express";
import {prisma} from '../../data/postgres/index';
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";
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
    //get  todos
    public getTodos = async(req:Request, res:Response)=>{
        //return res.json(todos);
        //const selectTodo = await prisma.todo.findMany();
        //return res.json(selectTodo);
        const todos = await this.todoRepository.getAll();
       // console.log({todos})
        return res.json(todos);
    }
    //get id
    public getTodoByid = async(req:Request, res:Response)=>{
        const id= +req.params.id;
        try {
            
            const selectIdTodo = await this.todoRepository.findById(id);
            res.json(selectIdTodo);
        } catch (error) {
            res.status(404).json({error:`Todo ${id} not found`});
        }
        // if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        // //console.log(id,10)
        // //const todo= todos.find(todo=>todo.id==id);

        // const selectIdTodo = await prisma.todo.findUnique({
        //     where:{
        //         id:id,
        //     },
        // });
        // (selectIdTodo)
        //     ? res.json(selectIdTodo)
        //     : res.status(404).json({error:`Todo ${id} not found`});
         
    }
    //Post 
    public createTodo = async(req:Request, res:Response)=>{

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return  res.status(400).json({error});
        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);
        //const {text} = req.body;
        //if(!text) return res.status(400).json({error: 'Text property is required'});
        // const todo = await prisma.todo.create({
        //     data:createTodoDto!
        // });

        // const newTodo = {
        //     id: todos.length+1,
        //     text: text,
        //     completedAt:null
        // };
        
        //todos.push(newTodo);
        //res.json(todo);
    }
    //PUT
    public UpdateTodo = async(req:Request, res:Response)=>{
        const id= +req.params.id;
        const [error,updateTodoDTO] = UpdateTodoDto.create({...req.body,id});

        if (error) return res.status(400).json({error});


        const updateTodo = await this.todoRepository.updateById(updateTodoDTO!);
        return res.json(updateTodo);
        //if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});
        //console.log(id,10)
        //const todo= todos.find(todo=>todo.id==id);
        
        // const todo = await prisma.todo.findUnique({
        //     where: {
        //         id: id,
        //       },
        // });

        //if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});
        
       
        // todo.text = text || todo.text;
        // (completedAt==='null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date(completedAt||todo.completedAt);
        //! OJO, referencia

        //const {text, completedAt} = req.body;
        //console.log(text,completedAt)
        //if(!text) return res.status(400).json({error: 'Text property is required'});

        // const updatetodo = await prisma.todo.update({
        //     where: {
        //         id: id,
        //       },
        //       data:updateTodoDTO!.values
              //{
                
              //  text: text,
                //completedAt: (completedAt) ? new Date(completedAt): null
              //}
        //});
        //res.json(todo);
       // res.json(updatetodo);
    }

    //Delete
    public deleteTodo = async(req:Request, res:Response)=>{
        
        const id= +req.params.id;
        try {
            const deleteTodo = await this.todoRepository.deleteById(id);    
            res.json(deleteTodo)
        } catch (error) {
            res.status(404).json({error: `Todo with id ${id} not found`});
        }
        
        // if(isNaN(id)) return res.status(400).json({error: 'Invalid id not a number'});

        // //const todo= todos.find(todo=>todo.id==id);
        // const todo = await prisma.todo.findUnique({
        //     where: {
        //         id: id,
        //       },
        // });
        // if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        // // const todo = await prisma.todo.create({
        // //     data:{text}
        // // });

        // const deleteTodo = await prisma.todo.deleteMany({
        //     where: {
        //         id: id,
        //       }
        // });
        // //todos.splice(todos.indexOf(todo),1);
        // //res.json(todos);
        // (deleteTodo)
        //     ? res.json(deleteTodo)
        //     : res.status(404).json({error: `Todo with id ${id} not found 2`});
        

    }
}