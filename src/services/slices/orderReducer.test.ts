import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { getOrderThunk } from './orderSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer
    }
  });

describe('Тесты действий заказа', () => {
  describe('Тесты действия получения данных заказа', () => {
    test('Тест действия ожидания ответа после получения данных заказа', () => {
      const store = setupStore();
      store.dispatch({ type: getOrderThunk.pending.type });
      const state = store.getState();
      expect(state.order.isLoading).toBeTruthy();
      expect(state.order.error).toBeNull();
    });
    test('Тест действия ошибки после получения данных заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getOrderThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBe(error);
    });
    test('Тест действия успешного ответа после получения данных заказа', () => {
      const mockedPayload = {
        orders: [
          {
            _id: '660e81bb97ede0001d0643eb',
            ingredients: [
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '622dh7y4b6i7b9001jkn1126',
              '643dhrthrb6i7b904btj1111'
            ],
            owner: '65cdn10a32hyf2221d05e2d6',
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2024-04-04T10:32:27.595Z',
            updatedAt: '2024-04-04T10:32:28.181Z',
            number: 37596
          }
        ]
      };
      const store = setupStore();
      store.dispatch({
        type: getOrderThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.order.isLoading).toBeFalsy();
      expect(state.order.error).toBeNull();
      expect(state.order.order).toEqual(mockedPayload.orders[0]);
    });
  });
});
