import React, { SVGProps, ReactElement } from 'react';

const EditIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
    <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
);

export default EditIcon;
