import React, {useRef} from "react";
import {IMaskInput} from 'react-imask';

const CodeInput = ({inputLength, values, setValues}: { inputLength: number, values: Array<string>, setValues: (values: Array<string>) => void }) => {
  // Array para guardar as referências dos inputs
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Função chamada quando o valor de um input muda
  const handleChange = (value: string, index: number) => {
    // IMask já garante que será um dígito por causa do mask="0", mas a validação é uma segurança extra.
    if (!/^[0-9]?$/.test(value)) return;

    // Cria uma cópia do array de valores para não mutar o estado diretamente
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Se um valor foi digitado, avança para o próximo campo
    if (value && index < inputLength - 1) {
      // Usar setTimeout(..., 0) ajuda a evitar problemas de foco em navegadores mobile
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
  };

  // Função para lidar com pressionamento de teclas (Backspace, Setas)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Se a tecla for Backspace, o input atual estiver vazio e não for o primeiro input...
    if (e.key === "Backspace" && !values[index] && index > 0) {
      e.preventDefault(); // Previne comportamento padrão que pode ser indesejado
      inputsRef.current[index - 1]?.focus();
    }

    // Navegação com as setas
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < inputLength - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Função para lidar com o evento de colar
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // Essencial: previne que o navegador cole o texto no input focado
    const pastedText = e.clipboardData.getData("text");

    // Valida se o texto colado contém apenas os caracteres esperados e tem o tamanho correto
    const pasteRegex = new RegExp(`^[0-9]{${inputLength}}$`); // Ajustado para aceitar apenas dígitos, como na máscara
    if (!pasteRegex.test(pastedText)) {
      return; // Se o texto for inválido, não faz nada
    }

    // Divide o texto colado em um array de caracteres e atualiza o estado
    const newValues = pastedText.split('').slice(0, inputLength);
    setValues(newValues);

    // Foca o último input após colar. React cuidará de preencher os valores.
    // O setTimeout garante que o foco ocorra após a renderização do React
    setTimeout(() => {
      inputsRef.current[inputLength - 1]?.focus();
    }, 0);
  };

  return (
    // O evento onPaste é colocado no container para capturar a colagem em qualquer lugar da área dos inputs
    <div className="flex gap-1 justify-center mt-4 w-full" onPaste={handlePaste}>
      {values.map((char, index) => (
        <IMaskInput
          key={index}
          mask="0" // A máscara "0" permite apenas um único dígito numérico
          value={char}
          onAccept={(value: string) => handleChange(value, index)}
          onKeyDown={(e) => handleKeyDown(e as any, index)} // 'e' é tipado corretamente por IMask, mas o 'as any' simplifica

          // onPaste é removido de cada input individual

          inputRef={(el: HTMLInputElement | null) => {
            inputsRef.current[index] = el;
          }}
          placeholder="0"
          required
          className="w-12 h-14 text-center focus-headless font-mono border rounded border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-950/50 placeholder:text-white/25"
        />
      ))}
    </div>
  );
};

export default CodeInput;