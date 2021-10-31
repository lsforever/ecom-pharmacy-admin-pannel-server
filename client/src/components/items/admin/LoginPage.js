import React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

import { Button, TextField, Typography, Box, Grid } from '@mui/material';

const CustomLoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login({ email, password }).catch(() => {
            notify('Inavalid Credentials','Login Failed')
            //notify("Inavalid Credentials", { ...restOfArguments })
        });
    };

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Box

                        alignContent='center'
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 5,
                            padding: 5,
                            height: 350,
                        }}
                    >
                        <Typography
                            paddingTop='20px'
                            align='center'
                            component='h1'
                            variant='h5'
                        >
                            Log In
                        </Typography>
                        <form onSubmit={submit}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                type='email'
                                label='Email'
                                name='email'
                                autoComplete='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                type='password'
                                label='Password'
                                name='pasword'
                                autoComplete='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <Box>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    variant='contained'
                                    type='submit'
                                    sx={{
                                        marginTop: 2,
                                    }}
                                >
                                    Log In
                                </Button>
                            </Box>

                        </form>
                        
                    </Box>
                </Grid>
            </Grid>

            <Notification />
        </div>
    );
};

export default CustomLoginPage;
