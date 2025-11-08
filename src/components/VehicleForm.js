// components/VehicleForm.js
"use client";
import FormSelect from "./FormSelect";
import LoadingSpinner from "./LoadingSpinner";

export default function VehicleForm({
  vehicleType,
  brands,
  models,
  years,
  form,
  loading,
  error,
  onTypeChange,
  onBrandChange,
  onModelChange,
  onYearChange,
  onSubmit,
}) {
  const vehicleTypes = [
    { key: "carros", label: "Carros" },
    { key: "motos", label: "Motos" },
    { key: "caminhoes", label: "Caminhões" },
  ];

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Etapa 1: Tipo (Sem alterações) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          1. Tipo de Veículo
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          {vehicleTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => onTypeChange(type.key)}
              className={`focus:ring-4 focus:outline-none focus:ring-slate-600 flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ease-in-out ${
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

      {/* Marca, modelo e ano (Com as correções) */}
      <div className="space-y-6">
        <FormSelect
          label="2. Marca"
          value={form.brand}
          // CORREÇÃO: Removido o "(e) =>" e "e.target.value"
          onChange={onBrandChange}
          disabled={!brands.length}
          options={brands}
          placeholder="Selecione ou digite a marca..."
        />

        <FormSelect
          label="3. Modelo"
          value={form.model}
          // CORREÇÃO: Removido o "(e) =>" e "e.target.value"
          onChange={onModelChange}
          disabled={!models.length}
          options={models}
          placeholder="Selecione ou digite o modelo..."
        />

        <FormSelect
          label="4. Ano"
          value={form.year}
          // CORREÇÃO: Removido o "(e) =>" e "e.target.value"
          onChange={onYearChange}
          disabled={!years.length}
          options={years}
          placeholder="Selecione ou digite o ano..."
        />
      </div>

      {/* Botão Consultar (Sem alterações) */}
      <button
        onClick={onSubmit}
        disabled={!form.brand || !form.model || !form.year || loading}
        className="py-3 px-6 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
      >
        Consultar Valor
      </button>

      {/* Loading e Erro (Sem alterações) */}
      {(loading || error) && (
        <div className="flex flex-col items-center my-8 min-h-[40px]">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="text-red-500 dark:text-red-400 font-semibold text-center mt-4">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}