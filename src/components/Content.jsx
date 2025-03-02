import { Route, Routes } from 'react-router-dom'
import Inbox from './pages/Inbox'
import Projects from './pages/Projects'



export default function Content() {
  return (
    <div className='mt-10 w-full'>
      <Routes>
        <Route path='/' element={<Inbox />}/>
        <Route path='/inbox' element={<Inbox />}/>
        <Route path='/project' element={<Projects />}/>
      </Routes>
    </div>
  )
}
