import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react";
import system from './theme/theme';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './lib/react-query/QueryProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
<QueryProvider>
  <AuthProvider>
  <ChakraProvider value={system}>
   <App />
</ChakraProvider>
</AuthProvider>
</QueryProvider>
</BrowserRouter>
  </StrictMode>,
)
