import { useState, useEffect, useContext } from 'react';

import { userContext } from '../../../state/contexts/UserContext';

export function useDropDownHandle (){
    const { isAdmin, makeAdmin } = useContext(userContext);

    // console.log("isAdmin :"+isAdmin);
  
    useEffect(() => {
      let url = window.location.href;
      let pathname = new URL(url).pathname;
      let pathArr = pathname.split("/");
      if (pathArr.includes("admin")) {
        window.localStorage.setItem("isAdmin", 1);
      } else {
        window.localStorage.setItem("isAdmin", 0);
      }
      makeAdmin(JSON.parse(window.localStorage.getItem("isAdmin")));
    }, []);
  
    useEffect(() => {
      window.localStorage.setItem("isAdmin", isAdmin);
    }, [isAdmin]);
  
    function gotoAdmin  ()  {
      makeAdmin(1);
    };
    function gotoUser  ()  {
      makeAdmin(0);
    };
  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const open = Boolean(anchorEl);
  
    function handleClick  (event)  {
      setAnchorEl(event.currentTarget);
    };
  
  function handleClose(e) {
    // prevent closing if the pointer is over menu list
    if (e?.relatedTarget?.classList) {
      const classList = [...e?.relatedTarget?.classList];
      console.log(classList);

      if (classList.includes('MuiMenuItem-root')) return;
    }
    // setTimeout(() => {
      setAnchorEl(null);
    // }, 800);
  };  

    return {isAdmin,gotoAdmin,gotoUser,open,anchorEl,handleClick,handleClose};
}
