import {
  FETCH_DATAUZ_REQUEST, FETCH_DATAUZ_SUCCESS, FETCH_DATA_FAILURE,
  DELETE_CASE_REQUEST, DELETE_CASE_SUCCESS, DELETE_CASE_FAILURE,

  FETCH_ARTICLESUZ_REQUEST, FETCH_ARTICLESUZ_SUCCESS, FETCH_ARTICLES_FAILURE,
  DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE,
  // UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAILURE
} from '../action/dataActionsUz';

const initialState = {
  loading: false,
  dataUz: [],
  articlesUz: [],
  error: null,
  updating: false,
  updateError: null,
};

const dataReducerUz = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATAUZ_REQUEST:
      case FETCH_ARTICLESUZ_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATAUZ_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUz: action.payload,
      };
      case  FETCH_ARTICLESUZ_SUCCESS:
        return {
          ...state,
          loading: false,
          articlesUz: action.payload,
        };
    case FETCH_DATA_FAILURE:
      case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_CASE_REQUEST:
      case DELETE_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        dataUz: state.dataUz.filter(item => item.id !== action.payload),
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articlesUz: state.articlesUz.filter(item => item.id !== action.payload),
      };
    case DELETE_CASE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default dataReducerUz;
