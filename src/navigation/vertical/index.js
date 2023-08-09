// ** Navigation sections imports
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import chartsAndMaps from './charts-maps'
import business from './business'
import myForms from './myForms'
import dealership from './dealership'
import policies from './policies'
import wallet from './wallet'
import insurers from './insurers'
import settings from './settings'

// ** Merge & Export
export default [...dealership, ...policies, ...wallet, ...settings]
    //...insurers, ...dashboards, ...business, ...myForms, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others]