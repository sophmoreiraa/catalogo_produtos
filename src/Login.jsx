import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';



function Login() {

  const [ email, setEmail ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] = useState( false );
  const [ erro, setErro ] = useState( false );
  const navigate = useNavigate();


    /*  */
  useEffect( () => {

    if( login ) {
        setEmail( "" );
        setSenha( "" );
        navigate( "/" );
    }

  }, [ login ] );

  function Autenticar( evento )
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json.user ) {
            localStorage.setItem( "usuario" , JSON.stringify( json.user._id) );
            setLogin( true );
        } else {
            localStorage.removeItem( "usuario" );
            setErro( true );
        }
    } )
    .catch( ( erro ) => {  setErro( true ) } )
    
  }

  return (
    <Container component="section" maxWidth="md" >
        <Box 
        sx={{ 
            mt: 10,
            backgroundColor: "#FFFF",
            fontFamily: 'monospace',
            color: "#2E0342",
            padding: "30px",
            borderRadius: "10px",
            borderStyle: 'outset',
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Typography component="h2" variant='h4' fontFamily= 'monospace'>Já esteve por aqui? ♡</Typography>
            <Typography component="span" variant='span' fontFamily= 'monospace'>“Tu te tornas eternamente responsável por aquilo que cativas” - O Pequeno Príncipe</Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Ops! Algo parece errado. Que tal revisar seus dados?</Alert> ) }
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                  type="email"
                  label="Email" 
                  variant="filled" 
                  margin="normal"
                  value={email}
                  onChange={ (e) => setEmail( e.target.value ) }
                  fullWidth
                />
                <TextField 
                  type="password" 
                  label="Senha" 
                  variant="filled" 
                  margin="normal" 
                  fullWidth
                  value={senha}
                  onChange={ (e) => setSenha( e.target.value ) }
                />
                <FormControlLabel
                    control={ <Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar( !lembrar ) } />}
                    label ="Lembrar-me"
                />
                <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2 }} size="large">Login</Button>
                <Grid container>
                    <Grid item xs>
                       Esqueci minha senha
                    </Grid>
                    <Grid item>
                        Ir para cadastro ⮎
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Login;