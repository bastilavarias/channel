const chatController = require("./controller");
const roomController = require("../room/controller");

const chatSocket = (io, socket) => {
  socket.on("chat_send", async ({ roomId, accountId, message, type }) => {
    const savedChat = await chatController.save({
      roomId,
      accountId,
      message,
      type,
    });
    io.to(savedChat.room.id).emit("chat_send", savedChat);
    io.emit("room_refresh_joined");
  });
};

module.exports = chatSocket;
