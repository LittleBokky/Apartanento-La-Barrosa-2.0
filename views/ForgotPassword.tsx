
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { supabase } from '../lib/supabase';

const ForgotPassword: React.FC<{ lang: Language }> = ({ lang }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we arrived here from a password reset link
        // Supabase sends a hash with type=recovery
        if (window.location.hash.includes('type=recovery') || window.location.href.includes('type=recovery')) {
            setIsUpdateMode(true);
        }
    }, []);

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/#/forgot-password',
        });

        setIsLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        setSent(true);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        setIsLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        alert(t.updateSuccess);
        navigate('/login');
    };

    const t = {
        es: {
            title: 'Recuperar contraseña',
            subtitle: 'Introduce tu email y te enviaremos un enlace para restablecerla.',
            email: 'Correo electrónico',
            sendButton: 'Enviar enlace',
            backToLogin: 'Volver a Iniciar Sesión',
            successMsg: '¡Enlace enviado! Revisa tu bandeja de entrada.',
            updateTitle: 'Nueva contraseña',
            updateSubtitle: 'Introduce tu nueva contraseña a continuación.',
            newPassword: 'Nueva contraseña',
            updateButton: 'Actualizar contraseña',
            updateSuccess: 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.'
        },
        en: {
            title: 'Reset Password',
            subtitle: 'Enter your email and we will send you a link to reset it.',
            email: 'Email Address',
            sendButton: 'Send Reset Link',
            backToLogin: 'Back to Login',
            successMsg: 'Link sent! Check your inbox.',
            updateTitle: 'New Password',
            updateSubtitle: 'Enter your new password below.',
            newPassword: 'New Password',
            updateButton: 'Update Password',
            updateSuccess: 'Password updated successfully. You can now log in.'
        },
        it: {
            title: 'Recupera password',
            subtitle: 'Inserisci la tua email e ti invieremo un link per resettarla.',
            email: 'Indirizzo e-mail',
            sendButton: 'Invia link de ripristino',
            backToLogin: 'Torna al Login',
            successMsg: 'Link inviato! Controlla la tua posta.',
            updateTitle: 'Nuova password',
            updateSubtitle: 'Inserisci la tua nuova password qui sotto.',
            newPassword: 'Nuova password',
            updateButton: 'Aggiorna password',
            updateSuccess: 'Password aggiornata con successo. Ora puoi accedere.'
        },
        fr: {
            title: 'Récupérer le mot de passe',
            subtitle: 'Entrez votre e-mail et nous vous enverrons un lien pour le réinitialiser.',
            email: 'Adresse e-mail',
            sendButton: 'Envoyer le lien',
            backToLogin: 'Retour à la connexion',
            successMsg: 'Lien envoyé ! Vérifiez votre boîte de réception.',
            updateTitle: 'Nouveau mot de passe',
            updateSubtitle: 'Entrez votre nouveau mot de passe ci-dessous.',
            newPassword: 'Nouveau mot de passe',
            updateButton: 'Mettre à jour le mot de passe',
            updateSuccess: 'Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter.'
        },
        de: {
            title: 'Passwort zurücksetzen',
            subtitle: 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.',
            email: 'E-Mail-Adresse',
            sendButton: 'Link senden',
            backToLogin: 'Zurück zum Login',
            successMsg: 'Link gesendet! Überprüfen Sie Ihren Posteingang.',
            updateTitle: 'Neues Passwort',
            updateSubtitle: 'Geben Sie unten Ihr neues Passwort ein.',
            newPassword: 'Neues Passwort',
            updateButton: 'Passwort aktualisieren',
            updateSuccess: 'Passwort erfolgreich aktualisiert. Sie können sich jetzt anmelden.'
        }
    }[lang];

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl">{isUpdateMode ? 'lock_reset' : 'key'}</span>
                    </div>
                    <h1 className="text-2xl font-black text-text-main dark:text-white mb-2">
                        {isUpdateMode ? t.updateTitle : t.title}
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 text-sm">
                        {isUpdateMode ? t.updateSubtitle : t.subtitle}
                    </p>
                </div>

                {!isUpdateMode ? (
                    sent ? (
                        <div className="text-center space-y-6">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl font-bold">
                                {t.successMsg}
                            </div>
                            <Link to="/login" className="block text-primary font-bold hover:underline">
                                {t.backToLogin}
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleResetRequest} className="space-y-6">
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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    t.sendButton
                                )}
                            </button>

                            <Link to="/login" className="block text-center text-sm text-text-muted hover:text-primary transition-colors">
                                {t.backToLogin}
                            </Link>
                        </form>
                    )
                ) : (
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-main dark:text-gray-300 ml-1">{t.newPassword}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">key</span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                t.updateButton
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
