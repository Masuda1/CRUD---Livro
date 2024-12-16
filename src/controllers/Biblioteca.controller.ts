import { Biblioteca } from "../models/Biblioteca";
import { Livro } from "../models/Livro";
import { Request, Response } from "express";

const biblioteca = new Biblioteca();

export const BibliotecaController = {

    // LISTAR LIVROS DO ACERVO
    listarTodosLivros: async (req: Request, res: Response): Promise<void> => {
        try {
            const listarLivros = await biblioteca.listarTodosLivros();
            if (listarLivros.length > 0) {
                res.status(200).json({ message: 'Livros do Acervo:', listarLivros });
            } else {
                res.status(409).json({ message: 'Acervo vazio' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
        }
    },
    
    // ADICIONAR LIVROS
    addLivro: async (req: Request, res: Response): Promise<void> => {
        try {

            const { codigo, titulo, autor, disponivel, anodaPublicacao, genero } = req.body;

            if (!codigo || !titulo || !autor || !anodaPublicacao || genero === undefined) {
                res.status(400).json({
                    message: 'Todos os campos obrigatórios devem ser preenchidos: codigo, titulo, autor, anodaPublicacao, genero',
                });
                return;
            }

            const livro = new Livro(
                Number(codigo),
                titulo,
                autor,
                Boolean(disponivel),
                Number(anodaPublicacao),
                genero
            );

            const added = await biblioteca.addLivro(livro);

            if (added) {
                res.status(201).json({ message: 'Livro adicionado com sucesso', livro: `${livro.titulo}` });
            } else {
                res.status(409).json({ message: 'Livro já existe', livro: `${livro.titulo}` });
            }
            return;
        } catch (error) {
            res.status(500).send("erro ao adicionar livro");
        }
    },
    
    // ATUALIZAR DADOS DO LIVRO
    atualizarLivro: async (req: Request, res: Response): Promise<void> => {
        const codigo = parseInt(req.params.codigo);

        if (isNaN(codigo)) {
            res.status(400).json({ message: 'Código inválido.' });
            return;
        }

        const { titulo, autor, disponivel, anodaPublicacao, genero } = req.body;

        const atualizaLivro: Partial<Livro> = {};
        if (titulo !== undefined) atualizaLivro.titulo = titulo;
        if (autor !== undefined) atualizaLivro.autor = autor;
        if (disponivel !== undefined) atualizaLivro.disponivel = disponivel;
        if (anodaPublicacao !== undefined) atualizaLivro.anodaPublicacao = anodaPublicacao;
        if (genero !== undefined) atualizaLivro.genero = genero;

        try {
            const atualiza = await biblioteca.atualizarLivro(codigo, atualizaLivro);

            if (atualiza) {
                res.status(200).json({ message: 'Livro atualizado com sucesso.', codigo });
            } else {
                res.status(404).json({ message: 'Livro não encontrado.', codigo });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    },

    // REMOVER LIVRO DO ACERVO
    excluirLivro: async (req: Request, res: Response): Promise<void> => {
        const codigo = parseInt(req.params.codigo);

        if (isNaN(codigo)) {
            res.status(400).json({ message: 'Código inválido.', codigo: codigo});
            return;
        }

        try {
            const removed = await biblioteca.excluirLivro(codigo);

            if (removed) {
                res.status(200).json({ message: 'Livro excluído com sucesso.', codigo });
            } else {
                res.status(404).json({ message: 'Livro não encontrado.', codigo });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    },
}