import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Produto from './components/Produtos';
import MenuResponsivo from "./components/MenuResponsivo";


function App() {

    const [ produtos, setProdutos ] = useState();
    const [ erro, setErro ] = useState();

    useEffect(() => {

        const usuario = localStorage.getItem( "usuario");
   

        fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario , {
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => setProdutos( json ) )
        .catch( ( erro ) => { setErro( true ) } )
    }, [])

    function Excluir( evento, id ) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos" , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                usuario: localStorage.getItem( "usuario")
                
            })
        } )
        .then( ( resposta ) => resposta.json() )
        .then( ( json ) => {
            const novaLista = produtos.filter( ( produtos ) => produtos._id !== id );
            setProdutos( novaLista );
        })
        .catch( ( error ) => setErro( true ) )
    }
    return (
        <>
        <MenuResponsivo />
            <Container sx={{ 
                display: "flex" ,
                flexFlow: "row",
                flexWrap: "wrap",
                gap: "2rem"
            }}>
            { produtos && (
                produtos.map( (produtos, index ) => ( 
                    <Produto
                        imagem={produtos.imagem}
                        titulo={produtos.titulo}
                        descricao={produtos.descricao}
                        categoria={produtos.categoria}
                        ano={produtos.ano}
                        autor={produtos.autor}
                        excluir={ (e) => Excluir( e, produtos._id ) }
                        id={produtos._id}
                    />
                ) )
            ) }
            </Container>
        </>
    );
}

export default App;
