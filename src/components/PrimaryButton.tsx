import styled from 'styled-components';

const PrimaryButton = styled.button`
    background: var(--blue);
    border: none;
    border-radius: 10px;
    color: var(--white-persist);
    cursor: pointer;
    font-family: inherit;
    font-size: var(--fontNormal);
    font-weight: bold;
    min-width: 200px;
    outline: none;
    padding: 1rem;
    transition: background 300ms;
    &:active {
        background: var(--teal);
    }
`;

export default PrimaryButton;
