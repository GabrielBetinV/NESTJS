import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:true, namespace: '/'})
export class MessagesWsGateway  implements OnGatewayConnection, OnGatewayDisconnect{

  // Decorador que tiene toda la informacion del cliente
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}


  handleConnection(client: Socket, ...args: any[]) {
   //console.log('Cliente Conectado: ', client.id)
    
    this.messagesWsService.registerClient(client);

    console.log({conectados: this.messagesWsService.getConnectedClients()});


    // mandar un mensaje a todas las personas que estan conectadas
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    
 
  }
  handleDisconnect(client: Socket) {
    //console.log('Cliente Desconectado: ', client.id)

    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    
    
    console.log({conectados: this.messagesWsService.getConnectedClients()});

  }
}
