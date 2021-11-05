import React from 'react'
import {
    Create,
    //SimpleForm,
    TextInput,
    ReferenceInput,
    BooleanInput,
    NumberInput,
    SelectInput,
    SimpleForm,

    FormDataConsumer,
    required,

    ArrayInput,
    SimpleFormIterator,

} from 'react-admin';

//import { useFormState } from 'react-final-form';

import RichTextInput from 'ra-input-rich-text';

//const validateProductKind = required("Product Kind is required")
//defaultValue = ""

const kinds = [
    { id: 'normal', name: 'Normal Product' },
    { id: 'eye_glass', name: 'Eye Glass Product' },
    { id: 'medicine', name: 'Medicine Product' },

]

const transform = data => {
    if (data.kind === "normal") {
        return {
            ...data,

            //////////////EYE_GLASS
            eye_glass_type: undefined,

            //////////////MEDICINE
            special_name: undefined,
            strength: undefined,
            strip: undefined,
            box: undefined,
            medicine_type: undefined,
            company_name: undefined,
            generic_name: undefined,
        }
    } else if (data.kind === "eye_glass") {
        return {
            ...data,

            //////////////NORMAL
            other: undefined,

            //////////////MEDICINE
            special_name: undefined,
            strength: undefined,
            strip: undefined,
            box: undefined,
            medicine_type: undefined,
            company_name: undefined,
            generic_name: undefined,
        }
    } else if (data.kind === "medicine") {
        return {
            ...data,

            //////////////NORMAL
            other: undefined,

            //////////////EYE_GLASS
            eye_glass_type: undefined,

        }
    } else {
        return data
    }

}



const ProductCreate = (props) => {
    return (
        <Create  {...props} transform={transform} >



            <SimpleForm syncWithLocation={false} >



                <SelectInput label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
                <TextInput label="Name" source='name' />
                <BooleanInput label="Is Published" source="flag" />


                <NumberInput label="Price (optional)" source="price" />
                <TextInput label="Brand (optional)" source="brand" />



                <ReferenceInput
                    validate={required('Category is required')}
                    source="category"
                    defaultValue=""
                    label="Product Category"
                    reference="product-categories"
                    sort={{ field: 'name', order: 'ASC' }}
                >
                    <SelectInput optionText="name" optionValue="id" defaultValue="" />
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


        </Create>
    )
}

export default ProductCreate

