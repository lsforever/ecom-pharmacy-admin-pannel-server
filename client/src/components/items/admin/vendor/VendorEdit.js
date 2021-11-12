import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    BooleanInput,
    ArrayInput,
    SimpleFormIterator,
    // TopToolbar,
    // ShowButton,
    // ListButton
} from 'react-admin';

// const UserEditActions = ({ basePath, data }) => (
//     <TopToolbar>
//         <ListButton basePath={basePath} />
//         <ShowButton basePath={basePath} record={data} />
//     </TopToolbar>
// )

const VendorEdit = (props) => {
    return (
        // <Edit actions={<UserEditActions />}  {...props} >
        <Edit  {...props} >
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput disabled label="Email" source="user.email" />
                <BooleanInput label="Is Accepted" source="flag" />
                <TextInput label="Name" source="name" />

                <TextInput label="Type" source="type" />
                <TextInput label="Address" source="address" />
                <ArrayInput label="Contacts" source="contact" >
                    <SimpleFormIterator>
                        <TextInput label="Contact numbers" />
                    </SimpleFormIterator>
                </ArrayInput>

                {/* // TODO loactio coordinates should be added. Change that. */}
                <TextInput label="Location" source="location" />
                {/* // TODO Image Input */}
                <TextInput label="Owner Image Link" source="owner_img" />
                <TextInput label="Drug License" source="drug_license" />
                <TextInput label="Trade License" source="trade_license" />
                

            </SimpleForm>
        </Edit>
    )
}

export default VendorEdit