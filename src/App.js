import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import BookingCar from "./pages/BookingCar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/admin" exact component={AdminLogin}></Route>
        <Route path="/login" exact component={Login}></Route>
        <ProtectedRoute path="/" exact component={Home}></ProtectedRoute>
        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute
          path="/booking/:carid"
          exact
          component={BookingCar}
        ></ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export function AdminProtectedRoute(props) {
  if (localStorage.getItem("admin")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/admin" />;
  }
}
