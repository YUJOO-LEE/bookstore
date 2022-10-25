import { useEffect, useState, useRef } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import Books from './Books';
import Reviews from './Reviews';
import Pics from './Pics';
import Vids from './Vids';
import Subs from './Subs';
import Btns from './Btns';
import Anime from '../../asset/anime';

export default function Main() {
  const main = useRef(null);
  const pos = useRef([]);
  const [ Index, setIndex ] = useState(null);
  const [ Scrolled, setScrolled ] = useState(0);


  useEffect(()=>{
    let secs;
    const getPos = ()=>{
      pos.current = [];
      secs = main.current.querySelectorAll('.myScroll');
      for (const sec of secs) {
        pos.current.push(sec.offsetTop);
      }
    }

    const activation = ()=>{
      const base = window.innerHeight / 2 * -1;
      const scroll = window.scrollY || window.pageYOffset;
      const btns = main.current.querySelectorAll('.scrollNavi li');

      setScrolled(scroll);
      
      pos.current.map((top, i)=>{
        if (scroll >= top + base) {
          for (let el of btns) el.classList.remove('on');
          for (let sec of secs) sec.classList.remove('on');
          secs[i].classList.add('on');
          btns[i].classList.add('on');
        }
        return false;
      });
    }
    
    getPos();
    window.addEventListener('resize', getPos);
    activation();
    window.addEventListener('scroll', activation);
    
    return (()=>{
      window.removeEventListener('resize', getPos);
      window.removeEventListener('scroll', activation);
    });
  }, [])

  useEffect(()=>{
    new Anime(window, {
      prop: 'scroll',
      value: pos.current[Index],
      duration: 500
    })
  }, [Index])

  return (
    <main ref={main}>
      <Header type='main'></Header>
      <Visual></Visual>
      <Books></Books>
      <Reviews></Reviews>
      <Pics></Pics>
      <Vids></Vids>
      <Subs></Subs>
      <Btns setIndex={setIndex} curIndex={Index}></Btns>
    </main>
  );
}