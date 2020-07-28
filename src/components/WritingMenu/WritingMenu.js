import { Show } from 'solid-js';
import deleteWriting from '../../actions/deleteWriting';
import shareWriting from '../../actions/shareWriting';
import History from '../../proxies/History';
import translate from '../../utils/translate';
import MenuButton from '../MenuButton/MenuButton';
import MenuGroup from '../MenuGroup/MenuGroup';

const WritingMenu = (props) => (
    <>
        <MenuGroup>
            <Show when={!!props.writing}>
                <MenuButton onClick={() => shareWriting(props.writing?._createdBy, props.writing?.id)}>
                    {translate('share')}
                </MenuButton>
            </Show>
            <MenuButton
                onClick={() => {
                    if (!props.withOpen) {
                        History.back();
                    }

                    if (props.writing) {
                        deleteWriting(props.writing?._createdBy, props.writing?.id);
                    }
                }}
            >
                {translate('remove')}
            </MenuButton>
        </MenuGroup>
        <MenuGroup>
            <MenuButton onClick={props.onClose}>{translate('cancel')}</MenuButton>
        </MenuGroup>
    </>
);

export default WritingMenu;
