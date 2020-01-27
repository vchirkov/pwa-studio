import React from 'react';
import ContentTypeFactory from './factory';
import detectPageBuilder from './detectPageBuilder';
import parseStorageHtml from './parseStorageHtml';

const fixture =
    process.env.NODE_ENV === 'development' &&
    window.location.hash === '#pb-mock' &&
    require('./__fixtures__/cms_page_books.json');

/**
 * Page Builder component for rendering Page Builder master storage format in React
 *
 * @param data
 * @returns {*}
 * @constructor
 */
const PageBuilder = ({ html }) => {
    if (fixture) {
        html = fixture;
    }
    if (!detectPageBuilder(html)) {
        return null;
    }
    const data = parseStorageHtml(html);
    return data.children.map((child, i) => {
        return <ContentTypeFactory key={i} data={child} />;
    });
};

export default PageBuilder;
