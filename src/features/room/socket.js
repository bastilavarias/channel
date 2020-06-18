const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_enter", async (roomId) => {
    socket.join(roomId);
    io.emit("chat_refresh_recent");
  });

  socket.on("room_join", async ({ roomId, accountId }) => {
    const sentBotChatDetails = await roomController.sendBotChat({
      roomId,
      accountId,
      operationType: "join",
    });
    io.to(sentBotChatDetails.room.id).emit("chat_send", sentBotChatDetails);
    io.emit("chat_recent_refresh");
  });

  socket.on("room_leave", async ({ roomId, accountId }) => {
    await roomController.leave(roomId, accountId);
    const sentBotChatDetails = await roomController.sendBotChat({
      roomId,
      accountId,
      operationType: "leave",
    });
    io.to(sentBotChatDetails.room.id).emit("chat_send", sentBotChatDetails);
    io.emit("chat_recent_refresh");
  });

  socket.on("room_members", async (roomId) => {
    const roomMembers = await roomController.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });
};

module.exports = roomSocket;
