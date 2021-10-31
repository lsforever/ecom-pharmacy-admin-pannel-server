import React from 'react'
import {
    List, 
    Datagrid, 
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    BooleanField,
    DeleteWithConfirmButton ,
    TextInput
} from 'react-admin'

const postFilters = [
    <TextInput label="Search" source="details.name" alwaysOn />,
    <TextInput label="By Email" source="email"  />,
    <TextInput label="By Id" source="id"  />,
    <TextInput label="By Address" source="details.address"  />,
];

const UserList = (props) => {
    return (
        <List {...props} filters={postFilters} >
            <Datagrid>
                <TextField source='id'/>
                <TextField source='email'/>
                <BooleanField source="email_verified" />
                <DateField source="createdAt" />
                <TextField label="Name" source="details.name" />
                <TextField label="Address" source="details.address"  />
                <DateField label="Birthday" source="details.birthday"  />
                <EditButton  />
                <DeleteWithConfirmButton  />
            </Datagrid>
        </List>
    )
}

export default UserList