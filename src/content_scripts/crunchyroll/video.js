import $ from 'jquery';
import Settings from '../../options/Settings';
import { SERVICES } from '../../enums';

const episodeRegex = /^E(\d+) - (.+)$/.compile();

Settings.getEnabledServices().then(enabledServices => {
    if(!enabledServices.includes(SERVICES.CRUNCHYROLL)) {
        return;
    }

    $(() => {
        $(window).on('unload', async () => await onEpisodeCompleted())
    });
});

async function onEpisodeCompleted() {

}

function parseEpisodeData() {
    const seriesName = $(".show-title-link > h4").first().text;
    const episode = $(".erc-current-media-info > h2.c-heading").first().text;
    const episodeMatch = /^E(\d+) - (.+)$/g.exec(episode);

    if(!episodeMatch) {
        return null;
    }

    return {
        seriesName,
        epsiodeNumber: episodeMatch[1],
        episodeName: episodeMatch[2],
    };
}