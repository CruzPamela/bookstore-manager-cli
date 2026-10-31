import { EmprestimoService } from "../services/EmprestimoService";
import { lerNumero } from "../utils/prompt";

export class EmprestimoController {
  private service: EmprestimoService;

  constructor(service: EmprestimoService) {
    this.service = service;
  }

  async realizar(): Promise<void> {
    try {
      const livroId = lerNumero("ID do livro: ");
      const clienteId = lerNumero("ID do cliente: ");
      const emprestimo = await this.service.realizar(livroId, clienteId);
      console.log("Empréstimo registrado com o id " + emprestimo.id + ".");
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }

  async devolver(): Promise<void> {
    try {
      const id = lerNumero("ID do empréstimo: ");
      await this.service.devolver(id);
      console.log("Devolução registrada.");
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }

  async listar(): Promise<void> {
    const emprestimos = await this.service.listar();
    if (emprestimos.length === 0) {
      console.log("Nenhum empréstimo registrado.");
      return;
    }
    for (const emprestimo of emprestimos) {
      const livro = await this.service.nomeDoLivro(emprestimo.livroId);
      const cliente = await this.service.nomeDoCliente(emprestimo.clienteId);
      console.log(
        emprestimo.id + " - Livro: " + livro +
        " | Cliente: " + cliente +
        " | Data: " + emprestimo.dataEmprestimo.toLocaleDateString("pt-BR") +
        " | Status: " + emprestimo.status
      );
    }
  }
}