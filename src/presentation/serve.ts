import express,{Router} from 'express';
import path from 'path';

interface Options{
    port:number;
    routes: Router;
    publi_Path?:string;
}
export class Server{
    private app= express();
    private readonly port:number;
    private readonly publicPath: string;
    private readonly routes:Router;
    constructor(options: Options){
        const  {port, routes, publi_Path = 'public'} = options;
        this.port = port;
        this.publicPath = publi_Path;
        this.routes = routes;
        }
    async start(){
        
        //midelware funcion que se ejecuta cuando paso por ahi
        this.app.use(express.json());//raw
        this.app.use(express.urlencoded({extended: true}));//x-www-form-urkencode
        //Public Folder
        this.app.use(express.static(this.publicPath));
        //Routes
        this.app.use(this.routes);
        // SPA
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