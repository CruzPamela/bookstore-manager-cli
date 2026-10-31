import { Cliente } from "../models/Cliente";

export class ClienteRepository {
  private clientes: Cliente[] = [];
  private proximoId: number = 1;

  async criar(nome: string, email: string, telefone: string): Promise<Cliente> {
    const cliente = new Cliente(this.proximoId, nome, email, telefone);
    this.proximoId++;
    this.clientes.push(cliente);
    return cliente;
  }

  async listar(): Promise<Cliente[]> {
    return this.clientes;
  }

  async buscarPorId(id: number): Promise<Cliente | undefined> {
    return this.clientes.find((cliente) => cliente.id === id);
  }

  async buscarPorEmail(email: string): Promise<Cliente | undefined> {
    return this.clientes.find((cliente) => cliente.email === email);
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<Cliente | undefined> {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    if (cliente) {
      cliente.nome = nome;
      cliente.email = email;
      cliente.telefone = telefone;
    }
    return cliente;
  }

  async remover(id: number): Promise<void> {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
  }
}