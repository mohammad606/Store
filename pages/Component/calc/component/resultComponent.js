import React, { Component } from 'react';
import style from '../../../../styles/calc.module.css';

class ResultComponent extends Component {
    render() {
        let { result } = this.props;

        return (
            <div className={style.result}>
                <p>{ result }</p>
            </div>
        )
    }
}

export default ResultComponent;