import React, { useState } from 'react';

// 定義Search組件，接收search和setInput作為props
export default function Search({ search = () => {}, setInput = () => {} }) {
  // 定義inputHandler函數，當輸入框內容改變時調用setInput
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="search">
        <input
          className="input"
          type="text"
          placeholder="Search"
          onChange={inputHandler} // 當輸入框內容改變時調用inputHandler
        />
        <button
          className="button"
          onClick={() => {
            search(); // 當按鈕被點擊時調用search函數
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
