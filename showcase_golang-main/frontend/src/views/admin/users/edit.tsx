//import FC from react
import { FC, useState, useEffect, FormEvent } from "react";

//import useNavigate, useParams and Link from react-router
import { useNavigate, useParams, Link } from 'react-router';

//import custom hook useUserByById
import { useUserById } from '../../../hooks/user/useUserById';

//import custom hook useUserUpdate
import { useUserUpdate } from '../../../hooks/user/useUserUpdate';

import AdminLayout from '../../../components/AdminLayout';
import Field from '../../../components/Field';
import { IconBack } from '../../../components/Icons';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const UserEdit: FC = () => {

    //initialize useNavigate
    const navigate = useNavigate();

    //initialize useParams
    const { id } = useParams();

    //define state user
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // inisialisasi useUSerById
    const { data: user } = useUserById(Number(id));

    //set data user to state
    useEffect(() => {
        
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    // Inisialisasi useUserUpdate
    const { mutate, isPending } = useUserUpdate();

    // Handle submit form
    const updateUser = async (e: FormEvent) => {
        e.preventDefault();

        // Call the user update mutation
        mutate({
            id: Number(id),
            data: {
                name,
                username,
                email,
                password
            }
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
            title="Ubah pengguna"
            description={user ? `Memperbarui data ${user.name}.` : 'Perbarui data akun.'}
            actions={<Link to="/admin/users" className="btn btn--ghost"><IconBack width={18} height={18} /> Kembali</Link>}
        >
            <section className="panel panel--form">
                <form onSubmit={updateUser} className="form">
                    <div className="form__row">
                        <Field name="name" label="Nama lengkap" value={name} onChange={setName} placeholder="Nama lengkap" error={errors.Name} />
                        <Field name="username" label="Username" value={username} onChange={setUsername} placeholder="Username" error={errors.Username} />
                    </div>
                    <div className="form__row">
                        <Field name="email" label="Alamat email" type="email" value={email} onChange={setEmail} placeholder="Alamat email" error={errors.Email} />
                        <Field name="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="Password" autoComplete="new-password" error={errors.Password} />
                    </div>
                    <div className="form__actions">
                        <button type="submit" className="btn btn--primary" disabled={isPending}>
                            {isPending ? 'Memperbarui…' : 'Simpan perubahan'}
                        </button>
                        <Link to="/admin/users" className="btn btn--ghost">Batal</Link>
                    </div>
                </form>
            </section>
        </AdminLayout>
    )
}

export default UserEdit
