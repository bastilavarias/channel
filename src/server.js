const { serverInstance } = require("./application");

serverInstance.listen(3000 || process.env.PORT, () =>
  console.log(`Server is running...`)
);
