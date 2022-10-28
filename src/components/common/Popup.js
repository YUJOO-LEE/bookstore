import React from 'react';
import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Popup = forwardRef((props, ref)=>{
  const [Open, setOpen] = useState(false);

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [Open]);
  
  return (
    <>
    {Open && 
      <aside className='pop'>
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
