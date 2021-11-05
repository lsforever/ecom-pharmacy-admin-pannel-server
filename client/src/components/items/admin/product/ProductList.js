import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    BooleanField,
    DeleteWithConfirmButton,
    TextInput,
    FunctionField,
    ShowButton,
    
} from 'react-admin'

const kinds = {
    normal : 'Normal Product',
    eye_glass : 'Eye Glass Product',
    medicine : 'Medicine Product',
}




const postFilters = [
    <TextInput label="Search by Name" source="name" alwaysOn />,
    <TextInput label="By Category" source="email" />,
    <TextInput label="By Price" source="id" />,
    <TextInput label="By Description" source="iad" />
];

const ProductList = (props) => {
    return (
        <List {...props} filters={postFilters} >
            <Datagrid>
                <TextField label="Id" source='id' />
                <TextField label="Name" source='name' />
                <BooleanField label="Is Published" source="flag" />
                <TextField label="Category" source="category.name" />

                <FunctionField label="Product Type" source="kind"
                    render={record => `${kinds[record.kind]}`}

                />
                <TextField label="Markup Price" source="price" />
                <DateField label="Created At" source="createdAt" />
                {/* <TextField label="Description" source="description" /> */}
                <TextField label="Brand" source="brand" />
                <ShowButton />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default ProductList