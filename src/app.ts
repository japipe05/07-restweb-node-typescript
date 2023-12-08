import { envs } from "./config/envs";
import { Server } from "./presentation/serve";

(async()=>{
    main();
})();


function main(){
    console.log('main');
    const serve = new Server({
        port: envs.PORT,
        publi_Path: envs.PUBLIC_PATH
    });
    serve.start();
}