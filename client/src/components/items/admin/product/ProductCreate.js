import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceArrayInput,
    BooleanInput,
    NumberInput,
} from 'react-admin';


const ProductCreate = (props) => {
    return (
        <Create  {...props}>
            <SimpleForm>
              
  


                <TextInput label="Name" source='name'/>
                <BooleanInput label="Is Published" source="flag" />
                {/* <ReferenceArrayInput  label="Category" source="category" /> */}
                <NumberInput label="price" source="price" />
                <TextInput label="Brand" source="brand"  />
                <TextInput label="Description" source="description" />


       
        
            </SimpleForm>
        </Create>
    )
}

export default ProductCreate