import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export class ClienteService {
    private repository: ClienteRepository;
    private emprestimoRepository: EmprestimoRepository;

    constructor(repository: ClienteRepository, emprestimoRepository: EmprestimoRepository) {
        this.repository = repository;
        this.emprestimoRepository = emprestimoRepository;
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
        const ativos = await this.emprestimoRepository.listarAtivosPorCliente(id);
        if (ativos.length > 0) {
            throw new Error("Não é possível remover: o cliente tem empréstimo ativo.");
        }
        await this.repository.remover(id);
    }
}