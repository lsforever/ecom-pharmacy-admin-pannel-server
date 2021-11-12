import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';


const VendorCreate = (props) => {
    return (
        <Create  {...props}>
            <SimpleForm>
                  
                <TextInput label="Email" source="email" />
                <TextInput label="Name" source="name"/>
                
            </SimpleForm>
        </Create>
    )
}

export default VendorCreate