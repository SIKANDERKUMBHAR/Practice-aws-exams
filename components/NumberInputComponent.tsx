import useDebounce from "@azure-fundamentals/hooks/useDebounce";
import { useState, useEffect } from "react";

interface Props {
  totalQuestions: number;
  currentQuestionIndex: number;
  handleNextQuestion: (index: number) => void;
}

const NumberInputComponent: React.FC<Props> = ({
  totalQuestions,
  currentQuestionIndex,
  handleNextQuestion,
}) => {
  const [inputValue, setInputValue] = useState(currentQuestionIndex);
  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue !== currentQuestionIndex) {
      handleNextQuestion(debouncedInputValue);
    }
  }, [debouncedInputValue, currentQuestionIndex, handleNextQuestion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <input
      className="w-[40px] text-white rounded-l-md border outline-0 border-slate-700 bg-slate-900 text-center text-md [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      type="number"
      min={0}
      max={totalQuestions}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default NumberInputComponent;
