import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceArrayInput,
    BooleanInput,
    NumberInput,
} from 'react-admin';


const ProductEdit = (props) => {
    return (
        <Edit  {...props}>
            <SimpleForm>


                <TextInput disabled label="Id" source="id" />



                <TextInput label="Name" source='name' />
                <BooleanInput label="Is Published" source="flag" />
                {/* Category here should be disabled / Uneditable */}
                {/* <ReferenceArrayInput  label="Category" source="category" /> */}
                <NumberInput label="price" source="price" />
                <TextInput label="Brand" source="brand" />
                <TextInput label="Description" source="description" />




            </SimpleForm>
        </Edit>
    )
}

export default ProductEdit