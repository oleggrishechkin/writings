import styled from 'styled-components';

const TextButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 0;
    color: var(--blue);
    cursor: pointer;
    display: flex;
    font-family: inherit;
    font-size: inherit;
    justify-content: center;
    outline: none;
    transition: opacity 300ms, transform 300ms;
    &:active {
        opacity: 0.7;
        transform: scale(1.5);
    }
`;

TextButton.defaultProps = {
    type: 'button'
};

export default TextButton;
