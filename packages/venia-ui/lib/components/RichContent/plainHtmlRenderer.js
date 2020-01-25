import React from 'react';

const toHTML = str => ({ __html: str });

export default function PlainHtmlRenderer({ html }) {
    if (!html) {
        return null;
    }
    return <div dangerouslySetInnerHTML={toHTML(html)} />;
}
