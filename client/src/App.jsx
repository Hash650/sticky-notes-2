import NotesPage from "./pages/NotesPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoutes"
import Footer from "./components/Footer"
import NoteProvider from "./context/NoteContext"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/AuthContext"
import VerificationConfirmationPage from "./pages/VerificationConfirmationPage"

function App() {
  return (
    <Router>
      <div id="app">
        <AuthProvider>
          <Routes>
            <Route path='/login' element={
              <>
              <ToastContainer />
              <LoginPage />
              </>
              } />
            <Route path='/verification-success' element={<VerificationConfirmationPage />} />
            <Route path='/signup' element={
              <>
                <ToastContainer />
                <SignupPage />
              </>
            } />
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <ToastContainer />
                  <NoteProvider>
                    <NotesPage />
                  </NoteProvider>

                </PrivateRoute>
              } />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </Router>

  )
}

export default App
