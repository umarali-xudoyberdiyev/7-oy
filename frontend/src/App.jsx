import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ConnectionStatus from "./components/utils/ConectionStatus";
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <ConnectionStatus />
    </BrowserRouter>
  );
}

export default App;
