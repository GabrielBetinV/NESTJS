import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token:string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      hola: 'mundo',
      authentication: token
    }
  }); //


  // Borramos los listener anteriores en el caso de que exista
  socket?.removeAllListeners(); 

  // Creamos el nuevo listener
  socket = manager.socket("/");
 

  console.log({ socket });

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  //clients-ul

  const serverStatusLabel = document.querySelector("#server-status")!;

  const clientsUL = document.querySelector("#clients-ul")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
  document.querySelector<HTMLInputElement>("#message-input")!;

  const messageUL = document.querySelector<HTMLUListElement>("#messages-ul")!;

  // Escuchar el estado de la coneccion
  socket.on("connect", () => {
    //console.log('connected');
    serverStatusLabel.innerHTML = "Connected";
  });

  socket.on("disconnect", () => {
    //console.log('disconnected');
    serverStatusLabel.innerHTML = "Disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    //console.log({clients});

    let clientsHtml = "";

    clients.forEach((clientId) => {
      clientsHtml += `

                <li>${clientId}</li>

            `;
    });
    clientsUL.innerHTML = clientsHtml;
  });

  socket.on(
    "message-from-server",
    (payload: { fullname: string; message: string }) => {
      // console.log(payload)

      const newMessage = `
       <li>
           <strong>${payload.fullname}</strong>
           <span>${payload.message}</span>
       </li>
   `;
      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messageUL.append(li);
    }
  );

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-cliente", {
      id: "YO!!",
      message: messageInput.value,
    });

    messageInput.value = "";
    //console.log({id: 'YO!!', message: messageInput.value})
  });
};
