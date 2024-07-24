import axios from 'axios';
import toast from 'react-hot-toast';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const FETCH_CASE_BY_ID_REQUEST = 'FETCH_CASE_BY_ID_REQUEST'
export const FETCH_CASE_BY_ID_SUCCESS = 'FETCH_CASE_BY_ID_SUCCESS';
export const FETCH_CASE_BY_ID_FAILURE = 'FETCH_CASE_BY_ID_FAILURE';

export const DELETE_CASE_REQUEST = 'DELETE_CASE_REQUEST';
export const DELETE_CASE_SUCCESS = 'DELETE_CASE_SUCCESS';
export const DELETE_CASE_FAILURE = 'DELETE_CASE_FAILURE';

export const UPDATE_CASE_REQUEST = 'UPDATE_CASE_REQUEST';
export const UPDATE_CASE_SUCCESS = 'UPDATE_CASE_SUCCESS';
export const UPDATE_CASE_FAILURE = 'UPDATE_CASE_FAILURE';

const API_URL = 'http://213.230.91.55:9000/case';
const notifySuccess = () => toast.success('Кейс создан');
const notifyError = () => toast.error('Кейс не создан');

const notifyArctSuccess = () => toast.success('Блог создан');
const notifyArctError = () => toast.error('Блог не создан');

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const addCase = (mainPhoto, galleryPhotos) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('main-photo', mainPhoto);
    Array.from(galleryPhotos).forEach(photo => formData.append('gallery', photo));
    formData.append('json', JSON.stringify({}));
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://213.230.91.55:9000/case/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Form submitted:", response.data);
      notifySuccess();
    } catch (error) {
      console.error('Error creating new case:', error);
      notifyError();
    }
  };
};

export const addArticle = (mainPhoto, galleryPhotos, bodyPhoto) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('main-photo', mainPhoto);
    Array.from(galleryPhotos).forEach(photo => formData.append('gallery', photo));
    formData.append('body-photo', bodyPhoto);
    formData.append('json', JSON.stringify({}));
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://213.230.91.55:9000/article/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('New article created:', response.data);
      notifyArctSuccess();
    } catch (error) {
      console.error('Error creating new article:', error);
      notifyArctError();
    }
  };
};






export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${API_URL}/get-all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru'
          ,
        }
      });

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

export const fetchCaseById = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch({ type: FETCH_CASE_BY_ID_REQUEST });

  try {
    const response = await fetch(`http://213.230.91.55:9000/case/get-all/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'ru',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dispatch({ type: FETCH_CASE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CASE_BY_ID_FAILURE, error: error.message });
  }
};





export const deleteCase = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CASE_REQUEST });

    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: getAuthHeaders(),
      });

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

export const updateCase = (caseData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CASE_REQUEST });
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('json', JSON.stringify(caseData));

    try {
      const response = await axios.put(`${API_URL}/update/${caseData.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
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





// Новости


export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

export const deleteArticle = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ARTICLE_REQUEST });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`http://213.230.91.55:9000/article/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
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

export const fetchArticles = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://213.230.91.55:9000/article/get-all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': 'ru',
        }
      });

      if (response.status === 200 && response.data) {
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: response.data });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      dispatch({ type: FETCH_ARTICLES_FAILURE, error: error.message });
    }
  };
};
