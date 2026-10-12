import { FC, useContext, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { IconClose, IconMenu } from './Icons';

const links = [
    { href: '#alur', label: 'Alur' },
    { href: '#fitur', label: 'Fitur' },
    { href: '#stack', label: 'Teknologi' },
];

const Navbar: FC = () => {
    const isAuthenticated = useContext(AuthContext)?.isAuthenticated ?? false;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className="nav">
            <div className="container nav__inner">
                <nav className={`nav__links${open ? ' is-open' : ''}`} aria-label="Navigasi utama">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="nav__link" onClick={() => setOpen(false)}>{l.label}</a>
                    ))}

                    <div className="nav__cta nav__cta--mobile">
                        {isAuthenticated ? (
                            <Link to="/admin/dashboard" className="btn btn--primary btn--block">Buka dashboard</Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn--ghost btn--block">Masuk</Link>
                                <Link to="/register" className="btn btn--primary btn--block">Buat akun</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="nav__cta nav__cta--desktop">
                    {isAuthenticated ? (
                        <Link to="/admin/dashboard" className="btn btn--primary btn--sm">Buka dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn--ghost btn--sm">Masuk</Link>
                            <Link to="/register" className="btn btn--primary btn--sm">Buat akun</Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className="icon-btn nav__toggle"
                    aria-label={open ? 'Tutup menu' : 'Buka menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <IconClose /> : <IconMenu />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
