export type EstadoLivro = "novo" | "usado";

export interface ILivro{
    id: number;
    titulo: string;
    isbn: string;
    anoPublicado: number;
    estado: EstadoLivro;
    autorId: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}

export class Livro implements ILivro {
    id: number;
    titulo: string;
    isbn: string;
    anoPublicado: number;
    estado: EstadoLivro;
    autorId: number;
    quantidadeTotal: number;
    quantidadeDisponivel: number;

    constructor(
        id: number,
    titulo: string,
    isbn: string,
    anoPublicado: number,
    estado: EstadoLivro,
    autorId: number,
    quantidadeTotal: number
    ){
        this.id = id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.anoPublicado = anoPublicado;
        this.estado = estado;
        this.autorId = autorId;
        this.quantidadeTotal = quantidadeTotal;
        this.quantidadeDisponivel = quantidadeTotal;
    }
}