// lib/api.js

const BASE_URL = "https://parallelum.com.br/fipe/api/v1";

/**
 * Busca dados da API FIPE.
 * @param {string} path - O caminho do endpoint (ex: "carros/marcas")
 * @returns {Promise<any>} - Os dados da API em JSON.
 * @throws {Error} - Lança um erro se a requisição falhar.
 */
export default async function fetchFipeData(path) {
  const url = `${BASE_URL}/${path}`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      // Tenta ler a mensagem de erro da API, se houver
      const errorData = await res.json().catch(() => null);
      const errorMsg = errorData?.error || `Erro na API: ${res.statusText}`;
      throw new Error(errorMsg);
    }

    return await res.json();

  } catch (error) {
    // Garante que é um objeto Error que está sendo lançado
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro desconhecido ao buscar dados.");
  }
}