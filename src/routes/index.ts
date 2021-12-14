import { Router } from 'express'
import productosRouter from './productos'

const miRouter = Router();


miRouter.use('/productos', productosRouter)



export default miRouter;