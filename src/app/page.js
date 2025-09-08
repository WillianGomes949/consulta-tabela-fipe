"use client";
import { useState, useEffect } from "react";

const BASE_URL = "https://parallelum.com.br/fipe/api/v1";

export default function Home() {
  const [mounted, setMounted] = useState(false); // garante renderização client-side
  const [theme, setTheme] = useState("light");
  const [vehicleType, setVehicleType] = useState(null);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({ brand: "", model: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Detecta tema do navegador no client-side
  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Atualiza classe no <html> sempre que o tema muda
  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // Funções de fetch e reset
  async function fetchData(url, setter) {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro na API");
      const data = await res.json();
      setter(data.modelos || data);
    } catch {
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function reset(level) {
    if (level === 1) {
      setForm({ brand: "", model: "", year: "" });
      setBrands([]);
      setModels([]);
      setYears([]);
    } else if (level === 2) {
      setForm((f) => ({ ...f, model: "", year: "" }));
      setModels([]);
      setYears([]);
    } else if (level === 3) {
      setForm((f) => ({ ...f, year: "" }));
      setYears([]);
    }
    setResult(null);
    setIsModalOpen(false);
  }

  async function handleFetchBrands(type) {
    reset(1);
    setVehicleType(type);
    await fetchData(`${BASE_URL}/${type}/marcas`, setBrands);
  }

  async function handleFetchModels(brand) {
    reset(2);
    setForm((f) => ({ ...f, brand }));
    await fetchData(`${BASE_URL}/${vehicleType}/marcas/${brand}/modelos`, setModels);
  }

  async function handleFetchYears(model) {
    reset(3);
    setForm((f) => ({ ...f, model }));
    await fetchData(
      `${BASE_URL}/${vehicleType}/marcas/${form.brand}/modelos/${model}/anos`,
      setYears
    );
  }

  async function handleFetchValue() {
    setError("");
    setResult(null);
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/${vehicleType}/marcas/${form.brand}/modelos/${form.model}/anos/${form.year}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data);
      setIsModalOpen(true);
    } catch {
      setError("Erro ao consultar valor FIPE.");
    } finally {
      setLoading(false);
    }
  }

  // Enquanto não montou, não renderiza nada (evita inconsistência de SSR)
  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10 w-full max-w-2xl">

        {/* Botão de tema
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-white dark:bg-gray-200 dark:text-gray-800 transition-all"
          >
            {theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
          </button>
        </div> */}


        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-800 dark:text-white mb-4">
          Consulta Tabela FIPE
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-300 mb-8">
          Selecione o tipo de veículo, marca, modelo e ano para consultar o valor médio.
        </p>

        {/* Formulário */}
        <div className="flex flex-col gap-6 mb-8">
          
          {/* Etapa 1: Tipo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              1. Tipo de Veículo
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { key: "carros", label: "Carros" },
                { key: "motos", label: "Motos" },
                { key: "caminhoes", label: "Caminhões" },
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => handleFetchBrands(type.key)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ease-in-out ${
                    vehicleType === type.key
                      ? "bg-slate-800 text-white shadow-md transform scale-105 dark:bg-gray-200 dark:text-gray-800"
                      : "bg-gray-200 text-slate-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-slate-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Marca, modelo e ano */}
          <div className="space-y-6">
            
            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                2. Marca
              </label>
              <select
                value={form.brand}
                onChange={(e) => handleFetchModels(e.target.value)}
                disabled={!brands.length}
                className=" appearance-none w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecione a marca...</option>
                {brands.map((b) => (
                  <option key={b.codigo} value={b.codigo}>
                    {b.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                3. Modelo
              </label>
              <select
                value={form.model}
                onChange={(e) => handleFetchYears(e.target.value)}
                disabled={!models.length}
                className="appearance-none w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecione o modelo...</option>
                {models.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Ano */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                4. Ano
              </label>
              <select
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: e.target.value }))
                }
                disabled={!years.length}
                className="appearance-none w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200"
              >
                <option value="">Selecione o ano...</option>
                {years.map((y) => (
                  <option key={y.codigo} value={y.codigo}>
                    {y.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Consultar */}
          <button
            onClick={handleFetchValue}
            disabled={!form.brand || !form.model || !form.year}
            className="w-full py-3 px-6 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            Consultar Valor
          </button>
        </div>

        {/* Loading e Erro */}
        {(loading || error) && (
          <div className="flex flex-col items-center my-8">
            {loading && (
              <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin dark:border-gray-600 dark:border-t-gray-200"></div>
            )}
            {error && (
              <div className="text-red-500 dark:text-red-400 font-semibold text-center mt-4">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {result && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-all duration-300 ease-in-out">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md relative">
            
            {/* Botão Fechar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              aria-label="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white text-center">
              Resultado da Consulta
            </h3>
            <div className="space-y-2 text-slate-700 dark:text-slate-200">
              <p><strong>Marca:</strong> {result.Marca}</p>
              <p><strong>Modelo:</strong> {result.Modelo}</p>
              <p><strong>Ano Modelo:</strong> {result.AnoModelo}</p>
              <p><strong>Combustível:</strong> {result.Combustivel}</p>
              <p><strong>Código FIPE:</strong> {result.CodigoFipe}</p>
              <p><strong>Mês de Referência:</strong> {result.MesReferencia}</p>
            </div>
            <div className="text-center mt-6">
              <p className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                {result.Valor}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full py-3 px-6 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-200 transform hover:-translate-y-1"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
