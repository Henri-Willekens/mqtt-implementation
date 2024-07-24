import DummyProps from './Dummy.types';

import React, { useState } from "react";

const DummyComponent: React.FC<DummyProps> = ({ colorScheme, number, setNumber }) => {
  const [_text, setText] = useState<string>('Hello world!');
  return (
    <div className={`dummy-${colorScheme}`}>
      <h1>{_text}</h1>
      <button onClick={() => { setNumber(prev => prev + 1) }}>{number}</button>
    </div>
  );
};

export default DummyComponent;