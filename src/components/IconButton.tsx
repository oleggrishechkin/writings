import styled from 'styled-components';

const IconButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
    display: flex;
    fill: var(--blue);
    justify-content: center;
    outline: none;
    transition: opacity 300ms;
    &:active {
        opacity: 0.7;
    }
    &[data-gray='true'] {
        fill: var(--gray);
    }
`;

export default IconButton;
