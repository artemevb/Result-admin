import React, { useState, useEffect } from 'react';
import Plus from "../assets/plus.svg";
import Delete from '../Modal/delete';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, deleteCase, fetchArticles, deleteArticle } from '../store/action/dataActions';
import { useNavigate } from 'react-router-dom';

const AddBlogCases = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataState = useSelector(state => state.data);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchData());
      dispatch(fetchArticles());
    }
  }, [dispatch]);

  const addNewCase = () => {
    // Логика добавления нового кейса
  };

  const addNewBlog = () => {
    // Логика добавления нового блога
  };

  const openDeleteModal = (id, type) => {
    setDeleteItemId(id);
    setDeleteType(type);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
    setDeleteType(null);
  };

  const handleDelete = () => {
    if (deleteType === 'case') {
      dispatch(deleteCase(deleteItemId));
    } else if (deleteType === 'blog') {
      dispatch(deleteArticle(deleteItemId));
    }
    closeDeleteModal();
  };

  const handleEdit = (id) => {
    navigate(`/admin_cases/${id}`);
  };

  if (dataState.loading) return <div>Loading...</div>;
  if (dataState.error) return <div>Error: {dataState.error}</div>;

  return (
    <>
      <div className="container mx-auto px-[100px]">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 p-2">
            <button onClick={addNewCase} className="bg-footer-icon text-white p-8 rounded-md flex items-center justify-center mb-[128px] w-[100%] h-[220px]">
              <div className='flex flex-col items-center'>
                <div>
                  <img className="w-[51px] h-auto" src={Plus} alt="Логотип" />
                </div>
                <h2 className="text-xl">добавить новый кейс</h2>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-4">
              {dataState.data.data && dataState.data.data.map(item => (
                <div className='h-[270px]' key={item.id}>
                  <div className="bg-footer-icon h-[212px] rounded-2xl"></div>
                  <div className="flex justify-between items-center p-2">
                    <button
                      className="border border-footer-icon bg-white text-cases-text rounded-full px-6 py-1"
                      onClick={() => handleEdit(item.id)}
                    >редактировать</button>
                    <button
                      className="bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center"
                      onClick={() => openDeleteModal(item.id, 'case')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 20" fill="none">
                        <path d="M8.42099 14.7407C8.63031 14.7407 8.83105 14.6576 8.97905 14.5096C9.12706 14.3616 9.21021 14.1608 9.21021 13.9515V9.21622C9.21021 9.00691 9.12706 8.80617 8.97905 8.65816C8.83105 8.51016 8.63031 8.42701 8.42099 8.42701C8.21168 8.42701 8.01094 8.51016 7.86293 8.65816C7.71493 8.80617 7.63178 9.00691 7.63178 9.21622V13.9515C7.63178 14.1608 7.71493 14.3616 7.86293 14.5096C8.01094 14.6576 8.21168 14.7407 8.42099 14.7407ZM16.3132 5.27014H13.1563V4.48093C13.1563 3.85299 12.9068 3.25077 12.4628 2.80675C12.0188 2.36273 11.4166 2.11328 10.7886 2.11328H9.21021C8.58227 2.11328 7.98005 2.36273 7.53603 2.80675C7.09201 3.25077 6.84256 3.85299 6.84256 4.48093V5.27014H3.6857C3.47639 5.27014 3.27565 5.35329 3.12764 5.5013C2.97963 5.64931 2.89648 5.85005 2.89648 6.05936C2.89648 6.26867 2.97963 6.46941 3.12764 6.61742C3.27565 6.76543 3.47639 6.84857 3.6857 6.84857H4.47492V15.5299C4.47492 16.1579 4.72436 16.7601 5.16838 17.2041C5.6124 17.6481 6.21462 17.8976 6.84256 17.8976H13.1563C13.7842 17.8976 14.3864 17.6481 14.8305 17.2041C15.2745 16.7601 15.5239 16.1579 15.5239 15.5299V6.84857H16.3132C16.5225 6.84857 16.7232 6.76543 16.8712 6.61742C17.0192 6.46941 17.1024 6.26867 17.1024 6.05936C17.1024 5.85005 17.0192 5.64931 16.8712 5.5013C16.7232 5.35329 16.5225 5.27014 16.3132 5.27014ZM8.42099 4.48093C8.42099 4.27162 8.50414 4.07088 8.65215 3.92287C8.80016 3.77486 9.0009 3.69171 9.21021 3.69171H10.7886C10.998 3.69171 11.1987 3.77486 11.3467 3.92287C11.4947 4.07088 11.5779 4.27162 11.5779 4.48093V5.27014H8.42099V4.48093ZM13.9455 15.5299C13.9455 15.7393 13.8624 15.94 13.7143 16.088C13.5663 16.236 13.3656 16.3192 13.1563 16.3192H6.84256C6.63325 16.3192 6.43251 16.236 6.2845 16.088C6.1365 15.94 6.05335 15.7393 6.05335 15.5299V6.84857H13.9455V15.5299ZM11.5779 14.7407C11.7872 14.7407 11.9879 14.6576 12.1359 14.5096C12.2839 14.3616 12.3671 14.1608 12.3671 13.9515V9.21622C12.3671 9.00691 12.2839 8.80617 12.1359 8.65816C11.9879 8.51016 11.7872 8.42701 11.5779 8.42701C11.3685 8.42701 11.1678 8.51016 11.0198 8.65816C10.8718 8.80617 10.7886 9.00691 10.7886 9.21622V13.9515C10.7886 14.1608 10.8718 14.3616 11.0198 14.5096C11.1678 14.6576 11.3685 14.7407 11.5779 14.7407Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 p-2">
            <button onClick={addNewBlog} className="bg-footer-icon text-white p-8 rounded-md flex items-center justify-center mb-[128px] w-[100%] h-[220px]">
              <div className='flex flex-col items-center'>
                <div>
                  <img className="w-[51px] h-auto" src={Plus} alt="Логотип" />
                </div>
                <h2 className="text-xl">добавить новый блог</h2>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-4">
              {dataState.articles.data && dataState.articles.data.map(item => (
                <div className='h-[270px]' key={item.id}>
                  <div className="bg-footer-icon h-[212px] rounded-2xl"></div>
                  <div className="flex justify-between items-center p-2">
                    <button
                      className="border border-footer-icon bg-white text-cases-text rounded-full px-6 py-1"
                      onClick={() => handleEdit(item.id)}
                    >редактировать</button>
                    <button
                      className="bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center"
                      onClick={() => openDeleteModal(item.id, 'blog')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 20" fill="none">
                        <path d="M8.42099 14.7407C8.63031 14.7407 8.83105 14.6576 8.97905 14.5096C9.12706 14.3616 9.21021 14.1608 9.21021 13.9515V9.21622C9.21021 9.00691 9.12706 8.80617 8.97905 8.65816C8.83105 8.51016 8.63031 8.42701 8.42099 8.42701C8.21168 8.42701 8.01094 8.51016 7.86293 8.65816C7.71493 8.80617 7.63178 9.00691 7.63178 9.21622V13.9515C7.63178 14.1608 7.71493 14.3616 7.86293 14.5096C8.01094 14.6576 8.21168 14.7407 8.42099 14.7407ZM16.3132 5.27014H13.1563V4.48093C13.1563 3.85299 12.9068 3.25077 12.4628 2.80675C12.0188 2.36273 11.4166 2.11328 10.7886 2.11328H9.21021C8.58227 2.11328 7.98005 2.36273 7.53603 2.80675C7.09201 3.25077 6.84256 3.85299 6.84256 4.48093V5.27014H3.6857C3.47639 5.27014 3.27565 5.35329 3.12764 5.5013C2.97963 5.64931 2.89648 5.85005 2.89648 6.05936C2.89648 6.26867 2.97963 6.46941 3.12764 6.61742C3.27565 6.76543 3.47639 6.84857 3.6857 6.84857H4.47492V15.5299C4.47492 16.1579 4.72436 16.7601 5.16838 17.2041C5.6124 17.6481 6.21462 17.8976 6.84256 17.8976H13.1563C13.7842 17.8976 14.3864 17.6481 14.8305 17.2041C15.2745 16.7601 15.5239 16.1579 15.5239 15.5299V6.84857H16.3132C16.5225 6.84857 16.7232 6.76543 16.8712 6.61742C17.0192 6.46941 17.1024 6.26867 17.1024 6.05936C17.1024 5.85005 17.0192 5.64931 16.8712 5.5013C16.7232 5.35329 16.5225 5.27014 16.3132 5.27014ZM8.42099 4.48093C8.42099 4.27162 8.50414 4.07088 8.65215 3.92287C8.80016 3.77486 9.0009 3.69171 9.21021 3.69171H10.7886C10.998 3.69171 11.1987 3.77486 11.3467 3.92287C11.4947 4.07088 11.5779 4.27162 11.5779 4.48093V5.27014H8.42099V4.48093ZM13.9455 15.5299C13.9455 15.7393 13.8624 15.94 13.7143 16.088C13.5663 16.236 13.3656 16.3192 13.1563 16.3192H6.84256C6.63325 16.3192 6.43251 16.236 6.2845 16.088C6.1365 15.94 6.05335 15.7393 6.05335 15.5299V6.84857H13.9455V15.5299ZM11.5779 14.7407C11.7872 14.7407 11.9879 14.6576 12.1359 14.5096C12.2839 14.3616 12.3671 14.1608 12.3671 13.9515V9.21622C12.3671 9.00691 12.2839 8.80617 12.1359 8.65816C11.9879 8.51016 11.7872 8.42701 11.5779 8.42701C11.3685 8.42701 11.1678 8.51016 11.0198 8.65816C10.8718 8.80617 10.7886 9.00691 10.7886 9.21622V13.9515C10.7886 14.1608 10.8718 14.3616 11.0198 14.5096C11.1678 14.6576 11.3685 14.7407 11.5779 14.7407Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <Delete closeDeleteModal={closeDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};

export default AddBlogCases;
