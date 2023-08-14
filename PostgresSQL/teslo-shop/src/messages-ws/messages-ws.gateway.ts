import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({cors:true, namespace: '/'})
export class MessagesWsGateway  implements OnGatewayConnection, OnGatewayDisconnect{

  // Decorador que tiene toda la informacion del cliente
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
    ) {}


 async handleConnection(client: Socket, ...args: any[]) {
   //console.log('Cliente Conectado: ', client.id)
    
   // Obtenemos el token
    const token = client.handshake.headers.authentication as string;
    //console.log(token)

    let payload: JwtPayload; 
    try {
       payload = this.jwtService.verify(token);
       await this.messagesWsService.registerClient(client, payload.id);
       console.log(payload);

    } catch (error) {
      client.disconnect();
      return;
    }

    
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



  // escuchar un mensaje

    @SubscribeMessage('message-from-cliente')
    onMessageFromClient(client:Socket, payload:NewMessageDto){

        //console.log(client.id, payload)
    
      
        // Mandar el mensaje al cliente
        // client.emit('message-from-server', {
        //   fullname: 'Soy yo',
        //   message: payload.message || 'no-message!!'
        // });

        // Emitir a todos los clientes conectados
        // client.broadcast.emit('message-from-server', {
        //   fullname: 'Soy yo',
        //   message: payload.message || 'no-message!!'
        // });


        // Emitir a todos incluyendo el que emite
        this.wss.emit('message-from-server', {
          fullname: this.messagesWsService.getUserFullName(client.id),
          message: payload.message || 'no-message!!'
        });
    
      }


}
