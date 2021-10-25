import React from 'react'
import {
    List, 
    Datagrid, 
    TextField,
    DateField,
    EditButton,
    DeleteButton
} from 'react-admin'


const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='id'/>
                <TextField source='id'/>
            </Datagrid>
        </List>
    )
}

export default UserList