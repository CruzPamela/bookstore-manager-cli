import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;
    private emprestimoRepository: EmprestimoRepository;

    constructor(livroRepository: LivroRepository, autorRepository: AutorRepository, emprestimoRepository: EmprestimoRepository) {
        this.livroRepository = livroRepository;
        this.autorRepository = autorRepository;
        this.emprestimoRepository = emprestimoRepository;
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
            throw new Error("Título e ISBN são obrigatórios.");
        }

        if (estado !== "novo" && estado !== "usado") {
            throw new Error("O estado deve ser novo ou usado.");
        }

        if (anoPublicado <= 0) {
            throw new Error("Ano de publicação inválido.");
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
            throw new Error("Já existe um livro com ISBN " + isbn + " no estado " + estado + ".");
        }
        return await this.livroRepository.criar(titulo.trim(), isbn.trim(), anoPublicado, estado, autorId, quantidadeTotal);
    }

    async buscarPorId(id: number): Promise<Livro> {
        const livro = await this.livroRepository.buscarPorId(id)
        if (!livro) {
            throw new Error("Livro " + id + " não encontrado.");
        }
        return livro;
    }

    async atualizar(id: number, titulo: string, anoPublicado: number, quantidadeTotal: number): Promise<Livro> {
        const livro = await this.buscarPorId(id);
        if (titulo.trim() === "") {
            throw new Error("O título é obrigatório.");
        }
        if (anoPublicado <= 0) {
            throw new Error("Ano de publicação inválido.");
        }
        const emprestados = livro.quantidadeTotal - livro.quantidadeDisponivel;
        if (quantidadeTotal < emprestados || quantidadeTotal <= 0) {
            throw new Error("A quantidade deve ser maior que zero e não pode ser menor que os exemplares emprestados (" + emprestados + ").");
        }
        const novaDisponivel = quantidadeTotal - emprestados;
        await this.livroRepository.atualizar(id, titulo.trim(), anoPublicado, quantidadeTotal, novaDisponivel);
        return livro;
    }
    async listar(): Promise<Livro[]> {
        return this.livroRepository.listar();
    }

      async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const ativos = await this.emprestimoRepository.listarAtivosPorLivro(id);
    if (ativos.length > 0) {
      throw new Error("Não é possível remover: o livro está em empréstimo.");
    }
    await this.livroRepository.remover(id);
  }

}