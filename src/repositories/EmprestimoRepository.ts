import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
  private emprestimos: Emprestimo[] = [];
  private proximoId: number = 1;

  async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const emprestimo = new Emprestimo(this.proximoId, livroId, clienteId);
    this.proximoId++;
    this.emprestimos.push(emprestimo);
    return emprestimo;
  }

  async listar(): Promise<Emprestimo[]> {
    return this.emprestimos;
  }

  async buscarPorId(id: number): Promise<Emprestimo | undefined> {
    return this.emprestimos.find((emprestimo) => emprestimo.id === id);
  }

  async listarAtivosPorCliente(clienteId: number): Promise<Emprestimo[]> {
    return this.emprestimos.filter((emprestimo) => emprestimo.clienteId === clienteId && emprestimo.status === "ativo");
  }

  async listarAtivosPorLivro(livroId: number): Promise<Emprestimo[]> {
    return this.emprestimos.filter((emprestimo) => emprestimo.livroId === livroId && emprestimo.status === "ativo");
  }

  async registrarDevolucao(id: number): Promise<Emprestimo | undefined> {
    const emprestimo = this.emprestimos.find((emprestimo) => emprestimo.id === id);
    if (emprestimo) {
      emprestimo.status = "devolvido";
      emprestimo.dataDevolucao = new Date();
    }
    return emprestimo;
  }
}