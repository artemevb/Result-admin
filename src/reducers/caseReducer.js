// src/reducers/caseReducer.js
const initialState = {
    cases: [],
    loading: false,
    error: null,
  };
  
  const caseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CASES_REQUEST':
      case 'UPDATE_CASE_REQUEST':
      case 'DELETE_ARTICLE_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_CASES_SUCCESS':
        return {
          ...state,
          loading: false,
          cases: Array.isArray(action.payload) ? action.payload : [],
        };
      case 'UPDATE_CASE_SUCCESS':
        return {
          ...state,
          loading: false,
          cases: state.cases.map((caseItem) =>
            caseItem.id === action.payload.id ? action.payload : caseItem
          ),
        };
      case 'DELETE_ARTICLE_SUCCESS':
        return {
          ...state,
          loading: false,
          cases: state.cases.filter((caseItem) => caseItem.id !== action.payload),
        };
      case 'FETCH_CASES_FAILURE':
      case 'UPDATE_CASE_FAILURE':
      case 'DELETE_ARTICLE_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default caseReducer;
  