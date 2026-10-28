import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
    private repository: AutorRepository;

    constructor(repository: AutorRepository) {
        this.repository = repository;
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
        await this.repository.remover(id);
    }

}