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

  import { useState, useEffect } from "react";



const LeftDropdown = () => {
    const [isAdmin, setAdmin] = useState(0);

    useEffect(()=>{
      let page = window.location.href.split('/').pop();
      if(!page) {
          setAdmin(0) 
          return; 
      }
      if( page == 'adminHome' || page == 'admin'){
        setAdmin(1);
      } else {
        setAdmin(0);
      }
    }, [])

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
            onSelect={() => alert("Download")}>Language</MenuItem>
            <MenuItem className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px',
            }}
            onSelect={() => alert("Copy")}>Preferences</MenuItem>    
            {!isAdmin &&       
            <MenuLink className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px'
            }}
            as="a" href="/adminHome/">
            Switch to Admin
            </MenuLink>
            }
            {isAdmin && 
            <MenuLink className="menuitems"
            style={{ 
                color: 'var(--primary)',
                backgroundColor: 'var(--dark_two)',
                border: '1px solid var(--primary)',
                padding: '8px',
                margin: '3px'
            }}
            as="a" href="/">
            Switch to Learner
            </MenuLink>
            }
        </MenuList>
        </Menu>
        
        </>
    );
}

export default LeftDropdown