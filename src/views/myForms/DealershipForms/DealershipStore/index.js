import { GET_DEALERSHIP, GET_SUB_DEALERSHIP } from "./actions"

const initial = {
    dealership: [],
    subDealership: []
}

const dealershipReducer = (state = initial, { type, payload }) => {
    switch (type) {
      case GET_DEALERSHIP:
        return { ...state, dealership: [...payload] }
        case GET_SUB_DEALERSHIP:
            return { ...state, subDealership: [...payload] }
      default :
        return state
    }
}

export default dealershipReducer