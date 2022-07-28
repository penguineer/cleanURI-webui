import React from 'react';

class ErrorList extends React.Component {
    render() {
        const errors = this.props.errors;

        return !errors ? null :
        (
            <ul>
            {this.props.errors.map(
                (error, index) =>
                    <li key={index}>{error}</li>
            )}
            </ul>
        );
    }
};

export default ErrorList;