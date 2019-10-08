import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));

const ServicesPage = React.lazy(() => import('./pages/services/ServicesPage'));
const NewServicePage = React.lazy(() => import('./pages/services/NewServicePage'));

const UsersPage = React.lazy(() => import('./pages/users/UsersPage'));
const ShowServicePage = React.lazy(() => import('./pages/services/ShowServicePage'));

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardPage },
  { path: '/dashboard/services', exact: true, name: 'Services', component: ServicesPage },
  { path: '/dashboard/services/new', exact: true, name: 'New Service', component: NewServicePage },
  { path: '/dashboard/services/:serviceId', exact: true, name: 'Show Service', component: ShowServicePage },
  { path: '/dashboard/users', exact: true, name: 'Users', component: UsersPage }
];

export default routes;
