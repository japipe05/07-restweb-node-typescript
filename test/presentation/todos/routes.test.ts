import { describe, test, beforeAll, afterAll, expect ,beforeEach, afterEach} from '@jest/globals';
import  request  from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Todo Route testing',()=>{

    beforeAll( async()=>{
        await testServer.start();
    });

    afterAll(()=>{
        testServer.close();
    });

    beforeEach(async()=>{
        await prisma.todo.deleteMany();
    });

    afterEach(async()=>{
        await prisma.todo.deleteMany();
    });

    const todo1 = { text: 'Hola mundo1'};
    const todo2 = { text: 'Hola mundo2'};
    test('Should retun todos api/todos',async()=>{
        
        await prisma.todo.createMany({
            data:[todo1,todo2]
        });

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

            expect(body).toBeInstanceOf(Array);
            expect(body.length).toBe(2);
            expect(body[0].text).toBe(todo1.text);
            expect(body[1].text).toBe(todo2.text);
            expect(body[0].completedAt).toBeNull();


            //console.log(body)
    });

    test('Should return a Todo api/todos/:id',async()=>{
        const todo= await prisma.todo.create({
            data:todo1
        });

        const {body} = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id:todo.id,
            text:todo.text,
            completedAt:todo.completedAt
        })
    });

    test('Should return a 404 Not found api/todos/:id',async()=>{
        const todoId= 999;
        const {body} = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);
        //console.log(body)
        expect(body).toEqual( { error: `Todo with id ${todoId} not found` });
    });

    test('Should return a new Todo api/todos',async()=>{
        const {body} = await request(testServer.app)
            .post(`/api/todos/`)
            .send(todo1)
            .expect(201);
       // console.log(body)
        expect(body).toEqual( { 
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
         });
    });

    test('Should return a error Todo api/todos',async()=>{
        const {body} = await request(testServer.app)
            .post(`/api/todos/`)
            .send({})
            .expect(400);
        //console.log(body)
        expect(body).toEqual( { error: 'Text property is required' });
    });

    test('Should return a error if text is emty Todo api/todos',async()=>{
        const {body} = await request(testServer.app)
            .post(`/api/todos/`)
            .send({text:''})
            .expect(400);
        //console.log(body)
        expect(body).toEqual( { error: 'Text property is required' });
    });

    test('Should return an update Todo api/todos',async()=>{
        
        const todo= await prisma.todo.create({
            data:todo1
        });
        
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({text:'Hola mundo Update', completedAt:'2023-10-21'})
            .expect(200);
        //console.log(body)
        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: 'Hola mundo Update', 
            completedAt: '2023-10-21T00:00:00.000Z' });
    });

    test('Should return an 404 if Todo not found api/todos',async()=>{
        const todoId=999;
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({text:'Hola mundo Update', completedAt:'2023-10-21'})
            .expect(404);
        //console.log(body);
        expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
    });

    test('Should return an update Todo only date api/todos',async()=>{
        const todo= await prisma.todo.create({
            data:todo1
        });
        
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt:'2023-10-21'})
            .expect(200);
        //console.log(body)
        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: todo1.text,
            completedAt: '2023-10-21T00:00:00.000Z' });
    });

    test('Should return an update Todo only text api/todos',async()=>{
        const todo= await prisma.todo.create({
            data:todo1
        });
        
        const {body} = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({text:'Hola mundo Update'})
            .expect(200);
        //console.log(body)
        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: 'Hola mundo Update',
            completedAt:null });
    });


    test('Should return a delete Todo api/todos',async()=>{
        const todo= await prisma.todo.create({
            data:todo1
        });
        
        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);
        //console.log(body)
        expect(body).toEqual({ 
            id: expect.any(Number), 
            text: todo1.text,
            completedAt:null });
    });


    test('Should return a 404 if todo not found api/todos',async()=>{
    
        const todoid=999;
        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todoid}`)
            .expect(404);
        //console.log(body)
        expect(body).toEqual({ error: `Todo with id ${todoid} not found` });
    });
});