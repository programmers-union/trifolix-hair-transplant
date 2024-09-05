import mongoose from "mongoose";
 
const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
                
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            itemTotal:{
                type:Number,
                required:true,
                default:0
            }
        }
    ],
    cartTotal:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true});

export default mongoose.model('Cart',cartSchema);