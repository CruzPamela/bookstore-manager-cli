import { EmprestimoController } from "../controllers/EmprestimoController";
import { prompt } from "../utils/prompt";

export class EmprestimoMenu {
  private controller: EmprestimoController;

  constructor(controller: EmprestimoController) {
    this.controller = controller;
  }

  async exibir(): Promise<void> {
    let opcao = "";
    while (opcao !== "0") {
      console.log("\n=== EMPRÉSTIMOS ===");
      console.log("1 - Realizar empréstimo");
      console.log("2 - Registrar devolução");
      console.log("3 - Listar empréstimos");
      console.log("0 - Voltar");
      opcao = prompt("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await this.controller.realizar();
          break;
        case "2":
          await this.controller.devolver();
          break;
        case "3":
          await this.controller.listar();
          break;
        case "0":
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }
}