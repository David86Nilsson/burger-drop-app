import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ShoppingCart from "./routes/ShoppingCart";
import Details from "./routes/Details";
import Summary from "./routes/Summary";
import Pay from "./routes/Pay";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Register from "./routes/Register";
import { AuthProvider } from "./services/UserContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <div>
          <img src="/images/Malmo.jpg" alt="" className="background" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:itemId" element={<Details />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
