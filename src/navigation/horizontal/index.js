// ** Navigation sections imports
import apps from './apps'
import pages from './pages'
import others from './others'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import formsAndTables from './forms-tables'
import chartsAndMaps from './charts-maps'
import business from './business'
import myForms from './myForms'

// ** Merge & Export
export default [...dashboards, ...business, ...myForms, ...apps,  ...uiElements, ...formsAndTables, ...pages, ...chartsAndMaps, ...others]
