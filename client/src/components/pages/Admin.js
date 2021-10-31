import React from 'react'

import { Admin as ReactAdmin, Resource, ListGuesser } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from '../items/admin/UserList'
import AuthProvider from '../items/admin/AuthProvider'
import CustomLoginPage from '../items/admin/LoginPage'
import DataProvider from '../items/admin/DataProvider'
import UserEdit from '../items/admin/UserEdit'
import UserCreate from '../items/admin/UserCreate'


const Admin = () => {
    return (
        <div>


            <ReactAdmin
                title="Niraamoy"
                dataProvider={DataProvider}
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

                <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} show={UserList} />
                {/* <Resource name="users" list={ListGuesser} /> */}
                {/* <Resource
                    name="products"
                    {...UserList}
                    options={{ label: 'Orders' }}
                /> */}
            </ReactAdmin>
        </div>
    )
}

export default Admin