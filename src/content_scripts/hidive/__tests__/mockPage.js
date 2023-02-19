const mockPage = `
<body>
  <div id="rmpControls">
    <div id="StreamNextEpisode">
      <div id="nextPlay" data-timer="true">
        <div class="display-table" style="width: 100%; height: 100%">
          <div class="nextContainer">
            <div class="row bottom-gutter-15">
              <div class="col-md-12">
                <h2 style="text-shadow: 3px 3px 5px #000">Up Next...</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default zoomIn animated">
                  <div class="panel-body">
                    <div class="col-md-6 text-left" style="position: relative">
                      <div id="autoPlayTimer">
                        <div class="table">
                          <div
                            class="table-cell"
                            style="
                              height: 100%;
                              vertical-align: middle;
                              text-align: center;
                            "
                          >
                            <svg
                              id="playTimer"
                              width="250"
                              height="250"
                              viewBox="0 0 250 250"
                            >
                              <circle
                                cx="125"
                                cy="125"
                                r="125"
                                fill="rgba(0,0,0,1)"
                              ></circle>
                              <circle
                                cx="125"
                                cy="125"
                                r="125"
                                fill="rgba(255,255,255,.5)"
                              ></circle>
                              <path
                                id="border"
                                transform="translate(125, 125)"
                              ></path>
                              <circle
                                cx="125"
                                cy="125"
                                r="105"
                                fill="black"
                              ></circle>
                              <text x="145" y="180">
                                <a
                                  href="javascript:void(0);"
                                  class="episode-play"
                                  data-key="s04e001"
                                  data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                                >
                                  <tspan text-anchor="middle"></tspan>
                                </a>
                              </text>
                            </svg>
                            <div
                              id="next-cancel"
                              style="color: white; font-size: 18px"
                            >
                              <div class="text">
                                Starting in
                                <span
                                  class="timer-count"
                                  style="font-weight: 600"
                                  >--</span
                                >
                                seconds...
                              </div>
                              <div>
                                <a href="javascript:void(0);" class="timer-stop"
                                  ><i
                                    class="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                  Cancel</a
                                >
                              </div>
                            </div>
                            <div
                              id="still-watching"
                              style="
                                color: white;
                                font-size: 18px;
                                display: none;
                              "
                            >
                              <div class="text">
                                Are you still watching?
                                <span id="bueller"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        src="//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_001_512x288_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 1"
                        width="512"
                        height="288"
                        class="img-responsive"
                        style=""
                      />
                    </div>
                    <div class="col-md-6 text-left">
                      <h3>Season 4 Episode 1</h3>
                      <h4>Prelude | Night Before Departure</h4>
                      <p>
                        Gather your party and venture forth, Bell. The dungeon
                        awaits.
                      </p>
                      <p>S4 Ep1 | Premiere Date: July 21, 2022 09:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="rmpPlayer"
      data-free="False"
      class="rmp-container rmp-color-button rmp-container-fade-in rmp-quick-rewind-or-forward-ui rmp-quick-rewind-and-forward-ui rmp-chrome rmp-medium"
      style="opacity: 1; visibility: visible; width: 805px; height: 452.812px"
      tabindex="0"
      role="application"
    >
      <div class="rmp-content">
        <video
          class="rmp-object-fit-contain rmp-video"
          tabindex="-1"
          crossorigin="use-credentials"
          x-webkit-airplay="allow"
          playsinline="true"
          src="blob:https://www.hidive.com/8e012682-0ec7-4d42-97e2-b6a67ce0408e"
        ></video>
        <div class="rmp-cc-area" style="display: none"></div>
        <div
          class="rmp-poster"
          style="background-color: rgb(0, 0, 0); display: none"
        >
          <img
            class="rmp-poster-img rmp-object-fit-contain"
            alt="Media player poster frame"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
          />
        </div>
      </div>
      <div
        class="rmp-overlay-button rmp-color-bg"
        tabindex="0"
        role="button"
        aria-label="Play"
        style="opacity: 1; visibility: visible"
      >
        <span class="rmp-i rmp-i-play"></span>
      </div>
      <div
        class="rmp-loading-spin rmp-color-bg"
        style="opacity: 0; visibility: hidden"
      >
        <div
          class="rmp-loading-spin-bounce rmpBounce1 rmp-color-bg-button"
        ></div>
        <div
          class="rmp-loading-spin-bounce rmpBounce2 rmp-color-bg-button"
        ></div>
      </div>
      <div class="rmp-control-bar rmp-color-bg">
        <div
          class="rmp-play-pause rmp-i rmp-i-play"
          tabindex="0"
          role="button"
          aria-label="Play"
        >
          <div
            class="rmp-control-bar-hint rmp-color-bg"
            style="margin-left: -21.5px; left: 50%"
          >
            Play
          </div>
        </div>
        <div
          class="rmp-desktop-volume-icon rmp-i rmp-i-volume"
          tabindex="0"
          role="button"
          aria-label="Volume"
        >
          <div class="rmp-desktop-volume-container rmp-color-bg">
            <div class="rmp-desktop-volume-bar-container">
              <div class="rmp-desktop-volume-bar" style="height: 33%">
                <div
                  class="rmp-desktop-volume-handle rmp-color-bg-button"
                ></div>
              </div>
            </div>
            <div class="rmp-desktop-volume-indicator rmp-color-bg">33%</div>
            <div
              class="rmp-desktop-volume-hint rmp-color-bg"
              style="margin-left: -11.5px"
            >
              Volume
            </div>
          </div>
        </div>
        <div
          class="rmp-quick-rewind-or-forward rmp-i rmp-i-quick-rewind-10"
          tabindex="0"
          role="button"
          aria-label="Quick-rewind"
        >
          <div
            class="rmp-control-bar-hint rmp-color-bg"
            style="margin-left: -49px"
          >
            Quick-rewind
          </div>
        </div>
        <div
          class="rmp-quick-rewind-or-forward rmp-quick-rewind-and-forward rmp-i rmp-i-quick-forward-10"
          tabindex="0"
          role="button"
          aria-label="Quick-forward"
        >
          <div
            class="rmp-control-bar-hint rmp-color-bg"
            style="margin-left: -51.5px"
          >
            Quick-forward
          </div>
        </div>
        <div class="rmp-time-elapsed rmp-color-bg">
          <span class="rmp-time-elapsed-text">00:04</span>
        </div>
        <div
          class="rmp-fullscreen rmp-i rmp-i-resize-full"
          tabindex="0"
          role="button"
          aria-label="Full screen"
        >
          <div
            class="rmp-control-bar-hint rmp-color-bg"
            style="margin-left: 0px; right: 4px; left: auto"
          >
            Full screen
          </div>
        </div>
        <div
          class="rmp-seek-bar"
          tabindex="0"
          role="progressbar"
          aria-label="Seek"
        >
          <div class="rmp-time-total">
            <div class="rmp-loaded" style="width: 2.38479%"></div>
            <div
              class="rmp-current rmp-color-bg-button"
              style="width: 0.305161%"
            ></div>
            <div
              class="rmp-handle rmp-color-bg-button"
              style="left: 0.305161%"
            ></div>
            <div
              class="rmp-indicator rmp-color-bg"
              style="left: 26.7656px; opacity: 0; visibility: hidden"
            >
              <span class="rmp-time-indicator">00:36</span>
            </div>
          </div>
        </div>
        <div class="rmp-duration rmp-color-bg">24:31</div>
      </div>
      <div
        class="rmp-speed rmp-module rmp-color-bg"
        tabindex="0"
        role="button"
        aria-label="Speed"
        style="display: block"
      >
        <div class="rmp-module-button">
          <span class="rmp-i rmp-i-speed"></span>
        </div>
        <div class="rmp-hint rmp-color-bg">Speed</div>
      </div>
      <div class="rmp-module-overlay">
        <div class="rmp-overlay-wrapper">
          <div class="rmp-overlay-title">
            <span class="rmp-overlay-title-text">Speed</span>
          </div>
          <div class="rmp-overlay-levels-area">
            <div
              class="rmp-overlay-level rmp-color-bg"
              tabindex="0"
              role="button"
              aria-label="Speed x0.25"
            >
              x0.25
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg"
              tabindex="0"
              role="button"
              aria-label="Speed x0.5"
            >
              x0.5
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg rmp-overlay-level-active"
              tabindex="0"
              role="button"
              aria-label="Speed x1"
            >
              x1
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg"
              tabindex="0"
              role="button"
              aria-label="Speed x1.5"
            >
              x1.5
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg"
              tabindex="0"
              role="button"
              aria-label="Speed x2"
            >
              x2
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg"
              tabindex="0"
              role="button"
              aria-label="Speed x4"
            >
              x4
            </div>
          </div>
        </div>
        <span
          class="rmp-i rmp-module-overlay-icons rmp-module-overlay-play-pause"
          tabindex="0"
          role="button"
          aria-label="Play"
          ><div class="rmp-in-module-hint rmp-color-bg">Play</div></span
        ><span
          class="rmp-i rmp-i-close rmp-module-overlay-icons rmp-module-overlay-close"
          tabindex="0"
          role="button"
          aria-label="Close"
          ><div class="rmp-in-module-hint rmp-color-bg">Close</div></span
        >
      </div>
      <div
        class="rmp-sharing rmp-module rmp-color-bg"
        tabindex="0"
        role="button"
        aria-label="Share"
        style="display: block"
      >
        <div class="rmp-module-button">
          <span class="rmp-i rmp-i-sharing"></span>
        </div>
        <div
          class="rmp-hint rmp-color-bg"
          style="margin-left: -26.5px; left: 50%; right: auto"
        >
          Share
        </div>
      </div>
      <div class="rmp-module-overlay">
        <div class="rmp-overlay-wrapper">
          <div class="rmp-overlay-title">
            <span class="rmp-overlay-title-text">Share</span>
          </div>
          <div class="rmp-overlay-levels-area">
            <div class="rmp-sharing-social">
              <span
                class="rmp-i rmp-i-facebook rmp-sharing-social-icons"
                tabindex="0"
                role="button"
                aria-label="Facebook"
              ></span
              ><span
                class="rmp-i rmp-i-twitter rmp-sharing-social-icons"
                tabindex="0"
                role="button"
                aria-label="Twitter"
              ></span
              ><span
                class="rmp-i rmp-i-email rmp-sharing-social-icons"
                tabindex="0"
                role="button"
                aria-label="Email"
              ></span>
            </div>
            <div class="rmp-sharing-link">
              <span class="rmp-i rmp-i-link"></span
              ><label for="rmp-sharing-link-rmpPlayer">Link to media</label
              ><input
                class="rmp-sharing-input"
                aria-label="Link to video"
                id="rmp-sharing-link-rmpPlayer"
                type="text"
                value="https://www.hidive.com/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000#209_SVGID_3_"
              />
            </div>
          </div>
        </div>
        <span
          class="rmp-i rmp-module-overlay-icons rmp-module-overlay-play-pause"
          tabindex="0"
          role="button"
          aria-label="Play"
          ><div class="rmp-in-module-hint rmp-color-bg">Play</div></span
        ><span
          class="rmp-i rmp-i-close rmp-module-overlay-icons rmp-module-overlay-close"
          tabindex="0"
          role="button"
          aria-label="Close"
          ><div class="rmp-in-module-hint rmp-color-bg">Close</div></span
        >
      </div>
      <div class="rmp-module-overlay">
        <div class="rmp-overlay-wrapper">
          <div class="rmp-overlay-title">
            <span class="rmp-overlay-title-text">Captions</span>
          </div>
          <div class="rmp-overlay-levels-area">
            <div
              class="captions-off rmp-overlay-level rmp-color-bg"
              lang="off"
              tabindex="0"
              role="button"
              aria-label="Off"
            >
              Off
            </div>
            <div
              class="captions-en rmp-overlay-level rmp-color-bg rmp-overlay-level-active"
              lang="en"
              tabindex="0"
              role="button"
              aria-label="English Subs"
            >
              English Subs
            </div>
          </div>
        </div>
        <span
          class="rmp-i rmp-module-overlay-icons rmp-module-overlay-play-pause"
          tabindex="0"
          role="button"
          aria-label="Play"
          ><div class="rmp-in-module-hint rmp-color-bg">Play</div></span
        ><span
          class="rmp-i rmp-i-close rmp-module-overlay-icons rmp-module-overlay-close"
          tabindex="0"
          role="button"
          aria-label="Close"
          ><div class="rmp-in-module-hint rmp-color-bg">Close</div></span
        >
      </div>
      <div
        class="rmp-quality rmp-module rmp-color-bg"
        tabindex="0"
        role="button"
        aria-label="Quality"
        style="display: block"
      >
        <div class="rmp-module-button">
          <span class="rmp-i rmp-i-quality"></span>
        </div>
        <div
          class="rmp-hint rmp-color-bg"
          style="margin-left: -29.5px; left: 50%; right: auto"
        >
          Quality
        </div>
      </div>
      <div class="rmp-module-overlay">
        <div class="rmp-overlay-wrapper">
          <div class="rmp-overlay-title">
            <span class="rmp-overlay-title-text">Quality</span>
          </div>
          <div class="rmp-overlay-levels-area">
            <div
              class="rmp-overlay-level rmp-color-bg rmp-overlay-level-active rmp-q0"
              tabindex="0"
              role="button"
              aria-label="Auto"
            >
              Auto
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg rmp-q1"
              tabindex="0"
              role="button"
              aria-label="Quality 1"
            >
              360p (1644 kbps)
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg rmp-q2"
              tabindex="0"
              role="button"
              aria-label="Quality 2"
            >
              480p (2492 kbps)
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg rmp-q3 rmp-abr-active"
              tabindex="0"
              role="button"
              aria-label="Quality 3"
            >
              720p (5426 kbps)
            </div>
            <div
              class="rmp-overlay-level rmp-color-bg rmp-q4"
              tabindex="0"
              role="button"
              aria-label="Quality 4"
            >
              1080p (8907 kbps)
            </div>
          </div>
        </div>
        <span
          class="rmp-i rmp-module-overlay-icons rmp-module-overlay-play-pause"
          tabindex="0"
          role="button"
          aria-label="Play"
          ><div class="rmp-in-module-hint rmp-color-bg">Play</div></span
        ><span
          class="rmp-i rmp-i-close rmp-module-overlay-icons rmp-module-overlay-close"
          tabindex="0"
          role="button"
          aria-label="Close"
          ><div class="rmp-in-module-hint rmp-color-bg">Close</div></span
        >
      </div>
    </div>
    <div class="bottom-gutter-15">
      <div class="col-xs-1 col-sm-2 top-gutter-5">
        <button
          type="button"
          id="chat-now-enable"
          class="btn btn-warning btn-sm"
          style="pointer-events: all"
          onclick="joinCommunityNow();"
        >
          <i class="fa fa-comments-o"></i>
          <span class="hideText visible-lg-inline">Enable Chat!</span>
        </button>
      </div>
      <div class="col-xs-10 col-sm-8 top-gutter-5 text-center">
        <button
          class="btn btn-default btn-sm hidden-xs"
          style="position: relative; z-index: 2"
          type="button"
          id="lights"
          aria-haspopup="true"
          aria-expanded="true"
          title="Toggle Lights"
          data-placement="bottom"
        >
          <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
          <span class="text hideText visible-lg-inline">Lights Out</span>
        </button>
        <span class="hidden-xs">|</span>

        <div
          class="btn-group dropup"
          style="position: relative; z-index: 2"
          title="Versions"
          id="versions-menu"
          data-placement="bottom"
        >
          <button
            class="btn btn-default btn-sm dropdown-toggle"
            type="button"
            id="dropdownLanguageVersions"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <i class="fa fa-commenting" aria-hidden="true"></i>
            Languages
          </button>

          <ul
            class="dropdown-menu"
            aria-labelledby="dropdownLanguageVersions"
            style="position: absolute; left: -90%"
          >
            <li class="dropdown-header">Versions</li>
            <li id="3-44174-44174">
              <a
                href="javascript:void(0)"
                data-label="ja  w/ en Subs, BR, TV-MA (D,V)"
                data-video="WPG_s04e000_tv_br_ja_xx_or"
                data-captions="en"
                id="tv_br_ja_en"
                data-is-playable="true"
                data-not-playable-msg="None"
              >
                <i class="fa fa-square fa-check-square" aria-hidden="true"></i>
                Japanese w/ English Subs, Broadcast,
                <small>TV-MA</small>
              </a>
            </li>
            <li id="3-44174-44174">
              <a
                href="javascript:void(0)"
                data-label="ja  w/ pt Subs, BR, TV-MA (D,V)"
                data-video="WPG_s04e000_tv_br_ja_xx_or"
                data-captions="pt"
                id="tv_br_ja_pt"
                data-is-playable="true"
                data-not-playable-msg="None"
              >
                <i class="fa fa-square" aria-hidden="true"></i>
                Japanese w/ Portuguese Subs, Broadcast,
                <small>TV-MA</small>
              </a>
            </li>
            <li id="3-44174-44174">
              <a
                href="javascript:void(0)"
                data-label="ja  w/ sp Subs, BR, TV-MA (D,V)"
                data-video="WPG_s04e000_tv_br_ja_xx_or"
                data-captions="sp"
                id="tv_br_ja_sp"
                data-is-playable="true"
                data-not-playable-msg="None"
              >
                <i class="fa fa-square" aria-hidden="true"></i>
                Japanese w/ Spanish LatAm Subs, Broadcast,
                <small>TV-MA</small>
              </a>
            </li>
            <li id="2-44174-44478">
              <a
                href="javascript:void(0)"
                data-label="en Dub, BR, TV-MA (D,V)"
                data-video="WPG_s04e000_tv_br_en_xx_or"
                data-captions="xx"
                id="tv_br_en_xx"
                data-is-playable="true"
                data-not-playable-msg="None"
              >
                <i class="fa fa-square" aria-hidden="true"></i>
                English Dub, Broadcast, <small>TV-MA</small>
              </a>
            </li>
            <li id="3-44174-44478">
              <a
                href="javascript:void(0)"
                data-label="en Dub w/ en Caps, BR, TV-MA (D,V)"
                data-video="WPG_s04e000_tv_br_en_xx_or"
                data-captions="en"
                id="tv_br_en_en"
                data-is-playable="true"
                data-not-playable-msg="None"
              >
                <i class="fa fa-square" aria-hidden="true"></i>
                English Dub w/ English Caps, Broadcast,
                <small>TV-MA</small>
              </a>
            </li>
          </ul>
        </div>
        <span class="hidden-xs">|</span>
        <div
          class="btn-group dropup"
          title="Font Color"
          id="font-color-menu"
          data-placement="bottom"
        >
          <button
            class="btn btn-default btn-sm dropdown-toggle"
            type="button"
            id="dropdownFont"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <i
              class="fa fa-square"
              style="color: rgb(255, 255, 255)"
              aria-hidden="true"
            ></i>
            <span class="caret"></span>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownFont"
          >
            <li class="dropdown-header">Font Color</li>
            <li>
              <a href="javascript:void(0)" data-val="yellow"
                ><i
                  class="fa fa-square"
                  style="color: yellow"
                  aria-hidden="true"
                ></i>
                Yellow | White</a
              >
            </li>
            <li>
              <a href="javascript:void(0)" data-val="white"
                ><i
                  class="fa fa-check-square"
                  style="color: white"
                  aria-hidden="true"
                ></i>
                White | Yellow</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="hidden-xs col-sm-2 top-gutter-5 text-right">
        <button id="streamHelp" class="btn btn-default btn-sm">
          <i class="fa fa-bug" aria-hidden="true"></i>
          <span class="hideText visible-lg-inline">Report</span>
        </button>
      </div>
    </div>
  </div>
  <div class="bottom-gutter-15">
    <h1>
      <a
        id="TitleDetails"
        href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
        >Is It Wrong to Try to Pick Up Girls in a Dungeon? IV</a
      >
    </h1>
    <div id="StarRating">
      <span
        class="stars title-1115"
        data-json='{"titleID": 1115, "overall": 0, "isUser": true, "userRating": 0, "hash": "06af378019e55d2e1855e64bcc71880bbc8dcad0"}'
      >
        <span
          class="star-rating star-rating-init"
          data-title="1115"
          style="vertical-align: middle; display: inline-block"
          ><div class="jq-star" style="width: 22px; height: 22px">
            <svg
              version="1.0"
              class="jq-star-svg"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="305px"
              height="305px"
              viewBox="60 -62 309 309"
              style="enable-background: new 64 -59 305 305; stroke-width: 4px"
              xml:space="preserve"
            >
              <style type="text/css">
                .svg-empty-385 {
                  fill: url(#385_SVGID_1_);
                }
                .svg-hovered-385 {
                  fill: url(#385_SVGID_2_);
                }
                .svg-active-385 {
                  fill: url(#385_SVGID_3_);
                }
              </style>
              <linearGradient
                id="385_SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: lightgray"></stop>
                <stop offset="1" style="stop-color: lightgray"></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop
                  offset="0"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
                <stop
                  offset="1"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: rgb(0, 174, 240)"></stop>
                <stop offset="1" style="stop-color: rgb(0, 75, 103)"></stop>
              </linearGradient>
              <polygon
                data-side="center"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                style="fill: transparent; stroke: black"
              ></polygon>
              <polygon
                data-side="left"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                style="stroke-opacity: 0"
              ></polygon>
              <polygon
                data-side="right"
                class="svg-empty-385"
                points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                style="stroke-opacity: 0"
              ></polygon>
            </svg>
          </div>
          <div class="jq-star" style="width: 22px; height: 22px">
            <svg
              version="1.0"
              class="jq-star-svg"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="305px"
              height="305px"
              viewBox="60 -62 309 309"
              style="enable-background: new 64 -59 305 305; stroke-width: 4px"
              xml:space="preserve"
            >
              <style type="text/css">
                .svg-empty-385 {
                  fill: url(#385_SVGID_1_);
                }
                .svg-hovered-385 {
                  fill: url(#385_SVGID_2_);
                }
                .svg-active-385 {
                  fill: url(#385_SVGID_3_);
                }
              </style>
              <linearGradient
                id="385_SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: lightgray"></stop>
                <stop offset="1" style="stop-color: lightgray"></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop
                  offset="0"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
                <stop
                  offset="1"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: rgb(0, 174, 240)"></stop>
                <stop offset="1" style="stop-color: rgb(0, 75, 103)"></stop>
              </linearGradient>
              <polygon
                data-side="center"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                style="fill: transparent; stroke: black"
              ></polygon>
              <polygon
                data-side="left"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                style="stroke-opacity: 0"
              ></polygon>
              <polygon
                data-side="right"
                class="svg-empty-385"
                points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                style="stroke-opacity: 0"
              ></polygon>
            </svg>
          </div>
          <div class="jq-star" style="width: 22px; height: 22px">
            <svg
              version="1.0"
              class="jq-star-svg"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="305px"
              height="305px"
              viewBox="60 -62 309 309"
              style="enable-background: new 64 -59 305 305; stroke-width: 4px"
              xml:space="preserve"
            >
              <style type="text/css">
                .svg-empty-385 {
                  fill: url(#385_SVGID_1_);
                }
                .svg-hovered-385 {
                  fill: url(#385_SVGID_2_);
                }
                .svg-active-385 {
                  fill: url(#385_SVGID_3_);
                }
              </style>
              <linearGradient
                id="385_SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: lightgray"></stop>
                <stop offset="1" style="stop-color: lightgray"></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop
                  offset="0"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
                <stop
                  offset="1"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: rgb(0, 174, 240)"></stop>
                <stop offset="1" style="stop-color: rgb(0, 75, 103)"></stop>
              </linearGradient>
              <polygon
                data-side="center"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                style="fill: transparent; stroke: black"
              ></polygon>
              <polygon
                data-side="left"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                style="stroke-opacity: 0"
              ></polygon>
              <polygon
                data-side="right"
                class="svg-empty-385"
                points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                style="stroke-opacity: 0"
              ></polygon>
            </svg>
          </div>
          <div class="jq-star" style="width: 22px; height: 22px">
            <svg
              version="1.0"
              class="jq-star-svg"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="305px"
              height="305px"
              viewBox="60 -62 309 309"
              style="enable-background: new 64 -59 305 305; stroke-width: 4px"
              xml:space="preserve"
            >
              <style type="text/css">
                .svg-empty-385 {
                  fill: url(#385_SVGID_1_);
                }
                .svg-hovered-385 {
                  fill: url(#385_SVGID_2_);
                }
                .svg-active-385 {
                  fill: url(#385_SVGID_3_);
                }
              </style>
              <linearGradient
                id="385_SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: lightgray"></stop>
                <stop offset="1" style="stop-color: lightgray"></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop
                  offset="0"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
                <stop
                  offset="1"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: rgb(0, 174, 240)"></stop>
                <stop offset="1" style="stop-color: rgb(0, 75, 103)"></stop>
              </linearGradient>
              <polygon
                data-side="center"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                style="fill: transparent; stroke: black"
              ></polygon>
              <polygon
                data-side="left"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                style="stroke-opacity: 0"
              ></polygon>
              <polygon
                data-side="right"
                class="svg-empty-385"
                points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                style="stroke-opacity: 0"
              ></polygon>
            </svg>
          </div>
          <div class="jq-star" style="width: 22px; height: 22px">
            <svg
              version="1.0"
              class="jq-star-svg"
              shape-rendering="geometricPrecision"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="305px"
              height="305px"
              viewBox="60 -62 309 309"
              style="enable-background: new 64 -59 305 305; stroke-width: 4px"
              xml:space="preserve"
            >
              <style type="text/css">
                .svg-empty-385 {
                  fill: url(#385_SVGID_1_);
                }
                .svg-hovered-385 {
                  fill: url(#385_SVGID_2_);
                }
                .svg-active-385 {
                  fill: url(#385_SVGID_3_);
                }
              </style>
              <linearGradient
                id="385_SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: lightgray"></stop>
                <stop offset="1" style="stop-color: lightgray"></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop
                  offset="0"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
                <stop
                  offset="1"
                  style="stop-color: rgba(0, 174, 240, 1)"
                ></stop>
              </linearGradient>
              <linearGradient
                id="385_SVGID_3_"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="-50"
                x2="0"
                y2="250"
              >
                <stop offset="0" style="stop-color: rgb(0, 174, 240)"></stop>
                <stop offset="1" style="stop-color: rgb(0, 75, 103)"></stop>
              </linearGradient>
              <polygon
                data-side="center"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                style="fill: transparent; stroke: black"
              ></polygon>
              <polygon
                data-side="left"
                class="svg-empty-385"
                points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                style="stroke-opacity: 0"
              ></polygon>
              <polygon
                data-side="right"
                class="svg-empty-385"
                points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                style="stroke-opacity: 0"
              ></polygon>
            </svg></div
        ></span>
        <span
          class="yourRating"
          style="
            vertical-align: middle;
            display: inline-block;
            text-align: center;
            font-size: 12px;
          "
        >
          <span style=""
            ><span style="" class="overallRating">0.00</span> Overall</span
          >
          |
          <span id="youRated" style="font-size: 12px"
            ><span class="hidden-xs">You </span>(<span class="myRating">-</span
            >)</span
          >
          &nbsp;<a
            href="javascript:void(0);"
            class="edit-rating"
            title=""
            data-toggle="tooltip"
            style="vertical-align: middle"
            data-original-title="Edit Your Rating"
            ><i
              class="fa fa-pencil-square"
              aria-hidden="true"
              style="font-size: 15px; margin-bottom: -2px"
            ></i></a
          >&nbsp;
          <span style="vertical-align: middle"
            >/10&nbsp;|&nbsp;<a
              href="https://myanimelist.net/anime/47164/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka_IV__Shin_Shou_-_Meikyuu-hen"
              target="_blank"
              >Score It<span class="visuallyhidden"
                >, opens in a new window</span
              ></a
            ></span
          >
        </span>
      </span>
    </div>
    <div id="ButtonGroup" class="tb-padding-15">
      <button
        type="button"
        onclick="updateQueue(this);"
        data-title-id="1115"
        data-hash="19aa9acefe1e244f31c6584252e473acf324a931"
        class="btn btn-queue btn-xs btn-primary queue1115"
        data-queue-value="False"
      >
        <span class="btn-text"> Add to Queue </span>
      </button>

      <button
        type="button"
        onclick="updateFavorite(this);"
        data-title-id="1115"
        data-hash="975d2027e4ee6c422709e7727f7f069cd38a3278"
        class="btn btn-favorite btn-xs btn-primary favorite1115"
        data-favorite-value="False"
      >
        <span class="btn-text"> Add Favorite </span>
      </button>
    </div>
    <hr class="style1" />
    <div id="StreamTitleDescription">
      <h2>Season 4 Episode 0 | TV-MA | Premiere: 7/8/2022</h2>
      <h2>Play Back | Reminisce</h2>

      <p>
        What’s past is prologue. Bell has come a long way and he and Hestia
        reflect upon the events that forged him into the adventurer he is today.
      </p>
    </div>
    <ul class="list-inline" data-tour-point="2" style="display: inline-block">
      <li>
        <a
          href="http://www.facebook.com/sharer/sharer.php?u=https://www.hidive.com/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000&amp;title=Is It Wrong to Try to Pick Up Girls in a Dungeon? IV"
          target="_blank"
          class="btn btn-link"
        >
          <span class="fa-stack">
            <i class="fa fa-square-o fa-stack-2x"></i>
            <i class="fa fa-facebook fa-stack-1x"></i>
          </span>
          <span class="hidden-xs">Share on </span>Facebook<span
            class="visuallyhidden"
            >, opens in a new window</span
          >
        </a>
      </li>
      <li>
        <a
          href="http://twitter.com/intent/tweet?status=Is It Wrong to Try to Pick Up Girls in a Dungeon? IV+https://www.hidive.com/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000"
          target="_blank"
          class="btn btn-link"
        >
          <span class="fa-stack">
            <i class="fa fa-square-o fa-stack-2x"></i>
            <i class="fa fa-twitter fa-stack-1x"></i>
          </span>
          <span class="hidden-xs">Share on </span>Twitter<span
            class="visuallyhidden"
            >, opens in a new window</span
          >
        </a>
      </li>
    </ul>
  </div>
  <ul class="nav nav-tabs top-gutter-15">
    <li class="seasonTab" data-name="Season 1">
      <a href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon" class=""
        >Season 1</a
      >
    </li>
    <li class="seasonTab" data-name="Season 1 OVA">
      <a href="/movies/is-it-wrong-to-expect-a-hot-spring-in-a-dungeon" class=""
        >Season 1 OVA</a
      >
    </li>
    <li class="seasonTab" data-name="Season 2">
      <a href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-ii" class=""
        >Season 2</a
      >
    </li>
    <li class="seasonTab" data-name="Season II OVA">
      <a
        href="/movies/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-ii-ova"
        class=""
        >Season II OVA</a
      >
    </li>
    <li class="seasonTab" data-name="Season 3">
      <a
        href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iii"
        class=""
        >Season 3</a
      >
    </li>
    <li class="seasonTab" data-name="Season III OVA">
      <a
        href="/movies/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iii-ova"
        class=""
        >Season III OVA</a
      >
    </li>
    <li class="active seasonTab" data-name="Season 4">
      <a
        href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
        class="active"
        >Season 4</a
      >
    </li>
    <li class="seasonTab" data-name="Movie">
      <a
        href="/movies/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-arrow-of-the-orion"
        class=""
        >Movie</a
      >
    </li>
  </ul>
  <div
    id="playPageEpisodes"
    class="row scroll-area bottom-gutter-15 section"
    style="margin-left: -15px; margin-right: -15px"
  >
    <div id="EpisodeSlider" class="col-md-12 tb-padding-15">
      <div class="episodes">
        <h1>
          <a href="/tv/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
            >Is It Wrong to Try to Pick Up Girls in a Dungeon? IV</a
          >
        </h1>
        <h2 data-tour-point="0">Season 4 | 23 Episodes</h2>

        <div class="window-slider slick-wrapper">
          <div
            class="episode-slider animated fadeIn slick-initialized slick-slider"
          >
            <button
              type="button"
              data-role="none"
              class="slick-prev slick-arrow slick-disabled"
              aria-label="Previous"
              role="button"
              aria-disabled="true"
              style=""
            >
              Previous
            </button>

            <div aria-live="polite" class="slick-list">
              <div
                class="slick-track"
                style="
                  opacity: 1;
                  width: 3565px;
                  transform: translate3d(0px, 0px, 0px);
                "
              >
                <div
                  class="cell slick-slide slick-current slick-active"
                  data-section="episodes"
                  data-id="116540"
                  id="episodes-116540"
                  data-slick-index="0"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox currentEpisode" id="ekeys04e000">
                      <div
                        class="watched"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Watched"
                      >
                        <strong><small>0 %</small></strong>
                      </div>
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e000"
                          data-key="s04e000"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="427753FC"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_000_256x144.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 0"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_000_512x288.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Play Back | Reminisce"
                    >
                      E0 | Play Back | Reminisce
                    </h2>
                    <p style="">
                      What’s past is prologue. Bell has come a long way and he
                      and Hestia reflect upon the events that forged him into
                      the adventurer he is today.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide slick-active"
                  data-section="episodes"
                  data-id="116541"
                  id="episodes-116541"
                  data-slick-index="1"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e001">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e001"
                          data-key="s04e001"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="427753FD"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_001_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 1"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_001_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Prelude | Night Before Departure"
                    >
                      E1 | Prelude | Night Before Departure
                    </h2>
                    <p style="">
                      Gather your party and venture forth, Bell. The dungeon
                      awaits.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide slick-active"
                  data-section="episodes"
                  data-id="116542"
                  id="episodes-116542"
                  data-slick-index="2"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e002">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e002"
                          data-key="s04e002"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="427753FE"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_002_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 2"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_002_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="The Great Falls | The Great Falls"
                    >
                      E2 | The Great Falls | The Great Falls
                    </h2>
                    <p style="">
                      Bell and his party are making good time and will soon
                      enter the lower floors. But the dungeon crawl is going too
                      smoothly, and Cassandra cannot shake her earlier
                      premonition.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide slick-active"
                  data-section="episodes"
                  data-id="116543"
                  id="episodes-116543"
                  data-slick-index="3"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e003">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e003"
                          data-key="s04e003"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="427753FF"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_003_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 3"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_003_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Parasite | Viscum Album"
                    >
                      E3 | Parasite | Viscum Album
                    </h2>
                    <p style="">
                      The party has two options: either retreat to the surface
                      with the injured or hunt the monster and hope its defeat
                      will dispel the ailment. Both choices carry dire risks.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide slick-active"
                  data-section="episodes"
                  data-id="116544"
                  id="episodes-116544"
                  data-slick-index="4"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e004">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e004"
                          data-key="s04e004"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775400"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_004_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 4"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_004_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Mermaid | The Girl of Water City"
                    >
                      E4 | Mermaid | The Girl of Water City
                    </h2>
                    <p style="">
                      The party learns too late that the Moss Huge can use other
                      monsters against them. Meanwhile, Bell is alone, but not
                      without allies; the Xenos have not forgotten his kindness.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116545"
                  id="episodes-116545"
                  data-slick-index="5"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e005">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e005"
                          data-key="s04e005"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775401"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_005_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 5"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_005_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Argo Vesta | Heroic Slash of Holy Flame"
                    >
                      E5 | Argo Vesta | Heroic Slash of Holy Flame
                    </h2>
                    <p style="">
                      Haruhime’s new ability turns the tide of battle, but the
                      Moss Huge has proven that it knows what it’s doing. As the
                      party strategist, Lili has a hard choice to make.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116546"
                  id="episodes-116546"
                  data-slick-index="6"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e006">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e006"
                          data-key="s04e006"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775402"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_006_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 6"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_006_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Rabbit's Foot | Rabbit's Foot"
                    >
                      E6 | Rabbit's Foot | Rabbit's Foot
                    </h2>
                    <p style="">
                      Bell’s exploits have earned him fame and a new alias, and
                      Lili worries that means change is coming. Meanwhile, Ryu
                      left a note for her coworkers and vanished soon
                      afterwards.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116547"
                  id="episodes-116547"
                  data-slick-index="7"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e007">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e007"
                          data-key="s04e007"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775403"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_007_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 7"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_007_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Cassandra Ilion | Dream Seer"
                    >
                      E7 | Cassandra Ilion | Dream Seer
                    </h2>
                    <p style="">
                      Ryu, the Gale Wind, stands accused of murder. Bell and his
                      party need answers, but only Cassandra knows that tragedy
                      will befall them if they pursue their friend.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116548"
                  id="episodes-116548"
                  data-slick-index="8"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e008">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e008"
                          data-key="s04e008"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775404"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_008_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 8"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_008_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Mirabilis | Chaos"
                    >
                      E8 | Mirabilis | Chaos
                    </h2>
                    <p style="">
                      Ryu couldn’t be the killer… right? Bell wants to help his
                      friend, but as the body count grows higher, he must ask
                      himself how well he truly knows her.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116549"
                  id="episodes-116549"
                  data-slick-index="9"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e009">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e009"
                          data-key="s04e009"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775405"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_009_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 9"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_009_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Lambton | Ill Omen"
                    >
                      E9 | Lambton | Ill Omen
                    </h2>
                    <p style="">
                      While Bell and Ryu contend with Jura and his insidious
                      abilities, the rest of Bell’s allies uncover a barrel of
                      bad apples in the dungeon’s dark depths.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116550"
                  id="episodes-116550"
                  data-slick-index="10"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e010">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e010"
                          data-key="s04e010"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775406"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_010_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 10"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_010_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Juggernaut | The Destroyer"
                    >
                      E10 | Juggernaut | The Destroyer
                    </h2>
                    <p style="">
                      Some monsters you must fight and from others you must
                      flee. But beware the Juggernaut lest you simply cease to
                      be.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="116551"
                  id="episodes-116551"
                  data-slick-index="11"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e011">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e011"
                          data-key="s04e011"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775407"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_011_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 11"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_011_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Endless | Brutal"
                    >
                      E11 | Endless | Brutal
                    </h2>
                    <p style="">
                      The Juggernaut slaughters its way through a dwindling
                      number of survivors, forcing Ryu to face her demons.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117402"
                  id="episodes-117402"
                  data-slick-index="12"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e012">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e012"
                          data-key="s04e012"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575A"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_012_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 12"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_012_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Amphisbaena | A Song of Despair"
                    >
                      E12 | Amphisbaena | A Song of Despair
                    </h2>
                    <p style="">
                      With retreat an impossibility, Bell’s party fight for
                      their lives when a Floor Boss spawns early. However, they
                      are all adventurers; they will not die so easily.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117403"
                  id="episodes-117403"
                  data-slick-index="13"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e013">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e013"
                          data-key="s04e013"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575B"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_013_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 13"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_013_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Morgue | Victim"
                    >
                      E13 | Morgue | Victim
                    </h2>
                    <p style="">
                      Critically wounded and trapped within the dungeon’s
                      darkened depths, Bell and Ryu’s adventure is over. Their
                      fight for survival has now begun.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117404"
                  id="episodes-117404"
                  data-slick-index="14"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e014">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e014"
                          data-key="s04e014"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575C"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_014_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 14"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_014_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Daphne Lauros | Friend"
                    >
                      E14 | Daphne Lauros | Friend
                    </h2>
                    <p style="">
                      The boss fight extracts a heavy toll on the party, and
                      they must make a choice. If they go one way, they will
                      live. But if they go the other? They will die.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117405"
                  id="episodes-117405"
                  data-slick-index="15"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e015">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e015"
                          data-key="s04e015"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575D"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_015_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 15"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_015_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Ignis | Flame"
                    >
                      E15 | Ignis | Flame
                    </h2>
                    <p style="">
                      The party narrowly survived, and now they must search for
                      their missing friends. However, they’re facing more than
                      just monsters; they’re fighting the Dungeon itself.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117406"
                  id="episodes-117406"
                  data-slick-index="16"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e016">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e016"
                          data-key="s04e016"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575E"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_016_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 16"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_016_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Welf Crozzo | Shikou"
                    >
                      E16 | Welf Crozzo | Shikou
                    </h2>
                    <p style="">
                      Bell and Ryu must cast reservations aside in the face of
                      death. Meanwhile, Welf faces a trial by fire he cannot
                      fail; lives are at stake.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117407"
                  id="episodes-117407"
                  data-slick-index="17"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e017">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e017"
                          data-key="s04e017"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="4277575F"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_017_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 17"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_017_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="White Palace | White Labyrinth"
                    >
                      E17 | White Palace | White Labyrinth
                    </h2>
                    <p style="">
                      Bell and Ryu’s relationship deepens as the trauma of the
                      Deep Floors pushes them past their limits. They have each
                      other, and that is the only reason they’re both still
                      alive.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117408"
                  id="episodes-117408"
                  data-slick-index="18"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e018">
                      <div class="player subscriber">
                        <a
                          href="javascript:void(0);"
                          class="glyphicon glyphicon-play-circle episode-play"
                          style="font-size: 3.5em; line-height: 1em"
                          data-playurl="/stream/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv/s04e018"
                          data-key="s04e018"
                          data-videotitle="is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv"
                          data-format="tv"
                          data-version="br"
                          data-play="true"
                          data-chatkey="42775760"
                          ><span class="visuallyhidden"
                            >Play
                            is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-iv</span
                          ></a
                        >
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/titles/WPG/256x144/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_018_256x144_00.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 18"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/titles/WPG/512x288/is-it-wrong-to-try-to-pick-up-girls-in-a-dungeon-4-WPG_04_018_512x288_00.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Desperate | Dungeon Do-or-Die Time"
                    >
                      E18 | Desperate | Dungeon Do-or-Die Time
                    </h2>
                    <p style="">
                      Hope glimmers in the darkness; the Xenos appear in the
                      party’s hour of need, and Bell and Ryu make steady
                      progress despite all odds. They may all survive this after
                      all.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117409"
                  id="episodes-117409"
                  data-slick-index="19"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e019">
                      <div class="na audio-ja subtitle-en">
                        English Simulcast <br />
                        Thu, Feb 23, ’23 9:00 AM
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/misc/HIDIVE_ComingSoon_256x144.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 19"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/misc/HIDIVE_ComingSoon_512x288.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Coming Soon"
                    >
                      E19 | Coming Soon
                    </h2>
                    <p style="">
                      This episode is not available yet. Please check our
                      schedule for details.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117410"
                  id="episodes-117410"
                  data-slick-index="20"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e020">
                      <div class="na audio-ja subtitle-en">
                        English Simulcast <br />
                        Thu, Mar 2, ’23 9:00 AM
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/misc/HIDIVE_ComingSoon_256x144.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 20"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/misc/HIDIVE_ComingSoon_512x288.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Coming Soon"
                    >
                      E20 | Coming Soon
                    </h2>
                    <p style="">
                      This episode is not available yet. Please check our
                      schedule for details.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117411"
                  id="episodes-117411"
                  data-slick-index="21"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e021">
                      <div class="na audio-ja subtitle-en">
                        English Simulcast <br />
                        Thu, Mar 9, ’23 9:00 AM
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/misc/HIDIVE_ComingSoon_256x144.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 21"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/misc/HIDIVE_ComingSoon_512x288.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Coming Soon"
                    >
                      E21 | Coming Soon
                    </h2>
                    <p style="">
                      This episode is not available yet. Please check our
                      schedule for details.
                    </p>
                  </div>
                </div>
                <div
                  class="cell slick-slide"
                  data-section="episodes"
                  data-id="117412"
                  id="episodes-117412"
                  data-slick-index="22"
                  style="width: 145px"
                >
                  <div style="position: relative">
                    <div class="hitbox" id="ekeys04e022">
                      <div class="na audio-ja subtitle-en">
                        English Simulcast <br />
                        Thu, Mar 16, ’23 9:00 AM
                      </div>
                    </div>
                    <div class="default-img">
                      <img
                        src="//static.hidive.com/misc/HIDIVE_ComingSoon_256x144.jpg"
                        alt="Screenshot for Is It Wrong to Try to Pick Up Girls in a Dungeon? IV Season 4 Episode 22"
                        width="256"
                        height="144"
                        class="img-responsive"
                        onerror="ResizeImage('//static.hidive.com/misc/HIDIVE_ComingSoon_512x288.jpg','512x288', '256x144', 'screenshot', this)"
                      />
                    </div>
                  </div>
                  <div class="synopsis">
                    <h2
                      class="h3"
                      title=""
                      data-toggle="tooltip"
                      data-original-title="Coming Soon"
                    >
                      E22 | Coming Soon
                    </h2>
                    <p style="">
                      This episode is not available yet. Please check our
                      schedule for details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-role="none"
              class="slick-next slick-arrow"
              aria-label="Next"
              role="button"
              style=""
              aria-disabled="false"
            >
              Next
            </button>
            <ul class="slick-dots" style="">
              <li class="slick-active">
                <button type="button" tabindex="0">1</button>
              </li>
              <li><button type="button" tabindex="0">2</button></li>
              <li><button type="button" tabindex="0">3</button></li>
              <li><button type="button" tabindex="0">4</button></li>
              <li><button type="button" tabindex="0">5</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
`;

export default mockPage;
