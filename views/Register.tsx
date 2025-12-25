
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { supabase } from '../lib/supabase';

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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert(t.passwordsNoMatch);
            return;
        }

        setIsLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.name,
                }
            }
        });

        setIsLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        if (data.user) {
            alert(t.regAlmostComplete);
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            alert(error.message);
        }
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
            login: 'Inicia sesión',
            passwordsNoMatch: 'Las contraseñas no coinciden',
            regAlmostComplete: '¡Registro casi completado! Por favor, revisa tu correo electrónico para confirmar tu cuenta.',
            continueWith: 'O continuar con'
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
            login: 'Sign in',
            passwordsNoMatch: 'Passwords do not match',
            regAlmostComplete: 'Registration almost complete! Please check your email to confirm your account.',
            continueWith: 'Or continue with'
        },
        it: {
            title: 'Crea un Account',
            subtitle: 'Unisciti a noi per un\'esperienza di prenotazione migliore',
            name: 'Nome Completo',
            email: 'Indirizzo e-mail',
            password: 'Password',
            confirmPassword: 'Conferma Password',
            registerButton: 'Registrati',
            hasAccount: 'Hai già un account?',
            login: 'Accedi',
            passwordsNoMatch: 'Le password non coincidono',
            regAlmostComplete: 'Registrazione quasi completata! Per favore, controlla la tua e-mail per confermare il tuo account.',
            continueWith: 'O continua con'
        },
        fr: {
            title: 'Créer un compte',
            subtitle: 'Rejoignez-nous pour une meilleure expérience de réservation',
            name: 'Nom complet',
            email: 'Adresse e-mail',
            password: 'Mot de passe',
            confirmPassword: 'Confirmer le mot de passe',
            registerButton: 'S\'inscrire',
            hasAccount: 'Vous avez déjà un compte ?',
            login: 'Se connecter',
            passwordsNoMatch: 'Les mots de passe ne correspondent pas',
            regAlmostComplete: 'Inscription presque terminée ! Veuillez consulter vos e-mails pour confirmer votre compte.',
            continueWith: 'Ou continuer avec'
        },
        de: {
            title: 'Konto erstellen',
            subtitle: 'Werden Sie Teil von uns für ein noch besseres Buchungserlebnis',
            name: 'Vollständiger Name',
            email: 'E-Mail-Adresse',
            password: 'Passwort',
            confirmPassword: 'Passwort bestätigen',
            registerButton: 'Registrieren',
            hasAccount: 'Haben Sie bereits ein Konto?',
            login: 'Anmelden',
            passwordsNoMatch: 'Passwörter stimmen nicht überein',
            regAlmostComplete: 'Registrierung fast abgeschlossen! Bitte überprüfen Sie Ihre E-Mails, um Ihr Konto zu bestätigen.',
            continueWith: 'Oder fortfahren mit'
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

                <div className="mt-6">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-surface-dark px-2 text-text-muted">
                                {t.continueWith}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-main dark:text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Google</span>
                    </button>
                </div>

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
