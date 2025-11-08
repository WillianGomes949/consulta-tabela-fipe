// app/page.js
"use client";
import { useState, useEffect } from "react";
import VehicleForm from "../components/VehicleForm";
import ResultModal from "../components/ResultModal";
import  fetchFipeData  from "../lib/Api"; // Importa a nova função da API

export default function Home() {
  const [mounted, setMounted] = useState(false);
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

  // --- LÓGICA DE TEMA (sem alterações) ---
  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  // --- LÓGICA DE DADOS (Atualizada) ---

  // Função de reset (sem alterações)
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
    setError("");
  }

  // Handlers de fetch atualizados para usar 'fetchFipeData'
  async function handleFetchBrands(type) {
    reset(1);
    setVehicleType(type);
    setLoading(true);
    setError("");
    try {
      const data = await fetchFipeData(`${type}/marcas`);
      setBrands(data || []); // Garante que é um array
    } catch (err) {
      setError(err.message || "Erro ao carregar marcas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchModels(brandCode) {
    reset(2);
    setForm((f) => ({ ...f, brand: brandCode })); // Recebe o código direto
    setLoading(true);
    setError("");
    try {
      const data = await fetchFipeData(
        `${vehicleType}/marcas/${brandCode}/modelos`
      );
      setModels(data?.modelos || []); // Garante que é um array
    } catch (err) {
      setError(err.message || "Erro ao carregar modelos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchYears(modelCode) {
    reset(3);
    setForm((f) => ({ ...f, model: modelCode })); // Recebe o código direto
    setLoading(true);
    setError("");
    try {
      const data = await fetchFipeData(
        `${vehicleType}/marcas/${form.brand}/modelos/${modelCode}/anos`
      );
      setYears(data || []); // Garante que é um array
    } catch (err) {
      setError(err.message || "Erro ao carregar anos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchValue() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await fetchFipeData(
        `${vehicleType}/marcas/${form.brand}/modelos/${form.model}/anos/${form.year}`
      );
      setResult(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message || "Erro ao consultar valor FIPE.");
    } finally {
      setLoading(false);
    }
  }

  // --- RENDERIZAÇÃO ---
  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10 w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-800 dark:text-white mb-4">
          Consulta Tabela FIPE
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-300 mb-8">
          Selecione o tipo de veículo, marca, modelo e ano para consultar o
          valor médio.
        </p>

        <VehicleForm
          vehicleType={vehicleType}
          brands={brands}
          models={models}
          years={years}
          form={form}
          loading={loading}
          error={error}
          onTypeChange={handleFetchBrands}
          onBrandChange={handleFetchModels} // Passa o handler direto
          onModelChange={handleFetchYears} // Passa o handler direto
          onYearChange={(yearCode) => setForm((f) => ({ ...f, year: yearCode }))} // Passa o handler direto
          onSubmit={handleFetchValue}
        />
      </div>

      <ResultModal
        result={result}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}