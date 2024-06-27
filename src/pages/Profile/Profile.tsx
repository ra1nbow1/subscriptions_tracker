import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logout } from '../../features/auth/authSlice';
import axios from '../../features/auth/axios';
import IUser from '../../features/interfaces/user.interface';
import Subscriptions from './components/Subscriptions';
import styles from './Profile.module.scss'

function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<IUser>({
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
        setUser(response.data);
        console.log('User:', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className={styles.wrapper}>
      <div className="uid">{user.uid}</div>
      <Subscriptions subscriptions={user.subscriptions}/>
    </section>
  );
};

export default Profile;
