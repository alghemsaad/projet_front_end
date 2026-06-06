import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StudentCalendar() {
    const schedule = [
        { date: "15", day: "Mon", month: "Nov", events: [
                { id: 1, title: "Introduction to Machine Learning", time: "10:00 AM - 12:00 PM", location: "Lab 3", type: "Workshop" },
                { id: 2, title: "Student Council Meeting", time: "02:00 PM - 03:30 PM", location: "Room 102", type: "Meeting" }
            ]},
        { date: "16", day: "Tue", month: "Nov", events: [
                { id: 3, title: "Career Fair Prep", time: "11:00 AM - 01:00 PM", location: "Main Hall", type: "Career" }
            ]},
        { date: "20", day: "Sat", month: "Nov", events: [
                { id: 4, title: "Campus Music Fest", time: "06:00 PM - 11:00 PM", location: "University Square", type: "Social" }
            ]}
    ];

    return (
        <main className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-10 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Calendar</h1>
                    <p className="text-gray-500">Plan your week and never miss an important event.</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-200 p-2 rounded-xl shadow-sm">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><ChevronLeft size={20} /></button>
                    <span className="font-bold text-gray-900 min-w-[120px] text-center">November 2026</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Agenda View */}
            <div className="space-y-8">
                {schedule.map((dayBlock, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6">
                        {/* Date Column */}
                        <div className="md:w-32 flex-shrink-0">
                            <div className="sticky top-24 text-center md:text-right">
                                <span className="block text-sm font-bold text-blue-600 uppercase tracking-wider">{dayBlock.day}</span>
                                <span className="block text-4xl font-bold text-gray-900">{dayBlock.date}</span>
                                <span className="block text-sm font-medium text-gray-500">{dayBlock.month}</span>
                            </div>
                        </div>

                        {/* Events Column */}
                        <div className="flex-grow space-y-4">
                            {dayBlock.events.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group border-l-4 border-l-blue-600">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">{event.type}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                            <Clock size={16} className="text-blue-500" /> {event.time}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                            <MapPin size={16} className="text-blue-500" /> {event.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}