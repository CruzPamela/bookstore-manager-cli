import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor(livroRepository: LivroRepository, autoreRepository: AutorRepository) {
        this.livroRepository = livroRepository;
        this.autorRepository = autoreRepository;
    }

    async cadastrar(
        titulo: string,
        isbn: string,
        anoPublicado: number,
        estado: string,
        autorId: number,
        quantidadeTotal: number
    ): Promise<Livro> {
        if (titulo.trim() === "" || isbn.trim() === "") {
            throw new Error("Titulo e ISBN são obrigatórios.");
        }

        if (estado !== "novo" && estado !== "usado") {
            throw new Error("O estado deve ser novo ou usado.");
        }

        if (anoPublicado <= 0) {
            throw new Error("A de publicação inválido.");
        }

        if (quantidadeTotal <= 0) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        const autor = await this.autorRepository.buscarPorId(autorId);
        if (!autor) {
            throw new Error("Autor " + autorId + " não encontrado.");
        }

        const duplicado = await this.livroRepository.buscarPorIsbnEEstado(isbn.trim(), estado);
        if (duplicado) {
            throw new Error("Já existe um livro com ISBN " + isbn + " no estado" + estado + ".");
        }
         return await this.livroRepository.criar(titulo.trim(), isbn.trim(), anoPublicado, estado, autorId, quantidadeTotal ); 
    }
    
    async buscarPorId(id: number): Promise<Livro> {
        const livro = await this.livroRepository.buscarPorId(id)
        if (!livro) {
            throw new Error("Livro " + id + " não encontrado.");
        }
        return livro;
    }

}