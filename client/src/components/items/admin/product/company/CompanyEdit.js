import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    required
} from 'react-admin';

const CompanyEditActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const CompanyEdit = (props) => {
    return (
        <Edit actions={<CompanyEditActions />} {...props}>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput label="Name" source="name" validate={required('Name is required')} />

            </SimpleForm>
        </Edit>
    )
}

export default CompanyEdit