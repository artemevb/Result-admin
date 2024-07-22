import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, updateCase } from '../store/action/dataActions';

const AdminCases = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const caseData = useSelector(state => state.data.data);
  const [allDataRu, setAllDataRu] = useState({});

  useEffect(() => {
    if (caseData.data) {
      const result = caseData.data.find(item => item.id == id);
      setAllDataRu(result);
    }
  }, [caseData, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllDataRu(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (index, arrayName, e) => {
    const { name, value } = e.target;
    const updatedArray = allDataRu[arrayName].map((item, idx) => 
      idx === index ? { ...item, [name]: value } : item
    );
    setAllDataRu(prevState => ({
      ...prevState,
      [arrayName]: updatedArray
    }));
  };

  const handleSubmit = () => {
    dispatch(updateCase(allDataRu));
  };

  if (!allDataRu) return null;

  return (
    <div className="mx-auto px-[100px]">
      <div className="bg-bg-admin rounded-lg">
        <div className="pl-[8%] w-11/12">
          <h1 className="text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]">
            {allDataRu.name || "header"}
          </h1>
          <div className="mb-[50px]">
            <label htmlFor="title" className="block text-lg mb-3">
              Заголовок
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={allDataRu.title || ''}
              onChange={handleInputChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
          </div>
          <h1 className="text-uslugi-text text-[36px] text-center mb-[50px]">
            Результаты
          </h1>

          <div className="flex flex-col">
            <label htmlFor="name" className="block text-lg mb-2">
              Подзаголовок
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={allDataRu.name || ''}
              onChange={handleInputChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
          </div>
          <div className="flex flex-col mt-20"></div>
          <hr className="my-8 border-t-2 border-border  " />
          <div className="flex flex-col">
            <label htmlFor="about" className="block text-lg mb-2">
              О компании
            </label>
            <textarea
              id="about"
              name="about"
              value={allDataRu.about || ''}
              onChange={handleInputChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="request" className="block text-lg mb-2 mt-14">
              Запросы
            </label>
            <textarea
              id="request"
              name="request"
              value={allDataRu.request || ''}
              onChange={handleInputChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <hr className="my-8 border-t-2 border-border mb-[58px] " />
          <div className="flex flex-col mb-[50px]">
            <label htmlFor="link" className="block text-lg mb-2">
              Ссылка
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={allDataRu.link || ''}
              onChange={handleInputChange}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
          </div>
          <h1 className="text-uslugi-text text-[34px] text-center mb-[60px]">
            Этапы
          </h1>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <label htmlFor="quantity" className="block text-lg mb-2 mr-3">
                  Количество этапов
                </label>
                <div className="number-input flex items-center">
                  <input
                    type="number"
                    id="quantity"
                    className="quantity w-20 text-center border border-uslugi-text p-2 rounded-lg"
                    value={allDataRu.caseResult ? allDataRu.caseResult.length : 0}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-[20px]">
              {allDataRu.caseResult && allDataRu.caseResult.map((result, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={`caseResult-title-${index}`} className="block text-lg mb-2">
                    Название этапа {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`caseResult-title-${index}`}
                    name="title"
                    value={result.title}
                    onChange={(e) => handleArrayChange(index, 'caseResult', e)}
                    className="w-full border border-uslugi-text p-3 rounded-lg mb-4"
                  />
                  <label htmlFor={`caseResult-value-${index}`} className="block text-lg mb-2">
                    Описание этапа {index + 1}
                  </label>
                  <textarea
                    id={`caseResult-value-${index}`}
                    name="value"
                    value={result.value.join(', ')}
                    onChange={(e) => handleArrayChange(index, 'caseResult', e)}
                    className="w-full border border-uslugi-text p-3 rounded-lg mb-4"
                  />
                </div>
              ))}
            </div>
          </div>
          <hr className="my-8 border-t-2 border-border mb-[58px] " />
          <h1 className="text-uslugi-text text-[34px] text-center mb-[60px]">
            Галерея
          </h1>
          <div className="flex flex-row gap-40">
            <div>
              <div className="block text-[24px] font-semibold text-uslugi-text">
                для слайдера
              </div>
              <label
                className="upload-button w-[344px] mb-[34px]"
                htmlFor="gallery"
              >
                загрузить
              </label>
              <input
                id="gallery"
                name="gallery"
                type="file"
                className="file-upload"
                multiple
                // onChange={handleFileChange}
              />
              <div className="flex gap-[50px] flex-wrap">
                {allDataRu.gallery && allDataRu.gallery.map((photo, index) => (
                  <img key={index} src={photo.httpUrl} alt="Gallery" className="w-20 h-20 bg-white rounded-lg" />
                ))}
              </div>
            </div>
            <div>
              <div className="block text-[24px] font-semibold text-uslugi-text">
                лого кейса
              </div>
              <label
                className="upload-button w-[344px] mb-[34px]"
                htmlFor="mainPhoto"
              >
                загрузить
              </label>
              <input
                id="mainPhoto"
                name="mainPhoto"
                type="file"
                className="file-upload"
                // onChange={handleFileChange}
              />
              <div className="flex gap-[50px]">
                {allDataRu.mainPhoto && (
                  <img src={allDataRu.mainPhoto.httpUrl} alt="Main Photo" className="w-20 h-20 bg-white rounded-lg" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-[90px] pb-[80px] mt-[100px]">
            <button className="border w-[210px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[8px]" onClick={handleSubmit}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCases;