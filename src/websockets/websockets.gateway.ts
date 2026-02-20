import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /*   constructor(private readonly websocketsService: WebsocketsService) {}
  
    @SubscribeMessage('createWebsocket')
    create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
      return this.websocketsService.create(createWebsocketDto);
    }
  
    @SubscribeMessage('findAllWebsockets')
    findAll() {
      return this.websocketsService.findAll();
    }
  
    @SubscribeMessage('findOneWebsocket')
    findOne(@MessageBody() id: number) {
      return this.websocketsService.findOne(id);
    }
  
    @SubscribeMessage('updateWebsocket')
    update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
      return this.websocketsService.update(updateWebsocketDto.id, updateWebsocketDto);
    }
  
    @SubscribeMessage('removeWebsocket')
    remove(@MessageBody() id: number) {
      return this.websocketsService.remove(id);
    } */

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log("CLIENTE CONECTADO==>", client.id)
  }

  handleDisconnect(client: Socket) {
    console.log("CLIENTE DESCONECTADO==>", client.id)
  }

  @SubscribeMessage('mensaje')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log("DATA MENSAJE==>", data);

    //this.server.emit('mensajeServer', data) //envia a todos los clientes incluyendo a si mismo
      client.broadcast.emit('mensajeServer', data) //a todos menos a si mismo
  }



}
