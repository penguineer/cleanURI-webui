import React from 'react';
import DecoratedList from './DecoratedList';
import ErrorList from './ErrorList';
import UriInputForm from './UriInputForm';

class CleanUriForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestUri: undefined,
            message: undefined
        };
        
        this.onUriChange = this.onUriChange.bind(this);
        this.submitRequestEvent = this.onSubmit.bind(this);        
    }

    onUriChange(uri) {
        this.setState({
            requestUri: uri
        });
    }

    onSubmit() {
        console.log("Submit URI request");
    }

    render() {
        const message = this.state.message;
        return (
            <div>
                <UriInputForm requestUri={this.state.requestUri} 
                              changeHandler= {this.onUriChange} 
                              submitHandler={this.onSubmit}/>
                <ErrorList errors={(message && message.errors) ?  message.errors : null}/>
                <DecoratedList message={message} />                
            </div>
        )
    }
}

export default CleanUriForm;