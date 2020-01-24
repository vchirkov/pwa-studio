import { useQuery } from '@apollo/react-hooks';

import { useCartContext } from '../../../context/cart';

const usePriceAdjustments = ({ query }) => {
    const { cartId } = useCartContext();

    const { data } = useQuery(query, {
        variables: {
            cartId
        }
    });

    return {
        queryData: data
    };
};

export default usePriceAdjustments;
