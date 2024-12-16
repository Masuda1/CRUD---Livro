import { PrismaClient } from '@prisma/client';
import { Livro } from './Livro';

const prisma = new PrismaClient();

export class Biblioteca {
    
    // Método para retornar todos os livros do acervo ordenados por codigo
    public async listarTodosLivros(): Promise<Array<Livro>> {
        try {
            const listarLivros = await prisma.livro.findMany();

            if (listarLivros.length > 0) {
                console.log(`Livros do acervo ....: ${listarLivros.length} Livros`);
                return listarLivros;
            } else {
                console.log(`Acervo vazio`);
                return [];
            }
        } catch (error: any) {
            console.error(`Erro ao buscar livros: ${error.message}`);
            return [];
        }
    }
    
    public async addLivro(livro: Livro): Promise<boolean> {

        try {

            const exists = await prisma.livro.findUnique({ where: { codigo: livro.codigo } });
            if (!exists) {
                
                if(!livro.disponivel){
                    livro.disponivel = true;
                }

                await prisma.livro.create({ data: livro });

                console.log(`Livro adicionado.....: ${livro.titulo}`);
                return true;
            } else {
                console.log(`Livro já existe......: ${livro.titulo}`);
                return false;
            }
           
        } catch (error: any) {
            console.error(`Erro ao adicionar livro: ${error.message}`);
            return false;
        }
    }

    // Método para atualizar os dados de um livro
    public async atualizarLivro(codigo: number, updatedData: Partial<Livro>): Promise<boolean> {
        try {
            const livro = await prisma.livro.findUnique({ where: { codigo } });

            if (!livro) {
                console.log(`Livro não encontrado.: ${codigo} `);
                return false;
            }

            await prisma.livro.update({
                where: { codigo },
                data: updatedData,
            });

            console.log(`Livro atualizado.....: ${codigo}`);
            return true;
        } catch (error: any) {
            console.error(`Erro ao atualizar livro: ${error.message}`);
            return false;
        }
    }

    // Método para remover um livro pelo código
    async excluirLivro(codigo: number): Promise<boolean> {

        try {
            const livro = await prisma.livro.findUnique({ where: { codigo } });
            
            if (!livro) {
                console.log(`Livro não encontrado.: ${codigo} `);
                return false;
            }

            await prisma.livro.delete({ where: { codigo } });
            console.log(`Livro excluído.......: ${livro.titulo}`);
            return true;

        } catch (error: any) {
            console.error(`Erro ao remover livro: ${error.message}`);
            return false;
        }
    }
}
