import React from 'react';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import  Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';


function Router() {
    return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<OrphanagesMap />} />
        
            <Route path="/orphanage/create" element={<CreateOrphanage />} />
            <Route path="/orphanages/:id" element={<Orphanage />} />

            
        </Routes>

         {/* <Switch>
            <Route path='/' exact  component={Landing}/>
            <Route path='/app' component={orphanagesMap}/>
        </Switch> */}
        </BrowserRouter>
    );
}

export default Router;