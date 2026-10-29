import { AutorService } from "../services/AutorService";
import { prompt, lerNumero } from "../utils/prompt";

export class AutorController {
    private service: AutorService;

    constructor(service: AutorService) {
        this.service = service;
    }

    async cadastrar(): Promise<void> {
        try {
            const nome = prompt("Nome do autor: ");
            const nacionalidade = prompt("Nacionalidade:  ");
            const autor = await this.service.cadastrar(nome, nacionalidade);
            console.log("Autor cadastrado com o id " + autor.id + ".");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }
    async listar(): Promise<void> {
        const autores = await this.service.listar();
        if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
            return;
        }
        for (const autor of autores) {
            console.log(autor.id + " - " + autor.nome + " (" + autor.nacionalidade + ") ");
        }
    }

    async buscar(): Promise<void> {
        try {
            const id = lerNumero("ID do autor: ");
            const autor = await this.service.buscarPorId(id);
            console.log(autor.id + " - " + autor.nome + " (" + autor.nacionalidade + ")");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    async atualizar(): Promise<void> {
        try {
            const id = lerNumero("ID do autor: ");
            const nome = prompt("Novo nome: ");
            const nacionalidade = prompt("Nova nacionalidade: ");
            await this.service.atualizar(id, nome, nacionalidade);
            console.log("Autor atualizado.");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }

    async remover(): Promise<void> {
        try {
            const id = lerNumero("ID do autor: ");
            await this.service.remover(id);
            console.log("Autor removido.");
        } catch (erro) {
            if (erro instanceof Error) {
                console.log("Erro: " + erro.message);
            }
        }
    }
}