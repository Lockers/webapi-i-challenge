import React from 'react';
import Styled from 'styled-components';

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
    
    return (
        <Div>
            <form onSubmit={(event) => props.updateUser(props.user.id)}>
                <input
                    type='text'
                    name='name'
                />
                <input
                    type='text'
                    name='bio'
                />
                <button>Update User</button>
            </form>
            <p>Name: {props.user.name}</p>
            <p>Bio: {props.user.bio}</p>
            <p>Date Created: {props.user.created_at}</p>
            <button onClick={(event) => props.deleteUser(props.user.id)}>Delete</button>
        </Div>
    )
}