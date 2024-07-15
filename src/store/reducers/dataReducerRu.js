import {
  FETCH_DATARU_REQUEST, FETCH_DATARU_SUCCESS, FETCH_DATA_FAILURE,
  DELETE_CASE_REQUEST, DELETE_CASE_SUCCESS, DELETE_CASE_FAILURE,
  UPDATE_CASE_REQUEST, UPDATE_CASE_SUCCESS, UPDATE_CASE_FAILURE,
  FETCH_ARTICLESRU_REQUEST, FETCH_ARTICLESRU_SUCCESS, FETCH_ARTICLES_FAILURE,
  DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE
} from '../action/dataActionsRu';

const initialState = {
  loading: false,
  dataRu: [],
  articlesRu: [],
  error: null,
  updating: false,
  updateError: null,
};

const dataReducerRu = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATARU_REQUEST:
    case FETCH_ARTICLESRU_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATARU_SUCCESS:
      return {
        ...state,
        loading: false,
        dataRu: action.payload,
      };
    case FETCH_ARTICLESRU_SUCCESS:
      return {
        ...state,
        loading: false,
        articlesRu: action.payload,
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
        dataRu: state.dataRu.filter(item => item.id !== action.payload),
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articlesRu: state.articlesRu.filter(item => item.id !== action.payload),
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
        dataRu: state.dataRu.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case UPDATE_CASE_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.error,
      };
    default:
      return state;
  }
};

export default dataReducerRu;
