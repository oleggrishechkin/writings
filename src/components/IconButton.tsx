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
    transition: opacity 300ms, transform 300ms;
    filter: drop-shadow(var(--shadowFar));
    &:active {
        opacity: 0.7;
        transform: scale(1.5);
    }
    &[data-gray='true'] {
        fill: var(--gray);
    }
`;

IconButton.defaultProps = {
    type: 'button'
};

export default IconButton;
