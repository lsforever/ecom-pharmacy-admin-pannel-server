import React from 'react'
import {
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    SelectInput,
    FormDataConsumer,
    required,

    SimpleForm,
    ReferenceInput,

    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

const kinds = [
    { id: 'normal', name: 'Normal Product' },
    { id: 'eye_glass', name: 'Eye Glass Product' },
    { id: 'medicine', name: 'Medicine Product' },

]

const transform = data => {
    return {
        ...data,
        category: data.category._id,
    }
}


const ProductEdit = (props) => {
    return (
        <Edit  {...props} transform={transform} >

            <SimpleForm>



                <SelectInput disabled label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
                <TextInput label="Name" source='name' />
                <BooleanInput label="Is Published" source="flag" />


                <NumberInput label="Price (optional)" source="price" />
                <TextInput label="Brand (optional)" source="brand" />





                <ReferenceInput
                    validate={required('Category is required')}
                    source="category._id"
                    label="Product Category"
                    reference="product-categories"
                    sort={{ field: 'name', order: 'ASC' }}
                >
                    <SelectInput optionText="name" optionValue="_id" />
                </ReferenceInput >





                <RichTextInput label="Product description" source="description" />



                <FormDataConsumer>
                    {({ formData }) => {
                        if (formData.kind === "normal") {
                            return (
                                <>
                                    <TextInput label="Other" source="other" />
                                </>
                            )
                        } else if (formData.kind === "eye_glass") {
                            return (
                                <>
                                    <TextInput label="Eye Glass Type" source="eye_glass_type" />
                                </>
                            )

                        } else if (formData.kind === "medicine") {
                            return (

                                <>
                                    <TextInput label="Special Name" source="special_name" />
                                    <br></br>
                                    <TextInput label="Strength" source="strength" />
                                    <br></br>
                                    <NumberInput label="Strip" source="strip" />
                                    <br></br>
                                    <NumberInput label="Box" source="box" />
                                    <br></br>

                                    <ArrayInput label="Medicine Type" source="medicine_type">
                                        <SimpleFormIterator>
                                            <TextInput label="Type" />
                                        </SimpleFormIterator>
                                    </ArrayInput>

                                    <br></br>

                                    <ArrayInput label="Company Name" source="company_name">
                                        <SimpleFormIterator>
                                            <TextInput label="Company" />
                                        </SimpleFormIterator>
                                    </ArrayInput>

                                    <br></br>

                                    <ArrayInput label="Generic Name" source="generic_name" >
                                        <SimpleFormIterator>
                                            <TextInput label="Generic" />
                                        </SimpleFormIterator>
                                    </ArrayInput>


                                </>


                            )
                        } else {
                            return null
                        }

                    }}
                </FormDataConsumer>


            </SimpleForm>
        </Edit>
    )
}

export default ProductEdit