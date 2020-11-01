import React from 'react';

const defaultProps = {
    title : 'Stock App'
};

const Header = ({title}) => {
    return (
        <header>
            <center>
                <h1>{title}</h1>
            </center>
        </header>
    );
}

Header.defaultProps = defaultProps;
export default Header;