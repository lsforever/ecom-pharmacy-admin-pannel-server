import React from 'react'
import {
    TextField,
    SimpleShowLayout,
    Show,
} from 'react-admin'




const CompanyShow = (props) => {
    return (
        <Show  {...props}>
            <SimpleShowLayout>
             
                <TextField label="Id" source="id" />
                <TextField label="Name" source="name" />

            </SimpleShowLayout>
        </Show>
    )
}


export default CompanyShow