const chatController = require("./controller");

const chatSocket = (io, socket) => {
  socket.on("chat_send", async ({ roomId, accountId, message, type }) => {
    const savedChat = await chatController.save({
      roomId,
      accountId,
      message,
      type,
    });
    io.to(savedChat.room.id).emit("chat_send", savedChat);
    io.emit("chat_recent_refresh");
  });

  socket.on("chat_recent", async (accountId) => {
    const recentChats = await chatController.getRecent(accountId);
    socket.emit("chat_recent", recentChats);
  });

  socket.on("chat_read_recent", async ({ chatId, accountId, roomId }) => {
    await chatController.readRecent({ chatId, accountId, roomId });
    const recentChats = await chatController.getRecent(accountId);
    socket.emit("chat_recent", recentChats);
  });

  socket.on(
    "chat_add_typing_account_indicator",
    async ({ roomId, account }) => {
      socket.to(roomId).emit("chat_add_typing_account_indicator", account);
    }
  );

  socket.on(
    "chat_remove_typing_account_indicator",
    async ({ roomId, accountId }) => {
      socket.to(roomId).emit("chat_remove_typing_account_indicator", accountId);
    }
  );
};

module.exports = chatSocket;
