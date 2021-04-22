import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import ListGroup from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

function List(){

    const [posts,setPosts] = useState([
        {
            name: "Hello", 
        },
        {
            name: "world", 
        }
    ]);

    const fetchPokes = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100');
        if(response.ok){

            const data = await response.json();
            console.log(data);
            setPosts(data.results);

        }else{
            console.log('bad response');
        }
    }

    useEffect(()=>{
        fetchPokes();
    },[])

    return(
        <Container maxWidth="sm">
            <Paper>
            <ListGroup>
                {

                    posts.map((post) => {
                        return(
                            <ListItem>
                                <ListItemText
                            primary={post.name}
                            />
                             <Divider  />
                            </ListItem>
                    
                        )

                    })

                }
            </ListGroup>
            </Paper>
        </Container>
    );

}

export default List;