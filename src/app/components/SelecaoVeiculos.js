'use client'

import React, { useState } from 'react';

export default function SelecaoVeiculos() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [tipoVeiculo, setTipoVeiculo] = useState('');

  return (
    <>
      <div className="select-group">
        {/* Etapa 1: Seleção do Tipo de Veículo */}
        <div className="w-full">
          <label
            htmlFor="vehicle-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            1. Tipo de Veículo
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              id="car-btn"
              onClick={() => {
                setTipoVeiculo('carro');
                setEtapaAtual(2);
              }}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                tipoVeiculo === 'carro'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                  : 'bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400'
              }`}
            >
              Carros
            </button>
            <button
              id="motorcycle-btn"
              onClick={() => {
                setTipoVeiculo('moto');
                setEtapaAtual(2);
              }}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                tipoVeiculo === 'moto'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                  : 'bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400'
              }`}
            >
              Motos
            </button>
            <button
              id="truck-btn"
              onClick={() => {
                setTipoVeiculo('caminhao');
                setEtapaAtual(2);
              }}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                tipoVeiculo === 'caminhao'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
                  : 'bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400'
              }`}
            >
              Caminhões
            </button>
          </div>
        </div>

        {/* Etapa 2: Seleção da Marca */}
        {etapaAtual >= 2 && (
          <div>
            <label
              htmlFor="brand-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              2. Marca
            </label>
            <div className="select-container">
              <select id="brand-select" className="w-full">
                <option value="">Selecione a marca...</option>
              </select>
            </div>
          </div>
        )}

        {/* Etapa 3: Seleção do Modelo */}
        {etapaAtual >= 3 && (
          <div>
            <label
              htmlFor="model-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              3. Modelo
            </label>
            <div className="select-container">
              <select id="model-select" className="w-full">
                <option value="">Selecione o modelo...</option>
              </select>
            </div>
          </div>
        )}

        {/* Etapa 4: Seleção do Ano */}
        {etapaAtual >= 4 && (
          <div>
            <label
              htmlFor="year-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              4. Ano
            </label>
            <div className="select-container">
              <select id="year-select" className="w-full">
                <option value="">Selecione o ano...</option>
              </select>
            </div>
          </div>
        )}

        {/* Botão de Consulta Final */}
        {etapaAtual === 5 && (
          <button
            id="consult-btn"
            className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Consultar Valor
          </button>
        )}
      </div>
    </>
  );
}
