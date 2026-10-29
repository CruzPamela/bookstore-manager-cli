import promptSync from "prompt-sync";
export const prompt = promptSync();

export function lerNumero(texto: string): number {
  const numero = Number(prompt(texto));
  if (isNaN(numero)) {
    throw new Error("Digite um número válido.");
  }
  return numero;
}