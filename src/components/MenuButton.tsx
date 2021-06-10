import styled from 'styled-components';

const StyledMenuButton = styled.button`
    background: var(--gray-6);
    border: none;
    border-radius: 0;
    color: var(--blue);
    cursor: pointer;
    font-family: inherit;
    font-size: var(--fontNormal);
    outline: none;
    padding: 1rem;
    transition: background 300ms;
    &:active {
        background: var(--gray-4);
    }
    &[data-active='true'] {
        color: var(--teal);
    }
`;

export default StyledMenuButton;
