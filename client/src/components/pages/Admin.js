import React from 'react'

import { Admin as ReactAdmin, Resource, ListGuesser, ShowGuesser } from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import AuthProvider from '../items/admin/AuthProvider'
import CustomLoginPage from '../items/admin/LoginPage'
import DataProvider from '../items/admin/DataProvider'

import UserList from '../items/admin/user/UserList'
import UserEdit from '../items/admin/user/UserEdit'
import UserCreate from '../items/admin/user/UserCreate'
import UserShow from '../items/admin/user/UserShow'

import ProductList from '../items/admin/product/ProductList'
import ProductEdit from '../items/admin/product/ProductEdit'
import ProductCreate from '../items/admin/product/ProductCreate'

import ProductCategoryList from '../items/admin/product_category/ProductCategoryList'
import ProductCategoryCreate from '../items/admin/product_category/ProductCategoryCreate'
import ProductCategoryEdit from '../items/admin/product_category/ProductCategoryEdit'



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

                <Resource name="users"  options={{ label: 'Users' }} onClick={UserEdit}  list={UserList} create={UserCreate} edit={UserEdit} show={UserShow} />
                <Resource name="products" options={{ label: 'Products' }} list={ProductList} create={ProductCreate} edit={ProductEdit} />
                <Resource name="product-categories" options={{ label: 'Product Categories' }} list={ProductCategoryList} create={ProductCategoryCreate} edit={ProductCategoryEdit}  />
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