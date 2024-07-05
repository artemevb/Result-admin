import React from 'react';

function Delete({ closeDeleteModal, handleDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="background-modal p-6 rounded-[41px] shadow-lg text-center relative w-[700px] h-[481px]">
        <button className="absolute top-8 right-8 text-gray-500 hover:text-gray-800" onClick={closeDeleteModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 31 35" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M29.0247 33.5975C30.3936 32.4489 30.5721 30.4081 29.4235 29.0392L19.3145 16.9917L29.111 5.31661C30.2596 3.94775 30.0811 1.90695 28.7122 0.758347C27.3434 -0.390256 25.3026 -0.21171 24.154 1.15714L15.0908 11.9582L6.02658 1.15583C4.87798 -0.213021 2.83718 -0.391567 1.46833 0.757035C0.0994772 1.90564 -0.0790664 3.94644 1.06954 5.31529L10.8672 16.9917L0.757036 29.0405C-0.391566 30.4094 -0.213023 32.4502 1.15583 33.5988C2.52468 34.7474 4.56548 34.5689 5.71408 33.2L15.0908 22.0252L24.4665 33.1987C25.6151 34.5676 27.6559 34.7461 29.0247 33.5975Z" fill="white" fillOpacity="0.61"/>
          </svg>
        </button>
        <div className='flex flex-col mt-[100px]'>
          <p className="text-[38px] mb-4 text-white">Вы действительно <br /> хотите удалить?(</p>
          <div className="flex justify-center flex-col gap-9 items-center mt-[20px]">
            <button className="button-modal text-[18px] text-white rounded-[31px] px-4 py-2 mr-2 w-[337px] h-[50px]" onClick={handleDelete}>Удалить</button>
            <button className="button-modal text-white text-[22px] px-4 py-2 rounded-[31px] w-[397px] h-[57px]" onClick={closeDeleteModal}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
