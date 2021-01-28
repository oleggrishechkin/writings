import styled from 'styled-components';

const SettingsGroup = styled.div`
    align-items: stretch;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadowNear);
    overflow: hidden;
    > * {
        flex: 0 0 auto;
    }
    > *:not(:last-child) {
        border-bottom: 1px solid var(--gray-4);
    }
`;

export default SettingsGroup;
