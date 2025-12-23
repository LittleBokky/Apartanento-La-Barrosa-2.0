import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { es, enUS } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { supabase } from '../lib/supabase';

interface Booking {
    id: string;
    check_in: string;
    check_out: string;
    guests_adults: number;
    guests_children: number;
    total_price: number;
    status: 'confirmed' | 'completed' | 'cancelled';
    guest_name?: string;
    guest_email?: string;
}

interface Message {
    id: string;
    created_at: string;
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Profile: React.FC<{
    lang: Language,
    user: any,
    onLogout: () => void,
    blockedDays?: Date[],
    setBlockedDays?: (days: Date[] | undefined) => void,
    onRefresh?: () => void
}> = ({ lang, user, onLogout, blockedDays = [], setBlockedDays, onRefresh }) => {
    const isAdmin = user?.role === 'admin';
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = async () => {
        setIsLoading(true);
        let query = supabase.from('bookings').select('*');
        if (!isAdmin) query = query.eq('user_id', user.id);
        const { data, error } = await query.order('check_in', { ascending: false });
        if (error) console.error('Error fetching bookings:', error);
        else setBookings(data || []);
        setIsLoading(false);
    };

    const fetchMessages = async () => {
        if (!isAdmin) return;
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching messages:', error);
        else setMessages(data || []);
    };

    const handleDeleteBooking = async (id: string) => {
        if (!window.confirm(lang === 'es' ? '¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.' : 'Are you sure you want to delete this booking? This action cannot be undone.')) {
            return;
        }

        const { error } = await supabase.from('bookings').delete().eq('id', id);

        if (error) {
            alert(lang === 'es' ? 'Error al eliminar la reserva' : 'Error deleting booking');
            console.error(error);
        } else {
            fetchBookings();
            onRefresh?.();
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!window.confirm(lang === 'es' ? '¿Borrar este mensaje?' : 'Delete this message?')) return;
        const { error } = await supabase.from('contact_messages').delete().eq('id', id);
        if (error) console.error(error);
        else fetchMessages();
    };

    useEffect(() => {
        if (user && user.id) {
            fetchBookings();
            if (isAdmin) fetchMessages();
        }
    }, [user?.id, isAdmin]);

    const t = {
        es: {
            title: "Mi Perfil",
            welcome: `Hola, ${user?.name || 'Huésped'}`,
            email: user?.email,
            logout: "Cerrar Sesión",
            myBookings: isAdmin ? "Gestión de Reservas" : "Mis Reservas",
            messages: "Mensajes de Contacto",
            noMessages: "No hay mensajes nuevos.",
            upcoming: "Próximas",
            history: "Historial",
            noBookings: "No hay reservas registradas.",
            status: {
                confirmed: "Confirmada",
                completed: "Finalizada",
                cancelled: "Cancelada"
            },
            bookAgain: "Reservar de nuevo",
            guest: "Huésped",
            manageCalendar: "Gestionar Disponibilidad",
            clickToBlock: "Haz clic en los días para bloquear/desbloquear su disponibilidad manualmente.",
            blocked: "Bloqueado",
            loading: "Cargando reservas...",
            delete: "Eliminar"
        },
        en: {
            title: "My Profile",
            welcome: `Hello, ${user?.name || 'Guest'}`,
            email: user?.email,
            logout: "Sign Out",
            myBookings: isAdmin ? "Manage Bookings" : "My Bookings",
            messages: "Contact Messages",
            noMessages: "No new messages.",
            upcoming: "Upcoming",
            history: "History",
            noBookings: "No bookings found.",
            status: {
                confirmed: "Confirmed",
                completed: "Completed",
                cancelled: "Cancelled"
            },
            bookAgain: "Book again",
            guest: "Guest",
            manageCalendar: "Manage Availability",
            clickToBlock: "Click on days to manually block/unblock their availability.",
            blocked: "Blocked",
            loading: "Loading bookings...",
            delete: "Delete"
        }
    }[lang];

    return (
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Sidebar Profile */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 text-center sticky top-28">
                        <div className={`size-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black ${isAdmin ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-primary/10 text-primary'}`}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h2 className="text-xl font-black mb-1">{t.welcome}</h2>
                        <p className="text-sm text-text-muted dark:text-gray-400 mb-6">{t.email}</p>
                        {isAdmin && <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">Administrator</span>}

                        <button
                            onClick={onLogout}
                            className="w-full h-12 border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            {t.logout}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-10">

                    {/* Availability Calendar for Admin */}
                    {isAdmin && (
                        <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                                <span className="material-symbols-outlined text-purple-600">edit_calendar</span>
                                {t.manageCalendar}
                            </h3>
                            <p className="text-text-muted mb-8">{t.clickToBlock}</p>

                            <div className="flex justify-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6">
                                <style>{`
                    .rdp { --rdp-cell-size: 45px; --rdp-accent-color: #ef4444; --rdp-background-color: #fee2e2; margin: 0; }
                    .rdp-day_selected:not([disabled]) { font-weight: bold; background-color: var(--rdp-accent-color); color: white; }
                    .rdp-day_selected:hover:not([disabled]) { background-color: var(--rdp-accent-color); opacity: 0.8; }
                    .dark .rdp { --rdp-accent-color: #ef4444; color: #e2e8f0; }
                    .dark .rdp-day:hover:not(.rdp-day_selected):not(.rdp-day_outside) { background-color: #1e293b; }
                 `}</style>
                                <DayPicker
                                    mode="multiple"
                                    selected={blockedDays}
                                    onSelect={setBlockedDays}
                                    locale={lang === 'es' ? es : enUS}
                                    numberOfMonths={2}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-text-muted">
                                <div className="size-3 bg-red-500 rounded-full"></div>
                                <span className="font-bold">{t.blocked}</span>
                            </div>
                        </div>
                    )}

                    {/* Bookings List */}
                    <div>
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className={`material-symbols-outlined ${isAdmin ? 'text-purple-600' : 'text-primary'}`}>
                                {isAdmin ? 'admin_panel_settings' : 'calendar_month'}
                            </span>
                            {t.myBookings}
                        </h3>

                        <div className="space-y-6">
                            {isLoading ? (
                                <p className="text-center py-10 text-text-muted animate-pulse">{t.loading}</p>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">event_busy</span>
                                    <p className="text-text-muted">{t.noBookings}</p>
                                </div>
                            ) : bookings.map((booking) => (
                                <div key={booking.id} className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group hover:shadow-lg transition-all">
                                    <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden shrink-0 relative bg-primary/5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-3xl">hotel</span>
                                    </div>

                                    <div className="flex-grow space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                booking.status === 'completed' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {t.status[booking.status] || booking.status}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-text-muted font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">ID: {booking.id.slice(0, 8)}</span>
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => handleDeleteBooking(booking.id)}
                                                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                                                        title={t.delete}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {isAdmin ? (
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {booking.guest_name || 'Huésped desconocido'}
                                                </h4>
                                                <p className="text-sm text-primary font-medium">{booking.guest_email}</p>
                                            </div>
                                        ) : (
                                            <h4 className="text-lg font-bold">Apartamento La Barrosa</h4>
                                        )}

                                        <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">event</span> {booking.check_in} - {booking.check_out}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> {booking.guests_adults} Adultos, {booking.guests_children} Niños</span>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto text-right space-y-3">
                                        <p className="text-xl font-black text-primary">€{booking.total_price}</p>
                                        {!isAdmin && booking.status === 'completed' && (
                                            <Link to="/booking" className="inline-block px-5 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-bold transition-colors">
                                                {t.bookAgain}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Contact Messages */}
                    {isAdmin && (
                        <div>
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-purple-600">mail</span>
                                {t.messages}
                            </h3>

                            <div className="space-y-6">
                                {messages.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">drafts</span>
                                        <p className="text-text-muted">{t.noMessages}</p>
                                    </div>
                                ) : messages.map((msg) => (
                                    <div key={msg.id} className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 hover:shadow-lg transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-bold">{msg.name}</h4>
                                                <p className="text-sm text-primary font-medium">{msg.email}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] text-text-muted bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                                                    {new Date(msg.created_at).toLocaleDateString()}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteMessage(msg.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-2xl">
                                            <p className="text-xs font-black uppercase text-text-muted mb-2 tracking-wider">{msg.subject}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
