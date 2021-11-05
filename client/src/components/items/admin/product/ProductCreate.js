import React from 'react'
import {
    Create,
    //SimpleForm,
    TextInput,
    ReferenceInput,
    BooleanInput,
    NumberInput,
    SelectInput,

    FormDataConsumer,
    required,

    TabbedForm,
    FormTab,

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



            <TabbedForm syncWithLocation={false} >


                <FormTab label="basics">
                    <SelectInput label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
                    <TextInput label="Name" source='name' />
                    <BooleanInput label="Is Published" source="flag" />


                    <NumberInput label="Price (optional)" source="price" />
                    <TextInput label="Brand (optional)" source="brand" />


                </FormTab>

                <FormTab label="Product Category">

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


        </Create>
    )
}

export default ProductCreate






{/* <TabbedForm syncWithLocation={false} >


<FormTab label="basics">
    <SelectInput label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={kinds} />
    <TextInput label="Name" source='name' />
    <BooleanInput label="Is Published" source="flag" />


    <NumberInput label="Price (optional)" source="price" />
    <TextInput label="Brand (optional)" source="brand" />


</FormTab>

<FormTab label="Product Category">

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


</FormTab>

<FormTab label="Product Description">
    <RichTextInput label="Product description" source="description" />
</FormTab>


<FormDataConsumer>
    {({ formData, ...props }) =>
        formData.kind === "normal" &&
        <FormTab label="Normal Product" {...props}>
            <TextInput label="Other" source="other" />
        </FormTab>
    }
</FormDataConsumer>

<FormDataConsumer>
    {({ formData, ...props }) =>
        formData.kind === "eye_glass" &&
        <FormTab label="Eye Glass Product" {...props}>
            <TextInput label="Eye Glass Type" source="eye_glass_type" />
        </FormTab>
    }
</FormDataConsumer>

<FormDataConsumer>
    {({ formData, ...rest }) =>
        formData.kind === "medicine" &&

        <FormTab label="Medicine Product" {...rest}>
            <TextInput label="Special Name" source="special_name" />
            <TextInput label="Strength" source="strength" />
            <NumberInput label="Strip" source="strip" />
            <NumberInput label="Box" source="box" />
        </FormTab>
    }
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




</TabbedForm> */}









// const SpecialProductInput = props => {
//     const { values } = useFormState();
//     //////////////NORMAL
//     //values.other

//     //////////////EYE_GLASS
//     //values.eye_glass_type

//     //////////////MEDICINE
//     //values.special_name
//     //values.strength
//     //values.strip
//     //values.box
//     //values.medicine_type
//     //values.company_name
//     //values.generic_name

//     if (values.kind === 'normal') {
//         //////////////EYE_GLASS
//         values.eye_glass_type = undefined

//         //////////////MEDICINE
//         values.special_name = undefined
//         values.strength = undefined
//         values.strip = undefined
//         values.box = undefined
//         values.medicine_type = undefined
//         values.company_name = undefined
//         values.generic_name = undefined

//         return (
//             <FormTab label="Normal Product" {...props}>
//                 <TextInput label="Other" source="other" />
//             </FormTab>
//         )
//     } else if (values.kind === 'medicine') {
//         //////////////NORMAL
//         values.other = undefined

//         //////////////EYE_GLASS
//         values.eye_glass_type = undefined

//         return (




//             <FormTab label="Medicine Product" {...props}>
//                 <TextInput label="Special Name" source="special_name" />
//                 <TextInput label="Strength" source="strength" />
//                 <NumberInput label="Strip" source="strip" />
//                 <NumberInput label="Box" source="box" />



//                 {/* <ArrayInput label="Medicine Type" source="medicine_type">
//                     <SimpleFormIterator>
//                         <TextInput label="Type" />
//                     </SimpleFormIterator>
//                 </ArrayInput>

//                 <ArrayInput label="Company Name" source="company_name">
//                     <SimpleFormIterator>
//                         <TextInput label="Company" />
//                     </SimpleFormIterator>
//                 </ArrayInput>

//                 <ArrayInput label="Generic Name" source="generic_name" >
//                     <SimpleFormIterator>
//                         <TextInput label="Generic" />
//                     </SimpleFormIterator>
//                 </ArrayInput> */}



//             </FormTab>



//         )
//     } else if (values.kind === 'eye_glass') {

//         //////////////NORMAL
//         values.other = undefined

//         //////////////MEDICINE
//         values.special_name = undefined
//         values.strength = undefined
//         values.strip = undefined
//         values.box = undefined
//         values.medicine_type = undefined
//         values.company_name = undefined
//         values.generic_name = undefined
//         return (
//             <FormTab label="Eye Glass Product" {...props}>
//                 <TextInput label="Eye Glass Type" source="eye_glass_type" />
//             </FormTab>
//         )
//     } else {
//         return (
//             null

//         )
//     }

// };



{/* <TabbedForm syncWithLocation={false} >


<FormTab label="basics">
    <SelectInput label="Product Type (Kind)" source="kind" optionText="name" optionValue="id" validate={required("Product Kind is required")} choices={[
        { id: 'normal', name: 'Normal Product' },
        { id: 'eye_glass', name: 'Eye Glass Product' },
        { id: 'medicine', name: 'Medicine Product' },

    ]} />
    <TextInput label="Name" source='name' />
    <BooleanInput label="Is Published" source="flag" />


    <NumberInput label="Price (optional)" source="price" />
    <TextInput label="Brand (optional)" source="brand" />


</FormTab>

<FormTab label="Product Category" syncWithLocation={false}>

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


</FormTab>

<FormTab label="Product Description">
    <RichTextInput label="Product description" source="description" />
</FormTab>

<FormDataConsumer>
    {({ formData, ...rest }) =>
        formData.kind === "normal" &&
        <FormTab label="Normal Product" {...rest}>
            <TextInput source="normal____" validate={required()} addLabel={false} />
        </FormTab>
    }
</FormDataConsumer>

<FormDataConsumer>
    {({ formData, ...rest }) =>
        formData.kind === "medicine" &&
        <FormTab label="Medicine Product" {...rest}>
            <TextInput source="medicine____" validate={required()} addLabel={false} />
        </FormTab>
    }
</FormDataConsumer>

<FormDataConsumer>
    {({ formData, ...rest }) =>
        formData.kind === "eye_glass" &&
        <FormTab label="Eye Glass Product" {...rest}>
            <TextInput source="eye_glass____" validate={required()} addLabel={false} />
        </FormTab>
    }
</FormDataConsumer>




</TabbedForm> */}