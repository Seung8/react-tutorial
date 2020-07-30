import React, { useState, useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            throw new Error('Unhandled action type.')
    };
}

function Counter() {
    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        });
    };
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        });
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

export default React.memo(Counter);