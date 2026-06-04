import { useState, useEffect } from 'react';
import {
    ChevronRight, QrCode, Search, Filter, Download,
    MoreVertical, CheckCircle, Clock, X, Lightbulb, CheckCircle2
} from 'lucide-react';

export default function Participants() {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // On affiche 2 participants par page pour tester

    // Notre base de données simulée (élargie pour la pagination)
    const allParticipants = [
        { id: '20240982', name: 'Alex Chen', initial: 'A', dept: 'Computer Science', date: 'Oct 12, 2023', status: 'Validated', color: 'bg-green-100 text-green-700' },
        { id: '20241105', name: 'Sarah Jenkins', initial: 'S', dept: 'Architecture', date: 'Oct 14, 2023', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
        { id: '20240231', name: 'Marcus King', initial: 'M', dept: 'Digital Media', date: 'Oct 15, 2023', status: 'Validated', color: 'bg-green-100 text-green-700' },
        { id: '20240884', name: 'Daniel Kim', initial: 'D', dept: 'Mechanical Eng.', date: 'Oct 16, 2023', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
        { id: '20240901', name: 'Emma Watson', initial: 'E', dept: 'Literature', date: 'Oct 17, 2023', status: 'Validated', color: 'bg-green-100 text-green-700' },
        { id: '20240915', name: 'Omar Sy', initial: 'O', dept: 'Arts', date: 'Oct 18, 2023', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
    ];

    // --- LOGIQUE DE PAGINATION ---
    const totalPages = Math.ceil(allParticipants.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // currentParticipants contient uniquement les étudiants de la page actuelle
    const currentParticipants = allParticipants.slice(indexOfFirstItem, indexOfLastItem);

    // --- LOGIQUE D'EXPORT CSV ---
    const exportToCSV = () => {
        // 1. Créer l'en-tête du fichier
        const headers = ['ID', 'Name', 'Department', 'Registration Date', 'Status'];
        // 2. Formater les données
        const csvRows = allParticipants.map(p =>
            `${p.id},"${p.name}","${p.dept}","${p.date}",${p.status}`
        );
        // 3. Assembler le tout
        const csvContent = [headers.join(','), ...csvRows].join('\n');

        // 4. Déclencher le téléchargement dans le navigateur
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'hackathon_participants.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const simulateScan = () => {
        setIsScannerOpen(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsScannerOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div className="p-10 max-w-7xl mx-auto relative">

            <header className="flex justify-between items-end mb-8">
                <div>
                    <nav className="flex items-center gap-2 text-gray-500 mb-2">
                        <span className="text-xs font-medium">Events</span>
                        <ChevronRight size={14} />
                        <span className="text-xs font-medium">Spring Hackathon 2026</span>
                        <ChevronRight size={14} />
                        <span className="text-xs font-bold text-gray-900">Participants</span>
                    </nav>
                    <h2 className="text-3xl font-bold text-gray-900">Spring Hackathon 2026</h2>
                    <p className="text-gray-500 mt-1">Manage registrations and check-in status for all attendees.</p>
                </div>
                <button onClick={() => setIsScannerOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-700 transition-all shadow-md">
                    <QrCode size={20} />
                    Scan QR Code
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Attendance Progress</span>
                        <span className="font-bold text-gray-900">45 / 100 <span className="text-gray-400 font-medium text-sm">(45%)</span></span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pending</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">55 Students</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"/>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2.5 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                            <Filter size={16} /> Department
                        </button>
                        {/* BOUTON EXPORT CSV AVEC L'ÉVÉNEMENT ONCLICK */}
                        <button onClick={exportToCSV} className="px-4 py-2.5 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                            <Download size={16} /> Export CSV
                        </button>
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Participant Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Registration Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Check-in Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {/* ON UTILISE MAINTENANT currentParticipants AU LIEU DE allParticipants */}
                    {currentParticipants.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                        {p.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">ID: {p.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{p.dept}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{p.date}</td>
                            <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit ${p.color}`}>
                    {p.status === 'Validated' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {p.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                {p.status === 'Pending' ? (
                                    <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all">Check-in</button>
                                ) : (
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors p-1"><MoreVertical size={18} /></button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-500">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allParticipants.length)} of {allParticipants.length} participants
                    </p>
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1 border border-gray-200 rounded-md text-gray-600 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight size={18} className="rotate-180" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                    currentPage === page ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 text-gray-600 font-medium'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1 border border-gray-200 rounded-md text-gray-600 disabled:text-gray-300 disabled:bg-gray-50 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {isScannerOpen && (
                // ... (Modal scanner reste identique)
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsScannerOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"><X size={24} /></button>
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">QR Check-in</h3>
                            <p className="text-gray-500 text-sm">Scan the student's digital ID or ticket to mark attendance.</p>
                        </div>
                        <div className="relative w-full aspect-square bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-8 border-2 border-blue-500/50 rounded-lg"></div>
                            <style>{`@keyframes scanLine { 0% { top: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 90%; opacity: 0; } } .animate-scan { animation: scanLine 2.5s infinite linear; }`}</style>
                            <div className="absolute w-3/4 h-0.5 bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] animate-scan"></div>
                            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">Center code in the frame</p>
                        </div>
                        <div className="mt-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
                                <p className="text-xs text-blue-900 font-medium leading-relaxed">Hold the device steady. Ensure the QR code is well-lit for faster recognition.</p>
                            </div>
                            <button onClick={simulateScan} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm">Simulate Successful Scan</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-300 z-[60] ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
                <CheckCircle2 className="text-green-400" size={24} />
                <div>
                    <p className="font-bold text-sm">Check-in Successful!</p>
                    <p className="text-xs text-gray-400 mt-0.5">Student has been marked as attended.</p>
                </div>
            </div>

        </div>
    );
}