import React from 'react';

const Login = React.lazy(() => import('./pages/auth/Login'));

const route = [{ path: '/auth/login', exact: true, name: 'Login', component: Login }];

export default route;
