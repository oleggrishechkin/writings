import styled from 'styled-components';
import Router from '../classes/Router';

const StyledLink = styled.a.attrs((props) => ({
    onClick: (event) => {
        event.preventDefault();
        Router.push(props.href as string);
    }
}))`
    color: inherit;
    cursor: pointer;
    text-decoration: none;
`;

export default StyledLink;
