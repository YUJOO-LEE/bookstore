import axios from 'axios';

export default function Search(keyword) {
  if (!keyword) return;

  // search book api
  const bookSearch = (params)=>{
    return axios.get('https://dapi.kakao.com/v3/search/book', { params, headers: {
      Authorization: 'KakaoAK f3b4c5064be29701921427a3d6702642',
    }});
  };

  // book search 핸들러
  const bookSearchHttpHandler = async (keyword)=>{
    const params = {
      query: keyword,
      sort: 'accuracy',
      page: 1, // 페이지번호
      size: 3, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await bookSearch(params); // api 호출
    const result = data.documents;
    return result;
  };

  const posts = bookSearchHttpHandler(keyword);
  return posts;
}