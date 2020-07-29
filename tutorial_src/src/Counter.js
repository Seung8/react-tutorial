import React, { useState } from 'react';

function Counter() {
    {/*
        const numberState = useState(0);
        const number = numberState[0];
        const setNumber = numberState[1];
    */}
    {/* 배열 비구조화 할당 혹은 구조분해를 통해 축약 */ }
    const [number, setNumber] = useState(0);


    const onIncrease = () => {
        setNumber(number + 1);
    };
    const onDecrease = () => {
        setNumber(number - 1);
    };

    return (
        <div>
            <h1>{number}</h1>
            {/*
                onClick={onIncrease()}와 같이 소괄호를 감싸서  호출을 해버리면
                react 컴포넌트가 렌더링 될 때 함수를 바로 호출해 버리기 때문에
                반드시 호출을 하는것이 아닌 함수 자체를 그대로 넣어주어야 한다.
            */}
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;