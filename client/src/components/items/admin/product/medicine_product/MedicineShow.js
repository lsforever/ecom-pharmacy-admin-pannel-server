import React from 'react'
import {
    TextField,
    DateField,
    BooleanField,
    SimpleShowLayout,
    Show,
    ArrayField,
    Datagrid,
    NumberField,
    ImageField,
    RichTextField
} from 'react-admin'


const MedicineShow = (props) => {
    return (
        <Show  {...props}>
            <SimpleShowLayout>
                <TextField label="Id" source="id" />
                <BooleanField label="Is Published" source="flag" />



                <TextField label="Medicine Name" source='medicine_name' />
                
                <TextField label="Genric Name" source='genric_name' />
                <DateField label="Created Date" source="createdAt" />
                <DateField label="Updated Date" source="updatedAt" />

                <TextField label="Medicine From" source="from" />


                <RichTextField label="Ingredients" source='ingredients' />
                <RichTextField label="Indication" source='indication' />
                <RichTextField label="Usage" source='usage' />
                <RichTextField label="Side effects" source='side_effects' />
                <RichTextField label="Pregnancy and Lactation" source='preg_lac' />
                <RichTextField label="Precautions" source='precautions' />



                <ArrayField label="Product Variations" source="variations">
                    <Datagrid>

                        <TextField label="Company Name" source='company_name' />
                        <ArrayField label="Medicine Types" source="medicine_types">
                            <Datagrid>


                                <TextField label="Type Name" source='type_name' />
                                <ArrayField label="Strengths" source="strengths">
                                    <Datagrid>

                                        <TextField label="Strength Name" source='strength_name' />
                                        <TextField label="Pack Size" source='pack_size' />
                                        <NumberField label="Strip" source='strip' />
                                        <NumberField label="Box" source='box' />
                                        <ImageField label="Image" source="image_url" title="No Image Added For this" />

                                    </Datagrid>
                                </ArrayField>


                            </Datagrid>
                        </ArrayField>
                    </Datagrid>
                </ArrayField>

            </SimpleShowLayout>
        </Show>
    )
}


export default MedicineShow