import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteWithConfirmButton,
    TextInput,
    NumberField,
    ShowButton,
} from 'react-admin'




const productCategoryFilters = [
    <TextInput label="Search by Name" source="name" alwaysOn />,
    <TextInput label="By Id" source="id" />
]

const ProductCategoryList = (props) => {
    return (
        <List {...props} filters={productCategoryFilters} >
            <Datagrid>
                <TextField label="Id" source='id' />
                <TextField label="Name" source='name' />
                <NumberField label="Commission %" source="com" />

                <ShowButton />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default ProductCategoryList