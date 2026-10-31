import { Livro } from "../models/Livro";
import { LivroService } from "../services/LivroService";
import { prompt, lerNumero } from "../utils/prompt";

export class LivroController {
    private service: LivroService;

    constructor(service: LivroService) {
        this.service = service;
    }

    private mostrar(livro: Livro): void {
        console.log(
            livro.id + " - " + livro.titulo +
            " | ISBN: " + livro.isbn +
            " | Ano: " + livro.anoPublicado +
            " | Estado: " + livro.estado +
            " | Autor ID: " + livro.autorId +
            " | Disponíveis: " + livro.quantidadeDisponivel + "/" + livro.quantidadeTotal
        );
    }

    async cadastrar(): Promise<void> {
        try {
            const titulo = prompt("Título: ");
            const isbn = prompt("ISBN: ");
            const anoPublicado = lerNumero("Ano de publicação: ");
            const estado = prompt("Estado (novo/usado): ");
            const autorId = lerNumero("ID do autor: ");
            const quantidadeTotal = lerNumero("Quantidade de exemplares: ");
            const livro = await this.service.cadastrar(titulo, isbn, anoPublicado, estado, autorId, quantidadeTotal);
            console.log("Livro cadastrado com o id " + livro.id + ".");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    async listar(): Promise<void> {
        const livros = await this.service.listar();
        if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
        }
        for (const livro of livros) {
            this.mostrar(livro);
        }
    }

    async buscar(): Promise<void> {
        try {
            const id = lerNumero("ID do livro: ");
            const livro = await this.service.buscarPorId(id);
            this.mostrar(livro);
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    async atualizar(): Promise<void> {
        try {
            const id = lerNumero("ID do livro: ");
            const titulo = prompt("Novo título: ");
            const anoPublicado = lerNumero("Novo ano de publicação: ");
            const quantidadeTotal = lerNumero("Nova quantidade de exemplares: ");
            await this.service.atualizar(id, titulo, anoPublicado, quantidadeTotal);
            console.log("Livro atualizado.");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    async remover(): Promise<void> {
        try {
            const id = lerNumero("ID do livro: ");
            await this.service.remover(id);
            console.log("Livro removido.");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }
}