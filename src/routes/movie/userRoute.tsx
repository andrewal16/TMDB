import { RouteObject } from 'react-router-dom';

import LoginPage from '../../pages/LoginPage';
export const userRoute: RouteObject[] = [

    {
        path: '/auth/login',
        element: <LoginPage/>
    },
    {
        path: '/',
        element: <LoginPage/>
    }
    
]