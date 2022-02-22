import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/investor/Home";
import BookingCar from "./pages/BookingCar";
import AdminHome from "./pages/admin/AdminHome";
import AddStock from "./pages/admin/AddStock";
import MarketHoliday from "./pages/admin/MarketHoliday";
import MarketHours from "./pages/admin/MarketHours";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminProtectedRoute
          path="/admin-home"
          component={AdminHome}
          exact
        ></AdminProtectedRoute>
        <AdminProtectedRoute
          path="/add-stocks"
          exact
          component={AddStock}
        ></AdminProtectedRoute>
        <AdminProtectedRoute
          path="/market-hours"
          exact
          component={MarketHours}
        ></AdminProtectedRoute>
        <AdminProtectedRoute
          path="/market-holidays"
          exact
          component={MarketHoliday}
        ></AdminProtectedRoute>
        <ProtectedRoute
          path="/booking/:carid"
          exact
          component={BookingCar}
        ></ProtectedRoute>
        <Route path="/admin" exact component={AdminLogin}></Route>
        <Route path="/login" exact component={Login}></Route>

        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute path="/" exact component={Home}></ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ component: Component, ...restOfProps }) {
  // console.log("ProtectedRoute ROUTE");
  // if (localStorage.getItem("user")) {
  //   return <Route {...props} />;
  // } else {
  //   return <Redirect to="/admin" />;
  // }
  const isAuthenticated = localStorage.getItem("user");
  console.log("this", isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
}

export function AdminProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("admin");
  console.log("this", isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
      }
    />
  );
}
