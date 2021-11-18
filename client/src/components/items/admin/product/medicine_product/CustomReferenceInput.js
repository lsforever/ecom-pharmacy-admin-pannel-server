import React, { useState, useCallback } from 'react';
//import { useFormState } from 'react-final-form';
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import QuickCreateButton from './QuickCreateButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
});

//const spySubscription = { values: true };

const CustomReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    //const { values } = useFormState({ subscription: spySubscription });
    const handleChange = useCallback(() => setVersion(version + 1), [version]);

    return (
        
        <div className={classes.root}>




            <div>
                <ReferenceInput {...props} key={version}  label={props.resource_name} >
                    <AutocompleteInput optionText="name" optionValue="_id" />
                </ReferenceInput>

            </div>

            <QuickCreateButton onChange={handleChange} {...props} />


        </div>
    );
};

export default CustomReferenceInput;
