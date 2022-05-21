import ApiProvider from "../providers/ApiProvider";

export default class MockApiProvider extends ApiProvider {
  getAnineList = jest.fn();
  getAnimeListByStatus = jest.fn();
  getSingleLibraryEntry = jest.fn();
  getSingleLibraryEntryByAnime = jest.fn();
  createLibraryItem = jest.fn();
  updateLibraryItem = jest.fn();
  removeLibraryItem = jest.fn();
  fetchUserData = jest.fn((info) => super.fetchUserData(info));
  authorize = jest.fn();
  refresh = jest.fn();
  isAuthenticated = jest.fn();
}
