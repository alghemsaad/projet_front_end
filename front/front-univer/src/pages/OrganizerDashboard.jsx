import { Search, Bell, Users, Calendar, ClipboardCheck, Sparkles, Edit2, BarChart2, Trash2, Clock, PieChart } from 'lucide-react';

export default function OrganizerDashboard() {
    const recentEvents = [
        { id: 1, title: "Quantum Computing Symposium", date: "Nov 12 • Science Bldg A", status: "Validated", statusColor: "bg-green-100 text-green-700", registered: 1240, capacity: 1500 },
        { id: 2, title: "Annual Campus Jazz Night", date: "Dec 05 • Union Square", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700", registered: 450, capacity: 800 },
        { id: 3, title: "Alumni Networking Brunch", date: "Oct 20 • Grand Hall", status: "Completed", statusColor: "bg-gray-100 text-gray-700", registered: 210, capacity: 200 }
    ];

    return (
        <div className="p-10 max-w-7xl mx-auto">

            {/* 1. En-tête (Header) */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jihane</h1>
                    <p className="text-gray-500 mt-1">Here is what's happening across your events today.</p>
                </div>

                <div className="flex items-center gap-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search events..." className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 w-72 text-sm bg-white" />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition shadow-sm">
                        <Bell size={20} />
                    </button>
                    <div className="w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 transition shadow-sm">
                        JD
                    </div>
                </div>
            </div>

            {/* 2. Cartes de Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
                        <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">+12%</span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Registrations</p>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">2,845</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={20} /></div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Active Events</p>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">14</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ClipboardCheck size={20} /></div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pending Reviews</p>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">03</h2>
                    </div>
                </div>
                <div className="bg-blue-600 p-6 rounded-2xl shadow-md flex flex-col justify-between h-36 relative overflow-hidden text-white">
                    <Sparkles className="absolute right-[-10px] bottom-[-10px] text-blue-500 opacity-50" size={80} />
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Engagement Score</p>
                        <h2 className="text-4xl font-bold mt-1 z-10 relative">94%</h2>
                    </div>
                </div>
            </div>

            {/* 3. Section Inférieure : Liste des Événements & Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                {/* Colonne de gauche (Managed Events) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-fit">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h2 className="text-lg font-bold text-gray-900">Managed Events</h2>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-sm font-medium bg-gray-100 rounded-lg text-gray-900">All</button>
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg">Active</button>
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg">Drafts</button>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-5">Event Details</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-3">Registered</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        {recentEvents.map((event) => (
                            <div key={event.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition">
                                <div className="col-span-5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 font-bold text-lg">
                                        {event.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-gray-900">{event.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                                    </div>
                                </div>
                                <div className="col-span-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${event.statusColor}`}>
                    {event.status}
                  </span>
                                </div>
                                <div className="col-span-3">
                                    <div className="text-sm font-bold text-gray-900">{event.registered} <span className="text-gray-400 font-medium text-xs">/ {event.capacity}</span></div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(event.registered / event.capacity) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="col-span-2 flex justify-end gap-3 text-gray-400">
                                    <button className="hover:text-gray-900 transition"><Edit2 size={16} /></button>
                                    {event.status === 'Completed' ? (
                                        <button className="hover:text-blue-600 transition"><BarChart2 size={16} /></button>
                                    ) : (
                                        <button className="hover:text-blue-600 transition"><Users size={16} /></button>
                                    )}
                                    {event.status === 'Completed' && <button className="hover:text-red-600 transition"><Trash2 size={16} /></button>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                        <button className="text-blue-600 text-sm font-bold hover:underline">View all 14 events</button>
                    </div>
                </div>

                {/* Colonne de droite (Widgets) */}
                <div className="space-y-6">

                    {/* Widget 1 : Launch Experience */}
                    <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                        <Sparkles className="absolute right-[-20px] bottom-[-20px] text-gray-700 opacity-30" size={120} />
                        <h3 className="text-xl font-bold mb-2 relative z-10">Launch a New Experience</h3>
                        <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">Ready to organize your next workshop or seminar? Use our wizard to get started in minutes.</p>
                        <button className="bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition relative z-10">
                            Start Wizard
                        </button>
                    </div>

                    {/* Widget 2 : Today's Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock size={18} className="text-blue-600" />
                            <h3 className="font-bold text-gray-900 text-sm">Today's Timeline</h3>
                        </div>

                        <div className="relative border-l-2 border-gray-100 ml-2 space-y-6">
                            <div className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white box-content shadow-sm"></div>
                                <h4 className="text-sm font-bold text-gray-900">Symposium Check-in starts</h4>
                                <p className="text-[11px] font-medium text-gray-500 mt-1">09:00 AM • Main Entrance</p>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-gray-300 rounded-full border-4 border-white box-content"></div>
                                <h4 className="text-sm font-bold text-gray-900">Guest Speaker: Lunch & Learn</h4>
                                <p className="text-[11px] font-medium text-gray-500 mt-1">12:30 PM • Room 402</p>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-gray-300 rounded-full border-4 border-white box-content"></div>
                                <h4 className="text-sm font-bold text-gray-900">Panel Discussion: Tech Trends</h4>
                                <p className="text-[11px] font-medium text-gray-500 mt-1">02:45 PM • Auditorium</p>
                            </div>
                        </div>
                    </div>

                    {/* Widget 3 : Faculty Distribution */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-900 text-sm">Faculty Distribution</h3>
                            <PieChart size={18} className="text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-medium text-gray-600">Engineering</span>
                                    <span className="font-bold text-gray-900">42%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: '42%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-medium text-gray-600">Arts & Sciences</span>
                                    <span className="font-bold text-gray-900">35%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-gray-800 h-2 rounded-full" style={{width: '35%'}}></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="font-medium text-gray-600">Business</span>
                                    <span className="font-bold text-gray-900">23%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-amber-700 h-2 rounded-full" style={{width: '23%'}}></div></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. Footer */}
            <footer className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <div>
                    <span className="font-bold text-gray-900 text-sm block mb-1">CampusPulse</span>
                    © 2026 CampusPulse University. All rights reserved.
                </div>
                <div className="flex gap-6 font-medium">
                    <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
                    <a href="#" className="hover:text-gray-900 transition">Campus Safety</a>
                    <a href="#" className="hover:text-gray-900 transition">Contact Support</a>
                </div>
            </footer>

        </div>
    );
}