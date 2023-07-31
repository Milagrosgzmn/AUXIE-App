// Styles
import './App.scss'
// Import Hooks
import { Route, Routes } from 'react-router-dom'

// Import Views
import Landing from './views/landing/Landing'
import Home from './views/home/Home'
import Detail from './views/detail/Detail'
import Form from './views/form/auxieForm'
import PageNotFound from './views/page-not-found/PageNotFound'
import Company from './views/company/Company'
import Guarantee from './views/guarantee/Guarantee'
import Help from './views/help/Help'
import ClientForm from './views/form/clientForm'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing />} />
                {/* Landing Nav Views */}
                <Route path="/company" element={<Company />} />
                <Route path="/guarantee" element={<Guarantee />} />
                <Route path="/help" element={<Help />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/auxieform" element={<Form />} />
                <Route path="/clientform" element={<ClientForm />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default App