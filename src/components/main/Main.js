import { useRef } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import Books from './Books';
import Reviews from './Reviews';
import Pics from './Pics';
import Vids from './Vids';
import Subs from './Subs';
import Btns from './Btns';

export default function Main() {
  const main = useRef(null);

  return (
    <main ref={main}>
      <Header type={'main'}></Header>
      <Visual></Visual>
      <Books></Books>
      <Reviews></Reviews>
      <Pics></Pics>
      <Vids></Vids>
      <Subs></Subs>
      <Btns></Btns>
    </main>
  );
}