import { Router } from 'express'
import { checkAdmin} from '../middleware/admin';
import { productosController } from '../controller/productos'
import asyncHandler from 'express-async-handler'
import { ProductValidator } from '../models/products/products.validator';
const miRouter = Router();



miRouter.get(
    '/listar',
    asyncHandler(ProductValidator.hayProductos),
    asyncHandler(productosController.getProducts)
);

miRouter.get(
    '/listar/:id',
    asyncHandler(ProductValidator.hayProductos),
    asyncHandler(ProductValidator.productExists),
    asyncHandler(productosController.getProducts)
);

miRouter.post(
    '/agregar',
    checkAdmin,
    ProductValidator.isAProduct,
    asyncHandler(productosController.addProducts)
);

miRouter.put(
    '/actualizar/:id',
    checkAdmin,
    asyncHandler(ProductValidator.hayProductos),
    asyncHandler(ProductValidator.productExists),
    asyncHandler(ProductValidator.isAValidUpdate),    
    asyncHandler(productosController.updateProducts)
);

miRouter.delete(
    '/borrar/:id',
    checkAdmin,
    asyncHandler(ProductValidator.hayProductos),
    asyncHandler(ProductValidator.productExists),
    asyncHandler(productosController.deleteProducts)
);

export default miRouter;