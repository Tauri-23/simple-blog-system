import { RouterProvider } from 'react-router-dom';
import router from './router';
import { GeneralProvider } from './context/GeneralContext';
import ModalManager from './managers/modalManager';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./assets/css/global.css";
import "./assets/css/nav.css";
import "./assets/css/elements.css";


// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { LoggedUserProvider } from './context/LoggedUserContext';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GeneralProvider>
            <LoggedUserProvider>
                <ModalManager/>
                <RouterProvider router={router} />
            </LoggedUserProvider>            
        </GeneralProvider>
    </StrictMode>,
)
