import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    useCreate,
    useNotify,
    FormWithRedirect
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    quick: {
        marginLeft: '10px',
        marginBottom: '15px',
    }
});

function QuickCreateButton({ onChange ,reference, resource_name ,source }) {

    const classes = useStyles();

    const [showDialog, setShowDialog] = useState(false);
    const [create, { loading }] = useCreate(reference);
    const notify = useNotify();
    const form = useForm();

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleSubmit = async values => {
        create(
            { payload: { data: values } },
            {
                onSuccess: ({ data }) => {
                    setShowDialog(false);
                    // Update the comment form to target the newly created post
                    // Updating the ReferenceInput value will force it to reload the available posts
                    form.change(source, data.id);
                    onChange();
                },
                onFailure:  error  => {
                    notify(error.message, 'error');
                }
            }
        );
    };

    return (
        <>
            <Button
            className={classes.quick}
             onClick={handleClick} 
             label="ra.action.create">
                <IconContentAdd />
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label={`Create ${resource_name}`}
            >
                <DialogTitle>{`Create ${resource_name}`}</DialogTitle>

                <FormWithRedirect
                    resource={reference}
                    save={handleSubmit}
                    render={({
                        handleSubmitWithRedirect,
                        pristine,
                        saving
                    }) => (
                        <>
                            <DialogContent>
                                <TextInput
                                    lable="Name"
                                    source="name"
                                    validate={required()}
                                    fullWidth
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button
                            
                                    label="ra.action.cancel"
                                    onClick={handleCloseClick}
                                    disabled={loading}
                                >
                                    <IconCancel />
                                </Button>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    pristine={pristine}
                                    saving={saving}
                                    disabled={loading}
                                />
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
        </>
    );
}

export default QuickCreateButton;