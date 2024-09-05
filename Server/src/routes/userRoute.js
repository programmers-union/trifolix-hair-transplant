import {Router} from "express";
import { addToCart, getProductData,getCartData, checking,removeFromCart,increaseQuantity, decreaseQuantity } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";



const userRouter=Router();

userRouter.get("/product-data",getProductData);

userRouter.post("/addToCart",authenticate,addToCart);
userRouter.post("/checking",authenticate,checking);
userRouter.get("/cart",authenticate,getCartData);
userRouter.delete("/remove-item",authenticate,removeFromCart);
userRouter.patch('/increase-quantity',authenticate,increaseQuantity);
userRouter.patch('/decrease-quantity',authenticate,decreaseQuantity);
export default userRouter;