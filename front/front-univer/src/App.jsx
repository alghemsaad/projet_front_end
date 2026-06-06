import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrganizerLayout from './components/layout/OrganizerLayout';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEvent from './pages/CreateEvent';
import Participants from './pages/Participants';
import Login from './pages/Login';
import StudentLayout from './components/layout/StudentLayout'; // <-- Nouvel import
import StudentDashboard from './pages/StudentDashboard';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Espace Organisateur avec son Menu Latéral */}
                <Route path="/organizer" element={<OrganizerLayout />}>
                    <Route index element={<OrganizerDashboard />} />
                    <Route path="events/new" element={<CreateEvent />} />
                    <Route path="participants" element={<Participants />} />
                </Route>

                {/* Espace Étudiant avec son propre Menu Latéral */}
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<StudentDashboard />} />
                    {/* Tu pourras ajouter d'autres pages étudiantes ici plus tard */}
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}