import './CleanUriForm.css';
import React from 'react';
import DecoratedList from './DecoratedList';
import ErrorList from './ErrorList';
import UriInputForm from './UriInputForm';


const getApiGateway = function() {
    const default_api = "http://localhost:8080/"

    return (
        window.ENV && window.ENV.REACT_APP_API_GATEWAY 
        ? window.ENV.REACT_APP_API_GATEWAY + "/"
        : default_api
    );
}

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

        const url = getApiGateway() + 'reduce?meta=IT&uri=' + encodeURIComponent(requestUri);
        fetch(url, {
            mode: 'cors'
        })
        .then(
            (response) => 
                response.ok 
                ?   response.json().then(
                        (result) => 
                            this.setState({
                                message: result,
                                errors: result.errors ? result.errors : []
                            }),
                        (error) => 
                            this.setState({
                                message: undefined,
                                errors: [error]
                            })
                    )
                :   response.json().then(
                        (result) => {
                            let errors = []
                            if (result.message)
                                errors.push(result.message)
                            if (result._embedded && result._embedded.errors)
                            result._embedded.errors.map((e) => errors.push(e.message));
                            this.setState({
                                message: undefined,
                                errors: errors
                            })
                        },
                        (error) => 
                            this.setState({
                                message: undefined,
                                errors: [error]
                            })
                    )              
            
        )                        
        .catch((error) => 
            this.setState({
                message: undefined,
                errors: [error.message]
            })
        );
    }

    render() {
        const message = this.state.message;
        const errors = this.state.errors;
        return (
            <div className="cleanUriForm">
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