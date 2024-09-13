import { RouteObject } from 'react-router-dom';

import TabMenu from '../../components/TabMenu';
import DetailPageMovie from '../../pages/DetailPageMovie';
export const movieRoute: RouteObject[] = [

    {
        path: '/movie',
        element: <TabMenu/>
    },
    {
        path: '/movie/:id',
        element: <DetailPageMovie/>
    },
    {
        path: '/moviedetail',
        element: <DetailPageMovie/>
    }
]