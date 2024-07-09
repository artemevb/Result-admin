import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, updateCase } from '../store/action/dataActions';

const AdminCases = () => {
  const [quantity, setQuantity] = useState(3);

  const changeValue = (step) => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity + step));
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const dataState = useSelector(state => state.data);
  const [caseData, setCaseData] = useState({
    title: '',
    name: '',
    about: '',
    request: '',
    mainPhoto: null,
    gallery: [],
  });

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (dataState.data.data) {
      const selectedCase = dataState.data.data.find(item => item.id === parseInt(id));
      if (selectedCase) {
        setCaseData(selectedCase);
      }
    }
  }, [dataState.data.data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mainPhoto') {
      setCaseData(prevState => ({
        ...prevState,
        mainPhoto: files[0]
      }));
    } else if (name === 'gallery') {
      setCaseData(prevState => ({
        ...prevState,
        gallery: Array.from(files)
      }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('title', caseData.title);
    formData.append('name', caseData.name);
    formData.append('about', caseData.about);
    formData.append('request', caseData.request);

    if (caseData.mainPhoto) {
      formData.append('mainPhoto', caseData.mainPhoto);
    }
    caseData.gallery.forEach((photo, index) => {
      formData.append(`gallery[${index}]`, photo);
    });

    dispatch(updateCase(id, formData));
  };

  if (dataState.loading) return <div>Loading...</div>;
  if (dataState.error) return <div>Error: {dataState.error}</div>;

  const renderSteps = () => {
    let steps = [];
    for (let i = 0; i < quantity; i++) {
      steps.push(
        <div key={i} className="flex flex-col mb-[20px]">
          <label htmlFor={`title-${i}`} className="block text-lg mb-2">Заголовок {i + 1}</label>
          <input type="text" id={`title-${i}`} className="w-full border border-uslugi-text p-2 rounded-lg" />
          <label htmlFor={`description-${i}`} className="block text-lg mb-2 mt-4">Описание {i + 1}</label>
          <textarea id={`description-${i}`} className="w-full h-[150px] border border-uslugi-text p-2 rounded-lg mb-[25px]" rows="4" />
        </div>
      );
    }
    return steps;
  };

  return (
    <div className="mx-auto px-[100px]">
      <div className='bg-bg-admin rounded-lg'>
        <div className='pl-[8%] w-11/12'>
          <h1 className='text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]'>header</h1>
          <div className='mb-[50px]'>
            <label htmlFor="title" className="block text-lg mb-3">Заголовок</label>
            <input             
              type="text"
              id="title"
              name="title"
              value={caseData.title}
              onChange={handleChange}
              className="w-full border border-uslugi-text p-3 rounded-lg" />
          </div>
          <h1 className='text-uslugi-text text-[36px] text-center mb-[50px]'>результаты</h1>

          <div className="flex flex-col">
            <label htmlFor="name" className="block text-lg mb-2">Подзаголовок</label>
            <input               
              type="text"
              id="name"
              name="name"
              value={caseData.name} 
              onChange={handleChange}
              className="w-full border border-uslugi-text p-3 rounded-lg" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="about" className="block text-lg mb-2 mt-20">О компании</label>
            <textarea
              id="about"
              name="about"
              value={caseData.about}
              onChange={handleChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="request" className="block text-lg mb-2 mt-14">Запросы</label>
            <textarea
              id="request"
              name="request"
              value={caseData.request}
              onChange={handleChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <hr className="my-8 border-t-2 border-border mb-[58px] " />
          <div className="flex flex-col mb-[50px]">
            <label htmlFor="link" className="block text-lg mb-2">Ссылка</label>
            <input
              type="text"
              id="link"
              name="link"
              value={caseData.link || ''}
              onChange={handleChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
          </div>
          <h1 className='text-uslugi-text text-[34px] text-center mb-[60px]'>этапы</h1>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              <div className='flex flex-row items-center'>
                <label htmlFor="quantity" className="block text-lg mb-2 mr-3">Количество этапов</label>
                <div className="number-input flex items-center">
                  <input type="number" id="quantity" className="quantity w-20 text-center border border-uslugi-text p-2 rounded-lg" value={quantity} readOnly />
                  <div className="button flex flex-col ml-2">
                    <button className="bg-bg-admin text-white rounded-t-lg" onClick={() => changeValue(1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                        <path d="M1.00057 15.0006H19.0006C19.1828 15 19.3615 14.9498 19.5173 14.8552C19.673 14.7607 19.8001 14.6254 19.8848 14.464C19.9694 14.3027 20.0085 14.1212 19.9977 13.9393C19.9869 13.7574 19.9267 13.5819 19.8236 13.4316L10.8236 0.431594C10.4506 -0.107406 9.55257 -0.107406 9.17857 0.431594L0.178574 13.4316C0.0743986 13.5815 0.0133079 13.7572 0.00193892 13.9394C-0.00943004 14.1216 0.0293576 14.3035 0.114088 14.4652C0.198818 14.6269 0.32625 14.7623 0.482538 14.8567C0.638826 14.9511 0.817994 15.0009 1.00057 15.0006Z" fill="#4A448E" />
                      </svg>
                    </button>
                    <button className="bg-bg-admin text-white rounded-b-lg" onClick={() => changeValue(-1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                        <path d="M1.00057 -0.000593185H19.0006C19.1828 -2.19345e-05 19.3615 0.0502415 19.5173 0.144785C19.673 0.239328 19.8001 0.374572 19.8848 0.535959C19.9694 0.697347 20.0085 0.878767 19.9977 1.06069C19.9869 1.24261 19.9267 1.41815 19.8236 1.56841L10.8236 14.5684C10.4506 15.1074 9.55257 15.1074 9.17857 14.5684L0.178574 1.56841C0.0743986 1.41846 0.0133079 1.24284 0.00193892 1.06061C-0.00943004 0.878386 0.0293576 0.696528 0.114088 0.5348C0.198818 0.373071 0.32625 0.237653 0.482538 0.143263C0.638826 0.0488729 0.817994 -0.000881195 1.00057 -0.000593185Z" fill="#4A448E" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-[20px]">
              {renderSteps()}
            </div>
          </div>
          <hr className="my-8 border-t-2 border-border mb-[58px] " />
          <h1 className='text-uslugi-text text-[34px] text-center mb-[60px]'>галерея</h1>
          <div className='flex flex-row gap-40'>
            <div>
              <div className="block text-[24px] font-semibold text-uslugi-text">для слайдера</div>
              <label className="upload-button w-[344px] mb-[34px]" htmlFor="gallery">загрузить</label>
              <input
                id="gallery"
                name="gallery"
                type="file"
                className="file-upload"
                multiple
                onChange={handleFileChange}
              />
              <div className="flex gap-[50px]">
                {caseData.gallery.map((photo, index) => (
                  <img key={index} src={photo instanceof File ? URL.createObjectURL(photo) : photo.httpUrl} alt="Gallery" className="w-20 h-20 bg-white rounded-lg" />
                ))}
              </div>
            </div>
            <div>
              <div className="block text-[24px] font-semibold text-uslugi-text">лого кейса</div>
              <label className="upload-button w-[344px] mb-[34px]" htmlFor="mainPhoto">загрузить</label>
              <input
                id="mainPhoto"
                name="mainPhoto"
                type="file"
                className="file-upload"
                onChange={handleFileChange}
              />
              <div className="flex gap-[50px]">
                {caseData.mainPhoto && (
                  <img src={caseData.mainPhoto instanceof File ? URL.createObjectURL(caseData.mainPhoto) : caseData.mainPhoto.httpUrl} alt="Main Photo" className="w-20 h-20 bg-white rounded-lg" />
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-center mb-[90px] pb-[80px] mt-[100px]'>
            <button onClick={handleSave} className="border w-[210px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[8px]">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCases;
