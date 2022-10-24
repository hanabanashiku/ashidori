import AnimeEpisodeSchedule from "../AnimeEpisodeSchedule";

describe('AnimeEpisodeSchedule', () => {
   it('loads default values', () => {
      const model = new AnimeEpisodeSchedule();

      expect(model.anime.id).toBe(0);
      expect(model.airDate).toBeNull();
      expect(model.episodeNumber).toBe(0);
   });

   it('loads values from constructor with default anime', () => {
      const model = new AnimeEpisodeSchedule({
          mediaId: 21,
          episode: 1038,
          airingAt: 1667089800
      });

      expect(model.episodeNumber).toBe(1038);
      expect(model.airDate).toStrictEqual(new Date("2022-10-30T00:30:00.000Z"));
      expect(model.anime).toBeDefined();
      expect(model.anime.id).toBe(21);
   });

   it('loads values from constructor with provided anime', () => {
       const model = new AnimeEpisodeSchedule({
           mediaId: 21,
           episode: 1038,
           airingAt: 1667089800,
           anime: {
               _id: 21,
               _title: "One Piece"
           }
       });

       expect(model.anime).toBeDefined();
       expect(model.anime.id).toBe(21);
       expect(model.anime.title).toBe("One Piece");
   });
});