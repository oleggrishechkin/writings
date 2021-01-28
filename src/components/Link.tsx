import styled from 'styled-components';
import navPush from '../actions/navPush';

const StyledLink = styled.a.attrs((props) => ({
    onClick: (event) => {
        event.preventDefault();
        navPush(props.href as string);
    }
}))`
    color: inherit;
    cursor: pointer;
    text-decoration: none;
`;

export default StyledLink;
