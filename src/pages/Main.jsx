import React, { useState } from 'react';
import Modal from '../Modal/delete';

const Main = () => {
    const [quantity, setQuantity] = useState(3);
    const [partners, setPartners] = useState([{ link: '' }]);
    const [phoneNumbers, setPhoneNumbers] = useState(['']);

    const changeValue = (step) => {
        setQuantity((prevQuantity) => Math.max(0, prevQuantity + step));
    };

    const initialSocialMedia = [
        { name: 'Instagram', icon: 'fab fa-instagram', url: '' },
        { name: 'Telegram', icon: 'fab fa-telegram-plane', url: '' },
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: '' },
        { name: 'YouTube', icon: 'fab fa-youtube', url: '' },
    ];

    const [socialMedia, setSocialMedia] = useState(initialSocialMedia);

    const handleURLChange = (index, newURL) => {
        const updatedSocialMedia = [...socialMedia];
        updatedSocialMedia[index].url = newURL;
        setSocialMedia(updatedSocialMedia);
    };

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const handlePhoneNumberChange = (index, newNumber) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers[index] = newNumber;
        setPhoneNumbers(updatedPhoneNumbers);
    };

    const addPartnerSection = () => {
        setPartners([...partners, { link: '' }]);
    };

    const renderPhoneNumberSections = () => {
        return phoneNumbers.map((number, index) => (
            <div key={index} className="mb-4 flex items-end">
                <div>
                    <label htmlFor={`phone-${index}`} className="block text-[24px] mb-2">Номер телефона</label>
                    <input
                        type="text"
                        id={`phone-${index}`}
                        value={number}
                        onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                        className="w-[337px] border border-uslugi-text p-2 rounded-lg"
                    />
                </div>
                <div className='flex flex-row gap-5'>
                    <button className="bg-button-color text-white rounded-full p-2 ml-[20px]" onClick={addPhoneNumber}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                    <button className="bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 20" fill="none">
                          <path d="M8.42099 14.7407C8.63031 14.7407 8.83105 14.6576 8.97905 14.5096C9.12706 14.3616 9.21021 14.1608 9.21021 13.9515V9.21622C9.21021 9.00691 9.12706 8.80617 8.97905 8.65816C8.83105 8.51016 8.63031 8.42701 8.42099 8.42701C8.21168 8.42701 8.01094 8.51016 7.86293 8.65816C7.71493 8.80617 7.63178 9.00691 7.63178 9.21622V13.9515C7.63178 14.1608 7.71493 14.3616 7.86293 14.5096C8.01094 14.6576 8.21168 14.7407 8.42099 14.7407ZM16.3132 5.27014H13.1563V4.48093C13.1563 3.85299 12.9068 3.25077 12.4628 2.80675C12.0188 2.36273 11.4166 2.11328 10.7886 2.11328H9.21021C8.58227 2.11328 7.98005 2.36273 7.53603 2.80675C7.09201 3.25077 6.84256 3.85299 6.84256 4.48093V5.27014H3.6857C3.47639 5.27014 3.27565 5.35329 3.12764 5.5013C2.97963 5.64931 2.89648 5.85005 2.89648 6.05936C2.89648 6.26867 2.97963 6.46941 3.12764 6.61742C3.27565 6.76543 3.47639 6.84857 3.6857 6.84857H4.47492V15.5299C4.47492 16.1579 4.72436 16.7601 5.16838 17.2041C5.6124 17.6481 6.21462 17.8976 6.84256 17.8976H13.1563C13.7842 17.8976 14.3864 17.6481 14.8305 17.2041C15.2745 16.7601 15.5239 16.1579 15.5239 15.5299V6.84857H16.3132C16.5225 6.84857 16.7232 6.76543 16.8712 6.61742C17.0192 6.46941 17.1024 6.26867 17.1024 6.05936C17.1024 5.85005 17.0192 5.64931 16.8712 5.5013C16.7232 5.35329 16.5225 5.27014 16.3132 5.27014ZM8.42099 4.48093C8.42099 4.27162 8.50414 4.07088 8.65215 3.92287C8.80016 3.77486 9.0009 3.69171 9.21021 3.69171H10.7886C10.998 3.69171 11.1987 3.77486 11.3467 3.92287C11.4947 4.07088 11.5779 4.27162 11.5779 4.48093V5.27014H8.42099V4.48093ZM13.9455 15.5299C13.9455 15.7393 13.8624 15.94 13.7143 16.088C13.5663 16.236 13.3656 16.3192 13.1563 16.3192H6.84256C6.63325 16.3192 6.43251 16.236 6.2845 16.088C6.1365 15.94 6.05335 15.7393 6.05335 15.5299V6.84857H13.9455V15.5299ZM11.5779 14.7407C11.7872 14.7407 11.9879 14.6576 12.1359 14.5096C12.2839 14.3616 12.3671 14.1608 12.3671 13.9515V9.21622C12.3671 9.00691 12.2839 8.80617 12.1359 8.65816C11.9879 8.51016 11.7872 8.42701 11.5779 8.42701C11.3685 8.42701 11.1678 8.51016 11.0198 8.65816C10.8718 8.80617 10.7886 9.00691 10.7886 9.21622V13.9515C10.7886 14.1608 10.8718 14.3616 11.0198 14.5096C11.1678 14.6576 11.3685 14.7407 11.5779 14.7407Z" fill="white" />
                        </svg>
                      </button>
                </div>
            </div>
        ));
    };

    const renderSections = () => {
        return Array.from({ length: quantity }, (_, index) => (
            <div key={index} className="photo-uslugi flex items-center rounded-lg mt-[20px] w-full">
                <div className="flex flex-col items-center">
                    <div className="w-[166px] h-[152px] border border-uslugi-text rounded-lg mb-2">
                        <img className="w-full h-auto" alt="Логотип" />
                    </div>
                    <label className="text-center">Иконка</label>
                </div>
                <div className="flex flex-grow ml-4">
                    <div className="flex flex-col flex-grow mr-4">
                        <label htmlFor={`name-${index}`} className="mb-1 text-[24px]">Название</label>
                        <input type="text" id={`name-${index}`} className="border border-uslugi-text p-2 rounded-lg w-full" />
                    </div>
                    <button className="bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center mr-4 mt-[40px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 20" fill="none">
                            <path d="M8.42099 14.7407C8.63031 14.7407 8.83105 14.6576 8.97905 14.5096C9.12706 14.3616 9.21021 14.1608 9.21021 13.9515V9.21622C9.21021 9.00691 9.12706 8.80617 8.97905 8.65816C8.83105 8.51016 8.63031 8.42701 8.42099 8.42701C8.21168 8.42701 8.01094 8.51016 7.86293 8.65816C7.71493 8.80617 7.63178 9.00691 7.63178 9.21622V13.9515C7.63178 14.1608 7.71493 14.3616 7.86293 14.5096C8.01094 14.6576 8.21168 14.7407 8.42099 14.7407ZM16.3132 5.27014H13.1563V4.48093C13.1563 3.85299 12.9068 3.25077 12.4628 2.80675C12.0188 2.36273 11.4166 2.11328 10.7886 2.11328H9.21021C8.58227 2.11328 7.98005 2.36273 7.53603 2.80675C7.09201 3.25077 6.84256 3.85299 6.84256 4.48093V5.27014H3.6857C3.47639 5.27014 3.27565 5.35329 3.12764 5.5013C2.97963 5.64931 2.89648 5.85005 2.89648 6.05936C2.89648 6.26867 2.97963 6.46941 3.12764 6.61742C3.27565 6.76543 3.47639 6.84857 3.6857 6.84857H4.47492V15.5299C4.47492 16.1579 4.72436 16.7601 5.16838 17.2041C5.6124 17.6481 6.21462 17.8976 6.84256 17.8976H13.1563C13.7842 17.8976 14.3864 17.6481 14.8305 17.2041C15.2745 16.7601 15.5239 16.1579 15.5239 15.5299V6.84857H16.3132C16.5225 6.84857 16.7232 6.76543 16.8712 6.61742C17.0192 6.46941 17.1024 6.26867 17.1024 6.05936C17.1024 5.85005 17.0192 5.64931 16.8712 5.5013C16.7232 5.35329 16.5225 5.27014 16.3132 5.27014ZM8.42099 4.48093C8.42099 4.27162 8.50414 4.07088 8.65215 3.92287C8.80016 3.77486 9.0009 3.69171 9.21021 3.69171H10.7886C10.998 3.69171 11.1987 3.77486 11.3467 3.92287C11.4947 4.07088 11.5779 4.27162 11.5779 4.48093V5.27014H8.42099V4.48093ZM13.9455 15.5299C13.9455 15.7393 13.8624 15.94 13.7143 16.088C13.5663 16.236 13.3656 16.3192 13.1563 16.3192H6.84256C6.63325 16.3192 6.43251 16.236 6.2845 16.088C6.1365 15.94 6.05335 15.7393 6.05335 15.5299V6.84857H13.9455V15.5299ZM11.5779 14.7407C11.7872 14.7407 11.9879 14.6576 12.1359 14.5096C12.2839 14.3616 12.3671 14.1608 12.3671 13.9515V9.21622C12.3671 9.00691 12.2839 8.80617 12.1359 8.65816C11.9879 8.51016 11.7872 8.42701 11.5779 8.42701C11.3685 8.42701 11.1678 8.51016 11.0198 8.65816C10.8718 8.80617 10.7886 9.00691 10.7886 9.21622V13.9515C10.7886 14.1608 10.8718 14.3616 11.0198 14.5096C11.1678 14.6576 11.3685 14.7407 11.5779 14.7407Z" fill="white" />
                        </svg>
                    </button>
                    <button className="border w-[200px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[6px] h-[40px] mt-[37px]">редактировать</button>
                </div>
            </div>
        ));
    };

    const renderPartnerSections = () => {
        return partners.map((partner, index) => (
            <div key={index} className="w-full flex items-center space-x-4 p-4">
                <div className="flex flex-col items-center">
                    <button className="bg-red-500 text-white rounded-full h-9 w-9 flex items-center justify-center mr-4 mb-[110px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 20" fill="none">
                            <path d="M8.42099 14.7407C8.63031 14.7407 8.83105 14.6576 8.97905 14.5096C9.12706 14.3616 9.21021 14.1608 9.21021 13.9515V9.21622C9.21021 9.00691 9.12706 8.80617 8.97905 8.65816C8.83105 8.51016 8.63031 8.42701 8.42099 8.42701C8.21168 8.42701 8.01094 8.51016 7.86293 8.65816C7.71493 8.80617 7.63178 9.00691 7.63178 9.21622V13.9515C7.63178 14.1608 7.71493 14.3616 7.86293 14.5096C8.01094 14.6576 8.21168 14.7407 8.42099 14.7407ZM16.3132 5.27014H13.1563V4.48093C13.1563 3.85299 12.9068 3.25077 12.4628 2.80675C12.0188 2.36273 11.4166 2.11328 10.7886 2.11328H9.21021C8.58227 2.11328 7.98005 2.36273 7.53603 2.80675C7.09201 3.25077 6.84256 3.85299 6.84256 4.48093V5.27014H3.6857C3.47639 5.27014 3.27565 5.35329 3.12764 5.5013C2.97963 5.64931 2.89648 5.85005 2.89648 6.05936C2.89648 6.26867 2.97963 6.46941 3.12764 6.61742C3.27565 6.76543 3.47639 6.84857 3.6857 6.84857H4.47492V15.5299C4.47492 16.1579 4.72436 16.7601 5.16838 17.2041C5.6124 17.6481 6.21462 17.8976 6.84256 17.8976H13.1563C13.7842 17.8976 14.3864 17.6481 14.8305 17.2041C15.2745 16.7601 15.5239 16.1579 15.5239 15.5299V6.84857H16.3132C16.5225 6.84857 16.7232 6.76543 16.8712 6.61742C17.0192 6.46941 17.1024 6.26867 17.1024 6.05936C17.1024 5.85005 17.0192 5.64931 16.8712 5.5013C16.7232 5.35329 16.5225 5.27014 16.3132 5.27014ZM8.42099 4.48093C8.42099 4.27162 8.50414 4.07088 8.65215 3.92287C8.80016 3.77486 9.0009 3.69171 9.21021 3.69171H10.7886C10.998 3.69171 11.1987 3.77486 11.3467 3.92287C11.4947 4.07088 11.5779 4.27162 11.5779 4.48093V5.27014H8.42099V4.48093ZM13.9455 15.5299C13.9455 15.7393 13.8624 15.94 13.7143 16.088C13.5663 16.236 13.3656 16.3192 13.1563 16.3192H6.84256C6.63325 16.3192 6.43251 16.236 6.2845 16.088C6.1365 15.94 6.05335 15.7393 6.05335 15.5299V6.84857H13.9455V15.5299ZM11.5779 14.7407C11.7872 14.7407 11.9879 14.6576 12.1359 14.5096C12.2839 14.3616 12.3671 14.1608 12.3671 13.9515V9.21622C12.3671 9.00691 12.2839 8.80617 12.1359 8.65816C11.9879 8.51016 11.7872 8.42701 11.5779 8.42701C11.3685 8.42701 11.1678 8.51016 11.0198 8.65816C10.8718 8.80617 10.7886 9.00691 10.7886 9.21622V13.9515C10.7886 14.1608 10.8718 14.3616 11.0198 14.5096C11.1678 14.6576 11.3685 14.7407 11.5779 14.7407Z" fill="white" />
                        </svg>
                    </button>
                </div>
                <div className="bg-white border border-uslugi-text rounded-lg p-4 flex items-center justify-center h-[152px] w-[331px]">
                    <img className="w-full h-auto" alt="Логотип" />
                </div>
                <div className="flex flex-col flex-grow pl-[140px]">
                    <label htmlFor={`link-${index}`} className="text-uslugi-text mb-1">Ссылка</label>
                    <input id={`link-${index}`} type="text" className="border border-uslugi-text rounded-lg p-2 w-full" />
                </div>
            </div>
        ));
    };

    return (
        <div className="mx-auto px-[100px] pb-[93px]">
            <div className='bg-bg-admin rounded-lg'>
                <div className='pl-[8%] w-11/12 pb-[104px]'>
                    <h1 className='text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]'>header</h1>
                    <div>
                        <label htmlFor="title" className="block text-[24px] mt-[39px]">Заголовок</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className="mt-[15px] pb-[20px]">
                        <p className="text-uslugi-text text-[24px]">Описание</p>
                        <textarea id="description" className="w-full border border-uslugi-text p-2 rounded-lg" rows="5"></textarea>
                    </div>
                    <hr className="my-[58px] border-t-2 border-border mb-[31px] " />
                    <h1 className='text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]'>Результаты</h1>

                    <div className=' mb-[15px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Процент</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[83px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Описание</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[15px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Процент</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[83px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Описание</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[15px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Процент</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[116px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Описание</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <hr className="my-[58px] border-t-2 border-border mb-[16px] " />
                    <h1 className='text-uslugi-text text-[36px] text-center mb-[47px]'>услуги</h1>
                    <div className="flex flex-col">
                        <h1 className='text-uslugi-text text-[36px] text-left mb-[82px]'>Раздел</h1>
                        <div className='flex flex-row items-center'>
                            <label htmlFor="quantity" className="block text-[24px] mb-2 pr-[26px]">Количество</label>
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
                    {renderSections()}
                    <hr className="my-[58px] border-t-2 border-border mb-[31px] " />
                    <h1 className='text-uslugi-text text-[36px] text-center mb-[50px] pt-[30px]'>Список партнеров</h1>
                    {renderPartnerSections()}
                    <div className="flex items-center justify-center">
                        <button className="bg-button-color text-white rounded-full p-2" onClick={addPartnerSection}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </button>
                    </div>
                    <hr className="my-[58px] border-t-2 border-border mb-[16px] " />
                    <h1 className='text-uslugi-text text-[36px] text-center mb-[37px]'>Подвал</h1>
                    {renderPhoneNumberSections()}
                    <div className=' mb-[25px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Адресс</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=' mb-[25px]'>
                        <label htmlFor="title" className="block text-[24px] mb-2">Текст адреса</label>
                        <input type="text" id="title" className="w-full border border-uslugi-text p-2 rounded-lg" />
                    </div>
                    <div className=" rounded-lg">
                        <h2 className="text-xl  mb-4 text-uslugi-text">Соц сети</h2>
                        <div className="flex flex-wrap justify-between">
                            {socialMedia.map((media, index) => (
                                <div key={index} className="flex items-center border border-uslugi-text rounded-lg p-2 bg-white shadow w-[251px]">
                                    <i className={`${media.icon} text-2xl `}></i>
                                    <input
                                        type="text"
                                        value={media.url}
                                        onChange={(e) => handleURLChange(index, e.target.value)}
                                        placeholder={`${media.name}`}
                                        className="  rounded-lg p-2 w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center pb-[60px]'>
                        <button className="border w-[210px] border-footer-icon bg-footer-icon text-[18px] text-white rounded-full px-6 py-[8px]">Сохранить</button>
                    </div>
            </div>
        </div>
    );
};

export default Main;
