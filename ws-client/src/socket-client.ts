import { Manager,Socket } from "socket.io-client";

export const connectToServer = () => {

   const manager = new Manager('http://localhost:3000/socket.io/socket.io.js'); //

   const socket =  manager.socket('/');

    console.log({socket})

    addListeners(socket);

}

const addListeners = ( socket: Socket) => {

    //clients-ul

    const serverStatusLabel = document.querySelector('#server-status')!;

    const clientsUL = document.querySelector('#clients-ul')!;

     // Escuchar el estado de la coneccion
     socket.on('connect',  () => {
        //console.log('connected');
        serverStatusLabel.innerHTML = 'Connected';
     })  
     
       
       socket.on('disconnect',  () => {
        //console.log('disconnected');
        serverStatusLabel.innerHTML = 'Disconnected';
     }) 
     
     
     socket.on('clients-updated',  (clients: string[]) => {
       //console.log({clients});
        
        let clientsHtml = '';

        clients.forEach( clientId => {
            clientsHtml += `

                <li>${clientId}</li>

            `});
            clientsUL.innerHTML = clientsHtml;

     }) 
  
}