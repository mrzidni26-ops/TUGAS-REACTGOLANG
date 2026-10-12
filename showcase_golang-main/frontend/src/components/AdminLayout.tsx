import { FC, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import SidebarMenu from './SidebarMenu';
import { IconClose, IconMenu } from './Icons';

interface AdminLayoutProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
}

// Kerangka halaman admin: sidebar di kiri, konten di kanan
const AdminLayout: FC<AdminLayoutProps> = ({ title, description, actions, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { pathname } = useLocation();

    // tutup drawer saat pindah halaman
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="shell">
            <aside className={`rail${open ? ' is-open' : ''}`}>
                <SidebarMenu onNavigate={() => setOpen(false)} />
            </aside>
            {open && <button type="button" className="scrim" aria-label="Tutup menu" onClick={() => setOpen(false)} />}

            <div className="shell__main">
                <header className="topbar">
                    <span className="topbar__title">{title}</span>
                    <button
                        type="button"
                        className="icon-btn"
                        aria-label={open ? 'Tutup menu' : 'Buka menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <IconClose /> : <IconMenu />}
                    </button>
                </header>

                <main className="page">
                    <div className="page__head">
                        <div>
                            <h1 className="page__title">{title}</h1>
                            {description && <p className="page__desc">{description}</p>}
                        </div>
                        {actions && <div className="page__actions">{actions}</div>}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
