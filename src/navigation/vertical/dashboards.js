import { Home, Circle, User, Table } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '1',
    children: [
      // {
      //   id: 'analyticsDash',
      //   title: 'Analytics',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/analytics'
      // },
      // {
      //   id: 'eCommerceDash',
      //   title: 'eCommerce',
      //   icon: <Circle size={12} />,
      //   navLink: '/dashboard/ecommerce'
      // },
      {
        id: 'dealership',
        title: 'Dealership',
        icon: <Table size={24}/>,
        children: [
          {
            id: 'dealership',
            title: 'Dealership',
            icon: <Circle />,
            navLink: '/dashboard/dealership/main'
          },
          {
            id: 'subDealership',
            title: 'Sub Dealership',
            icon: <Circle />,
            navLink: '/dashboard/dealership/sub'
          }
        ]
      }
    ]
  }
]
