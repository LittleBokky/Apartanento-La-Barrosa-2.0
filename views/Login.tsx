
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';

interface LoginProps {
    lang: Language;
    onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ lang, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Check for Admin Credentials
        if (email === 'bokkyphotos@gmail.com' && password === 'admintest25') {
            setTimeout(() => {
                setIsLoading(false);
                const adminUser = { name: 'Admin', email: email, role: 'admin' };
                onLogin(adminUser);
                localStorage.setItem('isAdmin', 'true');
                alert(lang === 'es' ? '¡Bienvenido Administrador!' : 'Welcome Admin!');
                navigate('/');
            }, 1000);
            return;
        }

        // Simulate standard login
        setTimeout(() => {
            setIsLoading(false);
            const standardUser = { name: 'Usuario', email: email, role: 'user' };
            onLogin(standardUser);
            navigate('/');
        }, 2000);
    };

    const t = {
        es: {
            title: 'Bienvenido de nuevo',
            subtitle: 'Accede a tu cuenta para gestionar tus reservas',
            email: 'Correo electrónico',
            password: 'Contraseña',
            loginButton: 'Iniciar Sesión',
            forgotPassword: '¿Olvidaste tu contraseña?',
            noAccount: '¿No tienes cuenta?',
            register: 'Regístrate aquí',
            adminLink: 'Acceso Administrador'
        },
        en: {
            title: 'Welcome Back',
            subtitle: 'Sign in to manage your bookings',
            email: 'Email Address',
            password: 'Password',
            loginButton: 'Sign In',
            forgotPassword: 'Forgot password?',
            noAccount: "Don't have an account?",
            register: 'Register here',
            adminLink: 'Admin Access'
        }
    }[lang];

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl">lock</span>
                    </div>
                    <h1 className="text-2xl font-black text-text-main dark:text-white mb-2">{t.title}</h1>
                    <p className="text-text-muted dark:text-gray-400 text-sm">{t.subtitle}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.email}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">mail</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-text-main dark:text-gray-300">{t.password}</label>
                            <Link to="/forgot-password" className="text-xs text-primary font-bold hover:underline">{t.forgotPassword}</Link>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">key</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{t.loginButton}</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-sm text-text-muted dark:text-gray-400">
                        {t.noAccount} {' '}
                        <Link to="/register" className="text-primary font-bold hover:underline">
                            {t.register}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
