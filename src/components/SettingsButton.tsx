import styled from 'styled-components';

const SettingsButton = styled.button`
    background: var(--secondary-background);
    border: none;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: var(--fontNormal);
    outline: none;
    padding: 1rem;
    text-align: start;
    transition: background 300ms;
    &:active {
        background: var(--gray-4);
    }
`;

SettingsButton.defaultProps = {
    type: 'button'
};

export default SettingsButton;
