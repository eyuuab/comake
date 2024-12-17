// src/components/LanguageSelector.tsx
import React from "react";

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="language-selector" className="text-xl">
        Select Language:
      </label>
      <select
        id="language-selector"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="typescript">TypeScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="go">Go</option>
        <option value="ruby">Ruby</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
