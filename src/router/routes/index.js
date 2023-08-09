// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import BusinessRoute from './Business'
import MyFormRoutes from './MyForms'
import InsurersRoute from './Insurers'

// ** Document title
const TemplateTitle = 'Aegiscovenant React Template'

// ** Default Route
const DefaultRouteEx = '/dashboard/ecommerce'
const DefaultRoute = '/dashboard/dealership/main'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...BusinessRoute,
  ...InsurersRoute,
  ...MyFormRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
