import { productsAPI } from '../apis/productos'
import { newProduct,Product } from '../models/products/products.interface';
import { buildSchema,GraphQLInputObjectType,GraphQLInt,GraphQLString } from "graphql"

  /*
  Obtiene desde la persistancia de productos el producto que coincide con el id o, si no se pasa un producto por params
  responde con todo el array de los mismos
  */
export const getProducts = async () =>{ 
/*   
    {
        getProducts
            {
                _id, 
                nombre,
                precio 
            }
    }
*/   
    return await productsAPI.getProducts()  
};
export const getProductsById = async (id:string) =>{ 
/*   
    {
        getProducts(id:"2")
            {
                _id, 
                nombre,
                precio 
            }
    }
*/  
    let obj=JSON.parse(JSON.stringify(id));    
    let data=await productsAPI.getProducts(obj.id)    
    return data[0];    
};
  /*
    persiste el archivo enviado en el array de productos del sistema
  */

export const addProducts = async (prod:newProduct)=> {
/*   
    mutation{
        addProducts( 
            nombre:"agregadoGrap",
                descripcion:"agregadoGrap",
            codigo:"agregadoGrap",
            fotoUrl:"agregadoGrap",
            precio:9,
            stock:9)
            {
                _id, 
                nombre,
                precio 
            }
}
*/
    return await productsAPI.addProduct(prod);
}
  /*
    Actualiza el producto de la base de datos que corresponde al id enviado
  */ 

export const updateProducts = async (args:string)=> {
/*
    mutation{   
        updateProducts( id:"3",
            nombre:"agregadoGrap",
                descripcion:"agregadoGrap",
            codigo:"agregadoGrap",
            fotoUrl:"agregadoGrap",
            precio:9,
            stock:9)
            {
                _id, 
                nombre,
                precio 
            }
} 
*/ 
    let obj=JSON.parse(JSON.stringify(args));   
    let objN={
        nombre:obj.nombre,
        descripcion:obj.descripcion,
        codigo:obj.codigo,
        fotoUrl:obj.fotoUrl,
        precio:obj.precio,
        stock:obj.stock,
    };      
    const updatedProduct= await productsAPI.updateProduct(obj.id, objN)
    
    return updatedProduct;
}
  /*
    Elmina el producto de la base de datos que corresponde al id enviado
  */ 


export const deleteProducts = async (args: string) => {
/*
    mutation{ 
    deleteProducts( id:"1")
    {
        _id, 
        nombre,
        precio 
    }
} 
*/ 
    let obj=JSON.parse(JSON.stringify(args));
    const deletedProduct=await productsAPI.deleteProduct(obj.id);
    return deletedProduct;
   
  }
