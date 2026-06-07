import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
    LogOut,
    GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function StudentLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const navItems = [
        { name: 'My Tickets', path: '/student' },
        { name: 'Discover', path: '/student/discover' },
        { name: 'Calendar', path: '/student/calendar' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

            {/* Top Navigation Bar Fixe */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="flex justify-between items-center w-full px-6 lg:px-10 max-w-7xl mx-auto h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/student" className="text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity">
                            CampusPulse
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    end={link.path === '/student'}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 py-5' : 'text-gray-500 hover:text-blue-600'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Liens de navigation */}
                <nav className="flex-1 px-4 mt-2 space-y-1.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/student'}
                            children={({ isActive }) => (
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}>
                                    <span>{item.name}</span>
                                </div>
                            )}
                        />
                    ))}
                </nav>

                {/* Liens du bas */}
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <Link to="/" onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-medium text-sm">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </Link>
                </div>
            </header>

            {/* Zone de contenu dynamique (qui change selon la page) */}
            <div className="flex-grow w-full">
                <Outlet />
            </div>

            {/* Footer Fixe */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="w-full px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-lg font-bold text-gray-900">CampusPulse</span>
                        <p className="text-xs text-gray-500">© 2026 CampusPulse University. All rights reserved.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline transition-all">Privacy Policy</a>
                        <a href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline transition-all">Terms of Service</a>
                        <a href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline transition-all">Campus Safety</a>
                        <a href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline transition-all">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}