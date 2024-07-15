// src/pages/AdminCases.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCases, updateCase, deleteArticle } from '../action/caseActions';

const Cases = () => {
  const dispatch = useDispatch();
  const cases = useSelector((state) => state.case.cases);
  const loading = useSelector((state) => state.case.loading);
  const error = useSelector((state) => state.case.error);

  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const handleUpdate = () => {
    if (selectedCase) {
      const updatedCase = { ...selectedCase, ...formData };
      console.log('Updating case with data:', updatedCase);
      dispatch(updateCase(updatedCase));
      setSelectedCase(null);
      setFormData({ title: '', description: '' });
    }
  };

  const handleSelectCase = (caseItem) => {
    setSelectedCase(caseItem);
    setFormData({ title: caseItem.title, description: caseItem.description });
  };

  const handleDelete = (id) => {
    dispatch(deleteArticle(id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Cases</h2>
      <div className="flex">
        <div>
          {Array.isArray(cases) && cases.length > 0 ? (
            cases.map((caseItem) => (
              <div key={caseItem.id} className="mb-4">
                <h3>{caseItem.title}</h3>
                <button className="mr-2" onClick={() => handleSelectCase(caseItem)}>Edit</button>
                <button className="mr-2" onClick={() => handleDelete(caseItem.id)}>Delete</button>
              </div>
            ))
          ) : (
            <div>No cases available</div>
          )}
        </div>
        <div className="ml-4">
          {selectedCase && (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button className="bg-red-500 text-white w-19 h-auto py-2 px-4 rounded" type="submit">Update Case</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cases;
