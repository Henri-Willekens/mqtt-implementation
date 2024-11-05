import PredictiveSearchFieldProps from './PredictiveSearchField.types';
import './PredictiveSearchField.scss';
import { useEffect, useState, useRef, useCallback } from 'react';

const InputField: React.FC<PredictiveSearchFieldProps> = ({ label, id, value, onChange }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(value || '');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input field

  const handleSelectTopic = useCallback((topic: string) => {
    setSelectedTopic(topic);
    setSearchTerm(topic);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    onChange(topic); // Update parent component with the selected topic
    inputRef.current?.focus(); // Re-focus on input after selecting
  }, [onChange]);

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev < filteredTopics.length - 1 ? prev + 1 : 0)); // Loop to first item
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredTopics.length - 1)); // Loop to last item
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) handleSelectTopic(filteredTopics[highlightedIndex]);
    }
  }, [highlightedIndex, filteredTopics, handleSelectTopic]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget; // Element that is receiving focus
    if (dropdownRef.current && !dropdownRef.current.contains(relatedTarget as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/topics')
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error fetching topics:', error));
  }, []);

  useEffect(() => {
    setSearchTerm(value); // Keep searchTerm in sync with `value` prop
  }, [value]);

  return (
    <>
      <div className="search-field topic-search">
        <label className='search-field__label'>{label}</label>
        <input
          ref={inputRef} // Attach the ref to the input
          type="text"
          id={id}
          name={id}
          className='search-field__input'
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => {
            const newValue = e.target.value;
            setSearchTerm(newValue);
            setShowDropdown(newValue.length > 0 && filteredTopics.length > 0); // Show dropdown when there is input and filtered topics
            onChange(newValue); // Update parent component on input change
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-controls="topic-list"
          aria-expanded={showDropdown}
          aria-activedescendant={highlightedIndex >= 0 ? `topic-${highlightedIndex}` : undefined} // for accessibility
        />
      </div>
      {showDropdown && (
        <ul
          id="topic-list"
          className="search-field__dropdown topic-list"
          role="listbox"
          ref={dropdownRef}
        >
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <li
                key={topic} // Use topic as the key if it's unique
                id={`topic-${index}`} // Add an ID for aria-activedescendant
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent the click from bubbling up
                  handleSelectTopic(topic);
                }}
                role="option"
                tabIndex={0}
                aria-selected={highlightedIndex === index}
                className={`topic-item search-field__dropdown-item ${highlightedIndex === index ? 'search-field__dropdown-highlighted highlighted' : ''}`}
              >
                {topic}
              </li>
            ))
          ) : (
            <li>No matching topics found</li>
          )}
        </ul>
      )}
    </>
  );
};

export default InputField;
