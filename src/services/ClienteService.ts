import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private repository: ClienteRepository;

  constructor(repository: ClienteRepository) {
    this.repository = repository;
  }

  private validar(nome: string, email: string, telefone: string): void {
    if (nome.trim() === "" || email.trim() === "" || telefone.trim() === "") {
      throw new Error("Nome, e-mail e telefone são obrigatórios.");
    }
    if (!email.includes("@")) {
      throw new Error("E-mail inválido.");
    }
  }

  async cadastrar(nome: string, email: string, telefone: string): Promise<Cliente> {
    this.validar(nome, email, telefone);
    const existente = await this.repository.buscarPorEmail(email.trim());
    if (existente) {
      throw new Error("Já existe um cliente com o e-mail " + email.trim() + ".");
    }
    return await this.repository.criar(nome.trim(), email.trim(), telefone.trim());
  }

  async listar(): Promise<Cliente[]> {
    return await this.repository.listar();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.repository.buscarPorId(id);
    if (!cliente) {
      throw new Error("Cliente " + id + " não encontrado.");
    }
    return cliente;
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<Cliente> {
    const cliente = await this.buscarPorId(id);
    this.validar(nome, email, telefone);
    const existente = await this.repository.buscarPorEmail(email.trim());
    if (existente && existente.id !== id) {
      throw new Error("Já existe um cliente com o e-mail " + email.trim() + ".");
    }
    await this.repository.atualizar(id, nome.trim(), email.trim(), telefone.trim());
    return cliente;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.repository.remover(id);
  }
}