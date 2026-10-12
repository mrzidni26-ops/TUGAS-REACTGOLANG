// import FC from react
import { FC, useState, FormEvent } from 'react';

//import hook useNavigate and Link from react router
import { useNavigate, Link } from "react-router";

//import custom  hook useRegister from hooks
import { useRegister } from "../../hooks/auth/useRegister";

import AuthShell from '../../components/AuthShell';
import Field from '../../components/Field';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const Register: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useRegister
    const { mutate, isPending} = useRegister();

    //define state
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // Call the register mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {
                
                // Redirect to login page
                navigate('/login');
            },
            onError: (error: any) => {
                
                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })

    }

    return (
        <AuthShell
            heading="Mulai dari satu akun."
            subheading="Daftar, masuk, lalu coba sendiri bagaimana Go dan React bekerja sama."
            points={['Pendaftaran hanya butuh empat kolom', 'Validasi dijalankan di server Go', 'Langsung bisa masuk setelah mendaftar']}
            title="Buat akun baru"
            footer={<>Sudah punya akun? <Link to="/login">Masuk</Link></>}
        >
            <form onSubmit={handleRegister} className="form">
                <div className="form__row">
                    <Field name="name" label="Nama lengkap" value={name} onChange={setName} placeholder="Rina Santri" autoComplete="name" error={errors.Name} />
                    <Field name="username" label="Username" value={username} onChange={setUsername} placeholder="rina" autoComplete="username" error={errors.Username} />
                </div>
                <Field name="email" label="Alamat email" type="email" value={email} onChange={setEmail} placeholder="rina@contoh.com" autoComplete="email" error={errors.Email} />
                <Field name="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="Buat password" autoComplete="new-password" error={errors.Password} />
                <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={isPending}>
                    {isPending ? 'Mendaftarkan…' : 'Buat akun'}
                </button>
            </form>
        </AuthShell>
    )
}

export default Register;
