import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-blok"
        speed={2}
        width={260}
        height={500}
        viewBox="0 0 260 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="130" cy="143" r="131" />
        <rect x="31" y="291" rx="0" ry="0" width="195" height="24" />
        <rect x="10" y="338" rx="0" ry="0" width="245" height="78" />
        <rect x="12" y="443" rx="0" ry="0" width="104" height="20" />
        <rect x="151" y="441" rx="0" ry="0" width="104" height="30" />
    </ContentLoader>
);

export default Skeleton;
