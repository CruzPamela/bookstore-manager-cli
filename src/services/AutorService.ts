import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";
import { LivroRepository } from "../repositories/LivroRepository";

export class AutorService {
    private repository: AutorRepository;
    private livroRepository: LivroRepository;

    constructor(repository: AutorRepository, livroRepository: LivroRepository) {
        this.repository = repository;
        this.livroRepository = livroRepository;
    }


    async cadastrar(nome: string, nacionalidade: string): Promise<Autor> {
        if (nome.trim() === "" || nacionalidade.trim() === "") {
            throw new Error("Nome e nacionalidade são obrigatórios.");
        }
        return await this.repository.criar(nome.trim(), nacionalidade.trim());
    }

    async listar(): Promise<Autor[]> {
        return await this.repository.listar();
    }


    async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.repository.buscarPorId(id);
        if (!autor) {
            throw new Error("Autor " + id + " não encontrado.");
        }
        return autor
    }

    async atualizar(id: number, nome: string, nacionalidade: string): Promise<Autor> {
        if (nome.trim() === "" || nacionalidade.trim() === "") {
            throw new Error("Nome e nacionalidade são obrigatórios.");
        }

        const autor = await this.repository.atualizar(id, nome.trim(), nacionalidade.trim());
        if (!autor) {
            throw new Error("Autor " + id + " não encontrado.");
        }
        return autor;
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id);
        const livros = await this.livroRepository.listarPorAutor(id);
        if (livros.length > 0) {
            throw new Error("Não é possível remover: o autor possui livros cadastrados.");
        }
        await this.repository.remover(id);
    }

}