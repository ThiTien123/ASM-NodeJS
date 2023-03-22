import products from "../models/product";
import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
    status: Joi.boolean().required(),
    quality: Joi.number().required(),
})
export const getAll = async (req, res) => {
    try {
        const data = await products.find();
        if(data.length === 0){
            res.status(400).json({
                message: "Khong co san pham nao"
            })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

export const get = async (req, res) => {
    try {
        const data = await products.findOne({_id:req.params.id});
        if(!data){
            res.status(400).json({
                message: "Khong co san pham nao"
            })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.json({
            message: error
        })
    }
}


export const create = async (req, res) => {
    try {
        const body = req.body;
        
        const {error} = productSchema.validate(body);
        if(error){
            const errors = error.details.map((item) => item.message);
            return res.json({
                message: errors,
            })
        }

        const data = await products.create(body);
        if(!data){
            return res.status(400).json({
                message: "Them san pham khong thanh cong"
            })
        }
        return res.status(200).json({
            message: "Them san pham thanh cong",
            data
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

export const remove = async (req, res) => {
    try {
        const product = await products.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xoa thanh cong"
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const body = req.body;

        const data = await products.findByIdAndUpdate({_id:req.params.id}, body, {new:true});
        if(!data){
            res.status(400).json({
                message: "Cap nhat san pham that bai"
            })
        }
        return res.status(200).json({
            message: "Cap nhat san pham thanh cong",
            data
        })
    } catch (error) {
        return res.json({
            message: error
        })
    }
}