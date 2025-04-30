import './App.css'
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { DataProvider } from './Context/DataContext';
import Layout from './Layout/Layout';

const HomePage = lazy(() => import('./Pages/Home/HomePage'))
const Login = lazy(() => import('../src/Pages/Login/loginPage'))
const Registration = lazy(() => import('../src/Pages/Registration/Registration'))
const ForgotPage = lazy(() => import('../src/Pages/Forgot-page/ForgotPage'))
const Notes = lazy(() => import('../src/Pages/Notes/Notes'))

function App() {


  return (

    <DataProvider>
      <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
        <Routes >
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/forgot-page' element={<ForgotPage />} />
            <Route path='/notes' element={<Notes />} />

          </Route>
        </Routes>
      </Suspense>
    </DataProvider>

  )
}

export default App
