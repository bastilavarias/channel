const roomService = require("./service");

const roomSocket = (io, socket) => {
  socket.on("room_members", async (roomId) => {
    const roomMembers = await roomService.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });
};

module.exports = roomSocket;
