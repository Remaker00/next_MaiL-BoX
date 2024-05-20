"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchComponent from './SearchComponent';
import Link from 'next/link';
import HelpIcon from '@mui/icons-material/Help';
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HelpForm from './HelpForm';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { loginFailure } from "../lib/authSlice";

const Navbar = ({ onSearch }) => {
  const [help, sethelp] = useState(false);
  const [name, setname] = useState('Default');
  const [mail, setmail] = useState('default@gmail.com')
  const [backgroundColor, setBackgroundColor] = useState('#03559');
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);
  const [avatarInitial, setAvatarInitial] = useState('DE');
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    localStorage.setItem('backgroundColor', color);
  };

  const handlehelpForm = () => {
    sethelp(!help);

  }

  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('name');
    dispatch(loginFailure());
    navigate.push('/');
  };

  const handleLinkClick = () => {
    setIsOpen(true);
  };

  const handlepage = () => {
    navigate.push('/mail-box');
  }

  const fetchInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/user/get-info', {
        headers: {
          Authorization: token,
        },
      });
      const { username, email } = response.data;
      setname(username)
      setmail(email)

      // Update avatar initial
      if (username) {
        const nameinitial = username.substring(0, 2).toUpperCase();
        localStorage.setItem('name', nameinitial);
        setAvatarInitial(nameinitial);
      }
    } catch (error) {
      console.error('Failed to fetch User Data:', error);
    }
  };

  useEffect(() => {
    const storedBackgroundColor = localStorage.getItem('backgroundColor');
    const name = localStorage.getItem('name');
    if (storedBackgroundColor) {
      setBackgroundColor(storedBackgroundColor);
    }

    if (name) {
      setAvatarInitial(name);
    }

    fetchInfo();
  }, []);

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: backgroundColor }}>
      <>
        <div className='menu-toggle' onClick={() => setIsOpen(!isOpen)}>
          <span className='material-icons-sharp'><MenuIcon /></span>
        </div>
        <div className='navbar-top'>
          <div className='nav-mail-logo' onClick={handlepage}>
            <img src='/mailLogo.webp' alt='Background Logo' width={50} />
            <h1>MaiL-BoX</h1>
          </div>
          <SearchComponent onSearch={onSearch} />
          <div className={`right-toggle ${rightOpen ? 'open' : ''}`} onClick={() => setRightOpen(!rightOpen)}>
            <span className='material-icons-sharp'><MoreVertIcon /></span>
          </div>
          <div className={`right-nav ${rightOpen ? 'open' : 'close'}`} style={{ backgroundColor: backgroundColor }}>
            <div className='Help'>
              <HelpIcon className='help' onClick={handlehelpForm} />
            </div>
            {help && (
              <HelpForm onClose={() => sethelp(false)} />
            )}
            <div className="color-picker">
              <select
                value={backgroundColor}
                onChange={(e) => handleColorChange(e.target.value)}
                style={{
                  padding: '6px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                <option style={{ fontSize: '10px', width: '50px' }} value="#035598">Blue</option>
                <option style={{ fontSize: '10px', width: '50px' }} value="#ff0000">Red</option>
                <option style={{ fontSize: '10px', width: '50px' }} value="#000000">Black</option>
                <option style={{ fontSize: '10px', width: '50px' }} value="#0c5d01">Green</option>
              </select>
            </div>
            <div className="avatar-container">
              <div className="avatar-initial">{avatarInitial}</div>
              <div className="tooltip">
                <p>{name}</p>
                <p>{mail}</p>
              </div>
            </div>
          </div>
        </div >
        <ul className='navbar-link' style={{ backgroundColor: backgroundColor }}>
          <li>
            <Link href='/mail-box-client' className='link-container' onClick={handleLinkClick}>
              <CreateIcon className='create-icon' />
              Compose
            </Link>
          </li>
          <li>
            <Link href='/mail-inbox' className='link-container' onClick={handleLinkClick}>
              <InboxIcon className='create-icon' />
              Inbox
            </Link>
          </li>
          <li>
            <Link href='/mail-starred' className='link-container' onClick={handleLinkClick}>
              <StarIcon className='create-icon' />
              Starred
            </Link>
          </li>
          <li>
            <Link href='/mail-sent' className='link-container' onClick={handleLinkClick}>
              <SendIcon className='create-icon' />
              Sent
            </Link>
          </li>
          <li>
            <button onClick={handlelogout} className='nav-button'>
              <LogoutIcon className='create-icon' />
              Log Out
            </button>
          </li>
        </ul>
      </>
      <footer>
        <div className='container2'>
        </div>
        <div className="container">
          <p>&copy; 2024 MaiL-BoX. All rights reserved.</p>
        </div>
      </footer>
    </nav >
  );
};

export default Navbar;
