import React from 'react';
import DecoratedList from './DecoratedList';
import ErrorList from './ErrorList';
import UriInputForm from './UriInputForm';

const api = "http://localhost:8080/"

class CleanUriForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestUri: "",
            message: undefined,
            errors: []
        };
        
        this.onUriChange = this.onUriChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);        
    }

    onUriChange(uri) {
        this.setState({
            requestUri: uri
        });
    }

    onSubmit(uri) {
        let requestUri = this.state.requestUri;
        if (uri) {
            requestUri = uri;
            this.onUriChange(uri);
        }

        const url = api + 'reduce?meta=IT&uri=' + encodeURIComponent(requestUri);
        fetch(url, {
            mode: 'cors'
        })
        .then(
            (response) => {
                let errors = []
                if (response.ok) {
                    response.json().then(
                        (result) => {
                            this.setState({
                                message: result
                            });
                            if (result.errors) 
                                result.errors.map((e) => errors.push(e));
                        },
                        (error) => {
                            if (error)
                                errors.push(error);
                        }
                    );
                } else {
                    response.json().then(
                        (result) => {
                            if (result.message)
                                errors.push(result.message)
                            if (result._embedded && result._embedded.errors)
                            result._embedded.errors.map((e) => errors.push(e.message));
                        },
                        (error) => {
                            if (error)
                                errors.push(error);
                        }
            
                    );
                }
                if (errors) 
                this.setState({
                    errors: errors
                });
            });
    }

    render() {
        const message = this.state.message;
        const errors = this.state.errors;
        return (
            <div>
                <UriInputForm requestUri={this.state.requestUri} 
                              changeHandler= {this.onUriChange} 
                              submitHandler={this.onSubmit}/>
                <ErrorList errors={errors}/>
                <DecoratedList message={message} />                
            </div>
        )
    }
}

export default CleanUriForm;