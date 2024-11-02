import { useState, useRef } from 'react';
import { btnConfig } from '../constants/index.ts';
import { calculate } from '../utils/index.ts';

const Calculator = () => {
  // States that directly affect UI
  const [display, setDisplay] = useState<string>('0');

  // Refs for values that don't directly affect UI rendering
  const previousInputRef = useRef<string>('');
  const currentInputRef = useRef<string>('');
  const operatorRef = useRef<string>('');
  const isOperatorJustChangedRef = useRef<boolean>(false);

  const resetCalculator = () => {
    previousInputRef.current = '';
    currentInputRef.current = '';
    operatorRef.current = '';
    isOperatorJustChangedRef.current = false;
    setDisplay('0');
  };

  const handleButtonClick = (btnContent: string) => {
    if (btnContent === 'C') {
      resetCalculator();
    } else if (btnContent >= '0' && btnContent <= '9') {
      if (isOperatorJustChangedRef.current) {
        currentInputRef.current = btnContent;
        isOperatorJustChangedRef.current = false;
      } else {
        currentInputRef.current += btnContent;
      }
      setDisplay(currentInputRef.current);
    } else if (btnContent === '.') {
      if (!currentInputRef.current) {
        currentInputRef.current = '0.';
        setDisplay('0.');
      } else if (!currentInputRef.current.includes('.')) {
        currentInputRef.current += '.';
        setDisplay(currentInputRef.current);
      }
    } else if (btnContent === '=') {
      if (
        currentInputRef.current &&
        previousInputRef.current &&
        operatorRef.current
      ) {
        const result = calculate(
          previousInputRef.current,
          currentInputRef.current,
          operatorRef.current,
        );
        setDisplay(result.toString());
        // resetCalculator();
      }
    } else {
      // Operators: +, -, *, /
      if (currentInputRef.current) {
        if (previousInputRef.current) {
          const result = calculate(
            previousInputRef.current,
            currentInputRef.current,
            operatorRef.current,
          );
          previousInputRef.current = result.toString();
          setDisplay(result.toString());
        } else {
          previousInputRef.current = currentInputRef.current;
          setDisplay(currentInputRef.current);
        }
        currentInputRef.current = '';
        isOperatorJustChangedRef.current = true;
      }
      operatorRef.current = btnContent;
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-w-full justify-center items-center">
      <h1 className="text-4xl font-extrabold mb-2">Calculator</h1>
      <div className="w-96 h-auto rounded-lg border-4">
        <div className="border-solid border-2 border-black p-4 text-2xl text-right m-2">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2 m-2">
          {btnConfig.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(btn.content)}
              className="p-2 m-2 text-center rounded-md text-xl border-solid border-2 border-black shadow-md hover:brightness-90 bg-slate-50 active:translate-y-0.5"
            >
              {btn.content}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
