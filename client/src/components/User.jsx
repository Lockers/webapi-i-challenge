import React from 'react';
import Styled from 'styled-components';
import axios from 'axios';

const Div = Styled.div`
    display: flex;
    border: 1px solid red;
    width: 30%;
    justify-content: center;
    margin: 10px auto;
    max-width: 800px;
    flex-direction: column;
    text-align: center;
`

export const User = (props) => {
    const deleteUser = ( id ) => {
        
        axios
            .delete(`http://localhost:8000/api/users/${id}`)
            .then(res => {
            console.log('Deleted')
            })
            .catch(err => {
            console.log(err)
            })
        props.getUsers()
    }
    return (
        <Div>
            <p>Name: {props.user.name}</p>
            <p>Bio: {props.user.bio}</p>
            <p>Date Created: {props.user.created_at}</p>
            <button onClick={(event) => deleteUser(props.user.id)}>Delete</button>
        </Div>
    )
}