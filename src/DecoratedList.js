import './DecoratedList.css';
import './DecoratedResult.css';

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
            <a href={message['canonized-uri']} target='_blank'>{message['canonized-uri']}</a>
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
            <div><a href={message['canonized-uri']} target='_blank'>{message.meta.id.value}</a> - {message.meta.title.value}</div>
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
        ["Plain Link", this.buildPlainResultContent, this.renderPlainResultItem, false],
        ["Dokuwiki", this.buildDokuwikiResultContent, this.renderDokuwikiResultItem, true],
        ["JSON", this.buildJsonResultContent, this.renderJsonResultItem, false]
    ];

    render() {
        const message = this.props.message;

        return !message ? null : (
            <ul className='DecoratedList'>
                {this.decorators.map((d) => {
                    const transformed = d[2](message);

                    return transformed
                        ? <li key={d[0]}><DecoratedResult title={d[0]} raw={d[1](message)} transformed={transformed}
                                show_raw={d[3]}/></li>
                        : null;
                })}
            </ul>
        );
    }
}

export default DecoratedList;