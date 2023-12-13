import express,{Router} from 'express';
import path from 'path';
import compression from 'compression';
interface Options{
    port:number;
    routes: Router;
    public_Path?:string;
}
export class Server{
    public readonly app= express();
    private serverListener:any;
    private readonly port:number;
    private readonly publicPath: string;
    private readonly routes:Router;
    constructor(options: Options){
        const  {port, routes, public_Path = 'public'} = options;
        this.port = port;
        this.publicPath = public_Path;
        this.routes = routes;
        }
    async start(){
        
        //midelware funcion que se ejecuta cuando paso por ahi
        this.app.use(express.json());//raw
        this.app.use(express.urlencoded({extended: true}));//x-www-form-urkencode
        this.app.use(compression());
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

        this.serverListener = this.app.listen(this.port,()=>{
            console.log(`localhost:${this.port}`);
        });
    }
    public close(){
        this.serverListener?.close();
    }
}