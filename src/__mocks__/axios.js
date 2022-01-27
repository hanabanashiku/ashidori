const mockAxios = jest.genMockFromModule("axios");
mockAxios.interceptors = {
  request: {
    use: jest.fn(),
  },
};
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
