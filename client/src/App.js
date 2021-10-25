import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from './components/UserList'

function App() {
  return (
    <div className="App">
      <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ksj bshshjsk</p>
      {/* <Admin
        dataProvider={restProvider('http://localhost:5000')
        }>
        <Resource name='users' list={UserList} />
        <Resource name='kkkk' list={UserList} />
        <Resource name='lllll' list={UserList} />
        <Resource name='ssssss' list={UserList} />
      </Admin> */}
    </div>
  );
}

export default App;
