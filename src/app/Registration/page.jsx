"use client"
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import supabase from '../../../utils/supabase/client';
import Link from 'next/link';
import Swal from 'sweetalert2';  // Import SweetAlert

const Register = () => {
    const router = useRouter();
    const [formData, setformData] = useState({
        email: '',
        password: '',
    });

    function handleChange(event) {
        setformData((prevformData) => ({
            ...prevformData,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });
            if (data) {
                Swal.fire({  // SweetAlert success alert
                    title: 'Sign Up Successful',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    router.push('/Signin');
                });
            }
            if (error) {
                Swal.fire({  // SweetAlert error alert
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            Swal.fire({  // SweetAlert unexpected error alert
                title: 'Unexpected Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                // backgroundColor: '  #004d40',
                padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0px 8px 16px rgba(226, 223, 223, 0.31)',
                    border: "2px solid #004d40",
                    "&:hover": {
                        borderColor: " #00796b",
                    },
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{
                    fontFamily: "-apple-system",
                    fontWeight: 'bold',
                    fontSize: 40,
                }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{
                            marginTop: 2,
                            padding: 1,
                            backgroundColor: '#004d40',
                            '&:hover': {
                                backgroundColor: '#00796b',
                                fontWeight: "bold"
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ marginTop: 2 }}
                    >
                        Already have an account?{' '}
                        <Link href="/Signin" style={{
                            color: '#1976d2',
                            fontWeight: "bold"
                        }}>
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
