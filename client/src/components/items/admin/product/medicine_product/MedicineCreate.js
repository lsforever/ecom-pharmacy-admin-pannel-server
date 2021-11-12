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
    ImageInput,
    ImageField,

    FormDataConsumer,
    required,

    ArrayInput,
    SimpleFormIterator,

} from 'react-admin';

//import { useFormState } from 'react-final-form';

import RichTextInput from 'ra-input-rich-text';



const MedicineCreate = (props) => {
    return (
        <Create  {...props}  >


            <SimpleForm syncWithLocation={false} >



                <TextInput label="Medicine Name" source='medicine_name' />
                <BooleanInput label="Is Published" source="flag" />
                <TextInput label="Genric Name" source='genric_name' />

                <ImageInput
                    source="img"
                    label="Images"
                    accept="image/png, image/jpg, image/jpeg"
                    maxSize={5000000}
                    placeholder={
                        <p>
                            Click here or Drop your file here
                        </p>
                    }
                >
                    <ImageField source="src" title="images" />
                </ImageInput>


                <ArrayInput label="Product Variations" source="variations">
                    <SimpleFormIterator>

                        <TextInput label="Company Name" source='company_name' />
                        <ArrayInput label="Medicine Types" source="medicine_types">
                            <SimpleFormIterator>


                                <TextInput label="Type Name" source='type_name' />
                                <ArrayInput label="Strengths" source="strengths">
                                    <SimpleFormIterator>

                                        <TextInput label="Strength Name" source='strength_name' />
                                        <TextInput label="Picture" source='picture' />
                                        <TextInput label="Pack Size" source='pack_size' />
                                        <TextInput label="Strip" source='strip' />
                                        <TextInput label="Box" source='box' />

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

