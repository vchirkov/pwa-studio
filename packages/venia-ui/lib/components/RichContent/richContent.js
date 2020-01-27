import React from 'react';
// import PageBuilder, { detectPageBuilder } from '@magento/pagebuilder';
import { mergeClasses } from '../../classify';
import defaultClasses from './richContent.css';
import { shape, string } from 'prop-types';
import richContentRenderers from './richContentRenderers';

/**
 * RichContent component.
 *
 * This component serves as the pool to determine which type of content is being rendered
 * and pass the data off to the correct system.
 *
 * @typedef RichContent
 * @kind functional component
 *
 * @param {Object} props React component props
 *
 * @returns {React.Element} A React component that renders Heading with optional styling properties.
 */
const RichContent = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    for (const Renderer of richContentRenderers) {
        const output = <Renderer {...props} />;
        if (output !== null) {
            return <div className={classes.root}>{output}</div>;
        }
    }
    // If no renderer returned a value
    if (process.env.NODE_ENV === 'development') {
        console.warn(
            `None of the following rich content renderers returned anything for the provided HTML.`,
            richContentRenderers.map(r => `<${r.name}>`),
            props.html
        );
    }
    return null;
};

/**
 * Props for {@link RichContent}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the RichContent
 * @property {String} classes.root CSS class for the root container element
 * @property {String} html Content
 */
RichContent.propTypes = {
    classes: shape({
        root: string
    }),
    html: string
};

export default RichContent;
