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




const UserShow = (props) => {
    return (
        <Show  {...props}>
            <SimpleShowLayout>
                <EmailField label="Email" source="email" />
                <TextField label="Id" source="id" />
                <BooleanField source="email_verified" />

                <ArrayField label="Roles" source="roles">
                    <Datagrid>
                        <TextField label="Type" source="type" />
                        <TextField label="Reference Id" source="ref_id" />
                        <BooleanField label="Role Activated" source="flag" />
                    </Datagrid>
                </ArrayField>


                <DateField label="Created Date" source="createdAt" />
                <DateField label="Updated Date" source="updatedAt" />
                <TextField label="Name" source="details.name" />
                <TextField label="Address" source="details.address" />
                <TextField label="Birthday" source="details.birthday" />

            </SimpleShowLayout>
        </Show>
    )
}


export default UserShow