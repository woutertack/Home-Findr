import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import PropertyMessage from "./pages/propertyMessage/PropertyMessage";
import AddProperty from "./pages/admin/addProperty/AddProperty";
import Agencies from "./pages/admin/agencies/Agencies";
import Users from "./pages/admin/users/Users";
import AuthContainer, { useAuthContext } from "./contexts/AuthContext";
import NotFound from "./pages/notFound/NotFound";
import UpdateProperty from "./pages/admin/updateProperty/UpdateProperty";
import AgencyProfile from "./pages/admin/agencies/AgencyProfile";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
 

  return (
    <>
      <AuthContainer>
        {!isAdminRoute && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/rent" element={<Rent />} />
          <Route path="/buy" element={<Buy />} />

          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message/:id" element={<PropertyMessage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* Admin Routes
          <Route path="/admin">
            <Route 
              index
              element={
                <AdminRoute>
                  <DashboardAdmin/>
                </AdminRoute>
              }
            />
          </Route> */}

          <Route path="/admin" element={<DashboardAdmin />} />
          {/* update property */}
          <Route path="/admin/:id" element={<UpdateProperty />} />
          <Route path="/admin/add" element={<AddProperty />} />
          <Route path="/admin/agencies" element={<Agencies />} />
          <Route path="/admin/agencies/:id" element={<AgencyProfile />} />
          <Route path="/admin/users" element={<Users />} />

          {/* not found path */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {!isAdminRoute && <Footer />}
      </AuthContainer>
    </>
  );
};

export default App;
