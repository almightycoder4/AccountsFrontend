import { Home, Circle, Table } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    children: [
      // {
      //   id: 'analyticsDash',
      //   title: 'Analytics',
      //   icon: <Activity />,
      //   navLink: '/dashboard/analytics'
      // },
      // {
      //   id: 'eCommerceDash',
      //   title: 'eCommerce',
      //   icon: <ShoppingCart />,
      //   navLink: '/dashboard/ecommerce'
      // },
      {
        id: 'dealership',
        title: 'Dealership',
        icon: <Table />,
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
