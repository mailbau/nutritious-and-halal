
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Ingredients from './pages/Ingredients'
import Games from './pages/Games'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ArticleForm from './pages/ArticleForm'
import ArticleDetail from './pages/ArticleDetail'
import ArticlesList from './pages/ArticlesList'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { index: true, element: <Home /> },
      { path: 'tentang-kami', element: <About /> },
      { path: 'pojok-edukasi', element: <Education /> },
      { path: 'bahan-halal', element: <Ingredients /> },
      { path: 'games', element: <Games /> },
      { path: 'kontak', element: <Contact /> },
    ]
  },
  // Article routes (separate from main app layout)
  { path: '/articles', element: <ArticlesList /> },
  { path: '/articles/:id', element: <ArticleDetail /> },
  // Admin routes (separate from main app layout)
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/articles/new', element: <ArticleForm /> },
  { path: '/admin/articles/:id/edit', element: <ArticleForm /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
