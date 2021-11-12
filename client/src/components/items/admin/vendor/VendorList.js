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
                <TextField label="email" source='user.email' />
                <TextField label="Name" source='name' />
                <BooleanField label="Is Accepted" source='flag' />
                <TextField label="Type" source='type' />
                <TextField label="Address" source='address' />
                <DateField label="Created Date" source="createdAt" />
            


            

                <ShowButton />
                <EditButton />

                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    )
}

export default VendorList