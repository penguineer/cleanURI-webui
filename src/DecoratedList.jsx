import './DecoratedList.css';
import './DecoratedResult.css';
import './common.css';

import React from 'react';
import DecoratedResult from './DecoratedResult';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
github['hljs']['background'] = common_css['--result-background'];


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
            <a href={message['canonized-uri']} target='_blank' rel="noreferrer">{message['canonized-uri']}</a>
        );
    }

    buildMarkdownResultContent(message) {
        if (!hasCompleteContent(message)) 
            return null;

        return '['+message.meta.id.value+']('+message['canonized-uri']+') - '+message.meta.title.value;

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
            <div><a href={message['canonized-uri']} target='_blank' rel="noreferrer">{message.meta.id.value}</a> - {message.meta.title.value}</div>
        )
    }    

    buildJsonResultContent(message) {
        return JSON.stringify(message)
    } 

    renderJsonResultItem(message) {
        SyntaxHighlighter.registerLanguage('json', json);
        return (
            <SyntaxHighlighter
                    language="json" 
                    style={github}
                    wrapLongLines={true}>
               {JSON.stringify(message, null, 4)}
            </SyntaxHighlighter>
        );
    }
    decorators = [
        ["Plain Link", this.buildPlainResultContent, this.renderPlainResultItem, false],
        ["Markdown", this.buildMarkdownResultContent, this.renderDokuwikiResultItem, true],
        ["Dokuwiki", this.buildDokuwikiResultContent, this.renderDokuwikiResultItem, true],
        ["JSON", this.buildJsonResultContent, this.renderJsonResultItem, false]
    ];

    render() {
        const message = this.props.message;
        const hasErrors = this.props.hasErrors;

        return !message ? null : (
            <ul className='DecoratedList'>
                {this.decorators.map((d) => {
                    const transformed = d[2](message);

                    if (!transformed) {
                        return null;
                    }
                    
                    let el = <li key={d[0]} className={hasErrors ? 'error' : ''}><DecoratedResult title={d[0]} raw={d[1](message)} transformed={transformed} 
                    show_raw={d[3]}/></li>;

                    return el;
                })}
            </ul>
        );
    }
}

export default DecoratedList;
