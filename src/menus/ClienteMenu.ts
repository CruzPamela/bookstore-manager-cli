import { ClienteController } from "../controllers/ClienteController";
import { prompt } from "../utils/prompt";

export class ClienteMenu {
  private controller: ClienteController;

  constructor(controller: ClienteController) {
    this.controller = controller;
  }

  async exibir(): Promise<void> {
    let opcao = "";
    while (opcao !== "0") {
      console.log("\n=== CLIENTES ===");
      console.log("1 - Cadastrar cliente");
      console.log("2 - Listar clientes");
      console.log("3 - Buscar cliente por ID");
      console.log("4 - Atualizar cliente");
      console.log("5 - Remover cliente");
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
          console.log("Opção inválida.");
      }
    }
  }
}