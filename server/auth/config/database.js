const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("База данных подключена");
    })
    .catch((error) => {
      console.log("Ошибка подключения к базе данных");
      console.error(error);
      process.exit(1);
    });
};
