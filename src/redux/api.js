import axios from "axios";

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

    // setLoading(true);
    // const { data } = await getYoutube(params); // api 호출
    // setTotalCount(data.pageInfo.totalResults);
    // setVids(data.items);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 0);

  }