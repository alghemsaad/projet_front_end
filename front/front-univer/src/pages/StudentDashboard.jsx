import { Search, Bell, MapPin, Calendar, Clock, ArrowRight, Star } from 'lucide-react';

export default function StudentDashboard() {

    // Données simulées pour les recommandations
    const recommendedEvents = [
        {
            id: 1,
            title: "Tech Career Fair 2024",
            category: "Career",
            date: "Tomorrow, 10:00 AM",
            location: "Main Exhibition Hall",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
            interested: 342
        },
        {
            id: 2,
            title: "Introduction to Machine Learning",
            category: "Workshop",
            date: "Nov 15, 2:00 PM",
            location: "Computer Lab 3",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80",
            interested: 128
        },
        {
            id: 3,
            title: "Campus Music Festival",
            category: "Social",
            date: "Nov 20, 6:00 PM",
            location: "University Square",
            image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80",
            interested: 856
        }
    ];

    return (
        <div className="p-8 lg:p-12 max-w-6xl mx-auto">

            {/* 1. Header (Recherche et Profil) */}
            <header className="flex justify-between items-center mb-10">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search events, clubs, or venues..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm shadow-sm transition-all"
                    />
                </div>

                <div className="flex items-center gap-4 ml-4">
                    <button className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition shadow-sm relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white box-content"></span>
                    </button>
                    <div className="w-11 h-11 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer">
                        <img src="https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            {/* 2. Message de bienvenue */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hello, Student! 👋</h1>
                <p className="text-gray-500 mt-2 text-lg">Ready to discover what's happening on campus?</p>
            </div>

            {/* 3. Highlighted Event (Le prochain événement de l'étudiant) */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Your Upcoming Event</h2>
                    <a href="#" className="text-blue-600 text-sm font-bold hover:underline">View all tickets</a>
                </div>

                <div className="bg-gray-900 rounded-3xl p-1 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row group cursor-pointer">
                    {/* Image Section */}
                    <div className="md:w-2/5 h-64 md:h-auto rounded-2xl overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" alt="Hackathon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent md:hidden"></div>
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                            <span className="text-xs font-bold text-white tracking-wider uppercase">Hackathon</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:w-3/5 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold mb-4 leading-tight">Spring Campus Hackathon 2024</h3>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg text-blue-400"><Calendar size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Date</p>
                                    <p className="text-sm font-bold">Today, 09:00 AM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg text-blue-400"><MapPin size={20} /></div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Location</p>
                                    <p className="text-sm font-bold">Innovation Center</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-auto">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/30">
                                View Ticket (QR)
                            </button>
                            <button className="p-3.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-gray-300">
                                <MapPin size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Recommended Events */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recommended for you</h2>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"><ArrowRight size={20} className="rotate-180" /></button>
                        <button className="p-2 border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"><ArrowRight size={20} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedEvents.map((event) => (
                        <div key={event.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                            <div className="h-48 relative overflow-hidden">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-yellow-500 transition-colors">
                                    <Star size={18} />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{event.category}</span>
                                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>

                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                        <Clock size={14} className="text-gray-400" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                        <MapPin size={14} className="text-gray-400" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}