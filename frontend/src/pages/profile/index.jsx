import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getUserInfo } from '../../stores/user/userAction';

import Profile from '../../componenets/Profile';

function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginReducer);
  useEffect(() => {
    if (!user.id) {
      dispatch(getUserInfo({ email: 'river@test.com', password: 'abc123456' }));
    }
  }, [dispatch]);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
