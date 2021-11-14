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

// const toBase64 = file => new Promise((resolve, reject) => {

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
// });





const transform = data => {

    let files = []

    if (data.variations) {
        data.variations.forEach(variation => {
            if (variation.medicine_types) {
                variation.medicine_types.forEach(type => {
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
        })
    }

    data.files = files


    return data

}


const MedicineCreate = (props) => {
    return (
        <Create  {...props} transform={transform} >


            <SimpleForm  >


                <TextInput label="Medicine Name" source='medicine_name' validate={required('Category is required')} />
                <BooleanInput label="Is Published" source="flag" />
                <TextInput label="Genric Name" source='genric_name' validate={required('Category is required')} />

                <RadioButtonGroupInput label="Medicine From" source="from"  initialValue="local" optionText="name" optionValue="id" choices={[
                    { id: 'local', name: 'Local' },
                    { id: 'foreign', name: 'Foreign' },
                ]} />


                <RichTextInput label="Ingredients" source='ingredients' />
                <RichTextInput label="Indication" source='indication' />
                <RichTextInput label="Usage" source='usage' />
                <RichTextInput label="Side effects" source='side_effects' />
                <RichTextInput label="Pregnancy and Lactation" source='preg_lac' />
                <RichTextInput label="Precautions" source='precautions' />


                <ArrayInput label="Product Variations" source="variations" >
                    <SimpleFormIterator>

                        <TextInput label="Company Name" source='company_name' validate={required('Category is required')} />
                        <ArrayInput label="Medicine Types" source="medicine_types">
                            <SimpleFormIterator>


                                <TextInput label="Type Name" source='type_name' validate={required('Category is required')}/>
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
                    </SimpleFormIterator>
                </ArrayInput>





            </SimpleForm>


        </Create>
    )
}

export default MedicineCreate

