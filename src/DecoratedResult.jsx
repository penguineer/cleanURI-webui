import './DecoratedResult.css';

import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard-ts";

class DecoratedResult extends React.Component {
    render() {
        return (
            <div className='DecoratedResult'>
                <div className='header'>
                    <h3>{this.props.title}</h3>
                    <CopyToClipboard text={this.props.raw}>
                        <span className='clipboard'>Copy to clipboard</span>
                    </CopyToClipboard>
                </div>
                <div className='result'>
                    <div className='html>'>{this.props.transformed}</div>
                    {
                        this.props.show_raw 
                            ? <div className='raw'>{this.props.raw}</div>
                            : null
                    }                    
                </div>
                
            </div>
        );
    }
}

export default DecoratedResult; 
