import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Rent from "./pages/rent/Rent";
import Detail from "./pages/detail/Detail";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/detail" element={<Detail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      
      <Footer />

    </>
  );
};

export default App;
