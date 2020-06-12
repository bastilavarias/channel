const roomSocket = (io, socket) => {
  socket.on("room_members", (roomId) => {
    io.emit("room_members", []);
  });
};

module.exports = roomSocket;
