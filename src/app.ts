import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/serve";

(async()=>{
    main();
})();


function main(){
    //console.log('main');
    const serve = new Server({
        port: envs.PORT,
        public_Path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    serve.start();
}