export class Livro {
  codigo: number;
  titulo: string;
  autor: string;
  disponivel: boolean;
  anodaPublicacao: number;
  genero: string;

  constructor(codigo: number, titulo: string, autor: string, disponivel: boolean, anodaPublicacao: number, genero: string) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = disponivel;
    this.anodaPublicacao = anodaPublicacao;
    this.genero = genero;
  }
}
