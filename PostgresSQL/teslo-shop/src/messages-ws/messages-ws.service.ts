import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

// Interface que tendra un arreglo con los id de los usuarios
interface ConnectedClients {
  [id: string]: Socket;
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  // Enviar la cantidad de clientes
  //   getConnectedClients(): number {

  //     return Object.keys(this.connectedClients).length;

  //   }


  // Enviar los id de los clientes
  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }
}
