import './UriInputForm.css';

import React from 'react';

class UriInputForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {        
        this.props.changeHandler(e.target.value);
    }

    handleSubmit(e) {
        this.props.submitHandler();
        e.preventDefault();
    }

    render() {
        const requestUri = this.props.requestUri;

        return (
            <div className='input-form'>
            <div>
                <label htmlFor="request-uri">URL</label>
                <span className='clipboard'>Copy from clipboard</span>
            </div>
            <form onSubmit={this.handleSubmit}>
                    <input type="text" name="request-uri" value={requestUri} onChange={this.handleChange} />
                    <input type="submit" value="▶️"/>
                </form>
            </div>
        )
    };
}

export default UriInputForm;
