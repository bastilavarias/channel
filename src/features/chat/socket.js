const chatController = require("./controller");

const chatSocket = (io, socket) => {
  socket.on("send_chat", async ({ roomId, accountId, message }) => {
    const type = "regular";
    const chatDetails = await chatController.save({
      roomId,
      accountId,
      message,
      type,
    });
    console.log(chatDetails);
  });
};

module.exports = chatSocket;
