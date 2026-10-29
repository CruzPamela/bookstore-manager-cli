import { AutorService } from "../services/AutorService";
import { prompt } from "../utils/prompt";

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
}