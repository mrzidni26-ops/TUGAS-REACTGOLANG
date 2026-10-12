import { FC, ReactNode } from 'react';
import { Link } from 'react-router';
import { IconBack, IconCheck } from './Icons';

interface AuthShellProps {
    heading: string;
    subheading: string;
    points: string[];
    title: string;
    children: ReactNode;
    footer: ReactNode;
}

// Tampilan terbagi dua untuk halaman login dan register
const AuthShell: FC<AuthShellProps> = ({ heading, subheading, points, title, children, footer }) => (
    <div className="auth">
        <aside className="auth__side">
            <div className="auth__pitch">
                <h2 className="auth__heading">{heading}</h2>
                <p className="auth__sub">{subheading}</p>
                <ul className="auth__points">
                    {points.map((p) => (
                        <li key={p}><span className="auth__tick"><IconCheck width={14} height={14} /></span>{p}</li>
                    ))}
                </ul>
            </div>
            <Link to="/" className="auth__back"><IconBack width={16} height={16} /> Kembali ke beranda</Link>
        </aside>

        <section className="auth__main">
            <div className="auth__card">
                <h1 className="auth__title">{title}</h1>
                {children}
                <p className="auth__footer">{footer}</p>
            </div>
        </section>
    </div>
);

export default AuthShell;
