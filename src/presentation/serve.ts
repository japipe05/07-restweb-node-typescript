import express from 'express';
import path from 'path';

interface Options{
    port:number;
    publi_Path?:string;
}
export class Server{
    private app= express();
    private readonly port:number;
    private readonly publicPath: string;
    constructor(options: Options){
        const  {port, publi_Path = 'public'} = options;
        this.port = port;
        this.publicPath = publi_Path;
        }
    async start(){
        
        //midelware

        //Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*',(req,res)=>{
            // console.log(req.url);
            // res.send('Holamundo')
            const indexpath = path.join(__dirname +`../../../${this.publicPath}/index.html`);
            res.sendFile(indexpath);
        });

        this.app.listen(this.port,()=>{
            console.log(`localhost:${this.port}`);
        });
    }
}