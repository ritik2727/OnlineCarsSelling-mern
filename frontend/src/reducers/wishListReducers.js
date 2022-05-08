import { WISHLIST_ADD_ITEM_FAIL, WISHLIST_ADD_ITEM_SUCCESS, WISHLIST_GET_ITEM_SUCCESS ,WISHLIST_GET_ITEM_FAIL, WISHLIST_REMOVE_ITEM_FAIL, WISHLIST_REMOVE_ITEM_SUCCESS, WISHLIST_REMOVE_ITEM_REQUEST, WISHLIST_ADD_ITEM_REQUEST, WISHLIST_ADD_ITEM_RESET, WISHLIST_REMOVE_ITEM_RESET} from "../constants/wishlistConstants"

export const wishListAddItemReducer = (state = {}, action) => {
    switch (action.type) {
      case WISHLIST_ADD_ITEM_REQUEST:
        return { loading: true }
      case WISHLIST_ADD_ITEM_SUCCESS:
        return { loading: false,success: true,wish:action.payload,  }
      case WISHLIST_ADD_ITEM_FAIL:
        return { loading: false, error: action.payload }
        case WISHLIST_ADD_ITEM_RESET:
      return {}
    //   case PRODUCT_CREATE_REVIEW_RESET:
    //     return {}
      default:
        return state
    }
  }

  export const getWistlistsItemReducer = (state = {wishItem: []}, action) => {
    switch (action.type) {
    //   case PRODUCT_CREATE_REVIEW_REQUEST:
    //     return { loading: true }
      case WISHLIST_GET_ITEM_SUCCESS:
        return { loading: false,success: true,wishItem:action.payload,  }
      case WISHLIST_GET_ITEM_FAIL:
        return { loading: false, error: action.payload }
    //   case PRODUCT_CREATE_REVIEW_RESET:
    //     return {}
      default:
        return state
    }
  }

  
  export const removeWistlistsItemReducer = (state = {}, action) => {
    switch (action.type) {
      case WISHLIST_REMOVE_ITEM_REQUEST:
        return { loading: true }
      case WISHLIST_REMOVE_ITEM_SUCCESS:
        return { loading: false,success: true,rmWishItem:action.payload}
      case WISHLIST_REMOVE_ITEM_FAIL:
        return { loading: false, error: action.payload }
      case WISHLIST_REMOVE_ITEM_RESET:
        return {}
      default:
        return state
    }
  }