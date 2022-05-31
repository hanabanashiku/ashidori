import ApiProvider from "../providers/ApiProvider";

export default class MockApiProvider extends ApiProvider {
  getUserData = jest.fn();
  getAnineList = jest.fn();
  getAnimeListByStatus = jest.fn();
  getSingleLibraryEntry = jest.fn();
  getSingleLibraryEntryByAnime = jest.fn();
  resolveLibraryEntryFromAnimeEpisode = jest.fn();
  createLibraryItem = jest.fn();
  updateLibraryItem = jest.fn();
  removeLibraryItem = jest.fn();
  findAnime = jest.fn();
  fetchUserData = jest.fn((info) => super.fetchUserData(info));
  authorize = jest.fn();
  refresh = jest.fn();
  isAuthenticated = jest.fn();
  signOut = jest.fn();
}
