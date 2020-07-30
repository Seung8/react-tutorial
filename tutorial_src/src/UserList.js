import React, { useEffect } from 'react';

const User = React.memo(
    function User({ user, onRemove, onToggle }) {
        const { id, username, email, active } = user;

        // useEffect(() => {
        //     console.log('컴포넌트 렌더링');
        //     // clean-up 함수를 return하여 컴포넌트가 사라질 때 이벤트 등록
        //     // 컴포넌트 props에서 내려받은 값을 state로 등록
        //     // 특정 API 요청
        //     // D3, Video.js 등을 사용할 때
        //     // setInterval, setTimeout 등을 이용할 때
        //     return () => {
        //         // clearInterval, clearTimeout 등 
        //         // 라이브러리 인스턴스 제거
        //         console.log('컴포넌트 삭제');
        //     };
        // }, []);

        useEffect(() => {
            console.log('user 값 생성 or 변경');
            // console.log(user);
            return () => {
                console.log('user 값이 변경 전');
                // console.log(user);
            }
            // 의존값을 설정하여 deps 배열에 추가하면 해당 값이 설정되거나 변경될 때마다 호출됨
        }, [user]);

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
);

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

export default React.memo(
    UserList,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);