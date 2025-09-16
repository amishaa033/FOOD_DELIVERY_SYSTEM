import express from "express";
import { addFood, listfood,removeFood } from "../controller/FoodController.js";
import multer from "multer";
const FoodRouter = express.Router();
//image storage Engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})

FoodRouter.post("/add", upload.single("image"),addFood);
FoodRouter.get("/list",listfood);
FoodRouter.post("/remove",removeFood);


export default FoodRouter;