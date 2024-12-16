import { Router } from 'express';
import { BibliotecaController } from "../controllers/Biblioteca.controller"

const router = Router();

router.get('/listarLivros', BibliotecaController.listarTodosLivros);

router.post('/addLivro', BibliotecaController.addLivro);

router.put('/atualizarLivro/:codigo', BibliotecaController.atualizarLivro);

router.delete('/excluirLivro/:codigo', BibliotecaController.excluirLivro);

export default router;