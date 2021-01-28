import styled from 'styled-components';

const PrimaryButton = styled.button`
    background: var(--blue);
    border: none;
    border-radius: 10px;
    color: var(--white);
    cursor: pointer;
    font-family: inherit;
    font-size: var(--fontNormal);
    font-weight: bold;
    min-width: 200px;
    outline: none;
    padding: 1rem;
    transition: background 300ms, transform 300ms;
    box-shadow: var(--shadowNear);
    &:active {
        background: var(--teal);
        transform: scale(1.5);
    }
`;

PrimaryButton.defaultProps = {
    type: 'button'
};

export default PrimaryButton;
