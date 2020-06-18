const { serverInstance } = require("./application");

const PORT = process.env.PORT || 3000;
serverInstance.listen(PORT, () =>
  console.log(`Server is running at PORT ${PORT}`)
);
