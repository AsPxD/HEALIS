import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  suggestions?: string[];
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  onAddTag,
  onRemoveTag,
  suggestions = []
}) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAddTag(input.trim());
      setInput('');
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(input.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 border-gray-300"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Type and press Enter to add"
        />
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="py-1">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    onAddTag(suggestion);
                    setInput('');
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;