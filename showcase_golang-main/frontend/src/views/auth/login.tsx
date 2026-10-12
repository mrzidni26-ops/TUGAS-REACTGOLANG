// import FC from react
import { FC, useState, useContext, FormEvent } from 'react';

//import hook useNavigate and Link from react router
import { useNavigate, Link } from "react-router";

//import custom  hook useLogin from hooks
import { useLogin } from "../../hooks/auth/useLogin";

//import js-cookie
import Cookies from 'js-cookie'

//import context
import { AuthContext } from '../../context/AuthContext';

import AuthShell from '../../components/AuthShell';
import Field from '../../components/Field';

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

export const Login: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useLogin
    const { mutate, isPending } = useLogin();

    //destruct auth context "setIsAuthenticated"
    const { setIsAuthenticated } = useContext(AuthContext)!;

    //define state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Call the login mutation
        mutate({
            username,
            password
        }, {
            onSuccess: (data: any) => {

                //set token to cookie
                Cookies.set('token', data.data.token);

                //set user to cookie
                Cookies.set('user', JSON.stringify({
                    id: data.data.id,
                    name: data.data.name,
                    username: data.data.username,
                    email: data.data.email
                }));

                //set isAuthenticated to true
                setIsAuthenticated(true);

                // Redirect to dashboard page
                navigate('/admin/dashboard');
            },
            onError: (error: any) => {

                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })
    }

    return (
        <AuthShell
            heading="Selamat datang kembali."
            subheading="Masuk untuk melihat dashboard dan mengelola data pengguna."
            points={['Sesi dilindungi token JWT', 'Password disimpan dengan hash bcrypt', 'Pesan error muncul langsung di form']}
            title="Masuk ke akun kamu"
            footer={<>Belum punya akun? <Link to="/register">Buat akun</Link></>}
        >
            {errors.Error && <div className="alert alert--danger" role="alert">Username atau password salah.</div>}
            <form onSubmit={handleLogin} className="form">
                <Field name="username" label="Username" value={username} onChange={setUsername} placeholder="contoh: rina" autoComplete="username" error={errors.Username} />
                <Field name="password" label="Password" type="password" value={password} onChange={setPassword} placeholder="Masukkan password" autoComplete="current-password" error={errors.Password} />
                <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={isPending}>
                    {isPending ? 'Memeriksa…' : 'Masuk'}
                </button>
            </form>
        </AuthShell>
    )
}

export default Login;
