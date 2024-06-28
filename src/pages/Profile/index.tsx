import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logout, setToken } from '../../features/auth/authSlice';
import axios from '../../features/auth/axios';
import IUser from '../../features/interfaces/user.interface';
import Subscriptions from './components/Subscriptions';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [user, setUserState] = useState<IUser>({
    uid: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    subscriptions: [],
    token: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserState(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch(logout());
        navigate('/login');
      }
    };

    if (token) {
      fetchUser();
    } else {
      navigate('/login');
    }
  }, [token, dispatch, history]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header>
        <Header user={user} />
      </header>
      <section className="subscriptions h-screen">
        <Subscriptions subscriptions={user.subscriptions} />
      </section>
    </>
  );
}

export default Profile;
