import React from 'react';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';

import { mergeClasses } from '../../../classify';
import LoadingIndicator from '../../LoadingIndicator';
import defaultClasses from './productListing.css';
import { GetProductListing } from './productListing.graphql';
import Product from './product';

const ProductListing = props => {
    const talonProps = useProductListing({ query: GetProductListing });
    const { isLoading, items } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    if (isLoading) {
        return <LoadingIndicator>{`Fetching Cart...`}</LoadingIndicator>;
    }

    if (items.length) {
        const productComponents = items.map(product => (
            <Product item={product} key={product.id} />
        ));

        return <ul className={classes.root}>{productComponents}</ul>;
    } else {
        return <h3>There are no items in your cart.</h3>;
    }
};

export default ProductListing;
