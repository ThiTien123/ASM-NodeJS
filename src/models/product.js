import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    status: Boolean,
    quality: Number,
})

export default mongoose.model("products", productSchema)