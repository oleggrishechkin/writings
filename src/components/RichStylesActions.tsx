import React, { ReactElement } from 'react';
import useRichStyles from '../hooks/useRichStyles';
import FormatAlignCenterIcon from '../icons/FormatAlignCenterIcon';
import FormatAlignLeftIcon from '../icons/FormatAlignLeftIcon';
import FormatAlignRightIcon from '../icons/FormatAlignRightIcon';
import FormatBoldIcon from '../icons/FormatBoldIcon';
import FormatItalicIcon from '../icons/FormatItalicIcon';
import FormatListBulletedIcon from '../icons/FormatListBulletedIcon';
import FormatListNumberedIcon from '../icons/FormatListNumberedIcon';
import FormatSizeIcon from '../icons/FormatSizeIcon';
import FormatUnderlinedIcon from '../icons/FormatUnderlinedIcon';
import RichUtils from '../classes/RichUtils';
import combine from '../utils/combine';
import ActionIconButton from './ActionIconButton';
import ActionsGroup from './ActionsGroup';

interface IProps {
    onClose: () => void;
}

const RichStylesActions = ({ onClose }: IProps): ReactElement => {
    const formatting = useRichStyles();

    return (
        <ActionsGroup>
            <ActionsGroup horizontal>
                <ActionIconButton
                    aria-label="toggle justify left"
                    className="flex-auto"
                    active={formatting.isJustifyLeft}
                    onClick={combine(onClose, () => RichUtils.toggleJustifyLeft())}
                >
                    <FormatAlignLeftIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle justify center"
                    className="flex-auto"
                    active={formatting.isJustifyCenter}
                    onClick={combine(onClose, () => RichUtils.toggleJustifyCenter())}
                >
                    <FormatAlignCenterIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle justify right"
                    className="flex-auto"
                    active={formatting.isJustifyRight}
                    onClick={combine(onClose, () => RichUtils.toggleJustifyRight())}
                >
                    <FormatAlignRightIcon />
                </ActionIconButton>
            </ActionsGroup>
            <ActionsGroup horizontal>
                <ActionIconButton
                    aria-label="toggle header"
                    className="flex-auto"
                    active={formatting.isHeader}
                    onClick={combine(onClose, () => RichUtils.toggleHeader())}
                >
                    <FormatSizeIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle unordered list"
                    className="flex-auto"
                    active={formatting.isUnorderedList}
                    onClick={combine(onClose, () => RichUtils.toggleUnorderedList())}
                >
                    <FormatListBulletedIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle ordered list"
                    className="flex-auto"
                    active={formatting.isOrderedList}
                    onClick={combine(onClose, () => RichUtils.toggleOrderedList())}
                >
                    <FormatListNumberedIcon />
                </ActionIconButton>
            </ActionsGroup>
            <ActionsGroup horizontal>
                <ActionIconButton
                    aria-label="toggle bold"
                    className="flex-auto"
                    active={formatting.isBold}
                    onClick={combine(onClose, () => RichUtils.toggleBold())}
                >
                    <FormatBoldIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle italic"
                    className="flex-auto"
                    active={formatting.isItalic}
                    onClick={combine(onClose, () => RichUtils.toggleItalic())}
                >
                    <FormatItalicIcon />
                </ActionIconButton>
                <ActionIconButton
                    aria-label="toggle underline"
                    className="flex-auto"
                    active={formatting.isUnderline}
                    onClick={combine(onClose, () => RichUtils.toggleUnderline())}
                >
                    <FormatUnderlinedIcon />
                </ActionIconButton>
            </ActionsGroup>
        </ActionsGroup>
    );
};

export default RichStylesActions;
