const roomController = require("./controller");

const roomSocket = (io, socket) => {
  socket.on("room_join", async (roomId) => {
    socket.join(roomId);
    const roomMembers = await roomController.getMembers(roomId);
    io.emit("room_members", roomMembers);
  });

  socket.on("room_joined", async (accountId) => {
    const gotJoinedRooms = await roomController.getJoined(accountId);
    // console.log(gotJoinedRooms);
  });
};

module.exports = roomSocket;
