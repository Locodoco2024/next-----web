import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/layout';
import Search from '@/components/search';
import Picture from '@/components/picture';
import axios from 'axios';

// 定義Home組件
export default function Home() {
  // 定義狀態變量
  const [data, setData] = useState([]);
  const [input, setInput] = useState(null);
  const [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');

  // API授權和URL
  const auth = '3kR9EvSSsrKxY3UDiObKo5RB4YhMQ96W6HlHOo28CmJbXISQnlUnJx9e';
  const initURL = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  // 搜索圖片的函數
  const search = async (url) => {
    let result = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  // 加載更多圖片的函數
  const morePicture = async () => {
    let newURL;
    if (currentSearch === '') {
      newURL = `https://api.pexels.com/v1/curated?per_page=15&page=${
        page + 1
      }}`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    setPage(page + 1);
    let result = await axios.get(newURL, {
      headers: {
        Authorization: auth,
      },
    });
    setData([...data, ...result.data.photos]);
  };

  // 組件掛載時執行搜索
  useEffect(() => {
    search(initURL);
  }, []);

  // 組件的渲染
  return (
    <Layout>
      <div style={{ minHeight: '100vh' }}>
        <Search
          search={() => {
            search(searchURL);
          }}
          setInput={setInput}
        />
        <div className="pictures">
          {data &&
            data.map((d) => {
              return <Picture key={d.id} picture={d} />;
            })}
        </div>
        <div className="morePicture">
          <button
            onClick={() => {
              morePicture();
            }}
          >
            載入更多圖片
          </button>
        </div>
      </div>
    </Layout>
  );
}
