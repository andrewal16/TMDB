import { RouteObject } from 'react-router-dom';

import TabMenu from '../../components/TabMenu';
import DetailPageMovie from '../../pages/DetailPageMovie';
import ProtectedRoute from './ProtectedRoute';
import MyCollection from '../../pages/MyCollection';
export const movieRoute: RouteObject[] = [

    {
        path: '/movie',
        element: <TabMenu/>
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/movie/:id',
                element: <DetailPageMovie/>
            },
            {
                path: '/mycollection',
                element: <MyCollection/>
            }
        ]
    },
   
]