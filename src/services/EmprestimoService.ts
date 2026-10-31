import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;
  private livroRepository: LivroRepository;
  private clienteRepository: ClienteRepository;

  constructor(emprestimoRepository: EmprestimoRepository, livroRepository: LivroRepository, clienteRepository: ClienteRepository) {
    this.emprestimoRepository = emprestimoRepository;
    this.livroRepository = livroRepository;
    this.clienteRepository = clienteRepository;
  }

  async realizar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      throw new Error("Livro " + livroId + " não encontrado.");
    }
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error("Cliente " + clienteId + " não encontrado.");
    }
    if (livro.quantidadeDisponivel <= 0) {
      throw new Error("O livro " + livro.titulo + " não tem exemplares disponíveis.");
    }
    const ativos = await this.emprestimoRepository.listarAtivosPorCliente(clienteId);
    if (ativos.length >= 2) {
      throw new Error("O cliente " + cliente.nome + " já tem 2 empréstimos ativos (limite máximo).");
    }
    await this.livroRepository.atualizar(livro.id, livro.titulo, livro.anoPublicado, livro.quantidadeTotal, livro.quantidadeDisponivel - 1);
    return await this.emprestimoRepository.criar(livroId, clienteId);
  }

  async devolver(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new Error("Empréstimo " + id + " não encontrado.");
    }
    if (emprestimo.status === "devolvido") {
      throw new Error("O empréstimo " + id + " já foi devolvido.");
    }
    await this.emprestimoRepository.registrarDevolucao(id);
    const livro = await this.livroRepository.buscarPorId(emprestimo.livroId);
    if (livro) {
      await this.livroRepository.atualizar(livro.id, livro.titulo, livro.anoPublicado, livro.quantidadeTotal, livro.quantidadeDisponivel + 1);
    }
    return emprestimo;
  }

  async listar(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.listar();
  }

  async nomeDoLivro(livroId: number): Promise<string> {
    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      return "(livro removido)";
    }
    return livro.titulo;
  }

  async nomeDoCliente(clienteId: number): Promise<string> {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      return "(cliente removido)";
    }
    return cliente.nome;
  }
}