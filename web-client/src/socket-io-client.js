import io from "socket.io-client";
const socketIO = io("http://localhost:3000");

export default socketIO;
