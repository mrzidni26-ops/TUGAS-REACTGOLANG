//import FC from react
import { FC } from "react";

//import Link from react-router
import { Link } from "react-router";

//import custom hook useAuthUser
import { useAuthUser } from '../../../hooks/auth/useAuthUser';

//import custom hook useUsers and interface User
import { useUsers, User } from "../../../hooks/user/useUsers";

import AdminLayout from '../../../components/AdminLayout';
import { IconPlus, IconUsers } from '../../../components/Icons';
import { initials, tone } from '../../../utils/avatar';

const Dashboard: FC = () => {

    // get user from useAuthUser
    const user = useAuthUser();

    // get users from useUsers
    const { data: users, isLoading } = useUsers();

    // lima pengguna terbaru
    const latest: User[] = users ? [...users].sort((a, b) => b.id - a.id).slice(0, 5) : [];

    return (
        <AdminLayout
            title={user ? `Halo, ${user.name}` : 'Dashboard'}
            description="Ringkasan akun dan pengguna yang terdaftar."
            actions={
                <Link to="/admin/users/create" className="btn btn--primary">
                    <IconPlus width={18} height={18} /> Tambah pengguna
                </Link>
            }
        >
            <div className="dash">
                <section className="stat">
                    <span className="stat__icon"><IconUsers /></span>
                    <p className="stat__label">Total pengguna</p>
                    <p className="stat__value">{isLoading ? '–' : users?.length ?? 0}</p>
                    <Link to="/admin/users" className="stat__link">Lihat semua pengguna</Link>
                </section>

                <section className="panel profile">
                    <h2 className="panel__title">Akun kamu</h2>
                    {user ? (
                        <div className="profile__body">
                            <span className={`avatar avatar--lg ${tone(user.id)}`} aria-hidden="true">{initials(user.name)}</span>
                            <dl className="profile__list">
                                <div><dt>Nama</dt><dd>{user.name}</dd></div>
                                <div><dt>Username</dt><dd>@{user.username}</dd></div>
                                <div><dt>Email</dt><dd>{user.email}</dd></div>
                            </dl>
                        </div>
                    ) : (
                        <p className="muted">Kamu belum login.</p>
                    )}
                </section>
            </div>

            <section className="panel">
                <div className="panel__head">
                    <h2 className="panel__title">Pengguna terbaru</h2>
                    <Link to="/admin/users" className="link">Kelola pengguna</Link>
                </div>
                {isLoading ? (
                    <div className="skeleton-list" aria-label="Memuat">
                        {[0, 1, 2].map((i) => <div key={i} className="skeleton" />)}
                    </div>
                ) : latest.length === 0 ? (
                    <div className="empty empty--inline">
                        <p>Belum ada pengguna.</p>
                    </div>
                ) : (
                    <ul className="people">
                        {latest.map((u) => (
                            <li key={u.id} className="people__row">
                                <span className={`avatar ${tone(u.id)}`} aria-hidden="true">{initials(u.name)}</span>
                                <span className="people__main">
                                    <strong>{u.name}</strong>
                                    <small>@{u.username}</small>
                                </span>
                                <span className="people__email">{u.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </AdminLayout>
    )
}

export default Dashboard
