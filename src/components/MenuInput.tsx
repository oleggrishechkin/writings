import styled from 'styled-components';

const MenuInput = styled.input`
    background: var(--secondary-background);
    border: none;
    border-radius: 0;
    color: inherit;
    font-family: inherit;
    font-size: var(--fontNormal);
    line-height: inherit;
    outline: none;
    user-select: text;
    padding: 1em;
    transition: background 300ms;
    &:active {
        background: var(--gray-4);
    }
    &::placeholder {
        color: var(--gray);
    }
`;

export default MenuInput;
