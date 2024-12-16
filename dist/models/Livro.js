"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    constructor(codigo, titulo, autor, disponivel, anodaPublicacao, genero) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
        this.anodaPublicacao = anodaPublicacao;
        this.genero = genero;
    }
}
exports.Livro = Livro;
