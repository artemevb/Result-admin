import {
  FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE,
  DELETE_CASE_REQUEST, DELETE_CASE_SUCCESS, DELETE_CASE_FAILURE,
  UPDATE_CASE_REQUEST, UPDATE_CASE_SUCCESS, UPDATE_CASE_FAILURE,
  FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE,
  DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE,
  FETCH_CASE_BY_ID_SUCCESS, FETCH_CASE_BY_ID_FAILURE
} from '../action/dataActions';

const initialState = {
  loading: false,
  data: [],
  case: null,
  articles: [],
  error: null,
  updating: false,
  updateError: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload,
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
        data: state.data.filter(item => item.id !== action.payload),
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter(item => item.id !== action.payload),
      };
    case DELETE_CASE_FAILURE:
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_CASE_REQUEST:
      return {
        ...state,
        updating: true,
        updateError: null,
      };
    case UPDATE_CASE_SUCCESS:
      return {
        ...state,
        updating: false,
        data: state.data.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case UPDATE_CASE_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.error,
      };
      case FETCH_CASE_BY_ID_SUCCESS:
      return {
        ...state,
        case: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CASE_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default dataReducer;
