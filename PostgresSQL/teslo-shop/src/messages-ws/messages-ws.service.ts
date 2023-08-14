import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

// Interface que tendra un arreglo con los id de los usuarios
interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    // Consultamos el usuaio con el ID
    const user = await this.userRepository.findOneBy({ id: userId });

    // Validar si el usuario existo o esta activo
    if (!user) throw new Error('User not found');
    if (!user.isActive) throw new Error('User not active');



    this.checkUserConnection(user);

    this.connectedClients[client.id] = {
      socket: client,
      user: user,
    };
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
    //console.log(this.connectedClients);
    return Object.keys(this.connectedClients);
  }

  //Funcion para obtener el nombre del usuario
  getUserFullName(socketId: string){
    return this.connectedClients[socketId].user.fullName;
  }

  // Funcion para validar la conexion y desconectar al usuario


  private checkUserConnection( user: User ) {

    for (const clientId of Object.keys( this.connectedClients ) ) {
        
        const connectedClient = this.connectedClients[clientId];

        if ( connectedClient.user.id === user.id ){
            connectedClient.socket.disconnect();
            break;
        }
    }

}


}
