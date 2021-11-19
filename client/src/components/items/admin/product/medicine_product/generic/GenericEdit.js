import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    required
} from 'react-admin';

const GenericEditActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const GenericEdit = (props) => {
    return (
        <Edit actions={<GenericEditActions />} {...props}>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput label="Name" source="name"  validate={required('Name is required')} />


            </SimpleForm>
        </Edit>
    )
}

export default GenericEdit