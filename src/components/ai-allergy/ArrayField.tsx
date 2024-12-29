import React from 'react';

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (value: string, index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  values,
  onChange,
  onAdd,
  onRemove
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value, index)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="px-2 py-1 text-red-600 hover:text-red-800"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        + Add {label.toLowerCase()}
      </button>
    </div>
  );
};