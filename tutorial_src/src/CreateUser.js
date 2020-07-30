import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
    console.log('CreateUser 컴포넌트 렌더링');
    return (
        <div>
            <input
                name="username"
                placeholder="이름"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);