import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from './components/Menu';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import StateAndEffect from './components/labs/StateAndEffect';
import ReduxCounter from './components/labs/ReduxCounter/ReduxCounter';
import FeedbackForm from './components/labs/FormFormik/FormFormik';
import TableComponentFull from './components/labs/MyReactTable/TableComponent';
import Req from './components/labs/Req';

function App() {
  return (
    <>
      <Menu />
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />  
        <Route path='/StateAndEffect' element={<StateAndEffect />} />
        <Route path='/ReduxCounter' element={<ReduxCounter />} /> 
        <Route path='/Formik' element={<FeedbackForm />} />
        <Route path='/ReactTable' element={<TableComponentFull />} />
        <Route path='/Req' element={<Req />} />        
      </Routes>
      <Footer />
    </>
  );
}

export default App;