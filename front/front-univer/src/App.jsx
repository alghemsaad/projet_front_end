import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrganizerLayout from './components/layout/OrganizerLayout';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEvent from './pages/CreateEvent';
import Participants from './pages/Participants'; // <-- Nouvel import
import StudentDashboard from './pages/StudentDashboard';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/organizer" replace />} />

                {/* Espace Organisateur avec son Menu Latéral */}
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route index element={<OrganizerDashboard />} />
                    <Route path="events/new" element={<CreateEvent />} />
                    <Route path="participants" element={<Participants />} /> {/* <-- Nouvelle route ajoutée */}
                </Route>

                <Route path="/student" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}