import React, { useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('Active 사용자 연산 실행');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const { username, email } = inputs;
  // user.id 값이 변경되는 경우 굳이 화면이 리렌더링될 필요가 없으므로 useRef() 훅 사용
  const nextId = useRef(4);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'tester1',
      email: 'tester1@tester.com',
      active: true
    },
    {
      id: 2,
      username: 'tester2',
      email: 'tester2@tester.com',
      active: false,
    },
    {
      id: 3,
      username: 'tester3',
      email: 'tester3@tester.com',
      active: false
    }
  ]);

  // const onChange = e => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value
  //   });
  // };

  // useCallback 훅을 이용하여 onChange 함수를 미리 정의 후 재사용
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  // const onCreate = e => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   setUsers(users.concat(user));
  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // };

  // usecallback 훅을 이용하여 onCreate 함수를 미리 정의 후 재사용
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };

    // useState() 훅의 함수형 업데이트
    setUsers(users => users.concat(user));
    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);

  // const onRemove = id => {
  //   setUsers(users.filter(user => user.id !== id));
  // };

  // useCallback 훅을 이용하여 onRemove 함수를 미리 정의 후 재사용
  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
  }, []);

  // const onToggle = id => {
  //   setUsers(users.map(
  //     user => user.id === id
  //     ? { ...user, active: !user.active }
  //     : user
  //   ));
  // };

  // useCallback 훅을 이용하여 onToggle 함수를 미리 정의 후 재사용
  const onToggle = useCallback(id => {
    setUsers(users => users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        : user
    ));
  }, []);

  const count = useMemo(
    () => countActiveUsers(users), [users]
  );

  return (
    <>
      <Counter />
      <InputSample />
      <br />
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <br />
      <div>활성 사용자 수: {count}</div>
      <br />
      <b>계정 생성</b>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
    </>
  );
}

export default App;
