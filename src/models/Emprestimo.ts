export type StatusEmprestimo = "ativo" | "devolvido";

export interface IEmprestimo {
  id: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
  status: StatusEmprestimo;
}

export class Emprestimo implements IEmprestimo {
  id: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
  status: StatusEmprestimo;

  constructor(id: number, livroId: number, clienteId: number) {
    this.id = id;
    this.livroId = livroId;
    this.clienteId = clienteId;
    this.dataEmprestimo = new Date();
    this.status = "ativo";
  }
}