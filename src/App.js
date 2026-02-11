import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HabitDetail from "./pages/HabitDetail";
import Layout from "./components/Layout";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <AuthProvider>
      {/* DARK MODE WRAPPER */}
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

          {/* DARK MODE TOGGLE */}
          <button onClick={() => setDark(!dark)}
            className="
              fixed bottom-6 left-6 px-3 py-2 rounded-lg
              bg-gray-200 dark:bg-gray-700
              text-gray-800 dark:text-gray-200
              shadow-md transition
            "
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <Router>
            <Routes>

              {/* Public routes */}
              <Route path="/" element={<Layout>
                <Login />
              </Layout>
              }
              />

              <Route path="/register" element={<Layout>
                <Register />
              </Layout>
              }
              />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
              }
              />

              <Route path="/habit/:index" element={<ProtectedRoute>
                <Layout>
                  <HabitDetail />
                </Layout>
              </ProtectedRoute>
              }
              />

            </Routes>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
