import { Livro, EstadoLivro } from "../models/Livro";

export class LivroRepository {
  private livros: Livro[] = [];
  private proximoId: number = 1;

  async criar(
    titulo: string,
    isbn: string,
    anoPublicado: number,
    estado: EstadoLivro,
    autorId: number,
    quantidadeTotal: number
  ): Promise<Livro> {
    const livro = new Livro(this.proximoId, titulo, isbn, anoPublicado, estado, autorId, quantidadeTotal);
    this.proximoId++;
    this.livros.push(livro);
    return livro;
  }

  async listar(): Promise<Livro[]> {
    return this.livros;
  }

  async buscarPorId(id: number): Promise<Livro | undefined> {
    return this.livros.find((livro) => livro.id === id);
  }

  async buscarPorIsbnEEstado(isbn: string, estado: EstadoLivro): Promise<Livro | undefined> {
    return this.livros.find((livro) => livro.isbn === isbn && livro.estado === estado);
  }

  async listarPorAutor(autorId: number): Promise<Livro[]> {
    return this.livros.filter((livro) => livro.autorId === autorId);
  }

  async remover(id: number): Promise<void> {
    this.livros = this.livros.filter((livro) => livro.id !== id);
  }

  async atualizar(
    id: number,
    titulo: string,
    anoPublicado: number,
    quantidadeTotal: number,
    quantidadeDisponivel: number
  ): Promise<Livro | undefined> {
    const livro = this.livros.find((livro) => livro.id === id);
    if (livro) {
      livro.titulo = titulo;
      livro.anoPublicado = anoPublicado;
      livro.quantidadeTotal = quantidadeTotal;
      livro.quantidadeDisponivel = quantidadeDisponivel;
    }
    return livro;
  }
}