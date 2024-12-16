"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibliotecaController = void 0;
const Biblioteca_1 = require("../models/Biblioteca");
const Livro_1 = require("../models/Livro");
const biblioteca = new Biblioteca_1.Biblioteca();
exports.BibliotecaController = {
    // LISTAR LIVROS DO ACERVO
    listarTodosLivros: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const listarLivros = yield biblioteca.listarTodosLivros();
            if (listarLivros.length > 0) {
                res.status(200).json({ message: 'Livros do Acervo:', listarLivros });
            }
            else {
                res.status(409).json({ message: 'Acervo vazio' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
        }
    }),
    // ADICIONAR LIVROS
    addLivro: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { codigo, titulo, autor, disponivel, anodaPublicacao, genero } = req.body;
            if (!codigo || !titulo || !autor || !anodaPublicacao || genero === undefined) {
                res.status(400).json({
                    message: 'Todos os campos obrigatórios devem ser preenchidos: codigo, titulo, autor, anodaPublicacao, genero',
                });
                return;
            }
            const livro = new Livro_1.Livro(Number(codigo), titulo, autor, Boolean(disponivel), Number(anodaPublicacao), genero);
            const added = yield biblioteca.addLivro(livro);
            if (added) {
                res.status(201).json({ message: 'Livro adicionado com sucesso', livro: `${livro.titulo}` });
            }
            else {
                res.status(409).json({ message: 'Livro já existe', livro: `${livro.titulo}` });
            }
            return;
        }
        catch (error) {
            res.status(500).send("erro ao adicionar livro");
        }
    }),
    // ATUALIZAR DADOS DO LIVRO
    atualizarLivro: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const codigo = parseInt(req.params.codigo);
        if (isNaN(codigo)) {
            res.status(400).json({ message: 'Código inválido.' });
            return;
        }
        const { titulo, autor, disponivel, anodaPublicacao, genero } = req.body;
        const atualizaLivro = {};
        if (titulo !== undefined)
            atualizaLivro.titulo = titulo;
        if (autor !== undefined)
            atualizaLivro.autor = autor;
        if (disponivel !== undefined)
            atualizaLivro.disponivel = disponivel;
        if (anodaPublicacao !== undefined)
            atualizaLivro.anodaPublicacao = anodaPublicacao;
        if (genero !== undefined)
            atualizaLivro.genero = genero;
        try {
            const atualiza = yield biblioteca.atualizarLivro(codigo, atualizaLivro);
            if (atualiza) {
                res.status(200).json({ message: 'Livro atualizado com sucesso.', codigo });
            }
            else {
                res.status(404).json({ message: 'Livro não encontrado.', codigo });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }),
    // REMOVER LIVRO DO ACERVO
    excluirLivro: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const codigo = parseInt(req.params.codigo);
        if (isNaN(codigo)) {
            res.status(400).json({ message: 'Código inválido.', codigo: codigo });
            return;
        }
        try {
            const removed = yield biblioteca.excluirLivro(codigo);
            if (removed) {
                res.status(200).json({ message: 'Livro excluído com sucesso.', codigo });
            }
            else {
                res.status(404).json({ message: 'Livro não encontrado.', codigo });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
        }
    }),
};
