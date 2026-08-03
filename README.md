# AR YONE Football — GitHub Pages

This version is 100% static. It uses HTML, CSS and JavaScript only, so no Python server is required.

## Publish

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `app.js` to the repository root.
3. Open **Settings → Pages**.
4. Set Source to **Deploy from a branch**, branch **main**, folder **/(root)**.
5. Save and wait for the GitHub Pages URL.

Match data refreshes every 30 seconds from `https://socnetv.com/api/live`, which currently permits requests from GitHub Pages.

Click a match card to open the player. When `livelink` is empty it plays `https://www.thesmartgooners.online/dancevideo.mp4`. If a URL appears during a later API refresh, the open player switches to it automatically. MP4 and HLS (`.m3u8`) are supported.

The Settings page stores auto-refresh, interval, autoplay, fallback URL, and accent-color preferences in the browser.

The Live TV page includes sample HLS channels, search, categories, fullscreen playback, and a custom-channel form. Edit `channels.js` for permanent channels or use the plus button to store channels in the current browser. Only publish streams you are authorized to distribute.

The Results page uses a free browser-compatible football scoreboard endpoint and includes date navigation plus All, Live, Finished, and Upcoming filters.

The News page loads the latest football headlines from a free browser-compatible news endpoint, with a breaking-news hero, search, category filters, refresh, and links to full articles.
