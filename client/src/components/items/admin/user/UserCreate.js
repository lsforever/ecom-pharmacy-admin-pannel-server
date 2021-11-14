import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';


const UserCreate = (props) => {
    return (
        <Create  {...props}>
            <SimpleForm>
              
                <TextInput label="Email" source="email" />
                <TextInput label="Password" source="password"/>
             
                
            </SimpleForm>
        </Create>
    )
}

export default UserCreate