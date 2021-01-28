import styled from 'styled-components';

const MenuIconButton = styled.button`
    background: var(--gray-6);
    border: none;
    border-radius: 0;
    cursor: pointer;
    fill: var(--blue);
    font-family: inherit;
    font-size: var(--fontNormal);
    outline: none;
    padding: 1rem;
    transition: background 300ms;
    &:active {
        background: var(--gray-4);
    }
    &[data-active='true'] {
        fill: var(--teal);
    }
`;

export default MenuIconButton;
