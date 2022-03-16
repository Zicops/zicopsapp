import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuPopover,
    MenuLink,
  } from "@reach/menu-button";
  import Image from "next/image";
  import "@reach/menu-button/styles.css";

  import { useState, useEffect, useContext } from "react";
  import { userContext } from '../../state/contexts/UserContext'


const LeftDropdown = () => {
    const { isAdmin, makeAdmin } = useContext(userContext);

    // console.log("isAdmin :"+isAdmin);

    useEffect(() => {
        let url = window.location.href;
        let pathname = new URL(url).pathname;
        let pathArr = pathname.split('/');
        if ( pathArr.includes("admin") ){
            window.localStorage.setItem('isAdmin', 1);
        } else {
            window.localStorage.setItem('isAdmin', 0);
        }
        makeAdmin(JSON.parse(window.localStorage.getItem('isAdmin')));
      }, []);
    
    useEffect(() => {
        window.localStorage.setItem('isAdmin', isAdmin);
    }, [isAdmin]);

    const gotoAdmin = ()=>{
        makeAdmin(1);
    }
    const gotoUser = ()=>{
        makeAdmin(0);
    }

    return (
        <>
        <Menu className="left_menu2">
        <MenuButton 
        style={{ 
            backgroundColor: "transparent",
            border: 0,
            outline: 0,
            width: "50px"
        }}
        >
            <span aria-hidden>
            <Image 
            src="/images/menu.png" 
            alt="left menu"
            width={30}
            height={20}
            />
            </span>
        </MenuButton>
        <MenuList style={{ 
            backgroundColor: 'var(--dark_two)',
            marginTop: '20px',
            padding: 0,
            fontSize: '16px',
            width: '250px',
            position: 'absolute',
            zIndex: 9999
        }}>
            <MenuItem className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px'
            }}
            onSelect={() => alert("Languages")}>Language</MenuItem>
            <MenuItem className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px',
            }}
            onSelect={() => alert("Preferences")}>Preferences</MenuItem>    
            <MenuLink className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px'
            }}
            as="a" href={!isAdmin ? "/" : "/admin" }
            onClick={!isAdmin ? gotoAdmin : gotoUser}
            >
            {!isAdmin ? "Switch to Admin" : "Switch to Learner" }
            </MenuLink>
            
        </MenuList>
        </Menu>
        
        </>
    );
}

export default LeftDropdown