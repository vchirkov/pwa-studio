import React from 'react';
import gql from 'graphql-tag';

import usePriceAdjustments from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/usePriceAdjustments';

import { Accordion, Section } from '../../Accordion';

import GiftOptions, { GiftOptionsFragment } from './GiftOptions';

import { mergeClasses } from '../../../classify';
import defaultClasses from './priceAdjustments.css';

const PriceAdjustments = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { queryData = {} } = usePriceAdjustments({
        query: PriceAdjustmentsQuery
    });

    return (
        <div className={classes.root}>
            <Accordion canOpenMultiple={true}>
                <Section
                    id={'shipping_method'}
                    isOpen={true}
                    title={'Select Shipping Method'}
                >
                    <a href="https://jira.corp.magento.com/browse/PWA-239">
                        Shipping Methods to be completed by PWA-239.
                    </a>
                </Section>
                <Section id={'coupon_code'} title={'Enter Coupon Code'}>
                    <a href="https://jira.corp.magento.com/browse/PWA-75">
                        Coupon Codes to be completed by PWA-75.
                    </a>
                </Section>
                <Section id={'gift_card'} title={'Apply Gift Card'}>
                    <a href="https://jira.corp.magento.com/browse/PWA-78">
                        Gift Cards to be completed by PWA-78.
                    </a>
                </Section>
                <Section id={'gift_options'} title={'See Gift Options'}>
                    <GiftOptions data={queryData.giftOptions} />
                </Section>
            </Accordion>
        </div>
    );
};

const PriceAdjustmentsQuery = gql`
    query PriceAdjustments($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...GiftOptionsFragment
        }
    }
    ${GiftOptionsFragment}
`;

export default PriceAdjustments;
