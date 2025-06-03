import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeedThunk, getOrdersThunk } from './feedSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedReducer
    }
  });

describe('Тесты действий ленты', () => {
  describe('Тесты действия получения ленты', () => {
    test('Тест действия ожидания ответ после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });
    test('Тест действия ошибки после запроса ленты', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
    });
    test('Тест действия успешного ответа получения ленты', () => {
      const mockedPayload = {
        orders: {
          _id: '660e7df397ede0001d0643df',
          ingredients: [
            '622dh7y4b6i7b9001jkn1126',
            '622dhrthrb6i7b904btj121126',
            '622dhrthrb6i7b904btj121126'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2024-04-04T10:16:19.376Z',
          updatedAt: '2024-04-04T10:16:19.994Z',
          number: 37593
        },
        total: 37601,
        totalToday: 45
      };
      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload.orders);
      expect(state.feed.total).toBe(mockedPayload.total);
      expect(state.feed.totalToday).toBe(mockedPayload.totalToday);
    });
  });
  describe('Тесты действия получения ленты ЛК', () => {
    test('Тест действия ожидания ответ после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });
    test('Тест действия ошибки после запроса ленты', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(error);
    });
    test('Тест действия успешного ответа получения ленты', () => {
      const mockedPayload = {
        _id: '660e7df397ede0001d0643df',
        ingredients: [
          '622dh7y4b6i7b9001jkn1126',
          '622dhrthrb6i7b904btj121126',
          '622dhrthrb6i7b904btj121126'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-04-04T10:16:19.376Z',
        updatedAt: '2024-04-04T10:16:19.994Z',
        number: 37593
      };
      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedPayload);
    });
  });
});
