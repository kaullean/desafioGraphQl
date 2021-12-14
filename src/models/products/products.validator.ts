import { Request, Response, NextFunction, query } from "express";
import { ProductQuery } from "../../models/products/products.interface";
import { productsAPI } from "../../apis/productos";
import Joi from "joi";

class Product {

    isAProduct(req:Request,res:Response,next:NextFunction){
        const ProductSchema =Joi.object().keys({
            nombre: Joi.string().required(),
            descripcion: Joi.string().required() ,
            codigo: Joi.string().required() ,
            fotoUrl: Joi.string().required() ,
            precio: Joi.number().required() ,
            stock:  Joi.number().integer().required(),
        })
        const {error} = ProductSchema.validate(req.body,{convert:false})
        if(error){
            throw error;
        }
        next();
    }
    isAValidUpdate(req:Request,res:Response,next:NextFunction){
      
        const ProductSchema =Joi.object({
            nombre: Joi.string(),
            descripcion: Joi.string(),
            codigo: Joi.string(),
            fotoUrl: Joi.string(),
            precio: Joi.number(),
            stock: Joi.number(),
            })
            const {error} = ProductSchema.validate(req.body,{convert:false})
            if(error){
                throw error;
            }
        next();
    }
    async hayProductos(req: Request, res: Response, next: NextFunction) {
        const productos = await productsAPI.getProducts();

        if (!productos.length) {
        return res.status(404).json({
            msg: "No hay productos cargados en el sistema",
        });
        }
        next();
    }
    async productExists(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const producto = await productsAPI.getProducts(id);
        if (!producto.length) {
        return res.status(404).json({
            msg: "Producto no encontrado",
        });
        }
        next();
    }
}

export const ProductValidator=new Product();