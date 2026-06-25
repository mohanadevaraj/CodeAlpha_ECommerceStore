const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://ecommerceadmin:ecommerce123@ac-z5dygpe-shard-00-00.c6pxojk.mongodb.net:27017,ac-z5dygpe-shard-00-01.c6pxojk.mongodb.net:27017,ac-z5dygpe-shard-00-02.c6pxojk.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-92o1ea-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};

module.exports = connectDB;