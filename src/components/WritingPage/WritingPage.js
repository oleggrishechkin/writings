import { createSignal, Show } from 'solid-js';
import putWriting from '../../actions/putWriting';
import ArrowBackIosIcon from '../../icons/arrow_back_ios-24px.svg';
import MoreHorizIcon from '../../icons/more_horiz-24px.svg';
import History from '../../proxies/History';
import createWritingSignal from '../../signals/createWritingSignal';
import matchPath from '../../utils/matchPath';
import translate from '../../utils/translate';
import Content from '../Content/Content';
import Date from '../Date/Date';
import Editor from '../Editor/Editor';
import EditorMenu from '../EditorMenu/EditorMenu';
import Header from '../Header/Header';
import IconButton from '../IconButton/IconButton';
import Menu from '../Menu/Menu';
import WritingMenu from '../WritingMenu/WritingMenu';
import theme from './WritingPage.module.css';

const WritingPage = () => {
    const { localId, writingId } = matchPath('/writings/:localId/:writingId', window.location.pathname);
    const writingSignal = createWritingSignal(localId, writingId);
    const [focusedSignal, setFocusedSignal] = createSignal(false);
    let contentRef;
    const [menuSignal, setMenuSignal] = createSignal(false);

    return (
        <>
            <Header>
                <IconButton className={theme.headerButton} onClick={() => History.back()}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                    className={theme.headerButton}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        setMenuSignal(true);
                    }}
                >
                    <MoreHorizIcon />
                    <Menu opened={menuSignal()} onClose={() => setMenuSignal(false)}>
                        <Show when={focusedSignal()}>
                            <EditorMenu onClose={() => setMenuSignal(false)} />
                        </Show>
                        <Show when={!focusedSignal()}>
                            <WritingMenu writing={writingSignal()} onClose={() => setMenuSignal(false)} />
                        </Show>
                    </Menu>
                </IconButton>
            </Header>
            <Content ref={contentRef} name={writingId}>
                <Editor
                    scrollRef={contentRef}
                    className={theme.title}
                    value={writingSignal()?.title}
                    placeholder={translate('startTyping')}
                    onChange={({ text }) => putWriting(localId, writingId, { title: text })}
                />
                <Date updatedOn={writingSignal()?._updatedOn} createdOn={writingSignal()?._createdOn} />
                <Editor
                    inputMode={menuSignal() ? 'none' : null}
                    scrollRef={contentRef}
                    className={theme.editor}
                    value={writingSignal()?.content}
                    placeholder={translate('startTyping')}
                    onFocus={() => {
                        setFocusedSignal(true);
                    }}
                    onBlur={() => setFocusedSignal(false)}
                    onChange={({ html }) => putWriting(localId, writingId, { content: html })}
                />
            </Content>
        </>
    );
};

export default WritingPage;
