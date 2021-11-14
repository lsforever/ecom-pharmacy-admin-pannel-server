import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    BooleanField,
    DeleteWithConfirmButton,
    TextInput,
    ShowButton,
    SelectInput,

} from 'react-admin'



const postFilters = [
    <TextInput label="Search by medicine name" source="medicine_name" alwaysOn />,

    <TextInput label="By Genric Name" source="genric_name" />,
    <TextInput label="By Id" source="id" />,
 
    <SelectInput label="Published Filter" source="flag" alwaysOn choices={[
        { id: true, name: 'Published Products' },
        { id: false, name: 'Unpublished Products' },
    ]} />,
]

const UserList = (props) => {
    return (
        <List {...props} filters={postFilters} >
            <Datagrid>
                <TextField label="Id" source='id' />
                <TextField label="Medicine Name" source='medicine_name' />
                <TextField label="Genric Name" source='genric_name' />
                
                <BooleanField label="Is Published" source="flag" />
                <TextField label="From" source='from' />
                <DateField label="Created Date" source="createdAt" />

                <ShowButton />
                <EditButton />

                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default UserList