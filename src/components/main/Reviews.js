import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Reviews() {

  const getLocalData = () => {

    const dummyPosts = [
      { id:6, title: 'They were the \'freedom\'!', content: 'In the latter part of the writer, it records when Lee Yoon-ki visited Crete Island. There is no Kazanzakis in the world and there is no Zorba. Even translator Lee Yoon-ki is no longer in the world, but everyone was alive in this book, 《Greek Jorba》', bookId: '8932909342', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507004%3Ftimestamp%3D20221011180529'},
      { id:5, title: 'good configuration!', content: 'This is a Moon Set review of the 35th anniversary edition of the Open Books. I like this series set the most. The cover is pretty and I feel good even if I keep it. I also like the fact that it\'s made up of my favorite writers. It\'s generally satisfactory to see a limited edition set like this sometimes in open books. It was thin and light, so it was good to carry around or lie down and read.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'},
      { id:4, title: 'Recommend', content: 'I wanted to read a new economic book, so I found out about it while looking at the bestseller section and bought this book. First of all, I read it satisfactorily as there were high ranking and recommended people. It was a field that I only vaguely knew, but it was well explained, so it also explains why I should do it. I thought it was far from me, but I became more interested after reading this book.', bookId: '8901255715', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5958026%3Ftimestamp%3D20221011180345'},
      { id:3, title: 'This is branding', content: 'If you want to know branding, I think you can pick up this book first. It will tell you the basics of branding firmly, and it kindly provides strategies to build a brand and apply it in practice. If you want to know the basics and the real world, this book will guide you along the way. Furthermore, in the digital era, we can get a glimpse of the detail that suggests how we should apply it according to the times. I support your success!', bookId: '1196372144', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4887891%3Ftimestamp%3D20221011190109'},
      { id:2, title: 'for in-depth reading', content: 'It is amazing that I can see such a different side while reading the same book. As a way to realize communication and sensitivity, you realize the power of reading. Among the 40 books introduced here, many have already read them, but I look back on my reading method, which rarely takes a reading method that presses down on each sentence like the author.', bookId: '8956055467', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F724120%3Ftimestamp%3D20221011183110'},
      { id:1, title: 'Pretty and valuable', content: 'I heard from the open books that world literature works were released to celebrate the 35th anniversary. First of all, it was good that the composition was divided into day and night according to the atmosphere, and the cover was clean and eye-catching. It\'s light, so I think it\'ll be good to see it on the subway on your way to work. The composition is good without any space. They are famous works, but I\'m familiar with the title and there are many things I haven\'t read, so I think it\'ll be a chance to read them.', bookId: '8932921148', thumbnail: 'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5800913%3Ftimestamp%3D20221011191141'}
    ]

    // 로컬 스토리지 데이터 불러오기
    let data = localStorage.getItem('post');
    // 로컬 데이터 없으면 더미 데이터 넣기
    data = data ? JSON.parse(data) : dummyPosts;
    return data;
  }

  const [ Posts ] = useState(getLocalData());

  useEffect(()=>{
    // post 로컬 스토리지에 저장
    localStorage.setItem('post', JSON.stringify(Posts));
  }, [Posts]);
  
  return (
    <section id='Reviews' className='myScroll'>
      <div className='inner'>
        <h2>Recent Reviews</h2>

        <div className='frame'>
          {Posts?.length ? Posts.map((data, idx)=>{
            if (idx > 5) return '';
            return (
              <article key={idx}>
                <ul>
                  <li className='img'>
                    <Link to={`/content/${data.bookId}`}>
                      <img src={data.thumbnail} alt={data.title} />
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