import { destinationsReducer, initialState } from './destinations.reducer';

describe('Destination Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = destinationsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
