import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios'
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Edit() {
  const Edit = (event) => {
    Axios.put('http://localhost:5000/ticket',{
      name : name,
      description : description,
      contact : contact,
      information : information 
    }).then((result) => {
        if(result['status'] === 200){
          window.location.href = '/ticket'
        }
    });
  }
  
  
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [contact,setContact] = useState('');
    const [information,setInformation] = useState('');
    

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1"variant="h5">
            Ticket
          </Typography>
          <Box component="form" noValidate sx={{ mt: 5 }}>
            <TextField
              margin="normal"
              required
               sx={{ width: 700}}
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="contact"
              label="contact"
              name="contact"
              autoComplete="contact"
              autoFocus
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="information"
              label="information"
              type="information"
              id="information"
              onChange={(e) => setInformation(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'Green'}}          
             component="a" onClick={Edit} 
             textAlign="center" href='/request'
             >UPDATE
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  variant="body2">
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}