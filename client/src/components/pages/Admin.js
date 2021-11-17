import React from 'react'

import { Admin as ReactAdmin, Resource, } from 'react-admin'
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
import ProductShow from '../items/admin/product/ProductShow'

import ProductCategoryList from '../items/admin/product_category/ProductCategoryList'
import ProductCategoryCreate from '../items/admin/product_category/ProductCategoryCreate'
import ProductCategoryEdit from '../items/admin/product_category/ProductCategoryEdit'


import MedicineCreate from '../items/admin/product/medicine_product/MedicineCreate'
import MedicineShow from '../items/admin/product/medicine_product/MedicineShow'
import MedicineList from '../items/admin/product/medicine_product/MedicineList'
import MedicineEdit from '../items/admin/product/medicine_product/MedicineEdit'


//TODO delete uninstall if not needed
//import TreeMenu from '@bb-tech/ra-treemenu';


import {
    PeopleAltRoundedIcon,
    CategoryRoundedIcon,
    SportsBaseballRoundedIcon,
} from '@mui/icons-material/PeopleAltRounded';
import VendorCreate from '../items/admin/vendor/VendorCreate'
import VendorEdit from '../items/admin/vendor/VendorEdit'
import VendorList from '../items/admin/vendor/VendorList'
import VendorShow from '../items/admin/vendor/VendorShow'

const Admin = () => {
    return (
        <div>


            <ReactAdmin
                title="Niraamoy"
                dataProvider={DataProvider}
                authProvider={AuthProvider}
                loginPage={CustomLoginPage}
                // menu={TreeMenu}

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


{/* <Resource name="people" options={{ "label": "People", "isMenuParent": true }} />
                <Resource name="users" icon={PeopleAltRoundedIcon} options={{ label: 'Users' , "menuParent": "people"}} onClick={UserEdit} list={UserList} create={UserCreate} edit={UserEdit} show={UserShow} />
                

                <Resource name="products_main" options={{ "label": "Products", "isMenuParent": true }} />
                <Resource name="products" options={{ label: 'Products',"menuParent": "products_main" }} list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} />
                <Resource name="product-categories" options={{ label: 'Product Categories' ,"menuParent": "products_main"}} list={ProductCategoryList} create={ProductCategoryCreate} edit={ProductCategoryEdit} />
                 */}




     
                <Resource name="users" icon={CategoryRoundedIcon} options={{ label: 'Users' }} onClick={UserEdit} list={UserList} create={UserCreate} edit={UserEdit} show={UserShow} />
                
                
                {/* <Resource name="products" icon={SportsBaseballRoundedIcon} options={{ label: 'Products' }} list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} /> */}

                <Resource name="medicine-products" icon={SportsBaseballRoundedIcon} options={{ label: 'Medicine Products' }} list={MedicineList} create={MedicineCreate} edit={MedicineEdit} show={MedicineShow} />
                
                {/* <Resource name="product-categories" icon={PeopleAltRoundedIcon} options={{ label: 'Product Categories'}} list={ProductCategoryList} create={ProductCategoryCreate} edit={ProductCategoryEdit} />
                 */}
                {/* <Resource name="vendors" icon={SportsBaseballRoundedIcon} options={{ label: 'Vendors' }} list={VendorList} create={VendorCreate} edit={VendorEdit} show={VendorShow} /> */}


                <Resource name="product-companies"/>
                <Resource name="product-medicine-generic"/>
              



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