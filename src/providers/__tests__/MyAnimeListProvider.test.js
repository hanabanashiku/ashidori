import MyAnimeListProvider from "../MyAnimeListProvider";
import axios from "../../__mocks__/axios";
import { PROVIDERS } from "../../enums";

// mock data
import userData from "../../__mocks__/userData.json";
import malUserData from "../../__mocks__/mal/user.json";

describe("MyAnimeList provider", () => {
  // const userId = 30000;

  let mal;
  let now = new Date("2022-06-10 13:00");

  beforeEach(() => {
    browser.storage.local.set({
      userData: {
        ...userData,
        _provider: PROVIDERS.MY_ANIME_LIST,
      },
    });

    jest.useFakeTimers().setSystemTime(now.getTime());

    mal = new MyAnimeListProvider();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("authorize begins the implicit OAuth flow", async () => {
    const clientId = "e62f583191ca06e8a96bd8fc66769c09";
    const code =
      "def5020006cf4866102fc5cfdf3d1df050a8b14fdfbbeff3e3e5d7fa8e4bfba931cd66bfbb54d8ca2758851197679811b01bebfcf01f2aa5b74ef70199f137f9da38f33947ff759a5750c591dbefbe97b1232091ed5327a636aef4f056a80ab2460254fd866b5229f680bdd1e93d7a6d0e52865d9982b4be42040faa3d6a07b8e3b13808d65e344f9533a4eacb5a3cd693665ea3d38e9a48f6fada3a9a7d41f800f71417b0923df9bbcf07b76685e883a4cd6c59c5b67c20394c5f34c21e7a4a2aef35a35178fb8d33ab1e11f18252e5d81ad68687deffe65ab9c313332484a0b7faf67dcb2848665c166dfeed5708d5fbd4c43af7a1cadb03f9cb5370ff860fdf87880ae2ab424015578439d2820a630837264647bae7fc28c8c135d59e40b724f55249e204fc4afcbdf7b010d5ae14a04fb8530ea71471175998261bc45edc039c8fc42482ebd652897b04716506d9ea553773d499b529b3468470ee09e933fa990bd0d1ea657df0ad6893988c4cfeda95cb5bae97aa98bd6c9d6a227598a62851af706a1dd0b41d510e4fdbe1053170e755092d495e411f42ea59546560979e2b841fffcc58ea3714067eb6cc30ee69835388b01d8408e61bf367a7be69d235494ff1eaaf1790f6a7442dfff1c5875c4821f4d5dbfbf9416e0fb7ce36d35940285e42bbd8661084cd9993c59a400c2204121ad5bd8b0a7eb5738cc3f48e03b4998883f129bbf7488c74df36cbbe5b015ae660b7ea7ab62ba79b009fa19342633169dbe2d28f";
    const bearerToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc1YzZkMzliMmFlNjBhNTJiY2U2NjI1YTk3ZDRkODZlYTZiOTIyOWUxZjczNzcyNTQ0ODQ4Yjg0OTE4NzVlZjZlNmZlNzE0ZmQxMzlmMjAyIn0.eyJhdWQiOiJlNjJmNTgzMTkxY2EwNmU4YTk2YmQ4ZmM2Njc2OWMwOSIsImp0aSI6Ijc1YzZkMzliMmFlNjBhNTJiY2U2NjI1YTk3ZDRkODZlYTZiOTIyOWUxZjczNzcyNTQ0ODQ4Yjg0OTE4NzVlZjZlNmZlNzE0ZmQxMzlmMjAyIiwiaWF0IjoxNjU0ODc5NjU5LCJuYmYiOjE2NTQ4Nzk2NTksImV4cCI6MTY1NzQ3MTY1OSwic3ViIjoiMzU5NjE4MyIsInNjb3BlcyI6W119.DzjwVKgQWubu1Owmk-MrziJ3GbFeB6MFPCmTHOKF3EvEA94s5PnRJ9McX7mD-f7g_XSzQ_C0kcHKtraIgQ1-ZWCbfw_hFMDEJonfcoPqHeir7I715tcqnOgJxEgPUMrywuPLOIOVarUzV62Hz45V7kCdTlV1QoQB7HgkvwxVvSUSDpp2CIxuVY5HiEnikdp83OCk6ZRwVroRGzI01P4w_79URJ3REQquYBWnCvxUdlO-5R4WB3uku8VezczON_V3Dj74LE5LQhn2-Bi5v7HAEuajb4l4TCztLSIx_zaSP-KNUgnDB0qviXZ3l8UW1ZA0dNok1tbbrA7HSwUasddJ3A";
    browser.identity.launchWebAuthFlow.mockResolvedValueOnce(
      `https://chiejjofmfnepjchjenapocjafpkipaj.chromiumapp.org/?code=${code}`
    );
    const refreshToken =
      "def50200356fc22794608cfdfe5c291f95d88466e3387a79f5f8dae9d8084ace8ba29397b82dac1bc2ee22ea530e1276916210b5912d50dbcbf11f2d62919e26d8c7297f9fc3fcaf330d12950db9ee8a800899397f70e77cff0d83cd4c37d47e004d5151a2e3c35252fa6ba5628a3f2b02f4f3994cae3ae2e8eebf0a7dc675d30fe6130db3c50c251fa4a889c2e92ba670a558889027443b57fe8d77d9d584bd20cbf6236b98884afa192b7f4699e011ed260801062700deb07ab0921b0448748dd95ff8ab496704d9662ea8a3bb46debdcdeea5747c9ab1f4370965f9e99303c6968076f84cbecd6f3e77d2c82c009c90f0e02989b6b9f15bed0b415dbfff73ab7a779a9e6b9d36c40cb5676ef369398bc4318bce769feb27b6a69d842e71a5a7c57153a8829aadf0d5b223906552e809788baddcc3a2f31abe7cf9bcabf8444e88ce7ba19f97f565884410e4b3fc120e5c76e7ae48a352efb2eca55bcd86230975a1f002344ec9bfff5bcd46eb9cfc5030f04c5e2dea38c68a6af471a9db6fb29f9cd68d51502f";
    axios.post.mockResolvedValueOnce({
      data: {
        access_token: bearerToken,
        refresh_token: refreshToken,
        expires_in: 3600,
      },
    });
    axios.get.mockResolvedValueOnce({ data: malUserData });

    // Ask the user to put in their password and request authorization code
    await MyAnimeListProvider.authorize();
    expect(browser.identity.launchWebAuthFlow).toHaveBeenCalledTimes(1);
    const webAuthRequest = browser.identity.launchWebAuthFlow.mock.calls[0][0];
    const codeParams = new URLSearchParams(webAuthRequest.url.split("?")[1]);
    expect(webAuthRequest.interactive).toBe(true);
    expect(webAuthRequest.url).toContain(
      "https://myanimelist.net/v1/oauth2/authorize?"
    );
    expect(codeParams.get("response_type")).toBe("code");
    expect(codeParams.get("client_id")).toBe(clientId);
    expect(codeParams.get("scope")).toBe("write:users");
    expect(codeParams.get("redirect_uri")).toBe(
      "https://chiejjofmfnepjchjenapocjafpkipaj.chromiumapp.org/"
    );
    expect(codeParams.get("code_challenge")).toHaveLength(128);
    expect(codeParams.get("code_challenge_method")).toBe("plain");

    // Exchange authorization code for bearer token
    const expectedParams = new URLSearchParams();
    expectedParams.append("client_id", clientId);
    expectedParams.append("code", code);
    expectedParams.append("code_verifier", codeParams.get("code_challenge"));
    expectedParams.append("grant_type", "authorization_code");
    expectedParams.append("redirect_uri", codeParams.get("redirect_uri"));
    expect(axios.post).toHaveBeenCalledWith(
      "https://myanimelist.net/v1/oauth2/token",
      expectedParams
    );

    // save token to storage
    expect(await mal.getAuthToken()).toBe(bearerToken);
    expect(await mal.getRefreshToken()).toBe(refreshToken);
    expect(
      (await browser.storage.local.get({ access_token_expires_on: null }))
        .access_token_expires_on
    ).toBe(now.getTime() / 1000 + 3600);

    // populate user data
    expect(axios.get).toHaveBeenCalledWith("/users/@me");
  });

  it("fetchUserData fetches user data", async () => {
    axios.get.mockResolvedValueOnce({ data: malUserData });

    const actual = await mal.fetchUserData();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenLastCalledWith("/users/@me");

    expect(actual.id).toBe(30000);
    expect(actual.username).toBe("john.doe");
    expect(actual.avatarUrl).toBe(
      "https://api-cdn.myanimelist.net/images/userimages/30000.jpg?t=1654881600"
    );
  });
});
