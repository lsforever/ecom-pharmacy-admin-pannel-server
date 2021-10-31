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


const UserEdit = (props) => {
    return (
        <Edit  {...props}>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput disabled label="Email" source="email" />
                <BooleanInput label="Email Verified" source="email_verified" />
                <TextInput source="details.name"/>
                <TextInput source="details.address"/>
                <DateInput source="details.birthday"  />
             
                
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit