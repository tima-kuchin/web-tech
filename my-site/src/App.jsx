import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from './components/Menu';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import StateAndEffect from './components/labs/StateAndEffect';
import ReduxCounter from './components/labs/ReduxCounter/ReduxCounter';
import FeedbackForm from './components/labs/FormFormik/FormFormik';
import TableComponentWithProviders from './components/labs/MyReactTable/TableComponent'

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
        <Route path='/ReactTable' element={<TableComponentWithProviders />} />     
      </Routes>
      <Footer />
    </>
  );
}

export default App;