## DOM 선택하기

- 리액트에서 특정 DOM을 선택할 때에는 ref를 사용한다.
- 함수형 컴포넌트에서는 useRef라는 훅을 사용해야 하며 클래스형 컴포넌트에서는 React.createRef를 사용해야 한다.
- useRef() import => useRef 객체 생성 => DOM에 해당 useRef 객체 설정 => useRef().current로 DOM 선택

```react
import React, { useState, useRef } from 'react';


function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
		// useRef 객체 생성
    const nameInput = useRef()
    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onReset = (e) => {
        setInputs({
            name: '',
            nickname: ''
        });
      	// current가 DOM을 가리키며 DOM을 가리킨 다음 DOM API인 focus() 적용
      	nameInput.current.focus();
    };

    return (
        <div>
            <input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}  // useRef()로 생성한 값을 ref 속성으로 적용
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name}({nickname})
            </div>
        </div>
    );
}

export default InputSample;
```







