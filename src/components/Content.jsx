import { Route, Routes } from 'react-router-dom'
import Inbox from './pages/Inbox'
import Today from './pages/Today'
import AddTask from './Task/AddTask'
import Search from './pages/Search'
import Upcoming from './pages/Upcoming'
import FiltersLabels from './pages/FiltersLabels'
import Completed from './pages/Completed'
import Projects from './pages/Projects'



export default function Content() {
  return (
    <div className='mt-10 w-full'>
      <Routes>
        <Route path='/' element={<Inbox />}/>
        <Route path='/today' element={<Today />}/>
        <Route path='/inbox' element={<Inbox />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/upcoming' element={<Upcoming />}/>
        <Route path='/filters-labels' element={<FiltersLabels />}/>
        <Route path='/completed' element={<Completed />}/>
        <Route path='/project' element={<Projects />}/>
      </Routes>
    </div>
  )
}
