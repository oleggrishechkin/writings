import { ReactElement } from 'react';
import styled from 'styled-components';

interface IAvatarProps {
    className?: string;
    size: 28 | 112;
    src?: string;
}

const StyledAvatar = styled.div`
    align-items: center;
    background: var(--secondary-background);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    box-shadow: var(--shadowFar);
    &[data-size='28'] {
        height: 28px;
        width: 28px;
    }
    &[data-size='112'] {
        height: 112px;
        width: 112px;
    }
`;

const Img = styled.img`
    flex: 0 0 auto;
    height: 100%;
    width: 100%;
`;

const Avatar = ({ className, size, src }: IAvatarProps): ReactElement => (
    <StyledAvatar className={className} data-size={size}>
        <Img alt="avatar" src={src} />
    </StyledAvatar>
);

export default Avatar;
