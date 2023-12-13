import { describe, expect, test, jest } from '@jest/globals';
import { Server } from '../src/presentation/serve';
import { envs } from '../src/config/envs';

jest.mock('../src/presentation/serve');


describe('test app. call server with arguments and start',()=>{
    test('should  work', async()=>{
//console.log( envs.PORT,envs.PUBLIC_PATH)
        await import('../src/app');
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            public_Path: envs.PUBLIC_PATH,
            routes: expect.any(Function),
        });
        expect(Server.prototype.start).toHaveBeenCalledWith(
          //  {
           // a:1
        //}
        );
    });
});