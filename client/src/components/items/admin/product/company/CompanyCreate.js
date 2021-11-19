import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    required
} from 'react-admin';

const CompanyCreateCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const CompanyCreate = (props) => {
    return (
        <Create actions={<CompanyCreateCreateActions />} {...props}>
            <SimpleForm>
              
                <TextInput label="Company Name" source="name"  validate={required('Name is required')} />
                
            </SimpleForm>
        </Create>
    )
}

export default CompanyCreate