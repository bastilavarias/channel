const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_enter", async (roomId) => {
    socket.join(roomId);
    io.emit("chat_refresh_recent");
  });

  socket.on("room_join", async ({ roomId, accountId }) => {
    const sentChatDetails = await roomController.sendJoinMessage(
      roomId,
      accountId
    );
    io.to(sentChatDetails.room.id).emit("chat_send", sentChatDetails);
    io.emit("chat_recent_refresh");
  });

  socket.on("room_members", async (roomId) => {
    const roomMembers = await roomController.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });
};

module.exports = roomSocket;
