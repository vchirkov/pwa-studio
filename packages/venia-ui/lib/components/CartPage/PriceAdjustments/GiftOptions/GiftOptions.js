import React, { useCallback, useMemo } from 'react';
import gql from 'graphql-tag';
import useGiftOptions from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/useGiftOptions';

import Checkbox from '../../../Checkbox';
import TextArea from '../../../TextArea';
import { mergeClasses } from '../../../../classify';

import defaultClasses from './giftOptions.css';

/**
 * Local query. GQL support is not available as of today.
 *
 * Once available, we can change the query to match the schema.
 */
export const GiftOptionsFragment = gql`
    fragment GiftOptions on Cart {
        gift_options @client {
            include_gift_receipt
            include_printed_card
            gift_message
        }
    }
`;

const GiftOptions = props => {
    const [
        { includeGiftReceipt, includePrintedCard, giftMessage },
        {
            toggleIncludeGiftReceiptFlag,
            toggleIncludePrintedCardFlag,
            updateGiftMessage
        }
    ] = useGiftOptions({ data: props.data });

    const setGiftMessage = useCallback(
        e => {
            updateGiftMessage(e.target.value);
        },
        [updateGiftMessage]
    );

    const classes = useMemo(() => mergeClasses(defaultClasses, props.classes), [
        props.classes
    ]);

    return (
        <div className={classes.root}>
            <ul>
                <Checkbox
                    id="includeGiftReceipt"
                    field="includeGiftReceipt"
                    label="Include gift receipt"
                    fieldState={{
                        value: includeGiftReceipt
                    }}
                    onClick={toggleIncludeGiftReceiptFlag}
                />
            </ul>
            <ul>
                <Checkbox
                    id="includePrintedCard"
                    field="includePrintedCard"
                    label="Include printed card"
                    fieldState={{ value: includePrintedCard }}
                    onClick={toggleIncludePrintedCardFlag}
                />
            </ul>
            <ul>
                {includePrintedCard && (
                    <TextArea
                        id="cardMessage"
                        field="cardMessage"
                        placeholder="Enter your message here"
                        initialValue={giftMessage}
                        onChange={setGiftMessage}
                    />
                )}
            </ul>
        </div>
    );
};

export default GiftOptions;
