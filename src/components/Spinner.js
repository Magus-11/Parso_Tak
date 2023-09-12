import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
    render() {
        return ( 
            <div className = 'text-center'>
            <img className="my-3" src = { loading } alt = "" style ={{width : "35px", height:"35px"}}/>
            </div>
        )
    }
}


export default Spinner;