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
exports.Biblioteca = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Biblioteca {
    // Método para retornar todos os livros do acervo ordenados por codigo
    listarTodosLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listarLivros = yield prisma.livro.findMany();
                if (listarLivros.length > 0) {
                    console.log(`Livros do acervo ....: ${listarLivros.length} Livros`);
                    return listarLivros;
                }
                else {
                    console.log(`Acervo vazio`);
                    return [];
                }
            }
            catch (error) {
                console.error(`Erro ao buscar livros: ${error.message}`);
                return [];
            }
        });
    }
    addLivro(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield prisma.livro.findUnique({ where: { codigo: livro.codigo } });
                if (!exists) {
                    if (!livro.disponivel) {
                        livro.disponivel = true;
                    }
                    yield prisma.livro.create({ data: livro });
                    console.log(`Livro adicionado.....: ${livro.titulo}`);
                    return true;
                }
                else {
                    console.log(`Livro já existe......: ${livro.titulo}`);
                    return false;
                }
            }
            catch (error) {
                console.error(`Erro ao adicionar livro: ${error.message}`);
                return false;
            }
        });
    }
    // Método para atualizar os dados de um livro
    atualizarLivro(codigo, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield prisma.livro.findUnique({ where: { codigo } });
                if (!livro) {
                    console.log(`Livro não encontrado.: ${codigo} `);
                    return false;
                }
                yield prisma.livro.update({
                    where: { codigo },
                    data: updatedData,
                });
                console.log(`Livro atualizado.....: ${codigo}`);
                return true;
            }
            catch (error) {
                console.error(`Erro ao atualizar livro: ${error.message}`);
                return false;
            }
        });
    }
    // Método para remover um livro pelo código
    excluirLivro(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield prisma.livro.findUnique({ where: { codigo } });
                if (!livro) {
                    console.log(`Livro não encontrado.: ${codigo} `);
                    return false;
                }
                yield prisma.livro.delete({ where: { codigo } });
                console.log(`Livro excluído.......: ${livro.titulo}`);
                return true;
            }
            catch (error) {
                console.error(`Erro ao remover livro: ${error.message}`);
                return false;
            }
        });
    }
}
exports.Biblioteca = Biblioteca;
