import {Router} from 'express';
import imagemController from '../controller/imagemController.js';
const imagemRoutes = Router();

imagemRoutes.get('/:id', imagemController.listar);

export default imagemRoutes;