import React from 'react';

const SystemMessage = ({ content }) => {
    return (
        <div className="system-message">
            <p>{content}</p>
        </div>
    );
};

export default SystemMessage;