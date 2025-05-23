import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [fieldsRu, setFieldsRu] = useState([]);
  const [fieldsUz, setFieldsUz] = useState([]);
  const [titleRu, setTitleRu] = useState('');
  const [titleUz, setTitleUz] = useState('');
  const [themeRu, setThemeRu] = useState('');
  const [themeUz, setThemeUz] = useState('');
  const [conclusionTitleRu, setConclusionTitleRu] = useState('');
  const [conclusionTitleUz, setConclusionTitleUz] = useState('');
  const [conclusionDescriptionRu, setConclusionDescriptionRu] = useState('');
  const [conclusionDescriptionUz, setConclusionDescriptionUz] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [bodyPhoto, setBodyPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [newMainPhoto, setNewMainPhoto] = useState(null);
  const [newBodyPhoto, setNewBodyPhoto] = useState(null);
  const [newGalleryPhoto, setNewGalleryPhoto] = useState(null);
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://213.230.91.55:9000/article/get-full-data/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data.data;
        setTitleRu(data.titleRu || '');
        setTitleUz(data.titleUz || '');
        setThemeRu(data.themeRu || '');
        setThemeUz(data.themeUz || '');
        setFieldsRu(data.plan.map(plan => ({
          title: plan.nameRu,
          description: plan.textRu
        })));
        setFieldsUz(data.plan.map(plan => ({
          title: plan.nameUz,
          description: plan.textUz
        })));
        setConclusionTitleRu(data.conclusion?.nameRu || '');
        setConclusionTitleUz(data.conclusion?.nameUz || '');
        setConclusionDescriptionRu(data.conclusion?.textRu || '');
        setConclusionDescriptionUz(data.conclusion?.textUz || '');
        setMainPhoto(data.mainPhoto?.httpUrl || null);
        setBodyPhoto(data.bodyPhoto?.httpUrl || null);
        setGallery(data.gallery.map(photo => photo.httpUrl));
        setQuantity(data.plan.length || 1);
      })
      .catch(error => {
        console.error("There was an error fetching the article data!", error);
      });
  }, [id]);

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

  const handlePhotoChange = (event, setPhoto, setNewPhoto) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
    setNewPhoto(event.target.files[0]);
  };

  const handleGalleryChange = (event) => {
    const file = event.target.files[0];
    setGallery([URL.createObjectURL(file)]);
    setNewGalleryPhoto(file);
  };

  const handleUpdate = () => {
    const updatedArticle = {
      titleRu: titleRu,
      titleUz: titleUz,
      themeRu: themeRu,
      themeUz: themeUz,
      plan: fieldsRu.map((field, index) => ({
        id: null, // assuming IDs are not required for the update
        nameRu: fieldsRu[index].title,
        textRu: fieldsRu[index].description,
        nameUz: fieldsUz[index].title,
        textUz: fieldsUz[index].description
      })),
      conclusion: {
        id: null, // assuming IDs are not required for the update
        nameRu: conclusionTitleRu,
        textRu: conclusionDescriptionRu,
        nameUz: conclusionTitleUz,
        textUz: conclusionDescriptionUz
      }
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(updatedArticle));

    if (newMainPhoto) {
      formData.append('main-photo', newMainPhoto);
    }

    if (newBodyPhoto) {
      formData.append('body-photo', newBodyPhoto);
    }

    if (newGalleryPhoto) {
      formData.append('gallery', newGalleryPhoto);
    }

    const token = localStorage.getItem('token');
    axios.put(`http://213.230.91.55:9000/article/update/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Article updated successfully', response.data);
      })
      .catch(error => {
        console.error("There was an error updating the article!", error);
      });
  };

  return (
    <div className="mx-auto px-[100px] pb-[93px]">
      <div className='bg-bg-admin rounded-lg'>
        <div className='pl-[8%] w-11/12'>
          <button onClick={() => setLanguage(language === 'ru' ? 'uz' : 'ru')} className='px-6 py-2 border border-violet-400 rounded-full mt-12'>
            {language === 'ru' ? 'Uzbek' : 'русский'}
          </button>
          <h1 className='text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]'>header</h1>
          <div className='mb-[50px]'>
            <label htmlFor="title" className="block text-[24px] mb-2">Заголовок</label>
            <input
              type="text"
              id="title"
              name="title"
              value={language === 'ru' ? titleRu : titleUz}
              onChange={(e) => language === 'ru' ? setTitleRu(e.target.value) : setTitleUz(e.target.value)}
              className="w-full border border-uslugi-text p-2 rounded-lg"
            />
          </div>
          <div className='mb-[50px]'>
            <label htmlFor="theme" className="block text-[24px] mb-2">Тема</label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={language === 'ru' ? themeRu : themeUz}
              onChange={(e) => language === 'ru' ? setThemeRu(e.target.value) : setThemeUz(e.target.value)}
              className="w-full border border-uslugi-text p-2 rounded-lg"
            />
          </div>
          <div className="block text-[24px] text-uslugi-text">Картинка</div>
          <div className='flex flex-row gap-[30px] pb-[30px]'>
            <label className="upload-button w-[444px] h-[60px] mb-[34px]" htmlFor="bodyPhotoUpload">загрузить</label>
            <input 
              id="bodyPhotoUpload" 
              type="file" 
              className="file-upload" 
              onChange={(e) => handlePhotoChange(e, setBodyPhoto, setNewBodyPhoto)} 
            />
            <div className="flex flex-row gap-[50px]">
              <div className="w-20 h-20 bg-white rounded-lg">
                {bodyPhoto && <img src={bodyPhoto} alt="Body" />}
              </div>
            </div>
          </div>
          <hr className="my-8 border-t-2 border-border mb-[34px]" />
          <h1 className='text-uslugi-text text-[36px] text-center pt-[30px]'>body</h1>
          <div className="flex flex-col">
            <div className='flex flex-row items-center mb-[84px]'>
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
            {fieldsRu.map((field, index) => (
              <div key={index} className="mb-[50px]">
                <div className='mb-[50px]'>
                  <label htmlFor={`title-${index}`} className="block text-[24px] mb-2">Заголовок {index + 1}</label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    value={language === 'ru' ? fieldsRu[index].title : fieldsUz[index].title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value, language)}
                    className="w-full border border-uslugi-text p-2 rounded-lg"
                  />
                </div>
                <div className="mt-[15px] mb-[50px]">
                  <p className="text-uslugi-text text-[24px]">Описание {index + 1}</p>
                  <textarea
                    id={`description-${index}`}
                    value={language === 'ru' ? fieldsRu[index].description : fieldsUz[index].description}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value, language)}
                    className="w-full border border-uslugi-text p-2 rounded-lg"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            ))}
            <div className='flex flex-row'>
              <div>
                <div className="block text-[24px] text-uslugi-text mt-[30px]">Картинка вначале страницы</div>
                <div className='flex flex-row gap-[30px] pb-[30px]'>
                  <label className="upload-button w-[344px] h-[60px] mb-[34px]" htmlFor="initialImageUpload">загрузить</label>
                  <input 
                    id="initialImageUpload" 
                    type="file" 
                    className="file-upload" 
                    onChange={(e) => handlePhotoChange(e, setMainPhoto, setNewMainPhoto)}
                  />
                  <div className="flex flex-row gap-[50px]">
                    <div className="w-20 h-20 bg-white rounded-lg">
                      {mainPhoto && <img src={mainPhoto} alt="Main" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className='ml-[17%]'>
                <div className="block text-[24px] text-uslugi-text mt-[30px]">Главное фото</div>
                <div className='flex flex-row gap-[30px] pb-[30px]'>
                  <label className="upload-button w-[344px] h-[60px] mb-[34px]" htmlFor="galleryUpload">загрузить</label>
                  <input 
                    id="galleryUpload" 
                    type="file" 
                    className="file-upload" 
                    onChange={handleGalleryChange} 
                  />
                  <div className="flex flex-row gap-[50px]">
                    {gallery.map((url, index) => (
                      <div key={index} className="w-20 h-20 bg-white rounded-lg">
                        <img src={url} alt={`Gallery ${index}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h1 className='text-uslugi-text text-[36px] text-center mt-[132px]'>заключение</h1>
            <div>
              <label htmlFor="conclusionTitle" className="block text-[24px] mt-[39px]">Заголовок</label>
              <input
                type="text"
                id="conclusionTitle"
                value={language === 'ru' ? conclusionTitleRu : conclusionTitleUz}
                onChange={(e) => language === 'ru' ? setConclusionTitleRu(e.target.value) : setConclusionTitleUz(e.target.value)}
                className="w-full border border-uslugi-text p-2 rounded-lg"
              />
            </div>
            <div className="mt-[15px] pb-[20px]">
              <p className="text-uslugi-text text-[24px]">Описание</p>
              <textarea
                id="conclusionDescription"
                value={language === 'ru' ? conclusionDescriptionRu : conclusionDescriptionUz}
                onChange={(e) => language === 'ru' ? setConclusionDescriptionRu(e.target.value) : setConclusionDescriptionUz(e.target.value)}
                className="w-full border border-uslugi-text p-2 rounded-lg"
                rows="5"
              ></textarea>
            </div>
            <div className='flex justify-center mb-[93px]'>
              <button onClick={handleUpdate} className="border w-[200px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[8px]">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;