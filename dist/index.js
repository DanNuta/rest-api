import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/posts.js";
const app = express();
app.use(express.json());
//router
app.get("/", (req, res) => {
    res.send("Home page");
});
app.use("/posts", router);
//conect to db
mongoose.connect("mongodb+srv://danycondurari:fp4vN37MgUS3U9Zq@cluster0.zdsjuw6.mongodb.net");
//listen
app.listen(4000, () => console.log("aplicatia sa pornit cu succes"));
//# sourceMappingURL=index.js.map