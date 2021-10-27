import React from 'react'

import { Admin as ReactAdmin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from '../items/admin/UserList'
import AuthProvider from '../items/admin/AuthProvider'
import CustomLoginPage from '../items/admin/LoginPage'

const Admin = () => {
    return (
        <div>


            <ReactAdmin
                title="Niraamoy"
                dataProvider={ restProvider('http://localhost:5000')}
                authProvider={AuthProvider}
                loginPage={CustomLoginPage}
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
               
               <Resource name="users" list={UserList} create={UserList} edit={UserList} show={UserList} />
                <Resource
                    name="products"
                    {...UserList}
                    options={{ label: 'Orders' }}
                />
            </ReactAdmin>
        </div>
    )
}

export default Admin