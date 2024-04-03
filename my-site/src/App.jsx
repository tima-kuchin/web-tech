import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Routes, Route} from 'react-router-dom';

import * as React from 'react';
import Menu from './components/Menu';
import SideMenu from './components/SideMenu';
import Main from './components/Main'
import About from './components/About';
import Footer from './components/Footer';

import StateAndEffect from './components/labs/StateAndEffect';
import ReduxCounter from './components/labs/ReduxCounter/ReduxCounter';
import store from './components/labs/ReduxCounter/store';
import { Provider } from 'react-redux';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';



function App() {
  return (
    <>
      <Menu />
        <Box sx={{ display: 'flex'}}>
          <CssBaseline />
            <SideMenu />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/about' element={<About />} />  
              <Route path='/StateAndEffect' element={<StateAndEffect />} />
              <Route path='/ReduxCounter' element={<Provider store={store}><ReduxCounter/></Provider>} />  
            </Routes>
            <Footer />
            </Box>
        </Box>
    </>
  )
}

export default App;