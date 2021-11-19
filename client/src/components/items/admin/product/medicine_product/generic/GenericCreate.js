import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    required
} from 'react-admin';

const GenericCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const GenericCreate = (props) => {
    return (
        <Create actions={<GenericCreateActions />} {...props}>
            <SimpleForm>
              
                <TextInput label="name" source="name" validate={required('Name is required')} />
                
            </SimpleForm>
        </Create>
    )
}

export default GenericCreate