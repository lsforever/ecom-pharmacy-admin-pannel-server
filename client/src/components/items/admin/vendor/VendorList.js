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
    <QuickFilter source="flag" label="Not Accepted" defaultValue={false} />,
];

const VendorList = (props) => {
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

export default VendorList