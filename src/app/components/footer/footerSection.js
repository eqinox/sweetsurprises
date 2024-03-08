import React from 'react';

const FooterSection = ({ title, icon, textArray }) => {

    return (
        <div>
            <p style={{ color: 'yellow', fontSize: '2rem' }}>
                {icon} {title}
            </p>
            <ul
                style={{ listStyleType: 'none' }}
            >
                {textArray.map((item, index) => <li key={index}>
                    {item}
                </li>)}
            </ul>

        </div>
    );
};

export default FooterSection;