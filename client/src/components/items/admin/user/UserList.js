import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    BooleanField,
    DeleteWithConfirmButton,
    TextInput,
    ShowButton,

    
    SelectInput,

    useTranslate


} from 'react-admin'


import { makeStyles, Chip } from '@material-ui/core';

const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));
const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={translate(label)} />;
};

const postFilters = [
    <TextInput label="Search by Name" source="details.name" alwaysOn />,
    <TextInput label="By Email" source="email" />,
    <TextInput label="By Id" source="id" />,
    <TextInput label="By Address" source="details.address" />,
 
    <SelectInput label="Role" source="roles.type" alwaysOn choices={[
        { id: 'owner', name: 'Owner' },
        { id: 'admin', name: 'Admin' },
        { id: 'vendor', name: 'Vendor' },
        { id: 'delivery_person', name: 'Delivery Person' },
    ]} />,
    <QuickFilter source="email_verified" label="Email Not Verified" defaultValue={false} />,
    <QuickFilter source="createdAt" label="Created Today" defaultValue={Date.now()} />,
];

const UserList = (props) => {
    return (
        <List {...props} filters={postFilters} >
            <Datagrid>
                <TextField label="Id" source='id' />
                <TextField label="Email" source='email' />
                <BooleanField label="Email Verified" source="email_verified" />
                <DateField label="Created Date" source="createdAt" />
                <TextField label="Name" source="details.name" />
                <TextField label="Address" source="details.address" />
                <DateField label="Birthday" source="details.birthday" />

                <ShowButton />
                <EditButton />

                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default UserList