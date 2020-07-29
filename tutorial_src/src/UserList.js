import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
    const { id, username, email, active } = user;

    useEffect(() => {
        console.log('컴포넌트 렌더링');
    }, []
    );

    return (
        <div>
            <b
                style={{
                    color: active ? 'blue' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() => onToggle(id)}
            >{username}</b>
            &nbsp;
            <span>({email})</span>
            {/*
                렌더링 시점에 바로 함수가 동작하지 않도록 괄호를 빼고 호출해야 하지만 
                id를 인자로 전달해야 하므로 새로운 함수형태로 작성
            */}
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {
                users.map(
                    user => (
                        <User
                            user={user}
                            key={user.id}
                            onRemove={onRemove}
                            onToggle={onToggle}
                        />
                    )
                )
            }
        </div>
    );
}

export default UserList;