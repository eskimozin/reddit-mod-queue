import React, {useRef, useState} from "react";

const CodeInput = () => {
  const inputLength = 6;
  const [values, setValues] = useState(Array(inputLength).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.toUpperCase();
    setValues(newValues);

    if (value && index < inputLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < inputLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(pasted)) return;

    const newValues = pasted.split("");
    setValues(newValues);
    newValues.forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = char;
      }
    });

    inputsRef.current[5]?.focus();
  };

  return (
    <div className="flex gap-1 justify-center mt-4 w-full">
      {values.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={char}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          placeholder={"0"}
          className="w-12 h-14 text-center focus-headless font-mono border rounded border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-950/50 placeholder:text-white/25"
          required={true}
        />
      ))}
    </div>
  );
};

export default CodeInput;
