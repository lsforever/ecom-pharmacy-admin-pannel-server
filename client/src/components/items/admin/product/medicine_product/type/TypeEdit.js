import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton,
    NumberInput,
    required
} from 'react-admin';

const ProductCategoryEditActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const ProductCategoryEdit = (props) => {
    return (
        <Edit actions={<ProductCategoryEditActions />} {...props}>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput label="Name" source="name" validate={required('Name is required')} />
                <NumberInput label="Commission Percentage" source="com" />


            </SimpleForm>
        </Edit>
    )
}

export default ProductCategoryEdit