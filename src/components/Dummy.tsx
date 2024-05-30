import React, { Dispatch, SetStateAction, useState } from "react";

interface DummyProps {
    number: number,
    setNumber: Dispatch<SetStateAction<number>>
};

const DummyComponent: React.FC<DummyProps> = ({ number, setNumber }) => {
    const [text, setText] = useState<string>('Hello world!');
    return(
        <div className="dummy">
            <h1>{text}</h1>
            <button onClick={() => { setNumber(prev => prev + 1) }}>{number}</button>
        </div>
    );
};

export default DummyComponent;