import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { User } from '@/interfaces/User';

interface SignUpComponentProps {
  onSubmit: (userData: User) => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ onSubmit }) => {
  const [userData, setUserData] = useState<User>({
    email: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    age: 0,
    birthday: new Date(),
    phone_number: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="middle_name"
              label="Middle Name"
              name="middle_name"
              value={userData.middle_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={userData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="birthday"
              label="Birthday"
              name="birthday"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={userData.birthday}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpComponent;
