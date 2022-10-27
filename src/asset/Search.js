import axios from 'axios';

export default function Search({query='책', size=1, setBooks=false, setMeta=false}) {
  if (!query) return;

  // search book api
  const bookSearch = (params)=>{
    return axios.get('https://dapi.kakao.com/v3/search/book', { params, headers: {
      Authorization: 'KakaoAK 6b8729bb58867da38dbe3e4ee0c072b0',
    }});
  };

  // book search 핸들러
  const bookSearchHttpHandler = async (query, size)=>{
    const params = {
      query: query,
      sort: 'accuracy',
      page: 1, // 페이지번호
      size: size, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출

    if (setMeta) {
      setMeta(data.meta);
    }

    if (setBooks) {
      setBooks(data.documents);
    }
    
    const result = data.documents;
    return result;
  };

  const posts = bookSearchHttpHandler(query, size);
  return posts;
}