import { LivroController } from "../controllers/LivroController";
import { prompt } from "../utils/prompt";

export class LivroMenu {
  private controller: LivroController;

  constructor(controller: LivroController) {
    this.controller = controller;
  }

  async exibir(): Promise<void> {
    let opcao = "";
    while (opcao !== "0") {
      console.log("\n=== LIVROS ===");
      console.log("1 - Cadastrar livro");
      console.log("2 - Listar livros");
      console.log("3 - Buscar livro por ID");
      console.log("4 - Atualizar livro");
      console.log("5 - Remover livro");
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