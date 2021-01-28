import { Fragment, InputHTMLAttributes, ReactElement, useState } from 'react';
import { useSelector } from 'react-tagged-state';
import intlState from '../store/states/intlState';
import MenuGroup from './MenuGroup';
import MenuButton from './MenuButton';
import MenuInput from './MenuInput';

interface IPromptMenuProps extends InputHTMLAttributes<HTMLInputElement> {
    initialValue?: string;
    onSave: (value: string) => void;
    onClose: () => void;
}

const PromptMenu = ({ initialValue, onSave, onClose, ...rest }: IPromptMenuProps): ReactElement => {
    const { formatMessage } = useSelector(intlState);
    const [state, setState] = useState(initialValue || '');

    return (
        <Fragment>
            <MenuGroup as="form">
                <MenuGroup data-horizontal>
                    <MenuInput
                        {...rest}
                        value={state}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        onChange={(event) => setState((event.target as HTMLInputElement).value)}
                    />
                </MenuGroup>
                <MenuGroup data-horizontal>
                    <MenuButton onClick={onClose}>{formatMessage('cancel')}</MenuButton>
                    <MenuButton
                        onClick={() => {
                            onClose();
                            onSave(state);
                        }}
                        type="submit"
                    >
                        {formatMessage('save')}
                    </MenuButton>
                </MenuGroup>
            </MenuGroup>
        </Fragment>
    );
};

export default PromptMenu;
