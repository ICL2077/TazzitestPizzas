import React from 'react';
import ContentLoader from 'react-content-loader';

const CartSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="49" cy="73" r="46" />
        <rect x="113" y="48" rx="0" ry="0" width="212" height="18" />
        <rect x="111" y="89" rx="0" ry="0" width="165" height="16" />
    </ContentLoader>
);

export default CartSkeleton;
