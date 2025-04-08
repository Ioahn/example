import {
  PayloadAction,
  createAction,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { selectChatUIState, setChatVisibility } from '@features/chat';
import { callFnByPredicates, startListening } from '@shared/utils';
import { UI_SLICE_NAME } from '@shared/constants';

const initialState = {
  notificationIsVisible: false,
  menuIsVisible: false,
};

export const closeAllUI = createAction('closeAllUI');

export const uiSlice = createSlice({
  name: UI_SLICE_NAME,
  initialState,
  reducers: {
    setNotificationVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.notificationIsVisible = payload;
    },
    setMenuVisible: (state, { payload }: PayloadAction<boolean>) => {
      state.menuIsVisible = payload;
    },
    setUIState: (
      state,
      { payload }: PayloadAction<Partial<typeof initialState>>
    ) => {
      Object.assign(state, payload);
    },
  },
});

export const { setNotificationVisible, setMenuVisible, setUIState } =
  uiSlice.actions;

const slice = (state: RootState) => state[UI_SLICE_NAME];

export const selectUIStates = createSelector(slice, (state) => state);

export const mobileModalIsOpened = createSelector(
  selectUIStates,
  selectChatUIState,
  ({ menuIsVisible, notificationIsVisible }, { chatIsOpened }) =>
    menuIsVisible || notificationIsVisible || chatIsOpened
);

startListening({
  matcher: isAnyOf(
    setNotificationVisible,
    setMenuVisible,
    setChatVisibility,
    closeAllUI
  ),
  effect: (action, { dispatch }) => {
    callFnByPredicates([
      [
        [true, false, false, false, true],
        () => {
          dispatch(setUIState({ notificationIsVisible: false }));
          dispatch(setChatVisibility(false));
        },
      ],
      [
        [false, true, false, false, true],
        () => {
          dispatch(setUIState({ menuIsVisible: false }));
          dispatch(setChatVisibility(false));
        },
      ],
      [
        [false, false, true, false, true],
        () =>
          dispatch(
            setUIState({ notificationIsVisible: false, menuIsVisible: false })
          ),
      ],
      [
        [false, false, false, true, null],
        () => {
          dispatch(
            setUIState({ notificationIsVisible: false, menuIsVisible: false })
          );
          dispatch(setChatVisibility(false));
        },
      ],
    ])([
      setMenuVisible.match(action),
      setNotificationVisible.match(action),
      setChatVisibility.match(action),
      closeAllUI.match(action),
      action.payload,
    ]);
  },
});
