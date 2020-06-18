const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_enter", async ({ roomId, accountId }) => {
    socket.id = accountId;
    socket.join(roomId);
    // console.log(io.sockets.adapter.rooms[roomId].sockets);
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
    io.to(roomId).emit("room_members", roomMembers);
  });

  socket.on("room_destroy", async (roomId) => {
    socket.to(roomId).emit("room_destroy");
    io.emit("chat_recent_refresh");
  });
};

module.exports = roomSocket;
