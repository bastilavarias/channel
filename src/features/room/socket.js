const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_enter", async (roomId) => {
    socket.join(roomId);
    io.emit("room_refresh_joined");
  });

  socket.on("room_join", async ({ roomId, accountId }) => {
    const sentChatDetails = await roomController.sendJoinMessage(
      roomId,
      accountId
    );
    io.to(sentChatDetails.room.id).emit("chat_send", sentChatDetails);
    io.emit("room_refresh_joined");
  });

  socket.on("room_members", async (roomId) => {
    const roomMembers = await roomController.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });

  socket.on("room_joined", async (accountId) => {
    const gotJoinedRooms = await roomController.getJoined(accountId);
    socket.emit("room_joined", gotJoinedRooms);
  });
};

module.exports = roomSocket;
