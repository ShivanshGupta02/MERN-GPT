import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();
  console.log(useAuth()?.isLoggedIn);
  return (<main>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      { auth?.isLoggedIn && auth.user && ( 
        <Route path="/chat" element={<Chat/>} />)
      }
      <Route path="/signup" element={<Signup/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </main>);
};

export default App;
