import React, { useRef } from 'react';
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Popup = forwardRef((props, ref)=>{
  const [Open, setOpen] = useState(false);
  const popup = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        setOpen: ()=>setOpen(true),
      };
    }
  )

  useEffect(() => {
    if (Open) {
      popup.current?.classList.add('on');
      document.body.style.overflow = 'hidden';
    } else {
      popup.current?.classList.remove('on');
      document.body.style.overflow = 'auto';
    }
  }, [Open]);
  
  return (
    <>
    {Open && 
      <aside className='pop' ref={popup}>
        <div className='con'>{props.children}</div>
        <span className='close' onClick={()=>{setOpen(false)}} >
          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
        </span>
      </aside>
    }
    </>
  );
});
export default Popup;
