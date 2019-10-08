export default {
  items: [
    {
      id: 'navigation',
      title: 'Dashboard',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard',
          icon: 'feather icon-home'
        },
        {
          id: 'services',
          title: 'Servicios',
          type: 'item',
          url: '/dashboard/services',
          icon: 'feather icon-box'
        },
        {
          id: 'users',
          title: 'Usuarios',
          type: 'item',
          url: '/dashboard/users',
          icon: 'feather icon-users'
        }
      ]
    }
  ]
};
