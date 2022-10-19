import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import kakaoLoginSliceReducer from '../features/kakaoLogin/kakaoLoginSlice';
import userReservationSliceReducer from '../features/userReservation/userReservationSlice';
import productReducer from '../features/main/productSlice';
import adminPageSliceReducer from '../features/adminPage/adminPageSlice';
import userDataSliceReducer from '../features/userData/userDataSlice';
import pageReducer from '../features/page/page';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    kakaoLogin: kakaoLoginSliceReducer,
    userReservation: userReservationSliceReducer,
    regionData: productReducer,
    themeData: productReducer,
    groupData: productReducer,
    adminPage: adminPageSliceReducer,
    userData: userDataSliceReducer,
    page: pageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
