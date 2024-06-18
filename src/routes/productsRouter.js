import { Router } from 'express';
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct  } from '../controllers/productsController.js';
import { HttpStatus } from '../constants/httpStatusCodes.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const {limit} = req.query;
   
    try {
        const allProducts = await getProducts()

        if(limit) {
            const limitProducts = [...allProducts.slice(0, limit)]
            res.status(HttpStatus.OK).json(limitProducts)
        } else{
            res.status(HttpStatus.OK).json(allProducts)
        }
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({error: error.message})
    }
});

productsRouter.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    
    try {
        const productById = await getProductById(pid);
        res.status(HttpStatus.OK).json(productById);
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({error: error.message})
    }
  
});


productsRouter.post('/', async(req, res) => {   
    try {
        const addProduct = await postProduct(req.body);
        res.status(HttpStatus.CREATED).json(addProduct);
    } catch (error) {
        console.error(error); 
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
})

productsRouter.put('/:pid', async(req, res) => {
    const {pid} = req.params;
    const updatedFields = req.body

    try {
        const productById = await updateProduct( updatedFields,pid);
        res.status(HttpStatus.OK).json(productById);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})


productsRouter.delete('/:pid', async(req, res) => {
    const {pid} = req.params;
    const id = parseInt(pid)

    try {
        const productById = await deleteProduct(id);
        res.status(HttpStatus.OK).json(productById);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})


export default productsRouter;