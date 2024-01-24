import dotenv from "dotenv";
import connectDB from "./db/dbconnection.js";
import { app } from "./app.js";


dotenv.config();








connectDB().then(
  app.listen(process.env.PORT || 8000, () => { console.log(`App  listening | PORT :  ${process.env.PORT}`) })
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