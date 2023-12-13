import {Server} from '../src/presentation/serve';
import { envs } from '../src/config/envs';
import { AppRoutes } from '../src/presentation/routes';
export const testServer = new Server({
    port:envs.PORT,
    routes: AppRoutes.routes,
});