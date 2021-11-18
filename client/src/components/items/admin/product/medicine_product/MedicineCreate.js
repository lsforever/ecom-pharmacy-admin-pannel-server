import React from 'react'
import {
    Create,
    //SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    SimpleForm,
    ImageInput,
    ImageField,
    RadioButtonGroupInput,
    ArrayInput,
    SimpleFormIterator,
    required,

} from 'react-admin';


//import { useFormState } from 'react-final-form';

import RichTextInput from 'ra-input-rich-text';
import CustomReferenceInput from './CustomReferenceInput';

// const toBase64 = file => new Promise((resolve, reject) => {

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
// });





const transform = data => {

    let files = []

    if (data.types) {

        data.types.forEach(type => {
            if (type.strengths) {
                type.strengths.map(strength => {
                    if (strength.image) {
                        files.push(strength.image.rawFile)
                        strength.image = files.length - 1
                    }
                    return strength
                })
            }
        })


    }

    data.files = files


    return data

}


const MedicineCreate = (props) => {
    return (
        <Create  {...props} transform={transform} >


            <SimpleForm  >


                <BooleanInput label="Is Published" source="flag" initialValue={true} />


                <TextInput label="Medicine Name" source='medicine_name' validate={required('Medicine Name is required')} />


                <CustomReferenceInput
                    source="generic"
                    resource_name="Generic"
                    reference="product-medicine-generic"
                    allowEmpty
                    validate={required('Genric is required')}
                />

                <CustomReferenceInput
                    source="company"
                    resource_name="Company"
                    reference="product-companies"
                    allowEmpty
                    validate={required('Company is required')}
                />




                <ArrayInput label="Medicine Types" source="types" >
                    <SimpleFormIterator>

                        

                        <CustomReferenceInput
                            source="type"
                            resource_name="Medicine Type"
                            reference="product-medicine-type"
                            custom_ref="product-medicine-type"
                            allowEmpty
                            validate={required('Type is required')}
                        />


                        <ArrayInput label="Strengths" source="strengths">
                            <SimpleFormIterator>

                                <TextInput label="Strength Name" source='strength_name' validate={required('Category is required')} />
                                <TextInput label="Pack Size" source='pack_size' />
                                <NumberInput label="Strip" source='strip' />
                                <NumberInput label="Box" source='box' />
                                <ImageInput
                                    source="image"
                                    label="Images"
                                    accept="image/png, image/jpg, image/jpeg"
                                    maxSize={2 * 1024 * 1024}
                                    placeholder={
                                        <p>
                                            Click here or Drop your file here
                                        </p>
                                    }
                                >
                                    <ImageField source="src" title="images" />
                                </ImageInput>

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


        </Create>
    )
}

export default MedicineCreate

