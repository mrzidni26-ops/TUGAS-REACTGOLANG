//import FC from react
import { FC, useState } from "react";

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import { useUsers, User } from "../../../hooks/user/useUsers";

import AdminLayout from '../../../components/AdminLayout';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '../../../components/Icons';
import { initials, tone } from '../../../utils/avatar';

const UsersIndex: FC = () => {

    // get users from useUsers
    const { data: users, isLoading, isError, error } = useUsers();

    // kata kunci pencarian (filter di sisi klien)
    const [query, setQuery] = useState<string>('');

    const keyword = query.trim().toLowerCase();
    const filtered: User[] = (users ?? []).filter((u) =>
        !keyword ||
        u.name.toLowerCase().includes(keyword) ||
        u.username.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
    );

    return (
        <AdminLayout
            title="Pengguna"
            description="Semua akun yang terdaftar di aplikasi."
            actions={
                <Link to="/admin/users/create" className="btn btn--primary">
                    <IconPlus width={18} height={18} /> Tambah pengguna
                </Link>
            }
        >
            <section className="panel panel--flush">
                <div className="toolbar">
                    <label className="search">
                        <IconSearch width={18} height={18} />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari pengguna"
                            aria-label="Cari pengguna"
                        />
                    </label>
                    {users && <p className="toolbar__count">{filtered.length} dari {users.length} pengguna</p>}
                </div>

                {/* Error State */}
                {isError && (
                    <div className="alert alert--danger alert--flat" role="alert">
                        Gagal memuat pengguna: {error.message}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="skeleton-list skeleton-list--pad" aria-label="Memuat">
                        {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton" />)}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && filtered.length === 0 && (
                    <div className="empty">
                        <p className="empty__title">{keyword ? 'Tidak ada hasil' : 'Belum ada pengguna'}</p>
                        <p className="muted">
                            {keyword ? 'Coba kata kunci lain.' : 'Tambahkan pengguna pertama untuk mulai mengisi daftar ini.'}
                        </p>
                        {!keyword && <Link to="/admin/users/create" className="btn btn--primary btn--sm">Tambah pengguna</Link>}
                    </div>
                )}

                {filtered.length > 0 && (
                    <div className="table-wrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Pengguna</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" className="table__actions-head">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filtered.map((user: User) => (
                                        <tr key={user.id}>
                                            <td data-label="Pengguna">
                                                <span className="who">
                                                    <span className={`avatar ${tone(user.id)}`} aria-hidden="true">{initials(user.name)}</span>
                                                    <strong>{user.name}</strong>
                                                </span>
                                            </td>
                                            <td data-label="Username">@{user.username}</td>
                                            <td data-label="Email">{user.email}</td>
                                            <td className="table__actions">
                                                <Link to={`/admin/users/edit/${user.id}`} className="icon-btn icon-btn--edit" aria-label={`Ubah ${user.name}`} title="Ubah">
                                                    <IconEdit width={18} height={18} />
                                                </Link>
                                                <button type="button" className="icon-btn icon-btn--danger" aria-label={`Hapus ${user.name}`} title="Hapus">
                                                    <IconTrash width={18} height={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </AdminLayout>
    )
}

export default UsersIndex
