import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { OthersSelector } from 'src/redux/others/slice';

const Loading = () => {
    const isLoading = useSelector(OthersSelector.isLoading);
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [isLoading]);
    return (
        <>
            {isLoading && (
                <div className="fade show loading">
                    <i className="spinner-grow spinner-grow-sm"></i>
                    <span className="m-1">Loading...</span>
                </div>
            )}
        </>
    );
};

export default Loading;
