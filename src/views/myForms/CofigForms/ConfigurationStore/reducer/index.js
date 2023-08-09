import { GET_RTO, GET_INSURER, GET_POLICY, GET_OEM, GET_BODY, GET_FUEL_TYPE, GET_MODELS, GET_VARIANTS, GET_MY_ALL_CONFIG, PUSH_ACPL, PUSH_PAYOUT, PUSH_COMMISSION, SET_DEFAULT, SET_TEMP_ACCESS, POP_ACPL, POP_PAYOUT, POP_COMMISSION } from "../actions/actionType"

const initial = {
  insurer: [{ id: "all", name: "All" }],
  policyType: [{ id: "all", name: "All" }],
  bodyType: [{ id: "all", name: "All" }],
  models: [{ id: "all", name: "All" }],
  variants: [{ id: "all", name: "All" }],
  oem: [{ id: "all", name: "All" }],
  fuelType: [{ id: "all", name: "All" }],
  rto: [{ id: "all", name: "All" }],
  acplList: [],
  payoutList: [],
  commissionList: [],
  defaultConfig: {
    insurer: "",
    policyType: "",
    bodyType: "",
    model: "",
    variant: ""
  },
  accessToken: ""
}
const configReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case GET_INSURER:
      return { ...state, insurer: [...payload] }
    case GET_POLICY:
      return { ...state, policyType: [...payload] }
    case GET_BODY:
      return { ...state, bodyType: [...payload] }
    case GET_MODELS:
      return { ...state, models: [...payload] }
    case GET_VARIANTS:
      return { ...state, variants: [...payload] }
    case GET_OEM:
      return { ...state, oem: [...payload] }
    case GET_FUEL_TYPE:
      return { ...state, fuelType: [...payload] }
    case GET_RTO:
      return { ...state, rto: [...payload] }
    case GET_MY_ALL_CONFIG:
      return { ...state, acplList: [...payload.acplList], payoutList: [...payload.payoutList], commissionList: [...payload.commissionList] }
    case PUSH_ACPL:
      return { ...state, acplList: [...state.acplList, ...payload] }
    case PUSH_PAYOUT:
      return { ...state, payoutList: [...state.payoutList, ...payload] }
    case PUSH_COMMISSION:
      return { ...state, commissionList: [...state.commissionList, ...payload] }
    case POP_ACPL: 
      return { ...state, acplList: [...payload]}
    case POP_PAYOUT: 
      return { ...state, payoutList: [...payload]}
    case POP_COMMISSION: 
      return { ...state, commissionList: [...payload]}
    case SET_DEFAULT:
      return { ...state, defaultConfig: { ...payload } }
    case SET_TEMP_ACCESS: 
      return { ...state, accessToken: payload}
    default:
      return state
  }
}
export default configReducer
