import React from 'react';
import { Box } from '@mui/material';
import Profile from '../../componenets/Profile';

function ProfilePage() {
  return (
    <div className="container">
      <Box
        sx={{
          boxShadow: 2,
          p: 3,
        }}
        container
      >
        <Profile />
      </Box>
    </div>
  );
}

export default ProfilePage;
