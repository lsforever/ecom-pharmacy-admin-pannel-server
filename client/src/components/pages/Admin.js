import React from 'react'

import { Admin as ReactAdmin, Resource, ListGuesser } from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import AuthProvider from '../items/admin/AuthProvider'
import CustomLoginPage from '../items/admin/LoginPage'
import DataProvider from '../items/admin/DataProvider'

import UserList from '../items/admin/user/UserList'
import UserEdit from '../items/admin/user/UserEdit'
import UserCreate from '../items/admin/user/UserCreate'

import ProductList from '../items/admin/product/ProductList'
import ProductEdit from '../items/admin/product/ProductEdit'
import ProductCreate from '../items/admin/product/ProductCreate'


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
                <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductList} />
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