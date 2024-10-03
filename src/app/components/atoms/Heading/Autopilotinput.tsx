import React, { useState } from 'react';

interface AutopilotInputProps {
  onHeadingTopicChange: (topic: string, heading: number) => void;
  onCogTopicChange: (topic: string, cog: number) => void;
}

const AutopilotInput: React.FC<AutopilotInputProps> = ({
  onHeadingTopicChange,
  onCogTopicChange
}) => {
  const [heading, setHeading] = useState<number | null>(null);
  const [cog, setCog] = useState<number | null>(null);
  const [topic, setTopic] = useState('default/topic'); // Default topic

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setHeading(isNaN(value) ? null : value);
  };

  const handleCogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCog(isNaN(value) ? null : value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heading !== null) {
      onHeadingTopicChange(topic, heading);
    }
    if (cog !== null) {
      onCogTopicChange(topic, cog);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AutopilotInput;
