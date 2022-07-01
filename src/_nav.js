import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilBook } from '@coreui/icons';
import { CNavItem, CNavGroup } from '@coreui/react';

const _nav = [
    {
        component: CNavGroup,
        name: 'Khóa học',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Danh sách khóa học',
                to: '/courses',
            },
            {
                component: CNavItem,
                name: 'Chủ đề',
                to: '/topics',
            },
            {
                component: CNavItem,
                name: 'Bài học',
                to: '/lessons',
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Danh sách người dùng',
        to: '/students',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
        },
    },

    // {
    //     component: CNavGroup,
    //     name: 'Base',
    //     to: '/base',
    //     icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    //     items: [
    //         {
    //             component: CNavItem,
    //             name: 'Accordion',
    //             to: '/base/accordion',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Breadcrumb',
    //             to: '/base/breadcrumbs',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Cards',
    //             to: '/base/cards',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Carousel',
    //             to: '/base/carousels',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Collapse',
    //             to: '/base/collapses',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'List group',
    //             to: '/base/list-groups',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Navs & Tabs',
    //             to: '/base/navs',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Pagination',
    //             to: '/base/paginations',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Placeholders',
    //             to: '/base/placeholders',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Popovers',
    //             to: '/base/popovers',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Progress',
    //             to: '/base/progress',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Spinners',
    //             to: '/base/spinners',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Tables',
    //             to: '/base/tables',
    //         },
    //         {
    //             component: CNavItem,
    //             name: 'Tooltips',
    //             to: '/base/tooltips',
    //         },
    //     ],
    // },
];

export default _nav;
