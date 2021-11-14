import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton
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
                <TextInput label="Name" source="name" />


            </SimpleForm>
        </Edit>
    )
}

export default ProductCategoryEdit