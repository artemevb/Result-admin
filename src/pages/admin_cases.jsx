import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCase } from "../store/action/dataActions";

const AdminCases = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const [allData, setAllData] = useState({});
  const [mainPhoto, setMainPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [fieldsRu, setFieldsRu] = useState([{ title: '', description: '' }]);
  const [fieldsUz, setFieldsUz] = useState([{ title: '', description: '' }]);
  const [effectsRu, setEffectsRu] = useState([{ value: '', effectDescription: '' }]);
  const [effectsUz, setEffectsUz] = useState([{ value: '', effectDescription: '' }]);
  const [language, setLanguage] = useState('ru');

  const changeValue = (step) => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(0, prevQuantity + step);
      const newFieldsRu = [...fieldsRu];
      const newFieldsUz = [...fieldsUz];

      if (newQuantity > prevQuantity) {
        newFieldsRu.push({ title: '', description: '' });
        newFieldsUz.push({ title: '', description: '' });
      } else {
        newFieldsRu.pop();
        newFieldsUz.pop();
      }

      setFieldsRu(newFieldsRu);
      setFieldsUz(newFieldsUz);
      return newQuantity;
    });
  };

  const changeEffectCount = (step) => {
    const newQuantity = Math.max(0, quantity + step);
    const newEffectsRu = [...effectsRu];
    const newEffectsUz = [...effectsUz];

    if (newQuantity > quantity) {
      newEffectsRu.push({ value: '', effectDescription: '' });
      newEffectsUz.push({ value: '', effectDescription: '' });
    } else {
      newEffectsRu.pop();
      newEffectsUz.pop();
    }

    setEffectsRu(newEffectsRu);
    setEffectsUz(newEffectsUz);
    setQuantity(newQuantity);
  };

  useEffect(() => {
    axios.get(
      `http://213.230.91.55:9000/case/get-full-data/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => {
      const data = res.data.data;
      setAllData(data);
      setLoading(false);

      const initialFieldsRu = data.caseResult.map(result => ({
        title: result.titleRu,
        description: result.valueRu.join('\n')
      }));
      const initialFieldsUz = data.caseResult.map(result => ({
        title: result.titleUz,
        description: result.valueUz.join('\n')
      }));
      setFieldsRu(initialFieldsRu);
      setFieldsUz(initialFieldsUz);
      setQuantity(initialFieldsRu.length);

      const initialEffectsRu = data.effect.map(effect => ({
        value: effect.value,
        effectDescription: effect.effectDescriptionRu
      }));
      const initialEffectsUz = data.effect.map(effect => ({
        value: effect.value,
        effectDescription: effect.effectDescriptionUz
      }));
      setEffectsRu(initialEffectsRu);
      setEffectsUz(initialEffectsUz);
    }).catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [id, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMainPhoto(file);
    setAllData({
      ...allData,
      mainPhoto: { httpUrl: URL.createObjectURL(file) },
    });
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setAllData({ ...allData, gallery: files });
  };

  const handleFieldChange = (index, field, value, lang) => {
    if (lang === 'ru') {
      const newFields = [...fieldsRu];
      newFields[index][field] = value;
      setFieldsRu(newFields);
    } else {
      const newFields = [...fieldsUz];
      newFields[index][field] = value;
      setFieldsUz(newFields);
    }
  };

  const handleEffectChange = (index, field, value, lang) => {
    if (lang === 'ru') {
      const newEffects = [...effectsRu];
      newEffects[index][field] = value;
      setEffectsRu(newEffects);
    } else {
      const newEffects = [...effectsUz];
      newEffects[index][field] = value;
      setEffectsUz(newEffects);
    }
  };

  const handleSubmit = () => {
    const updatedCaseResults = fieldsRu.map((field, index) => ({
      ...allData.caseResult[index],
      titleRu: field.title,
      valueRu: field.description.split('\n'),
      titleUz: fieldsUz[index].title,
      valueUz: fieldsUz[index].description.split('\n')
    }));

    const updatedEffects = effectsRu.map((effect, index) => ({
      ...allData.effect[index],
      value: effect.value,
      effectDescriptionRu: effect.effectDescription,
      effectDescriptionUz: effectsUz[index].effectDescription
    }));

    const caseData = {
      ...allData,
      caseResult: updatedCaseResults,
      effect: updatedEffects,
      id,
      mainPhoto
    };

    dispatch(updateCase(caseData));
  };

  const handleRequestChange = (e) => {
    const requestArray = e.target.value.split('\n');
    if (language === 'ru') {
      setAllData({ ...allData, requestRu: requestArray });
    } else {
      setAllData({ ...allData, requestUz: requestArray });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto px-[100px]">
      <div className="bg-bg-admin rounded-lg">
        <div className="pl-[8%] w-11/12">
          <button onClick={() => setLanguage(language === 'ru' ? 'uz' : 'ru')} className='px-6 py-2 border border-violet-400 rounded-full mt-12'>
            {language === 'ru' ? 'Uzbek' : 'русский'}
          </button>
          <h1 className="text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]">
            header
          </h1>
          <div className="mb-[50px]">
            <label htmlFor="titlee" className="block text-lg mb-3">
              Заголовок
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={language === 'ru' ? allData.titleRu : allData.titleUz || ""}
              onChange={(e) => language === 'ru' ? setAllData({ ...allData, titleRu: e.target.value }) : setAllData({ ...allData, titleUz: e.target.value })}
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
              value={language === 'ru' ? allData.nameRu : allData.nameUz || ""}
              onChange={(e) => language === 'ru' ? setAllData({ ...allData, nameRu: e.target.value }) : setAllData({ ...allData, nameUz: e.target.value })}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
            {(language === 'ru' ? effectsRu : effectsUz).map((effect, index) => (
              <div key={index}>
                <label htmlFor={`effect-value-${index}`} className="block text-lg mb-2 mt-[70px]">
                  Процент
                </label>
                <input
                  type="text"
                  id={`effect-value-${index}`}
                  name="value"
                  value={effect.value}
                  onChange={(e) => handleEffectChange(index, 'value', e.target.value, language)}
                  className="w-full border border-uslugi-text p-3 rounded-lg mb-3"
                />
                <label htmlFor={`effect-description-${index}`} className="block text-lg mb-2">
                  Описание
                </label>
                <textarea
                  id={`effect-description-${index}`}
                  name="effectDescription"
                  value={effect.effectDescription}
                  onChange={(e) => handleEffectChange(index, 'effectDescription', e.target.value, language)}
                  className="w-full border border-uslugi-text p-3 rounded-lg"
                />
              </div>
            ))}
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
              value={language === 'ru' ? allData.aboutRu : allData.aboutUz || ""}
              onChange={(e) => language === 'ru' ? setAllData({ ...allData, aboutRu: e.target.value }) : setAllData({ ...allData, aboutUz: e.target.value })}
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
              value={language === 'ru' ? allData.requestRu.join('\n') : allData.requestUz.join('\n')}
              onChange={handleRequestChange}
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
              value={language === 'ru' ? allData.link : allData.link || ""}
              onChange={(e) => setAllData({ ...allData, link: e.target.value })}
              className="w-full border border-uslugi-text p-3 rounded-lg"
            />
          </div>
          <h1 className="text-uslugi-text text-[34px] text-center mb-[60px]">
            Этапы
          </h1>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <label htmlFor="quantity" className="block text-lg mb-2 mr-4">Количество этапов</label>
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
              {(language === 'ru' ? fieldsRu : fieldsUz).map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={`caseResult-title-${index}`} className="block text-lg mb-2">
                    Заголовок этапа {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`caseResult-title-${index}`}
                    name="title"
                    value={field.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value, language)}
                    className="w-full border border-uslugi-text p-3 rounded-lg mb-4"
                  />
                  <label htmlFor={`caseResult-value-${index}`} className="block text-lg mb-2">
                    Название этапа {index + 1}
                  </label>
                  <textarea
                    id={`caseResult-value-${index}`}
                    name="value"
                    value={field.description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value, language)}
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
                onChange={handleGalleryChange}
              />
              <div className="flex gap-[50px] flex-wrap">
                {allData.gallery &&
                  allData.gallery.map((photo, index) => (
                    <img
                      key={index}
                      src={photo.httpUrl}
                      alt="Gallery"
                      className="w-20 h-20 bg-white rounded-lg"
                    />
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
                onChange={handleFileChange}
              />
              <div className="flex gap-[50px]">
                {allData.mainPhoto && (
                  <img
                    src={allData.mainPhoto.httpUrl}
                    alt="Main Photo"
                    className="w-20 h-20 bg-white rounded-lg"
                  />
                )}
              </div>
              <button
                className="border w-[210px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[8px]"
                onClick={handleSubmit}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCases;