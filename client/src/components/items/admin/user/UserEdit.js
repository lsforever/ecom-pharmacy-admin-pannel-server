import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    BooleanInput,
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

const UserEdit = (props) => {
    return (
        // <Edit actions={<UserEditActions />}  {...props} >
        <Edit  {...props} >
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput disabled label="Email" source="email" />
                <BooleanInput label="Email Verified" source="email_verified" />
                <TextInput source="details.name" />
                <TextInput source="details.address" />
                <DateInput source="details.birthday" />

            </SimpleForm>
        </Edit>
    )
}

export default UserEdit