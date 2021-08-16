import React, { useEffect } from 'react';

const PageNotFound = () => {
    useEffect(() => {
        document.title = 'Page Not Found'
    }, []);
    return (
        <div>Page Not found.</div>
    );
};

export default PageNotFound;