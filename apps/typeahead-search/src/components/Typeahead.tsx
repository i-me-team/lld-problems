import React, { useState, useEffect, useRef } from 'react';
import type { TypeaheadProps } from '../types/index.ts';
import Trie from '../utils/trie.ts';
import VirtualizedList from './VirtualizedList.tsx';

const Typeahead: React.FC<TypeaheadProps> = ({
  words = [
    'apple',
    'app',
    'Apps',
    'orange',
    'orangutan',
    'grapes',
    'guava',
    'papaya',
  ],
  placeholder = 'Search...',
  className = '',
  itemHeight = 40,
  visibleItems = 8,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const trieRef = useRef<Trie>(new Trie());
  const containerHeight = itemHeight * visibleItems;

  useEffect(() => {
    words.forEach((word) => trieRef.current.insert(word));
  }, [words]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matchedWords = trieRef.current.getWordsFromPrefix(value);
    setSuggestions(matchedWords);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (word: string) => {
    setInputValue(word);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg overflow-hidden">
          <VirtualizedList
            data={{
              suggestions,
              itemHeight,
              onSelect: handleSuggestionClick,
            }}
            containerHeight={Math.min(
              containerHeight,
              suggestions.length * itemHeight,
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Typeahead;
