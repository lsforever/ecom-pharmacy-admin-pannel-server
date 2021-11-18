import React from 'react'
import {
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    SimpleForm,
    ImageInput,
    FormDataConsumer,
    ImageField,
    RadioButtonGroupInput,
    ArrayInput,
    SimpleFormIterator,
    required,

    TextField,
    FunctionField,


} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import CustomReferenceInput from './CustomReferenceInput';


const transform = data => {

    let files = []

    if (data.types) {


        data.types.forEach(type => {
            if (type.type) type.type = type.type._id

            if (type.strengths) {
                type.strengths.map(strength => {
                    if (strength.image_edit) {
                        files.push(strength.image_edit.rawFile)
                        strength.image = files.length - 1
                    }
                    strength.image_edit = undefined
                    return strength
                })
            }
        })


    }

    data.files = files

    if (data.generic) data.generic = data.generic._id
    if (data.company) data.company = data.company._id

    return data
}

// const PreviewImage = ({ record, source }) => {
//     if (typeof (record) == "string") {
//         record = {
//             [source]: record
//         }
//     }
//     return <ImageField record={record} source={source} />
// }

// ....

// <ImageInput source="preview">
//     <PreviewImage source="src" />
// </ImageInput>


const MedicineEdit = (props) => {
    return (
        <Edit  {...props} transform={transform} >
            <SimpleForm  >


                <BooleanInput label="Is Published" source="flag" />
           

                <TextInput label="Medicine Name" source='medicine_name' validate={required('Category is required')} />



                <CustomReferenceInput
                    source="generic._id"
                    resource_name="Generic"
                    reference="product-medicine-generic"
                    allowEmpty
                    validate={required('Genric is required')}
                />

                <CustomReferenceInput
                    source="company._id"
                    resource_name="Company"
                    reference="product-companies"
                    allowEmpty
                    validate={required('Company is required')}
                />



                <ArrayInput label="Medicine Types" source="types">
                    <SimpleFormIterator>




                        <CustomReferenceInput
                            source="type._id"
                            resource_name="Medicine Type"
                            reference="product-medicine-type"
                            allowEmpty
                            validate={required('Type is required')}
                        />


                        <ArrayInput label="Strengths" source="strengths">
                            <SimpleFormIterator>

                                <TextInput label="Strength Name" source='strength_name' validate={required('Category is required')} />

                                <TextInput label="Pack Size" source='pack_size' />
                                <NumberInput label="Strip" source='strip' />
                                <NumberInput label="Box" source='box' />



                                <TextField label="Current Image" source="fake_path_001" />
                                <FormDataConsumer>
                                    {({
                                        formData, // The whole form data
                                        scopedFormData, // The data for this item of the ArrayInput
                                        getSource, // A function to get the valid source inside an ArrayInput
                                        ...rest }) =>

                                        scopedFormData && scopedFormData.image_url ? (
                                            <img
                                                title="Current Image"
                                                alt="Not availble"
                                                src={`${scopedFormData.image_url}`}
                                                {...rest}
                                            />

                                        ) : <FunctionField
                                            addLabel="false"
                                            render={record => 'No Image added currently for this'} {...rest} />


                                    }
                                </FormDataConsumer>

                                <ImageInput
                                    source="image_edit"
                                    label="Image to upload"
                                    accept="image/png, image/jpg, image/jpeg"
                                    maxSize={2 * 1024 * 1024}
                                    placeholder={
                                        <p>
                                            Click here or Drop your image here , if you want to edit it
                                        </p>
                                    }
                                >
                                    <ImageField source="src" title="images" />

                                </ImageInput>



                                {/* <TextField label="Current Image" source="strength_name" />
                                        <ImageField label="Current Image" source="image_url" /> */}


                            </SimpleFormIterator>
                        </ArrayInput>


                    </SimpleFormIterator>
                </ArrayInput>

                <RadioButtonGroupInput label="Medicine From" source="from" initialValue="local" optionText="name" optionValue="id" choices={[
                    { id: 'local', name: 'Local' },
                    { id: 'foreign', name: 'Foreign' },
                ]} />

                <RichTextInput label="Ingredients" source='ingredients' />
                <RichTextInput label="Indication" source='indication' />
                <RichTextInput label="Usage" source='usage' />
                <RichTextInput label="Side effects" source='side_effects' />
                <RichTextInput label="Pregnancy and Lactation" source='preg_lac' />
                <RichTextInput label="Precautions" source='precautions' />




            </SimpleForm>

        </Edit>
    )
}

export default MedicineEdit