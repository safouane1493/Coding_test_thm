import React, {
  useRef, useState,
} from 'react';
import {
  Avatar,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(null);

  // read image uploaded in avatar
  const handleChangeAvatar = (event) => {
    const avatarImg = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAvatar(reader.result);
    });
    if (avatarImg) reader.readAsDataURL(avatarImg);
    const formData = new FormData();
    formData.append('selectedFile', avatarImg);
    try {
      axios({
        method: 'post',
        url: 'http://localhost:3002/',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Avatar
        src={avatar}
        onClick={() => avatarRef.current.click()}
        sx={{
          bgcolor: '#1976d2', margin: 'auto', width: 140, height: 140, cursor: 'pointer',
        }}
      >
        <FolderIcon />
      </Avatar>
      <input accept="image/*" id="icon-button-file" type="file" ref={avatarRef} onChange={(event) => handleChangeAvatar(event)} hidden />
    </>
  );
};

export default AvatarUpload;
