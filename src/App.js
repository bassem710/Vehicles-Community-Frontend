import { Navigate, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookAppointment from './pages/BookAppointment';
import Compare from './pages/Compare';
import Events from './pages/Events';
import EventInfo from './pages/EventInfo';
import CarView from './pages/CarView';
import News from './pages/News';
import Footer from './components/Footer';
import AdminPanel from './pages/admin/AdminPanel';
import Appointments from './pages/admin/Appointments';

function App() {
    return (
        <>
        {/* Nav */}
        <Nav />
        {/* Routes */}
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/book-appointment" element={<BookAppointment />}/>
            <Route path="/compare/:car1/:car2?" element={<Compare />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventInfo />} />
            <Route path="/cars/:id" element={<CarView />} />
            <Route path="/news" element={<News />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/admin" element={<AdminPanel/>} />
        </Routes>
        {/* Footer */}
        <Footer />
        </>
    );
}

export default App;
