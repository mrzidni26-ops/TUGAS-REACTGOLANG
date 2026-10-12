import { FC, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const Svg: FC<IconProps> = ({ children, ...props }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        {children}
    </svg>
);

export const IconDashboard: FC<IconProps> = (p) => (
    <Svg {...p}><rect x="3" y="3" width="7.5" height="9" rx="2" /><rect x="13.5" y="3" width="7.5" height="5" rx="2" /><rect x="13.5" y="11" width="7.5" height="10" rx="2" /><rect x="3" y="15" width="7.5" height="6" rx="2" /></Svg>
);
export const IconUsers: FC<IconProps> = (p) => (
    <Svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" /><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6" /><path d="M18 14.8c2 .7 3.2 2.5 3.5 5.2" /></Svg>
);
export const IconLogout: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M10 16l-4-4 4-4" /><path d="M6 12h10" /></Svg>
);
export const IconPlus: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const IconEdit: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" /></Svg>
);
export const IconTrash: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M4 7h16" /><path d="M9 7V4.5h6V7" /><path d="M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12" /><path d="M10 11v5M14 11v5" /></Svg>
);
export const IconSearch: FC<IconProps> = (p) => (
    <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></Svg>
);
export const IconMenu: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);
export const IconClose: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>
);
export const IconBack: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M15 5l-7 7 7 7" /></Svg>
);
export const IconKey: FC<IconProps> = (p) => (
    <Svg {...p}><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9" /><path d="M16 7l3 3" /></Svg>
);
export const IconShield: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M12 3l7.5 3v5.5c0 4.4-3.1 7.9-7.5 9.5-4.4-1.6-7.5-5.1-7.5-9.5V6L12 3z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></Svg>
);
export const IconCheck: FC<IconProps> = (p) => (
    <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>
);
