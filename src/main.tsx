import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/movie/route'
import { Provider } from 'react-redux';
import { store } from './store/Store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

