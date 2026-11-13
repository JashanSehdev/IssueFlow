import { Module } from '@nestjs/common';
import { WebsocketServices } from './websocket-auth.service.js';
import { WebsocketAuthMiddleware } from './websocket-auth.middleware.js';


@Module({

  providers: [WebsocketServices],
  exports : [WebsocketAuthMiddleware]
})
export class WebSocketModule{

}
