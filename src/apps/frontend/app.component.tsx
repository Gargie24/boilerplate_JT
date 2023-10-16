import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';


// import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { About,Login,Register,Home} from './pages';
// import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    // <DepsProvider deps={{
    //   accessService: new AccessService(),
    //  }}>
      <Router>

        <div className='container'>

          <Routes>
          <Route path = '/' element={<div style={{ marginTop: '40px' }}><Home/></div>}> </Route>
            <Route path = '/:_id/todos' element={<div style={{ marginTop: '40px' }}><Home/></div>}> </Route>
            <Route path='/about' element={<About />} />

             <Route path='/login' element={<Login />} />
            {/* <Route path='*' element={<NotFound />} /> */}
            <Route path='/register' element={<Register/>} />

          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    //  </DepsProvider>
  );
}





