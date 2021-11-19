import React from 'react'
import {
    TextField,
    SimpleShowLayout,
    Show,
    NumberField,
} from 'react-admin'




const TypeShow = (props) => {
    return (
        <Show  {...props}>
            <SimpleShowLayout>
             
                <TextField label="Id" source="id" />
                <TextField label="Name" source="name" />
                <NumberField label="Commission" source="com" />

            </SimpleShowLayout>
        </Show>
    )
}


export default TypeShow