import React, { useRef, useState } from 'react';
import './App.css';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

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

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    // useState를 이용한 기존 배열(...users)에 새 user 객체 추가
    // setUsers({
    //   ...inputs,
    //   username, 
    //   email
    // });

    // concat()을 이용한 새 user 추가(권장)
    setUsers(users.concat(user));
    // Input 값(username, email) 비우기
    setInputs({
      username: '',
      email: '',
    });
    console.log(nextId.current);  // useRef의 기본값인 4가 출력
    nextId.current += 1  // onCreate 함수 호출 시 nextId를 사용하고 이후에는 +1
  };

  const onRemove = id => {
    // users 목록에서 user 들을 순회하며 user.id가 전달받은 id와 일치하지 않는 객체만 찾아서
    // filter()를 통해 새로운 배열로 리턴
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        : user
    ));
  }

  return (
    <>
      <Counter />
      <InputSample />
      <br />
      <>
        <b>계정 목록</b>
        <UserList
          users={users}
          onRemove={onRemove}
          onToggle={onToggle}
        />
        <br />
        <b>계정 생성</b>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
      </>
    </>
  );
}

export default App;
