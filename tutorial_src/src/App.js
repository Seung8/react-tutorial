import React, { useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import produce from 'immer';
import './App.css';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';

const initialState = {
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
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      throw new Error('Unhandled aciton type');
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const nextId = useRef(4);
  const count = useMemo(() => countActiveUsers(users, [users]));

  const [ form, onChange, reset ] = useInputs({
    username: '',
    email: ''
  });
  const { username, email } = form;

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
    reset();
  }, [username, email, reset]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
