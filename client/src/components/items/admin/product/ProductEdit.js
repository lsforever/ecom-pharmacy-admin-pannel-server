import React from 'react'
import {
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    SelectInput,
    FormDataConsumer,
    required,

    TabbedForm,
    FormTab,
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

            <TabbedForm syncWithLocation={false} >


                <FormTab label="basics">
                    <SelectInput disabled label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
                    <TextInput label="Name" source='name' />
                    <BooleanInput label="Is Published" source="flag" />


                    <NumberInput label="Price (optional)" source="price" />
                    <TextInput label="Brand (optional)" source="brand" />


                </FormTab>

                <FormTab label="Product Category">

                    <ReferenceInput
                        validate={required('Category is required')}
                        source="category._id"
                        label="Product Category"
                        reference="product-categories"
                        sort={{ field: 'name', order: 'ASC' }}
                    >
                        <SelectInput optionText="name" optionValue="_id" />
                    </ReferenceInput >


                </FormTab>

                <FormTab label="Product Description">
                    <RichTextInput label="Product description" source="description" />
                </FormTab>


                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        if (formData.kind === "normal") {
                            return (
                                <FormTab label="Normal Product" {...rest}>
                                    <TextInput label="Other" source="other" />
                                </FormTab>
                            )
                        } else if (formData.kind === "eye_glass") {
                            return (
                                <FormTab label="Eye Glass Product" {...rest}>
                                    <TextInput label="Eye Glass Type" source="eye_glass_type" />
                                </FormTab>
                            )

                        } else if (formData.kind === "medicine") {
                            return (

                                <FormTab label="Medicine Product" {...rest}>
                                    <TextInput label="Special Name" source="special_name" />
                                    <TextInput label="Strength" source="strength" />
                                    <NumberInput label="Strip" source="strip" />
                                    <NumberInput label="Box" source="box" />
                                </FormTab>


                            )
                        } else {
                            return null
                        }

                    }}
                </FormDataConsumer>




                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <FormTab label="Medicine Type" {...rest}>
                            <ArrayInput label="Medicine Type" source="medicine_type">
                                <SimpleFormIterator>
                                    <TextInput label="Type" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </FormTab>
                    }
                </FormDataConsumer>

                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <FormTab label="Company Name" {...rest}>
                            <ArrayInput label="Company Name" source="company_name">
                                <SimpleFormIterator>
                                    <TextInput label="Company" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </FormTab>
                    }
                </FormDataConsumer>

                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.kind === "medicine" &&
                        <FormTab label="Generic Name" {...rest}>
                            <ArrayInput label="Generic Name" source="generic_name" >
                                <SimpleFormIterator>
                                    <TextInput label="Generic" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </FormTab>
                    }
                </FormDataConsumer>

            </TabbedForm>
        </Edit>
    )
}

export default ProductEdit