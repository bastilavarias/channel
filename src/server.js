const server = require("./application");

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));
