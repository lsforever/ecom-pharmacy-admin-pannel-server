import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton
} from 'react-admin';

const ProductCategoryCreateActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} />
    </TopToolbar>
)

const ProductCategoryCreate = (props) => {
    return (
        <Create actions={<ProductCategoryCreateActions />} {...props}>
            <SimpleForm>
              
                <TextInput label="name" source="name" />
                
            </SimpleForm>
        </Create>
    )
}

export default ProductCategoryCreate