import { buildSchema,GraphQLInputObjectType,GraphQLInt,GraphQLString } from "graphql"
import { newProduct } from "../models/products/products.interface"
import { addProducts,getProducts,deleteProducts,updateProducts,getProductsById } from "../controller/productosGraphql"
const newProductDetailsInput = new GraphQLInputObjectType({
    name: 'newProductDetailsInput',
    fields: () => ({
        descripcion: { type: GraphQLString },
        codigo: { type: GraphQLString },
        fotoUrl: { type: GraphQLString },
        precio:{ type: GraphQLInt }, 
        stock: { type: GraphQLInt }
    })
  });
export const graphqlSchema = buildSchema(`       
        type Producto {
            _id: String
            timestamp: Int
            nombre: String
            descripcion: String
            codigo: String
            fotoUrl: String
            precio: Int
            stock: Int
        },
        type Mutation{
            addProducts(nombre: String!,
                descripcion: String!,
                codigo: String!,
                fotoUrl: String!,
                precio: Int!,
                stock: Int! ):Producto,
            updateProducts(nombre: String!,
                descripcion: String!,
                codigo: String!,
                fotoUrl: String!,
                precio: Int!,
                stock: Int!,
                id:String! ):Producto,
                deleteProducts(id:String!):Producto,
            
        },
        type Query {
            getProducts: [Producto],
            getProductsById(id:String!): Producto,
        }
        
      
      `)

export const graphqlRoot={
    getProducts,
    getProductsById,
    addProducts,
    updateProducts,
   deleteProducts,
}