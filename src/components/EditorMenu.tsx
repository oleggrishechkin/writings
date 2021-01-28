import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-tagged-state';
import useFormatting from '../hooks/useFormatting';
import { ReactComponent as FormatAlignCenterIcon } from '../icons/format_align_center-24px.svg';
import { ReactComponent as FormatAlignLeftIcon } from '../icons/format_align_left-24px.svg';
import { ReactComponent as FormatAlignRightIcon } from '../icons/format_align_right-24px.svg';
import { ReactComponent as FormatBoldIcon } from '../icons/format_bold-24px.svg';
import { ReactComponent as FormatItalicIcon } from '../icons/format_italic-24px.svg';
import { ReactComponent as FormatListBulletedIcon } from '../icons/format_list_bulleted-24px.svg';
import { ReactComponent as FormatListNumberedIcon } from '../icons/format_list_numbered-24px.svg';
import { ReactComponent as FormatSizeIcon } from '../icons/format_size-24px.svg';
import { ReactComponent as FormatUnderlinedIcon } from '../icons/format_underlined-24px.svg';
import intlState from '../store/states/intlState';
import toggleHeader from '../utils/toggleHeader';
import toggleOrderedList from '../utils/toggleOrderedList';
import toggleUnorderedList from '../utils/toggleUnorderedList';
import toggleJustifyLeft from '../utils/toggleJustifyLeft';
import toggleJustifyCenter from '../utils/toggleJustifyCenter';
import toggleJustifyRight from '../utils/toggleJustifyRight';
import toggleBold from '../utils/toggleBold';
import toggleItalic from '../utils/toggleItalic';
import toggleUnderline from '../utils/toggleUnderline';
import MenuIconButton from './MenuIconButton';
import MenuGroup from './MenuGroup';
import MenuButton from './MenuButton';

interface IEditorMenuProps {
    onClose: () => void;
}

const EditorMenu = ({ onClose }: IEditorMenuProps): ReactElement => {
    const formatting = useFormatting();
    const { formatMessage } = useSelector(intlState);

    return (
        <Fragment>
            <MenuGroup>
                <MenuGroup data-horizontal>
                    <MenuIconButton data-active={formatting.isJustifyLeft} onClick={toggleJustifyLeft}>
                        <FormatAlignLeftIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isJustifyCenter} onClick={toggleJustifyCenter}>
                        <FormatAlignCenterIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isJustifyRight} onClick={toggleJustifyRight}>
                        <FormatAlignRightIcon />
                    </MenuIconButton>
                </MenuGroup>
                <MenuGroup data-horizontal>
                    <MenuIconButton data-active={formatting.isHeader} onClick={toggleHeader}>
                        <FormatSizeIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isUnorderedList} onClick={toggleUnorderedList}>
                        <FormatListBulletedIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isOrderedList} onClick={toggleOrderedList}>
                        <FormatListNumberedIcon />
                    </MenuIconButton>
                </MenuGroup>
                <MenuGroup data-horizontal>
                    <MenuIconButton data-active={formatting.isBold} onClick={toggleBold}>
                        <FormatBoldIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isItalic} onClick={toggleItalic}>
                        <FormatItalicIcon />
                    </MenuIconButton>
                    <MenuIconButton data-active={formatting.isUnderline} onClick={toggleUnderline}>
                        <FormatUnderlinedIcon />
                    </MenuIconButton>
                </MenuGroup>
            </MenuGroup>
            <MenuGroup>
                <MenuButton onClick={onClose}>{formatMessage('cancel')}</MenuButton>
            </MenuGroup>
        </Fragment>
    );
};

export default EditorMenu;
