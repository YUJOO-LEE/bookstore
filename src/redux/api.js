import axios from "axios";


// 도서검색
export const getBooks = async (Option)=>{

  const params = {
    query: Option.query,
    sort: 'accuracy',
    page: 1, // 페이지번호
    size: Option.size, // 한 페이지에 보여 질 문서의 개수
  };

  const url = 'https://dapi.kakao.com/v3/search/book';
  return await axios.get(url, { params, headers: {
    Authorization: 'KakaoAK 6b8729bb58867da38dbe3e4ee0c072b0',
  }});
}

// 플리커
export const getFlickr = async (Option)=>{

  const params = {
    api_key: '67f7c54ac9fe4dd292e245fbb1302b24',
    per_page: Option.size, // 출력갯수
    format: 'json', // 데이터 타입
    nojsoncallback: 1, // json외 데이터 제외
  };

  // type 별 쿼리 지정
  if (Option.type === 'interest') {
    params.method = 'flickr.interestingness.getList';
  } else if (Option.type === 'search') {
    params.method = 'flickr.photos.search';
    params.tags = Option.query;
  } else if (Option.type === 'user') {
    params.method = 'flickr.people.getPhotos';
    params.user_id = Option.userid;
  }

  const url = 'https://www.flickr.com/services/rest/';
  return await axios.get(url, { params });
}


// 유튜브
export const getYoutube = async (Option)=>{
  //AIzaSyAlE3K17lN4g8uTtWUmZgj0WmpV5Ih6TmM
  //AIzaSyBiOlx-OiCnABYBdphO59DYaid3MDzX9H8
  const params = {
    key: 'AIzaSyBiOlx-OiCnABYBdphO59DYaid3MDzX9H8',
    part: 'snippet',  // 제목 등 정보 포함
    q: Option.query, // 검색어
    maxResults: Option.size, // 출력갯수
    eventType: 'completed', // 완료된 방송만 출력
    safeSearch: 'strict', // 제한된 콘텐츠 제외
    type: 'video',  // 검색결과 video만 포함
  };

  const url = 'https://www.googleapis.com/youtube/v3/search';
  return await axios.get(url, { params });
}


// store검색
export const getStores = async ()=>{
  const url = `${process.env.PUBLIC_URL}/DB/store.json`;
  return await axios.get(url);
}

// about
export const getAbout = async ()=>{
  const url = `${process.env.PUBLIC_URL}/DB/about.json`;
  return await axios.get(url);
}

// visual
export const getVisual = async ()=>{
  const url = `${process.env.PUBLIC_URL}/DB/visual.json`;
  return await axios.get(url);
}