import { Outlet, NavLink, Link } from 'react-router-dom';
import { Bell, } from 'lucide-react';

export default function StudentLayout() {
    const navLinks = [
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
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => alert('No new notifications')}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all duration-200"
                        >
                            <Bell size={20} />
                        </button>
                        <Link to="/" title="Logout">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:ring-2 hover:ring-blue-600 transition-all">
                                <img src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" alt="User profile" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                    </div>
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