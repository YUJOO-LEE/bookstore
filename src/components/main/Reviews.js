import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Reviews() {

  const getLocalData = () => {

    const dummyPosts = [
      { id:6, title: 'REVIEW01', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932909342', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507004%3Ftimestamp%3D20221011180529'},
      { id:5, title: 'REVIEW02', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'},
      { id:4, title: 'REVIEW03', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8901255715', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5958026%3Ftimestamp%3D20221011180345'},
      { id:3, title: 'REVIEW04', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '1196372144', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4887891%3Ftimestamp%3D20221011190109'},
      { id:2, title: 'REVIEW05', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8956055467', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F724120%3Ftimestamp%3D20221011183110'},
      { id:1, title: 'REVIEW06', content: 'HERE COMES DESCRIPTION IN DETAILS.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }

  const [ Posts, setPosts ] = useState(getLocalData());
  
  return (
    <section id='Reviews' className='myScroll'>
      <div className='inner'>
        <h2>Reviews</h2>

        <div className="frame">
          {Posts?.length ? Posts.map((data, idx)=>{
            if (idx > 5) return;
            return (
              <article key={idx}>
                <ul>
                  <li className='img'>
                    <Link to={`/content/${data.bookId}`}>
                      <img src={data.thumbnail} />
                    </Link>
                  </li>
                  <li className='txt'>
                    <h3>{data.title}</h3>
                    <p>{data.content}</p>
                  </li>
                </ul>
              </article>
            );
            })
          : <p className='noData'>작성된 리뷰가 없습니다.</p>
          }
        </div>
      </div>
    </section>
  );
}