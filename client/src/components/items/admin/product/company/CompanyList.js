import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteWithConfirmButton,
    TextInput,
    ShowButton,
} from 'react-admin'




const CompanyFilters = [
    <TextInput label="Search by Name" source="name" alwaysOn />,
    <TextInput label="By Id" source="id" />
]

const CompanyList = (props) => {
    return (
        <List {...props} filters={CompanyFilters} >
            <Datagrid>
                <TextField label="Id" source='id' />
                <TextField label="Name" source='name' />

                <ShowButton />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default CompanyList