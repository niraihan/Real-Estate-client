import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  
  RouterProvider,
} from "react-router";
import AuthProvider from './context/AuthProvider.jsx';
import router from './routes/router.jsx';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer></ToastContainer>
          <Toaster position="top-right" reverseOrder={false} />
      </StrictMode>,
    </QueryClientProvider>
  </AuthProvider>
)
