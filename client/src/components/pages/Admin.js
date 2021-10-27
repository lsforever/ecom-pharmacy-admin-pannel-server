import React from 'react'

import { Admin as ReactAdmin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import UserList from '../layouts/UserList'

const Admin = () => {
    return (
        <div>


            <ReactAdmin
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
            </ReactAdmin>
        </div>
    )
}

export default Admin