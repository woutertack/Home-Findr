import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Rent from "./pages/rent/Rent";
import Detail from "./pages/detail/Detail";
import Buy from "./pages/buy/Buy";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Favorites from "./pages/favorites/Favorites";
import Messages from "./pages/messages/Messages";
import Profile from "./pages/profile/Profile";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import MessageProperty from "./pages/messageProperty/MessageProperty";
import AddProperty from "./pages/admin/addProperty/AddProperty";
import Agencies from "./pages/admin/agencies/Agencies";


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<MessageProperty/>}/>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NotFound />} /> */}

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/add" element={<AddProperty />} />
        <Route path="/admin/agencies" element={<Agencies />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
