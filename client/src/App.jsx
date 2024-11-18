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

function App() {
  return (
    <Router>
      <div id="app">
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
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
{/* <div id="app">
      <NotesPage />  
      <LoginPage />
       <SignupPage/> 
      <Footer />
    </div> */ }


export default App
