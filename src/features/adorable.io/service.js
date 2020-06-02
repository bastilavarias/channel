const adorableIOService = {
  generateAvatarUrl: () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(100));
    return `https://api.adorable.io/avatars/285/avatar${randomNumber}@adorable.io.png`;
  },
};

module.exports = adorableIOService;
