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

// 리뷰

export const getReviews = () => {
  const dummyPosts = [
    { id:6, title: 'REVIEW01', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507004%3Ftimestamp%3D20221011180529'},
    { id:5, title: 'REVIEW02', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'},
    { id:4, title: 'REVIEW03', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8901255715', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5958026%3Ftimestamp%3D20221011180345'},
    { id:3, title: 'REVIEW04', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '1196372144', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4887891%3Ftimestamp%3D20221011190109'},
    { id:2, title: 'REVIEW05', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8956055467', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F724120%3Ftimestamp%3D20221011183110'},
    { id:1, title: 'REVIEW06', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'}
  ]

  let data = localStorage.getItem('post');
  data = data ? JSON.parse(data) : dummyPosts;
  return data;
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