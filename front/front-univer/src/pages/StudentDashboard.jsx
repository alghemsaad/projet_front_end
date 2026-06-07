import { useState, useEffect } from 'react';
import { MapPin, QrCode, XCircle, Lock, X, Download } from 'lucide-react';

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const initialRegistrations = [
            {
                id: 1, title: "Tech Innovators Mixer", location: "Innovation Hub, Room 302",
                month: "Oct", day: "24", status: "Confirmed", statusColor: "bg-green-100 text-green-800",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
                hasTicket: true, ticketId: "CP-8839-2241"
            },
            {
                id: 2, title: "Autumn Arts Festival", location: "University Quadrangle",
                month: "Oct", day: "28", status: "Waitlisted", statusColor: "bg-yellow-100 text-yellow-800",
                image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
                hasTicket: false, ticketId: null
            },
            {
                id: 3, title: "Design Thinking Workshop", location: "Design Studio B",
                month: "Nov", day: "05", status: "Confirmed", statusColor: "bg-green-100 text-green-800",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
                hasTicket: true, ticketId: "CP-9921-5510"
            }
        ];

        const savedTickets = JSON.parse(localStorage.getItem('myTickets') || '[]');
        setRegistrations([...initialRegistrations, ...savedTickets]);
    }, []);

    const openTicket = (event) => {
        setSelectedTicket(event);
        setIsTicketModalOpen(true);
    };

    const cancelRegistration = (id) => {
        if (window.confirm("Are you sure you want to cancel this registration?")) {
            setRegistrations(registrations.filter(reg => reg.id !== id));
            const savedTickets = JSON.parse(localStorage.getItem('myTickets') || '[]');
            const updatedTickets = savedTickets.filter(t => t.id !== id);
            localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
        }
    };

    const filteredRegistrations = activeTab === 'Upcoming' 
        ? registrations 
        : []; // Mock: no past events in this demo

    return (
        <main className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-10 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Registrations</h1>
                    <p className="text-lg text-gray-500 max-w-2xl">Manage your upcoming campus events, view tickets, and stay connected with the student community.</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                    {['Upcoming', 'Past Events'].map((tab) => (
                        <button
                            key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Registration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg) => (
                    <div key={reg.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
                        <div className="relative h-48 w-full overflow-hidden">
                            <img src={reg.image} alt={reg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 flex flex-col items-center justify-center w-14 h-16 bg-gray-900 text-white rounded-xl shadow-md">
                                <span className="text-[10px] font-bold uppercase tracking-wider">{reg.month}</span>
                                <span className="text-xl font-bold leading-none">{reg.day}</span>
                            </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mb-3 ${reg.statusColor}`}>{reg.status}</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{reg.title}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-6"><MapPin size={16} /> {reg.location}</p>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                                {reg.hasTicket ? (
                                    <button onClick={() => openTicket(reg)} className="flex-grow py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                        <QrCode size={18} /> View QR Ticket
                                    </button>
                                ) : (
                                    <button disabled className="flex-grow py-2.5 bg-gray-100 text-gray-400 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                                        <Lock size={18} /> Ticket Pending
                                    </button>
                                )}
                                <button 
                                    onClick={() => cancelRegistration(reg.id)}
                                    className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                                >
                                    <XCircle size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No {activeTab.toLowerCase()} registrations found.</p>
                    </div>
                )}
            </div>

            {/* QR Ticket Modal */}
            {isTicketModalOpen && selectedTicket && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-gray-900 p-6 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">Your Ticket</h2>
                                <p className="text-sm text-gray-400 mt-1">{selectedTicket.title}</p>
                            </div>
                            <button onClick={() => setIsTicketModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
                        </div>
                        <div className="p-8 flex flex-col items-center gap-6">
                            <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm">
                                <div className="w-48 h-48 bg-white flex flex-wrap gap-0.5 overflow-hidden">
                                    {[...Array(400)].map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-[1px] ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-transparent'}`}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Ticket ID</p>
                                <p className="text-2xl font-bold text-gray-900 tracking-tight">{selectedTicket.ticketId}</p>
                            </div>
                            <p className="text-sm text-gray-500 text-center leading-relaxed">
                                Please show this QR code at the entrance of <br/>
                                <span className="font-bold text-gray-900">{selectedTicket.location}</span>.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                            <button onClick={() => window.print()} className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                <Download size={18} /> Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}