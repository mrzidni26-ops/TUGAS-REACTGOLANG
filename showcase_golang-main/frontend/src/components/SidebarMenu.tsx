//import FC from react
import { FC } from "react";

//import NavLink from react router
import { NavLink } from "react-router";

//import custom hook useLogout
import { useLogout } from "../hooks/auth/useLogout";

//import custom hook useAuthUser
import { useAuthUser } from "../hooks/auth/useAuthUser";

import { IconDashboard, IconLogout, IconUsers } from "./Icons";
import { initials } from "../utils/avatar";

interface SidebarMenuProps {
    // dipanggil saat menu diklik (menutup drawer di mobile)
    onNavigate?: () => void;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ onNavigate }) => {

    //initialize useLogout
    const logout = useLogout();

    // get user from cookie
    const user = useAuthUser();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `rail__link${isActive ? ' is-active' : ''}`;

    return (
        <div className="rail__inner">
            <nav className="rail__nav" aria-label="Menu admin">
                <p className="rail__heading">Menu</p>
                <NavLink to="/admin/dashboard" className={linkClass} onClick={onNavigate}>
                    <IconDashboard /> Dashboard
                </NavLink>
                <NavLink to="/admin/users" className={linkClass} onClick={onNavigate}>
                    <IconUsers /> Pengguna
                </NavLink>
            </nav>

            <div className="rail__user">
                <div className="rail__who">
                    <span className="avatar avatar--dark" aria-hidden="true">{user ? initials(user.name) : '?'}</span>
                    <span className="rail__meta">
                        <strong>{user?.name ?? 'Tamu'}</strong>
                        <small>{user ? `@${user.username}` : 'Belum masuk'}</small>
                    </span>
                </div>
                <button type="button" className="rail__logout" onClick={logout}>
                    <IconLogout /> Keluar
                </button>
            </div>
        </div>
    )
}

export default SidebarMenu;
