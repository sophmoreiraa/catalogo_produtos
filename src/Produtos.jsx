import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

function Livros() {

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ano, setAno] = useState("");
    const [duracao, setDuracao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagem, setImagem] = useState("");
    const [cadastro, setCadastro] = useState(false);
    const [erro, setErro] = useState(false);


    function Cadastrar(evento) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    imagem: imagem,
                    categoria: categoria,
                    usuario: localStorage.getItem( "usuario" )
                }
            )
        })
            .then((resposta) => resposta.json())
            .then((json) => {

                if (json._id) {
                    setCadastro(true);
                    setErro( false );
                } else {
                    setErro(true);
                    setCadastro( false );
                }
            })
            .catch((erro) => { setErro(true) })

    }


    return (
        <Container component="section" maxWidth="sm">
            <Box sx={{
                mt: 10,
                backgroundColor: "#FFF",
                fontFamily: 'monospace',
                padding: "30px",
                borderRadius: "10px",
                borderStyle: 'outset',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                 <Typography component="h2" variant='h4'fontFamily= 'monospace' >Novos livros em mente? ♡</Typography>
                 <Typography component="span" variant='span' fontFamily= 'monospace'>“O amor não força nada, ao contrário, ele abre caminhos.” - A cabana</Typography>
                { erro && (<Alert severity="warning">Ops! PArece que este livro já foi cadastrado. Que tal tentar outro?</Alert>) }
                { cadastro && ( <Alert severity="success">Sucesso! Agradecemos seu cadastro :)</Alert> )}
                <Box component="form" onSubmit={Cadastrar}>
                    <TextField
                        type="text"
                        label="Título"
                        variant="filled"
                        margin="normal"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label="Sinopse"
                        variant="filled"
                        margin="normal"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label="Número de Páginas"
                        variant="filled"
                        margin="normal"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label="Autor(a)"
                        variant="filled"
                        margin="normal"
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label="Categoria"
                        variant="filled"
                        margin="normal"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        label="Url da Imagem"
                        variant="filled"
                        margin="normal"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >Cadastrar</Button>
                    <Grid container>
                    <Grid item xs>
                        Voltar ao mural de livros ⮌
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Livros;