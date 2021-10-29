import React from 'react'
import {
    List, 
    Datagrid, 
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    BooleanField
} from 'react-admin'


const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='_id'/>
                <TextField source='email'/>
                <BooleanField source="email_verified" />
                <DateField source="createdAt" />
                <EditButton  />
                <DeleteButton  />
            </Datagrid>
        </List>
    )
}

export default UserList