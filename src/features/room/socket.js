const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_join", async (roomId) => {
    socket.join(roomId);
    const roomMembers = await roomController.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });

  // socket.on("room_members", async (roomId) => {
  //   const roomMembers = await roomController.getMembers(roomId);
  //   io.emit("room_members", roomMembers);
  // });
};

module.exports = roomSocket;
