import React from 'react'
import {
    Create,
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    LongTextInput,
    ReferenceManyField,
    BooleanInput,
    Datagrid,
    TextField,
    DateField,
    EditButton
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