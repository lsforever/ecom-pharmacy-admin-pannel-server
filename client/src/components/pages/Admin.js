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

// import ProductList from '../items/admin/product/ProductList'
// import ProductEdit from '../items/admin/product/ProductEdit'
// import ProductCreate from '../items/admin/product/ProductCreate'
// import ProductShow from '../items/admin/product/ProductShow'

// import ProductCategoryList from '../items/admin/product_category/ProductCategoryList'
// import ProductCategoryCreate from '../items/admin/product_category/ProductCategoryCreate'
// import ProductCategoryEdit from '../items/admin/product_category/ProductCategoryEdit'


import MedicineCreate from '../items/admin/product/medicine_product/MedicineCreate'
import MedicineShow from '../items/admin/product/medicine_product/MedicineShow'
import MedicineList from '../items/admin/product/medicine_product/MedicineList'
import MedicineEdit from '../items/admin/product/medicine_product/MedicineEdit'

/////
import CompanyCreate from '../items/admin/product/company/CompanyCreate'
import CompanyEdit from '../items/admin/product/company/CompanyEdit'
import CompanyList from '../items/admin/product/company/CompanyList'
import CompanyShow from '../items/admin/product/company/CompanyShow'
/////
import MedicineGenericCreate from '../items/admin/product/medicine_product/generic/GenericCreate'
import MedicineGenericEdit from '../items/admin/product/medicine_product/generic/GenericEdit'
import MedicineGenericList from '../items/admin/product/medicine_product/generic/GenericList'
import MedicineGenericShow from '../items/admin/product/medicine_product/generic/GenericShow'
/////
import MedicineTypeCreate from '../items/admin/product/medicine_product/type/TypeCreate'
import MedicineTypeEdit from '../items/admin/product/medicine_product/type/TypeEdit'
import MedicineTypeList from '../items/admin/product/medicine_product/type/TypeList'
import MedicineTypeShow from '../items/admin/product/medicine_product/type/TypeShow'
/////

import { MenuLayout }  from '../items/admin/menu/layout';


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
                layout={MenuLayout}
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

               
                <Resource name="product-companies" options={{ label: 'Companies' }} list={CompanyList} create={CompanyCreate} edit={CompanyEdit} show={CompanyShow} />
                <Resource name="product-medicine-generic" options={{ label: 'Medicine Generics' }} list={MedicineGenericList} create={MedicineGenericCreate} edit={MedicineGenericEdit} show={MedicineGenericShow} />
                <Resource name="product-medicine-type" options={{ label: 'Medicine Types' }} list={MedicineTypeList} create={MedicineTypeCreate} edit={MedicineTypeEdit} show={MedicineTypeShow} />
              



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