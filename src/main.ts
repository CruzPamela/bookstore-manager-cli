import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { AutorService } from "./services/AutorService";
import { AutorController } from "./controllers/AutorController";
import { AutorMenu } from "./menus/AutorMenu";
import { prompt } from "./utils/prompt";
import { LivroService } from "./services/LivroService";
import { LivroController } from "./controllers/LivroController";
import { LivroMenu } from "./menus/LivroMenu";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { ClienteService } from "./services/ClienteService";
import { ClienteController } from "./controllers/ClienteController";
import { ClienteMenu } from "./menus/ClienteMenu";

async function main(): Promise<void> {
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const autorService = new AutorService(autorRepository, livroRepository);
    const autorController = new AutorController(autorService);
    const autorMenu = new AutorMenu(autorController);
    const livroService = new LivroService(livroRepository, autorRepository);
    const livroController = new LivroController(livroService);
    const livroMenu = new LivroMenu(livroController);
    const clienteRepository = new ClienteRepository();
    const clienteService = new ClienteService(clienteRepository);
    const clienteController = new ClienteController(clienteService);
    const clienteMenu = new ClienteMenu(clienteController);

    let opcao = "";
    while (opcao !== "0") {
        console.log("\n=== BOOKSTORE MANAGER ===");
        console.log("1 - Autores");
        console.log("2 - Livros");
        console.log("3 - Clientes");
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
            case "0":
                console.log("Até logo!");
                break;
            default:
                console.log("Opção inválida.");
        }

    }

}

main();