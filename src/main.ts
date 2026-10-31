import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";
import { AutorService } from "./services/AutorService";
import { LivroService } from "./services/LivroService";
import { ClienteService } from "./services/ClienteService";
import { EmprestimoService } from "./services/EmprestimoService";
import { AutorController } from "./controllers/AutorController";
import { LivroController } from "./controllers/LivroController";
import { ClienteController } from "./controllers/ClienteController";
import { EmprestimoController } from "./controllers/EmprestimoController";
import { AutorMenu } from "./menus/AutorMenu";
import { LivroMenu } from "./menus/LivroMenu";
import { ClienteMenu } from "./menus/ClienteMenu";
import { EmprestimoMenu } from "./menus/EmprestimoMenu";
import { prompt } from "./utils/prompt";

async function main(): Promise<void> {
  // 1. Repositórios (onde os dados ficam guardados)
  const autorRepository = new AutorRepository();
  const livroRepository = new LivroRepository();
  const clienteRepository = new ClienteRepository();
  const emprestimoRepository = new EmprestimoRepository();

  // 2. Services (regras de negócio)
  const autorService = new AutorService(autorRepository, livroRepository);
  const livroService = new LivroService(livroRepository, autorRepository, emprestimoRepository);
  const clienteService = new ClienteService(clienteRepository, emprestimoRepository);
  const emprestimoService = new EmprestimoService(emprestimoRepository, livroRepository, clienteRepository);

  // 3. Controllers (conversa com o usuário)
  const autorController = new AutorController(autorService);
  const livroController = new LivroController(livroService);
  const clienteController = new ClienteController(clienteService);
  const emprestimoController = new EmprestimoController(emprestimoService);

  // 4. Menus
  const autorMenu = new AutorMenu(autorController);
  const livroMenu = new LivroMenu(livroController);
  const clienteMenu = new ClienteMenu(clienteController);
  const emprestimoMenu = new EmprestimoMenu(emprestimoController);

  let opcao = "";
  while (opcao !== "0") {
    console.log("\n=== BOOKSTORE MANAGER ===");
    console.log("1 - Autores");
    console.log("2 - Livros");
    console.log("3 - Clientes");
    console.log("4 - Empréstimos");
    console.log("0 - Encerrar aplicação");
    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await autorMenu.exibir();
        break;
      case "2":
        await livroMenu.exibir();
        break;
      case "3":
        await clienteMenu.exibir();
        break;
      case "4":
        await emprestimoMenu.exibir();
        break;
      case "0":
        console.log("Até logo!");
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}

main();