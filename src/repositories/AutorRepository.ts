import { Autor} from"../models/Autor";

export class AutorRepository {
    private autores: Autor [] = [];
    private proximoId: number = 1;

    async criar (nome: string, nacionalidade: string): Promise <Autor> {
        const autor = new Autor(this.proximoId, nome, nacionalidade);
        this.proximoId++;
        this.autores.push(autor);
        return autor;
    }

    async listar (): Promise<Autor[]>{
        return this.autores;
    }

    async buscarPorId(id: number): Promise<Autor | undefined>{
        return this.autores.find((autor) => autor.id === id);

    }
    async atualizar(id: number, nome: string, nacionalidade: string): Promise<Autor | undefined>{
        const autor = this.autores.find((autor) => autor.id ===id);
        if (autor) {
            autor.nome = nome;
            autor.nacionalidade = nacionalidade;
        }
        return autor;
    }

    async remover(id: number): Promise<void> {
        this.autores = this.autores.filter((autor) => autor.id !== id);
    }
}
