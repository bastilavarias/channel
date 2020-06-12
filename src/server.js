const { serverInstance } = require("./application");

const PORT = 3000 || process.env.PORT;
serverInstance.listen(PORT, () =>
  console.log(`Server is running at PORT:${PORT}`)
);
