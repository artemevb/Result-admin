import axios from 'axios';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const DELETE_CASE_REQUEST = 'DELETE_CASE_REQUEST';
export const DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';
export const DELETE_CASE_FAILURE = 'DELETE_CASE_FAILURE';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const UPDATE_CASE_REQUEST = 'UPDATE_CASE_REQUEST';
export const UPDATE_CASE_SUCCESS = 'UPDATE_CASE_SUCCESS';
export const UPDATE_CASE_FAILURE = 'UPDATE_CASE_FAILURE';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    const token = localStorage.getItem('token');
    console.log('Using token:', token);

    try {
      const response = await axios.get('http://213.230.91.55:9000/case/get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200 && response.data) {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
    }
  };
};

export const fetchArticles = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://213.230.91.55:9000/article/get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200 && response.data) {
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: response.data });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: FETCH_ARTICLES_FAILURE, error: error.message });
    }
  };
};

export const deleteCase = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE_REQUEST });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`http://213.230.91.55:9000/case/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        dispatch({ type: DELETE_CASE_SUCCESS, payload: id });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: DELETE_CASE_FAILURE, error: error.message });
    }
  };
};

export const updateCase = (id, caseData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CASE_REQUEST });

    try {
      const response = await axios.put(`http://213.230.91.55:9000/case/update/${id}`, caseData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200 && response.data) {
        dispatch({ type: UPDATE_CASE_SUCCESS, payload: response.data });
      } else {
        throw new Error('Failed to update case');
      }
    } catch (error) {
      dispatch({ type: UPDATE_CASE_FAILURE, error: error.message });
    }
  };
};

export const deleteArticle = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ARTICLE_REQUEST });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`http://213.230.91.55:9000/article/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: id });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ type: DELETE_ARTICLE_FAILURE, error: error.message });
    }
  };
};




// import axios from 'axios';

// export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
// export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
// export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// export const DELETE_CASE_REQUEST = 'DELETE_CASE_REQUEST';
// export const DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';
// export const DELETE_CASE_FAILURE = 'DELETE_CASE_FAILURE';

// export const fetchData = () => {
//   return async (dispatch) => {
//     dispatch({ type: FETCH_DATA_REQUEST });

//     const token = localStorage.getItem('token');
//     console.log('Using token:', token);

//     try {
//       const response = await axios.get('http://213.230.91.55:9000/case/get-all', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept-Language': 'ru'
//         }
//       });

//       console.log('Response status:', response.status);
//       console.log('Response data:', response.data);

//       if (response.status === 200 && response.data) {
//         dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       dispatch({ type: FETCH_DATA_FAILURE, error: error.message });
//     }
//   };
// };

// export const deleteCase = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: DELETE_CASE_REQUEST });

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.delete(`http://213.230.91.55:9000/case/delete/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('Response status:', response.status);
//       console.log('Response data:', response.data);

//       if (response.status === 200) {
//         dispatch({ type: DELETE_CASE_SUCCESS, payload: id });
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       dispatch({ type: DELETE_CASE_FAILURE, error: error.message });
//     }
//   };
// };
