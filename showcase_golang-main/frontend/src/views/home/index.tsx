// import FC from react
import { FC, useContext } from 'react';

// import Link from react-router
import { Link } from 'react-router';

//import context
import { AuthContext } from '../../context/AuthContext';

import { IconCheck, IconKey, IconShield, IconUsers } from '../../components/Icons';

const flow = [
    { title: 'Form React', text: 'Input diketik di komponen TypeScript, lalu dikirim lewat mutasi TanStack Query.' },
    { title: 'Axios', text: 'Request menuju API di localhost:3000, membawa Bearer token untuk rute yang dilindungi.' },
    { title: 'Gin', text: 'Middleware memeriksa JWT, lalu validasi menolak data yang tidak lengkap dengan pesan yang jelas.' },
    { title: 'GORM dan MySQL', text: 'Data disimpan atau dibaca dari database. Password selalu di-hash dengan bcrypt.' },
];

const server = ['Gin', 'GORM', 'MySQL', 'golang-jwt', 'bcrypt'];
const client = ['React 18', 'TypeScript', 'Vite', 'TanStack Query', 'Axios', 'React Router'];

const Home: FC = () => {

    const isAuthenticated = useContext(AuthContext)?.isAuthenticated ?? false;

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <div className="container hero__grid">
                    <div className="hero__copy">
                        <h1 className="hero__title">Fullstack, dari endpoint sampai tombol.</h1>
                        <p className="hero__lead">
                            Aplikasi contoh dengan Golang dan React TypeScript: daftar akun, masuk dengan JWT,
                            lalu kelola pengguna dalam satu alur yang utuh.
                        </p>
                        <div className="hero__actions">
                            {isAuthenticated ? (
                                <Link to="/admin/dashboard" className="btn btn--primary btn--lg">Buka dashboard</Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn--primary btn--lg">Buat akun</Link>
                                    <Link to="/login" className="btn btn--ghost btn--lg">Masuk</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <figure className="api" aria-label="Contoh request dan response login">
                        <div className="api__bar">
                            <span className="api__method">POST</span>
                            <span className="api__path">/api/login</span>
                            <span className="api__status">200 OK</span>
                        </div>
                        <div className="api__body">
                            <p className="api__label">Request</p>
                            <div className="code">
                                <div className="ln">{'{'}</div>
                                <div className="ln">{'  '}<span className="k">"username"</span>: <span className="s">"rina"</span>,</div>
                                <div className="ln">{'  '}<span className="k">"password"</span>: <span className="s">"••••••••"</span></div>
                                <div className="ln">{'}'}</div>
                            </div>

                            <p className="api__label api__label--res">Response</p>
                            <div className="code">
                                <div className="ln">{'{'}</div>
                                <div className="ln">{'  '}<span className="k">"success"</span>: <span className="b">true</span>,</div>
                                <div className="ln">{'  '}<span className="k">"message"</span>: <span className="s">"Login Success"</span>,</div>
                                <div className="ln">{'  '}<span className="k">"data"</span>: {'{'}</div>
                                <div className="ln">{'    '}<span className="k">"id"</span>: <span className="n">1</span>,</div>
                                <div className="ln">{'    '}<span className="k">"name"</span>: <span className="s">"Rina Santri"</span>,</div>
                                <div className="ln">{'    '}<span className="k">"token"</span>: <span className="t">"eyJhbGciOiJIUzI1NiIs…"</span></div>
                                <div className="ln">{'  }'}</div>
                                <div className="ln">{'}'}</div>
                            </div>
                        </div>
                        <figcaption className="api__caption">React mengirim kredensial, Gin membalas dengan JWT.</figcaption>
                    </figure>
                </div>
            </section>

            {/* ALUR */}
            <section className="section" id="alur">
                <div className="container">
                    <div className="section__head">
                        <h2 className="section__title">Satu permintaan, empat perhentian</h2>
                        <p className="section__lead">Ikuti perjalanan data dari form di browser sampai tersimpan di database.</p>
                    </div>
                    <ol className="flow">
                        {flow.map((step, i) => (
                            <li key={step.title} className="flow__step">
                                <span className="flow__n">{i + 1}</span>
                                <h3 className="flow__title">{step.title}</h3>
                                <p className="flow__text">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* FITUR */}
            <section className="section section--tight" id="fitur">
                <div className="container">
                    <div className="section__head">
                        <h2 className="section__title">Yang sudah bisa dicoba</h2>
                    </div>
                    <div className="bento">
                        <article className="bento__item bento__item--lead">
                            <span className="bento__icon"><IconKey /></span>
                            <h3>Masuk dengan JWT</h3>
                            <p>Server menerbitkan token saat login. React menyimpannya di cookie dan menyertakannya pada setiap permintaan ke rute admin.</p>
                            <ul className="bento__list">
                                <li><span className="auth__tick"><IconCheck width={14} height={14} /></span>Token diterbitkan setelah username dan password cocok</li>
                                <li><span className="auth__tick"><IconCheck width={14} height={14} /></span>Disimpan di cookie, dibaca oleh hook useAuthUser</li>
                                <li><span className="auth__tick"><IconCheck width={14} height={14} /></span>Diperiksa middleware Gin di setiap rute admin</li>
                            </ul>
                            <code className="bento__token">Authorization: Bearer eyJhbGciOiJIUzI1NiIs…</code>
                        </article>
                        <article className="bento__item bento__item--soft">
                            <span className="bento__icon"><IconUsers /></span>
                            <h3>Kelola pengguna</h3>
                            <p>Lihat daftar, tambah akun baru, dan ubah data pengguna dari satu tabel.</p>
                        </article>
                        <article className="bento__item bento__item--plain">
                            <span className="bento__icon"><IconShield /></span>
                            <h3>Pesan error yang jelas</h3>
                            <p>Kesalahan validasi dari Go muncul tepat di bawah kolom yang bermasalah.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* STACK */}
            <section className="section section--tight" id="stack">
                <div className="container">
                    <div className="section__head">
                        <h2 className="section__title">Teknologi di balik aplikasi</h2>
                    </div>
                    <div className="stack">
                        <div className="stack__col">
                            <h3 className="stack__title">Server (Go)</h3>
                            <ul className="chips">{server.map((s) => <li key={s}>{s}</li>)}</ul>
                        </div>
                        <div className="stack__col">
                            <h3 className="stack__title">Klien (React)</h3>
                            <ul className="chips">{client.map((s) => <li key={s}>{s}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section--cta">
                <div className="container">
                    <div className="cta">
                        <div>
                            <h2 className="cta__title">Coba alurnya sendiri</h2>
                            <p className="cta__text">Buat akun, masuk, lalu tambahkan pengguna pertama kamu.</p>
                        </div>
                        <div className="cta__actions">
                            {isAuthenticated ? (
                                <Link to="/admin/dashboard" className="btn btn--cyan btn--lg">Buka dashboard</Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn--cyan btn--lg">Buat akun</Link>
                                    <Link to="/login" className="btn btn--outline-light btn--lg">Masuk</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;
