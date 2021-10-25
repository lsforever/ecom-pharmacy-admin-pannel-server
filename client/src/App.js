import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from './components/UserList'

function App() {
  return (
    <div className="App">
      {/* <Admin
        dataProvider={restProvider('http://localhost:5000')
        }>
        <Resource name='users' list={UserList} />
        <Resource name='kkkk' list={UserList} />
        <Resource name='lllll' list={UserList} />
        <Resource name='ssssss' list={UserList} />
      </Admin> */}








      <Admin
        title="Niramoy"
        dataProvider={restProvider('http://localhost:5000')}
      // dataProvider={dataProviderFactory(
      //     process.env.REACT_APP_DATA_PROVIDER || ''
      // )}
      // customReducers={{ theme: themeReducer }}
      // customRoutes={customRoutes}
      // authProvider={authProvider}
      // dashboard={Dashboard}
      // loginPage={Login}
      // layout={Layout}
      // i18nProvider={i18nProvider}
      // disableTelemetry
      >
        <Resource name="customers" {...UserList} />
        <Resource
          name="commands"
          {...UserList}
          options={{ label: 'Orders' }}
        />
        <Resource name="invoices" {...UserList} />
        <Resource name="products" {...UserList} />
        <Resource name="categories" {...UserList} />
        <Resource name="reviews" {...UserList} />
      </Admin>

    </div>
  );
}

export default App;
