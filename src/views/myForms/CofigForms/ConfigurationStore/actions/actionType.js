//! Authorization Actions Type for later references
export const ERROR = 'error/auth'
export const LOADING = 'loading/auth'
export const CHANGE_USER = 'user/role/auth'
export const LOGIN_USER = 'login/auth/user'
export const LOGOUT = 'logout/auth'
export const SET_TEMP_ACCESS = 'login/set/temp/access'

//! Config Actions Type
export const GET_INSURER = 'get/config/insurer'
export const GET_POLICY = 'get/config/policy'
export const GET_BODY = 'get/config/body'
export const GET_MODELS = 'get/config/models'
export const GET_VARIANTS = 'get/config/variants'
export const GET_OEM = 'get/config/oem'
export const GET_FUEL_TYPE = 'get/config/fueltype'
export const GET_RTO = 'get/config/rto'

export const GET_MY_ALL_CONFIG = 'get/all/acpl/payout/distribution'
//?append new config
export const PUSH_ACPL = 'push/acpl/to/redux'
export const PUSH_PAYOUT = 'push/payout/to/redux'
export const PUSH_COMMISSION = 'push/commission/to/redux'
//?delete previous config
export const POP_ACPL = 'pop/acpl/from/redux'
export const POP_PAYOUT = 'pop/payout/from/redux'
export const POP_COMMISSION = 'pop/commission/from/redux'
export const SET_DEFAULT = 'set/default/config/value'

//! D/S or Sub-D/S Actions Type for later references
// export const GET_ALL_DEALERS = 'get/all/dealer'
// export const GET_ALL_SUB_DEALERS = 'get/all/sub/dealer'
// export const GET_ONE_DEALER = 'get/dealer/by/id'
// export const UPDATE_CONFIGS = 'update/dealer/config'
// export const DEALER_LOADING = 'dealer/process/loading'
// export const DEALER_ERROR = 'dealer/process/error'

