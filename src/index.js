import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/dbconnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();


// configurations------------
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({
  limit: "16kb"
}));

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}));

app.use(express.static("public"));
app.use(cookieParser());




connectDB().then(
  app.listen(process.env.PORT || 8000, () => { console.log(`app is listening on post ${process.env.PORT}`) })
).catch((error) => { console.log("Db connection fail") })





























// -----------------method 1----------------
// ; (async () => {
//   try {
//     await mongoose.connect(`${process.env.DBURL}${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("Error :", error)
//       throw error
//     })

//     app.listen(process.env.PORT, () => { console.log(`app is listening on post ${process.env.PORT}`) })
//   } catch (error) {
//     console.error("Error :", error)
//     throw error
//   }


// })()