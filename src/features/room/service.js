const roomService = {
  create: ({ name, description, type, password, accountId }) => {
    console.log({ name, description, type, password, accountId });
  },
};

module.exports = roomService;
