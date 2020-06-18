import io from "socket.io-client";
const socketIO = io(process.env.VUE_APP_SOCKET_IO_URL);

export default socketIO;
