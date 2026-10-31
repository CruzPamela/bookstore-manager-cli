import { AutorService } from "../services/AutorService";
import { LivroService } from "../services/LivroService";
import { ClienteService } from "../services/ClienteService";
import { EmprestimoService } from "../services/EmprestimoService";

export async function carregarSeed(
  autorService: AutorService,
  livroService: LivroService,
  clienteService: ClienteService,
  emprestimoService: EmprestimoService
): Promise<void> {
  // Autores (ids 1, 2 e 3)
  await autorService.cadastrar("Helena Duarte", "Brasileira");
  await autorService.cadastrar("Tomás Ferreira", "Portuguesa");
  await autorService.cadastrar("Lucía Romero", "Argentina");

  // Livros (ids 1 a 5)
  await livroService.cadastrar("O Jardim das Horas", "978-0000000001", 2015, "novo", 1, 3);
  await livroService.cadastrar("O Jardim das Horas", "978-0000000001", 2015, "usado", 1, 1);
  await livroService.cadastrar("Mares do Sul", "978-0000000002", 2018, "novo", 2, 2);
  await livroService.cadastrar("Cidade de Vento", "978-0000000003", 2020, "novo", 3, 4);
  await livroService.cadastrar("Noites de Inverno", "978-0000000004", 2012, "usado", 2, 1);

  // Clientes (ids 1, 2 e 3)
  await clienteService.cadastrar("Ana Lima", "ana@exemplo.com", "(48) 90000-0001");
  await clienteService.cadastrar("Bruno Reis", "bruno@exemplo.com", "(48) 90000-0002");
  await clienteService.cadastrar("Carla Souza", "carla@exemplo.com", "(48) 90000-0003");

  // Empréstimos (ids 1 e 2)
  await emprestimoService.realizar(1, 1);
  await emprestimoService.realizar(3, 2);
}