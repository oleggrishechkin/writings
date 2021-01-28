import styled from 'styled-components';

interface IEditorRenderProps {
    value?: string;
}

const EditorRender = styled.div.attrs<IEditorRenderProps>((props) => ({
    dangerouslySetInnerHTML: { __html: props.value || '' }
}))<IEditorRenderProps>`
    background: transparent;
    word-break: break-word;
    outline: none;
    overflow: hidden;
    * {
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-style: normal;
        font-weight: normal;
        -webkit-tap-highlight-color: transparent;
        text-decoration-line: none;
    }
    h1 {
        font-size: var(--fontBig);
        margin: 0.5rem 0;
    }
    ol,
    ul {
        margin: 0.5rem 0;
        padding-left: 3rem;
    }
`;

export default EditorRender;
