import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { connectToServer } from "./socket-client.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
   <div>
   
    <h2>WebSocket - Cliente</h2>


    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br/>



    <span id="server-status">offline</span>

    <ul id="clients-ul">

    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form> 

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

   </div>
 `;

// Llamamos la conexion
//connectToServer();


// Capturamos el input y el boton
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;


// Obtenemos el evento click del boton 
btnConnect.addEventListener('click', () => {

  if( jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer(jwtToken.value.trim());

})

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

//setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
