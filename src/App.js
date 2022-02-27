import "antd/dist/antd.css";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/investor/Home";
import WalletHistory from "./pages/investor/WalletHistory";
import BookingCar from "./pages/BookingCar";
import AdminHome from "./pages/admin/AdminHome";
import AddStock from "./pages/admin/AddStock";
import EditStock from "./pages/admin/EditStock";
import MarketHoliday from "./pages/admin/MarketHoliday";
import MarketHours from "./pages/admin/MarketHours";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoute
          path="/admin-home"
          component={AdminHome}
          exact
        ></ProtectedRoute>
        <ProtectedRoute
          path="/add-stocks"
          exact
          component={AddStock}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/edit-stocks/:stockid"
          exact
          component={EditStock}
        ></ProtectedRoute>

        <ProtectedRoute
          path="/market-hours"
          exact
          component={MarketHours}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/market-holidays"
          exact
          component={MarketHoliday}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/booking/:carid"
          exact
          component={BookingCar}
        ></ProtectedRoute>
        <Route path="/admin" exact component={AdminLogin}></Route>
        <Route path="/login" exact component={Login}></Route>

        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute path="/" exact component={Home}></ProtectedRoute>
        <ProtectedRoute
          path="/wallet"
          exact
          component={WalletHistory}
        ></ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");
  console.log("this", isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// export function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("admin");
//   console.log("this", isAuthenticated);
//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
//       }
//     />
//   );
// }
