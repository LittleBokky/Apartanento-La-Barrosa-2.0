
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';

interface RegisterProps {
    lang: Language;
}

const Register: React.FC<RegisterProps> = ({ lang }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 2000);
    };

    const t = {
        es: {
            title: 'Crear Cuenta',
            subtitle: 'Únete para disfrutar de una mejor experiencia',
            name: 'Nombre Completo',
            email: 'Correo electrónico',
            password: 'Contraseña',
            confirmPassword: 'Confirmar Contraseña',
            registerButton: 'Registrarse',
            hasAccount: '¿Ya tienes cuenta?',
            login: 'Inicia sesión'
        },
        en: {
            title: 'Create Account',
            subtitle: 'Join us for a better booking experience',
            name: 'Full Name',
            email: 'Email Address',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            registerButton: 'Sign Up',
            hasAccount: 'Already have an account?',
            login: 'Sign in'
        }
    }[lang];

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl">person_add</span>
                    </div>
                    <h1 className="text-2xl font-black text-text-main dark:text-white mb-2">{t.title}</h1>
                    <p className="text-text-muted dark:text-gray-400 text-sm">{t.subtitle}</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.name}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">person</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.email}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">mail</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.password}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">lock</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.confirmPassword}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">lock_reset</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{t.registerButton}</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-sm text-text-muted dark:text-gray-400">
                        {t.hasAccount} {' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            {t.login}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
