const chatController = require("./controller");
const roomController = require("../room/controller");

const chatSocket = (io, socket) => {
  socket.on("chat_send", async ({ roomId, accountId, message }) => {
    const type = "regular";
    const savedChat = await chatController.save({
      roomId,
      accountId,
      message,
      type,
    });
    const gotJoinedRooms = await roomController.getJoined(accountId);
    socket.emit("room_joined", gotJoinedRooms);
    io.to(savedChat.room.id).emit("chat_send_single", savedChat);
  });
};

module.exports = chatSocket;
