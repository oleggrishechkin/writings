import FormatAlignCenterIcon from '../../icons/format_align_center-24px.svg';
import FormatAlignLeftIcon from '../../icons/format_align_left-24px.svg';
import FormatAlignRightIcon from '../../icons/format_align_right-24px.svg';
import FormatBoldIcon from '../../icons/format_bold-24px.svg';
import FormatItalicIcon from '../../icons/format_italic-24px.svg';
import FormatListBulletedIcon from '../../icons/format_list_bulleted-24px.svg';
import FormatListNumberedIcon from '../../icons/format_list_numbered-24px.svg';
import FormatSizeIcon from '../../icons/format_size-24px.svg';
import FormatUnderlinedIcon from '../../icons/format_underlined-24px.svg';
import createSelectionStylesSignal from '../../signals/createSelectionStylesSignal';
import translate from '../../utils/translate';
import {
    toggleBold,
    toggleHeader,
    toggleItalic,
    toggleJustifyCenter,
    toggleJustifyLeft,
    toggleJustifyRight,
    toggleOrderedList,
    toggleUnderline,
    toggleUnorderedList
} from '../Editor/utils';
import MenuButton from '../MenuButton/MenuButton';
import MenuGroup from '../MenuGroup/MenuGroup';
import MenuIconButton from '../MenuIconButton/MenuIconButton';

const EditorMenu = (props) => {
    const stylesSignal = createSelectionStylesSignal();

    return (
        <>
            <MenuGroup>
                <MenuGroup horizontal>
                    <MenuIconButton active={stylesSignal().isJustifyLeft} onClick={() => toggleJustifyLeft()}>
                        <FormatAlignLeftIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isJustifyCenter} onClick={() => toggleJustifyCenter()}>
                        <FormatAlignCenterIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isJustifyRight} onClick={() => toggleJustifyRight()}>
                        <FormatAlignRightIcon />
                    </MenuIconButton>
                </MenuGroup>
                <MenuGroup horizontal>
                    <MenuIconButton active={stylesSignal().isHeader} onClick={() => toggleHeader()}>
                        <FormatSizeIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isUnorderedList} onClick={() => toggleUnorderedList()}>
                        <FormatListBulletedIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isOrderedList} onClick={() => toggleOrderedList()}>
                        <FormatListNumberedIcon />
                    </MenuIconButton>
                </MenuGroup>
                <MenuGroup horizontal>
                    <MenuIconButton active={stylesSignal().isBold} onClick={() => toggleBold()}>
                        <FormatBoldIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isItalic} onClick={() => toggleItalic()}>
                        <FormatItalicIcon />
                    </MenuIconButton>
                    <MenuIconButton active={stylesSignal().isUnderline} onClick={() => toggleUnderline()}>
                        <FormatUnderlinedIcon />
                    </MenuIconButton>
                </MenuGroup>
            </MenuGroup>
            <MenuGroup>
                <MenuButton onClick={props.onClose}>{translate('cancel')}</MenuButton>
            </MenuGroup>
        </>
    );
};

export default EditorMenu;
