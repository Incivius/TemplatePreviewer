import React from "react";

interface FloatingLabelInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  type?: string;
}

const FloatingLabelInput = ({ label, value, onChange, type }: FloatingLabelInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className="label-float">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={handleInputChange}
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default FloatingLabelInput;
