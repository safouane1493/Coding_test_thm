import React, {
  useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const FileField = (props) => {
  const { field, form, type } = props;
  const { name } = field;
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState('');
  const onAvatarClick = () => {
    fileRef.current.click();
  };
  const handleOnFileChange = (event) => {
    const fileAvatar = event.target.files[0];
    form.setFieldValue('profile', fileAvatar);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setAvatar(reader.result);
    });
    if (fileAvatar) reader.readAsDataURL(fileAvatar);
  };
  const { user } = useSelector((state) => state.userLoginReducer);
  useEffect(() => {
    if (user.id) setAvatar(`${process.env.REACT_APP_API_URL}/api/user/profile-pic/${user.id}`);
  }, [user]);
  return (
    <div className="w-full mb-8 flex items-center justify-center">
      <input
        type={type}
        name={name}
        hidden
        ref={fileRef}
        onChange={(event) => handleOnFileChange(event)}
      />
      <div className="avatar w-32 h-32 rounded-full shadow flex items-center justify-center relative overflow-hidden">
        <img src={avatar} alt="" />
        <button type="button" className="absolute w-[80%] top-[70%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[#185ae7] text-white rounded" onClick={onAvatarClick}>
          Choose File
        </button>
      </div>
    </div>
  );
};

FileField.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string,
};

FileField.defaultProps = {
  type: 'file',
};

export default FileField;
