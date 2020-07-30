import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
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
  ]
}

function countActiveUsers(users) {
  console.log('Active 사용자 연산 실행');
  return users.filter(user => user.active).length;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    default:
      throw new Error('Unhandled aciton type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;
  const nextId = useRef(4);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
  }, [username, email]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성 사용자 수 : 0</div>
    </>
  );
}

export default App;
