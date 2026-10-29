import { AutorController } from "../controllers/AutorController";
import { prompt } from "../utils/prompt";

export class AutorMenu {
    private controller: AutorController;

    constructor(controller: AutorController) {
        this.controller = controller;
    }
    async exibir(): Promise<void> {
        let opcao = "";
        while (opcao !== "0") {

            console.log("\n=== AUTORES ===");
            console.log("1 - Cadastrar autor");
            console.log("2 - Listar autores");
            console.log("3 - Buscar autor por ID");
            console.log("4 - Atualizar autor");
            console.log("5 - Remover autor");
            console.log("0 - Voltar");
            opcao = prompt("Escolha uma opção: ");

            switch (opcao) {

                case "1":
                    await this.controller.cadastrar();
                    break;
                case "2":
                    await this.controller.listar();
                    break;
                case "3":
                    await this.controller.buscar();
                    break;
                case "4":
                    await this.controller.atualizar();
                    break;
                case "5":
                    await this.controller.remover();
                    break;
                case "0":
                    break;
                default:
                    console.log("Opção Inválida.");


            }
        }
    }
}