import { Cliente } from "../models/Cliente";
import { ClienteService } from "../services/ClienteService";
import { prompt, lerNumero } from "../utils/prompt";

export class ClienteController {
  private service: ClienteService;

  constructor(service: ClienteService) {
    this.service = service;
  }

  private mostrar(cliente: Cliente): void {
    console.log(cliente.id + " - " + cliente.nome + " | E-mail: " + cliente.email + " | Telefone: " + cliente.telefone);
  }

  async cadastrar(): Promise<void> {
    try {
      const nome = prompt("Nome do cliente: ");
      const email = prompt("E-mail: ");
      const telefone = prompt("Telefone: ");
      const cliente = await this.service.cadastrar(nome, email, telefone);
      console.log("Cliente cadastrado com o id " + cliente.id + ".");
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }

  async listar(): Promise<void> {
    const clientes = await this.service.listar();
    if (clientes.length === 0) {
      console.log("Nenhum cliente cadastrado.");
      return;
    }
    for (const cliente of clientes) {
      this.mostrar(cliente);
    }
  }

  async buscar(): Promise<void> {
    try {
      const id = lerNumero("ID do cliente: ");
      const cliente = await this.service.buscarPorId(id);
      this.mostrar(cliente);
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }

  async atualizar(): Promise<void> {
    try {
      const id = lerNumero("ID do cliente: ");
      const nome = prompt("Novo nome: ");
      const email = prompt("Novo e-mail: ");
      const telefone = prompt("Novo telefone: ");
      await this.service.atualizar(id, nome, email, telefone);
      console.log("Cliente atualizado.");
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }

  async remover(): Promise<void> {
    try {
      const id = lerNumero("ID do cliente: ");
      await this.service.remover(id);
      console.log("Cliente removido.");
    } catch (erro) {
      if (erro instanceof Error) {
        console.log("Erro: " + erro.message);
      }
    }
  }
}