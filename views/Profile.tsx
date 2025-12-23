import React, { useState } from 'react';
import { Language } from '../types';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { es, enUS } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface Booking {
    id: string;
    dates: string;
    guests: string;
    price: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    image: string;
    email?: string; // Optional for admin view
}

const MOCK_BOOKINGS: Booking[] = [
    {
        id: "RES-2025-001",
        dates: "12 Jul - 19 Jul 2025",
        guests: "2 Adultos",
        price: "€1.042,00",
        status: 'upcoming',
        image: '/images/apartment/terrace.jpg'
    },
    {
        id: "RES-2024-893",
        dates: "15 Ago - 22 Ago 2024",
        guests: "2 Adultos, 1 Niño",
        price: "€1.250,00",
        status: 'completed',
        image: '/images/apartment/living_room.jpg'
    }
];

const ADMIN_BOOKINGS: Booking[] = [
    {
        id: "RES-2025-001",
        dates: "12 Jul - 19 Jul 2025",
        guests: "2 Adultos",
        price: "€1.042,00",
        status: 'upcoming',
        image: '/images/apartment/terrace.jpg',
        email: 'cliente1@email.com'
    },
    {
        id: "RES-2025-015",
        dates: "1 Ago - 7 Ago 2025",
        guests: "4 Adultos",
        price: "€1.420,00",
        status: 'upcoming',
        image: '/images/apartment/kitchen.jpg',
        email: 'familia.perez@email.com'
    },
    {
        id: "RES-2024-893",
        dates: "15 Ago - 22 Ago 2024",
        guests: "2 Adultos, 1 Niño",
        price: "€1.250,00",
        status: 'completed',
        image: '/images/apartment/living_room.jpg',
        email: 'juan.garcia@email.com'
    },
    {
        id: "RES-2024-840",
        dates: "1 Jul - 5 Jul 2024",
        guests: "2 Adultos",
        price: "€850,00",
        status: 'completed',
        image: '/images/apartment/bedroom_tv.jpg',
        email: 'ana.lopez@email.com'
    }
];

const Profile: React.FC<{ lang: Language, user: any, onLogout: () => void }> = ({ lang, user, onLogout }) => {
    const isAdmin = user?.role === 'admin';
    const [blockedDays, setBlockedDays] = useState<Date[] | undefined>([]);

    const t = {
        es: {
            title: "Mi Perfil",
            welcome: `Hola, ${user?.name || 'Huésped'}`,
            email: user?.email,
            logout: "Cerrar Sesión",
            myBookings: isAdmin ? "Gestión de Reservas" : "Mis Reservas",
            upcoming: "Próximas",
            history: "Historial",
            noBookings: "No tienes reservas activas.",
            status: {
                upcoming: "Confirmada",
                completed: "Finalizada",
                cancelled: "Cancelada"
            },
            bookAgain: "Reservar de nuevo",
            guest: "Huésped",
            manageCalendar: "Gestionar Disponibilidad",
            clickToBlock: "Haz clic en los días para bloquear/desbloquear su disponibilidad.",
            blocked: "Bloqueado"
        },
        en: {
            title: "My Profile",
            welcome: `Hello, ${user?.name || 'Guest'}`,
            email: user?.email,
            logout: "Sign Out",
            myBookings: isAdmin ? "Manage Bookings" : "My Bookings",
            upcoming: "Upcoming",
            history: "History",
            noBookings: "You have no active bookings.",
            status: {
                upcoming: "Confirmed",
                completed: "Completed",
                cancelled: "Cancelled"
            },
            bookAgain: "Book again",
            guest: "Guest",
            manageCalendar: "Manage Availability",
            clickToBlock: "Click on days to block/unblock their availability.",
            blocked: "Blocked"
        }
    }[lang];

    const bookingsToShow = isAdmin ? ADMIN_BOOKINGS : MOCK_BOOKINGS;

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
                            {bookingsToShow.map((booking) => (
                                <div key={booking.id} className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center group hover:shadow-lg transition-all">
                                    <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative">
                                        <img src={booking.image} alt="Apartment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {isAdmin && (
                                            <div className="absolute top-2 left-2 size-8 bg-white/90 dark:bg-black/50 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.status === 'upcoming' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    booking.status === 'completed' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {t.status[booking.status]}
                                            </span>
                                            <span className="text-xs text-text-muted font-mono">{booking.id}</span>
                                        </div>

                                        {isAdmin && booking.email ? (
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{booking.email}</h4>
                                                <span className="text-xs font-bold text-text-muted uppercase tracking-wide">{t.guest}</span>
                                            </div>
                                        ) : (
                                            <h4 className="text-lg font-bold">Apartamento La Barrosa</h4>
                                        )}

                                        <div className="flex flex-wrap gap-4 text-sm text-text-muted dark:text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">event</span> {booking.dates}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">group</span> {booking.guests}</span>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto text-right space-y-3">
                                        <p className="text-xl font-black text-primary">{booking.price}</p>
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
                </div>
            </div>
        </div>
    );
};

export default Profile;
