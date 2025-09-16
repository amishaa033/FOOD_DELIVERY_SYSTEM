import express from "express"
import authMiddleware from "../middleware/auth.js";
import { ListOrders, placeOrder, updateStatus, usersOrders, verifyOrder } from "../controller/orderController.js";

const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,usersOrders);
orderRouter.get("/list",ListOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;