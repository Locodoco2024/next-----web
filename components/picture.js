import React, { useState, useEffect } from 'react';

// 定義Picture組件，接收picture作為props
export default function Picture({ picture }) {
  return (
    <>
      <div className="picture">
        {/* 顯示攝影師名稱 */}
        <p>{picture.photographer}</p>
        <div className="imageContainer">
          {/* 顯示圖片 */}
          <img src={picture.src.large} alt="" />
        </div>
        <p>
          downloadIcon：
          {/* 提供下載圖片的連結 */}
          <a href={picture.src.large} download target="_blank">
            下載圖片
          </a>
        </p>
      </div>
    </>
  );
}
