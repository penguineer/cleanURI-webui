import React from 'react';
import DecoratedResult from './DecoratedResult';


const hasCompleteContent = function(message) {
    return (
        message && 
        message['canonized-uri'] &&
        message.meta &&
        message.meta.id && message.meta.id.value &&
        message.meta.title && message.meta.title.value
    );
}


class DecoratedList extends React.Component {
    buildPlainResultContent(message) {
        return message['canonized-uri'] ? message['canonized-uri'] : null;
    }

    renderPlainResultItem(message) {
        if (!message['canonized-uri'])
            return null;

        return (
            <div>
                <a href={message['canonized-uri']}>{message['canonized-uri']}</a>
            </div>
        );
    }


    buildDokuwikiResultContent(message) {
        if (!hasCompleteContent(message)) 
            return null;

        return '[['+message['canonized-uri']+'|'+message.meta.id.value+']] - '+message.meta.title.value;
    }    

    renderDokuwikiResultItem(message) {
        if (!hasCompleteContent(message)) 
            return null;

        return (
            <div>
                <div><a href={message['canonized-uri']}>{message.meta.id.value}</a> - {message.meta.title.value}</div>
                <div>[[{message.meta.id.value}|{message['canonized-uri']}]] - {message.meta.title.value}</div>
            </div>
        )
    }    

    buildJsonResultContent(message) {
        return JSON.stringify(message)
    } 

    renderJsonResultItem(message) {
        return (
            <div>{JSON.stringify(message)}</div>
        );
    }
    decorators = [
        ["plain", this.buildPlainResultContent, this.renderPlainResultItem],
        ["dokuwiki", this.buildDokuwikiResultContent, this.renderDokuwikiResultItem],
        ["json", this.buildJsonResultContent, this.renderJsonResultItem]
    ];

    render() {
        const message = this.props.message;

        return !message ? null : (
            <ul>
                {this.decorators.map((d) => {
                    const transformed = d[2](message);

                    return transformed
                        ? <li key={d[0]}><DecoratedResult content={d[1](message)} transformed={transformed}/></li>
                        : null;
                })}
            </ul>
        );
    }
}

export default DecoratedList;