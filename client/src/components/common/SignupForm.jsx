import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import userApi from '../../api/modules/user.api';
import { setUser } from '../../redux/features/userSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

const SignupForm = ({ switchAuthState }) => {
    const dispatch = useDispatch();

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const signupForm = useFormik({
        initialValues: {
            password: '',
            username: '',
            displayName: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().min(8, 'Username minium 8 characters!').required('Username is required!'),
            password: Yup.string().min(8, 'Password minium 8 characters!').required('Password is required!'),
            confirmPassword: Yup.string()
                .min(8, 'ConfirmPassword minium 8 characters!')
                .required('ConfirmPassword is required!'),
            displayName: Yup.string().min(8, 'DisplayName minium 8 characters!').required('DisplayName is required!'),
        }),
        onSubmit: async (values) => {
            setErrorMessage(undefined);
            setIsLoginRequest(true);

            const { response, err } = await userApi.signup(values);

            setIsLoginRequest(false);

            if (response) {
                signupForm.resetForm();
                dispatch(setUser(response));
                dispatch(setAuthModalOpen(false));
                toast.success('Sign in success!');
            }

            if (err) setErrorMessage(err.message);
        },
    });
    return (
        <Box component="form" onSubmit={signupForm.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    type="text"
                    placeholder="Display name"
                    name="displayName"
                    fullWidth
                    value={signupForm.values.displayName}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
                    helperText={signupForm.touched.displayName && signupForm.errors.displayName}
                />

                <TextField
                    type="text"
                    placeholder="Username"
                    name="username"
                    fullWidth
                    value={signupForm.values.username}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.username && signupForm.errors.username !== undefined}
                    helperText={signupForm.touched.username && signupForm.errors.username}
                />

                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    fullWidth
                    value={signupForm.values.password}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.password && signupForm.errors.password !== undefined}
                    helperText={signupForm.touched.password && signupForm.errors.password}
                />

                <TextField
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    fullWidth
                    value={signupForm.values.confirmPassword}
                    onChange={signupForm.handleChange}
                    color="success"
                    error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
                    helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
                />
            </Stack>

            <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isLoginRequest}
            >
                Sign Up
            </LoadingButton>

            <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
                Sign In
            </Button>

            {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                    <Alert security="error" variant="outlined">
                        {errorMessage}
                    </Alert>
                </Box>
            )}
        </Box>
    );
};

export default SignupForm;
