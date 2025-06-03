import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstrPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  AppHeader,
  Modal,
  OrderInformation,
  IngridDetail,
  ProtectedRoute,
  Center
} from '@components';
import { useDispatch } from '@store';
import {
  getIngredientsThunk,
  getUserStateSelector,
  getUserThunk
} from '@slices';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userLoading = useSelector(getUserStateSelector).isLoadong;
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstrPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <Center title={`Детали ингредиента`}>
              <IngridDetail />
            </Center>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Center title={`#${location.pathname.match(/\d+/)}`}>
              <OrderInformation />
            </Center>
          }
        />
        <Route element={<ProtectedRoute forAuthorized={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute forAuthorized />}>
          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
            <Route
              path='orders/:number'
              element={
                <Center title={`#${location.pathname.match(/\d+/)}`}>
                  <OrderInformation />
                </Center>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInformation />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={`Детали ингредиента`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngridDetail />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute forAuthorized />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => {
                    navigate('/profile/orders');
                  }}
                >
                  <OrderInformation />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
