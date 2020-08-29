import React, { useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(
    function User({ user }) {
        const { id, username, email, active } = user;
        const dispatch = useContext(UserDispatch);

        return (
            <div>
                <b
                    style={{
                        color: active ? 'blue' : 'black',
                        cursor: 'pointer'
                    }}
                    onClick={() => dispatch({
                        type: 'TOGGLE_USER',
                        id
                    })}
                >{username}</b>
                &nbsp;
                <span>({email})</span>
                {/*
                    렌더링 시점에 바로 함수가 동작하지 않도록 괄호를 빼고 호출해야 하지만 
                    id를 인자로 전달해야 하므로 새로운 함수형태로 작성
                */}
                <button onClick={() => dispatch({
                    type: 'REMOVE_USER',
                    id
                })}>삭제</button>
            </div>
        );
    }
);

function UserList({ users }) {
    return (
        <div>
            {
                users.map(
                    user => (
                        <User
                            user={user}
                            key={user.id}
                        />
                    )
                )
            }
        </div>
    );
}

export default React.memo(
    UserList,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);