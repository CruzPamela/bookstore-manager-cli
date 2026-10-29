import { AutorRepository } from "./repositories/AutorRepository";
import { AutorService } from "./services/AutorService";
import { AutorController } from "./controllers/AutorController";
import { AutorMenu } from "./menus/AutorMenu";
import { prompt } from "./utils/prompt";

async function main(): Promise<void> {

    const autorRepository = new AutorRepository();
    const autorService = new AutorService(autorRepository);
    const autorController = new AutorController(autorService);
    const autorMenu = new AutorMenu(autorController);

    let opcao = "";
    while (opcao !== "0") {
        console.log("\n=== BOOKSTORE MANAGER ===");
        console.log("1 - Autores");
        console.log("0 - Encerrar aplicação");
        opcao = prompt("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await autorMenu.exibir();
                break;
            case "0":
                console.log("Até logo!");
                break
            default:
                console.log("Opção inválida.");
        }

    }

}

main();