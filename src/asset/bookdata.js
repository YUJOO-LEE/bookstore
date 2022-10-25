import axios from 'axios';

export default function BookData([query, size, setBooks, setMeta]) {
  // search book api
  const bookSearch = (params) => {
    return axios.get('https://dapi.kakao.com/v3/search/book', { params, headers: {
      Authorization: 'KakaoAK f3b4c5064be29701921427a3d6702642',
    }});
  };

  // book search 핸들러
  const bookSearchHttpHandler = async (query, size) => {
    const params = {
      query: query,
      sort: 'accuracy', // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: size, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출
    setBooks(data.documents);
    if (setMeta) {
      setMeta(data.meta);
    }
  };

  bookSearchHttpHandler(query, size);

}