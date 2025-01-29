"use client"
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import supabase from '../../../utils/supabase/client';
import Link from 'next/link';

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
                alert("Registration Successful");
                router.push('/Signin');
            }
            if (error) {
                alert(error.message);
            }
        } catch (error) {
            alert("Unexpected error: " + error.message);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '  #004d40',
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
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{
                    fontFamily:"-apple-system",
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
                                fontWeight:"bold"
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
                            fontWeight:"bold" 
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
