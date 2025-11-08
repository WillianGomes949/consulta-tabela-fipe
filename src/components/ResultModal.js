// components/ResultModal.js
"use client";

export default function ResultModal({ result, isOpen, onClose }) {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-all duration-300 ease-in-out">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md relative">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
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
          <p>
            <strong>Marca:</strong> {result.Marca}
          </p>
          <p>
            <strong>Modelo:</strong> {result.Modelo}
          </p>
          <p>
            <strong>Ano Modelo:</strong> {result.AnoModelo}
          </p>
          <p>
            <strong>Combustível:</strong> {result.Combustivel}
          </p>
          <p>
            <strong>Código FIPE:</strong> {result.CodigoFipe}
          </p>
          <p>
            <strong>Mês de Referência:</strong> {result.MesReferencia}
          </p>
        </div>
        <div className="text-center mt-6">
          <p className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {result.Valor}
          </p>
        </div>
        <div>
          <p className="p-4 content-center rounded-2xl mt-4 mb-4 text-sm text-slate-600 dark:text-slate-300">
            Valor médio de referência. Deve ser usado como ponto de partida, e
            não como um valor absoluto. É fundamental considerar os fatores
            específicos do veículo e o mercado local para ter uma avaliação
            justa.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 px-6 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-all duration-200 transform hover:-translate-y-1"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}