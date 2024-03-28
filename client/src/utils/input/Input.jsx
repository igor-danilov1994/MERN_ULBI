import React from 'react';
import './Input.module.scss'

export const Input = (props) => {

    const onChange = (value) => {
        props.setValue(value)
    }

    return (
        <input onChange={(event) => onChange(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
    );
};
