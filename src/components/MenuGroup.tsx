import styled from 'styled-components';

const MenuGroup = styled.div`
    align-items: stretch;
    display: flex;
    overflow: hidden;
    &:not([data-horizontal='true']) {
        border-radius: 10px;
        flex-direction: column;
    }
    &:not([data-horizontal='true']) > * {
        flex: 0 0 auto;
    }
    &[data-horizontal='true'] > * {
        flex: 1 0 auto;
    }
    &:not([data-horizontal='true']) > *:not(:last-child) {
        border-bottom: 1px solid var(--gray-4);
    }
    &[data-horizontal='true'] > *:not(:last-child) {
        border-right: 1px solid var(--gray-4);
    }
`;

export default MenuGroup;
