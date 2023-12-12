import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDAtasourceImpl implements TodoDatasource{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        //throw new Error("Method not implemented.");
        console.log("todo.datasource.impl",createTodoDto)
        const todo = await prisma.todo.create({
            data:createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        //throw new Error("Method not implemented.");
        const selectTodo = await prisma.todo.findMany();

        return selectTodo.map(selectTodo=>TodoEntity.fromObject(selectTodo));    
    }
    async findById(id: number): Promise<TodoEntity> {
        //throw new Error("Method not implemented.");
        const selectIdTodo = await prisma.todo.findUnique({
            where:{
                id:id,
            },
        });
        if(!selectIdTodo)  throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(selectIdTodo);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        //throw new Error("Method not implemented.");
        await this.findById(updateTodoDto.id);

        const updatetodo = await prisma.todo.update({
            where: {
                id: updateTodoDto.id,
              },
              data:updateTodoDto!.values
        });
        return TodoEntity.fromObject(updatetodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        //throw new Error("Method not implemented.");
        await this.findById(id);
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: id,
              }
        });
        return TodoEntity.fromObject(deleteTodo);
    }

}