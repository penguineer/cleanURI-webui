import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";

class DecoratedResult extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.transformed}</div>
                <CopyToClipboard text={this.props.content}>
                    <span>Copy to clipboard</span>
                </CopyToClipboard>
            </div>
        );
    }
}

export default DecoratedResult; 
