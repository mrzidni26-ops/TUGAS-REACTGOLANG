//import FC from react
import { FC, useState, FormEvent } from "react";

//import useNavigate and Link from react-router
import { useNavigate, Link } from 'react-router';

//import custom hook useUserCreate
import { useUserCreate } from '../../../hooks/user/useUserCreate';

import AdminLayout from '../../../components/AdminLayout';
import Field from '../../../components/Field';
import { IconBack } from '../../../components/Icons';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const UserCreate: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //define state user
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Inisialisasi useUserCreate
    const { mutate, isPending } = useUserCreate();

    // Handle submit form
    const storeUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user create mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {

                // Redirect to users index
                navigate('/admin/users');
            },
            onError: (error: any) => {

                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <AdminLayout
            title="Tambah pengguna"
            description="Isi data akun yang akan dibuat."
            actions={<Link to="/admin/users" className="btn btn--ghost"><IconBack width={18} height={18} /> Kembali</Link>}
        >
            <section className="panel panel--form">
                <form onSubmit={storeUser} className="form">
                    <div className="form__row">
                        <Field name="name" label="Nama lengkap" value={name} onChange={setName} placeholder="Rina Santri" error={errors.Name} />
                        <Field name="username" label="Username" value={username} onChange={setUsername} placeholder="rina" error={errors.Username} />
                    </div>
                    <div className="form__row">
                        <Field name="email" label="Alamat email" type="email" value={email} onChange={setEmail} placeholder="rina@contoh.com" error={errors.Email} />
                        <Field name="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="Buat password" autoComplete="new-password" error={errors.Password} />
                    </div>
                    <div className="form__actions">
                        <button type="submit" className="btn btn--primary" disabled={isPending}>
                            {isPending ? 'Menyimpan…' : 'Simpan pengguna'}
                        </button>
                        <Link to="/admin/users" className="btn btn--ghost">Batal</Link>
                    </div>
                </form>
            </section>
        </AdminLayout>
    )
}

export default UserCreate
