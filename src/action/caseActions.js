// src/actions/caseActions.js
import axios from 'axios';

const getToken = () => localStorage.getItem('token');

export const fetchCases = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CASES_REQUEST' });

  try {
    const token = getToken();
    console.log('Fetching cases with token:', token);
    const response = await axios.get('http://213.230.91.55:9000/case/get-all', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'ru'
      }
    });
    console.log('Fetch cases response:', response.data);
    dispatch({ type: 'FETCH_CASES_SUCCESS', payload: response.data.data });
  } catch (error) {
    console.error('Fetch cases error:', error);
    dispatch({ type: 'FETCH_CASES_FAILURE', payload: error.message });
  }
};

export const updateCase = (caseData, mainPhoto, gallery) => async (dispatch) => {
  dispatch({ type: 'UPDATE_CASE_REQUEST' });

  try {
    const token = getToken();
    console.log('Updating case with token:', token, 'and data:', caseData);

    // Создаем FormData
    const formData = new FormData();
    formData.append('json', JSON.stringify(caseData));
    if (mainPhoto) {
      formData.append('main-photo', mainPhoto);
    }
    if (gallery && gallery.length > 0) {
      for (let i = 0; i < gallery.length; i++) {
        formData.append('gallery', gallery[i]);
      }
    }

    const response = await axios.put(`http://213.230.91.55:9000/case/update/${caseData.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'ru',
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Update case response:', response.data);
    dispatch({ type: 'UPDATE_CASE_SUCCESS', payload: response.data.data });
  } catch (error) {
    console.error('Update case error:', error);
    dispatch({ type: 'UPDATE_CASE_FAILURE', payload: error.message });
  }
};

export const deleteArticle = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_ARTICLE_REQUEST' });

  try {
    const token = getToken();
    console.log('Deleting article with token:', token, 'and id:', id);
    const response = await axios.delete(`http://213.230.91.55:9000/article/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': 'ru'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    dispatch({ type: 'DELETE_ARTICLE_SUCCESS', payload: id });
  } catch (error) {
    console.error('Delete article error:', error);
    dispatch({ type: 'DELETE_ARTICLE_FAILURE', payload: error.message });
  }
};
