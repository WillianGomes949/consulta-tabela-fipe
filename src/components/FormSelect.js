// components/FormSelect.js
"use client";
import { useState, useEffect } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function FormSelect({
  label,
  value,       // O 'codigo' (ex: "101")
  onChange,    // Função para retornar o 'codigo' selecionado
  disabled,
  options,     // Array de { codigo: "...", nome: "..." }
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Efeito para sincronizar o 'value' (código) que vem do pai
  // com o 'selectedItem' (objeto) que o Combobox usa internamente.
  useEffect(() => {
    if (value) {
      const selected = options.find((opt) => opt.codigo === value);
      setSelectedItem(selected || null);
    } else {
      setSelectedItem(null);
    }
  }, [value, options]);

  // Filtra as opções com base no que o usuário digita
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.nome.toLowerCase().includes(query.toLowerCase())
        );

  // Função que o Combobox chama ao selecionar
  const handleOnChange = (selectedOption) => {
    setSelectedItem(selectedOption);      // Atualiza o estado interno (objeto)
    onChange(selectedOption ? selectedOption.codigo : ""); // Envia o 'codigo' para o pai
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <Combobox
        value={selectedItem}
        onChange={handleOnChange}
        disabled={disabled}
      >
        <div className="relative">
          {/* O Input que o usuário vê e digita */}
          <ComboboxInput
            className="appearance-none w-full p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200 disabled:opacity-50"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option) => option?.nome || ""}
            placeholder={placeholder}
          />
          {/* O botão de seta para abrir/fechar */}
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 disabled:opacity-50">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          {/* As Opções (Dropdown) */}
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-300 dark:border-gray-600">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                Nenhum resultado encontrado.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.codigo}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-200"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.nome}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active
                              ? "text-slate-800 dark:text-white"
                              : "text-slate-800 dark:text-gray-200"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}