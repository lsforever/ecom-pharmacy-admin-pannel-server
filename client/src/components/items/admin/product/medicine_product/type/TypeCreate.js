import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    NumberInput,
    required
} from 'react-admin';

const TypeCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const TypeCreate = (props) => {
    return (
        <Create actions={<TypeCreateActions />} {...props}>
            <SimpleForm>
              
                <TextInput label="name" source="name" validate={required('Name is required')} />
                <NumberInput label="Commission Percentage" source="com" />
                
            </SimpleForm>
        </Create>
    )
}

export default TypeCreate