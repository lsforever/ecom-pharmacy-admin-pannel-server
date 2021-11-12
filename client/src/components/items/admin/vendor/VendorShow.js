import React from 'react'
import {
    EmailField,
    TextField,
    DateField,
    BooleanField,
    SimpleShowLayout,
    Show,
    ArrayField,
    Datagrid,
} from 'react-admin'




const VendorShow = (props) => {
    return (
        <Show  {...props}>
            <SimpleShowLayout>
                <EmailField label="Email" source="user.email" />
                <TextField label="Id" source="id" />
                <BooleanField label="Is Accepted" source="flag" />




                <DateField label="Created Date" source="createdAt" />
                <DateField label="Updated Date" source="updatedAt" />
                <TextField label="Name" source="name" />
                <TextField label="Address" source="address" />
                <TextField label="Type" source="type" />

                {/* //TODO show list of details */}
                <ArrayField label="Contacts" source="contact">
                    <Datagrid>
                        <TextField label="Contact numbers" source="type" />
                    </Datagrid>
                </ArrayField>

                {/* // TODO loactio coordinates should be added. Change that. */}
                <TextField label="Location" source="location" />
                {/* // TODO Image Input */}
                <TextField label="Owner Image Link" source="owner_img" />
                <TextField label="Drug License" source="drug_license" />
                <TextField label="Trade License" source="trade_license" />







                
            </SimpleShowLayout>
        </Show>
    )
}


export default VendorShow