import './App.css'
import Header from './components/Header'
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/route';

function App() {
  return (
    <div className="w-full h-full relative">
      <Header />
      <div className="mx-auto max-w-[1440px] px-2">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
