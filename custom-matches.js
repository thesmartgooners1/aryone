// User အားလုံးမြင်စေချင်သော permanent football matches ကို ဒီ array ထဲထည့်ပြီး GitHub သို့ upload လုပ်ပါ။
window.ARYONE_FOOTBALL_MATCHES=[
  {
    id:'demo-football',
    league:'Friendly',
    home:'Ararat Armenia',
    away:'Celje',
    homeLogo:'https://images.fotmob.com/image_resources/logo/teamlogo/866109.png',
    awayLogo:'https://images.fotmob.com/image_resources/logo/teamlogo/4622.png',
    kickoff:'2026-08-05T20:00:00+06:30',
    status:'upcoming',
    // Link တစ်ခုထက်ပိုထည့်နိုင်သည်။ ပထမဆုံး link ကို အလိုအလျောက်ဖွင့်မည်။
    streams:[
      {label:'FHD',url:'https://hls.lauthaitv.cc/live/ararat-cellje-c1qual/index.m3u8'},
      {label:'HD',url:'https://live05.meung.app/live/08552895.m3u8'},
      {label:'HD-2',url:'https://live05.meung.app/live/08552895.m3u8'}
    ]
        },
      
  {
    id: "match-01",
    league: "Friendly",
    home: "Ararat Armenia",
    away: "Celje",
    homeLogo: "HOME_LOGO_URL",
    awayLogo: "AWAY_LOGO_URL",
    kickoff: "2026-08-05T20:00:00+06:30",
    status: "upcoming",
    streams: [
      { label: "FHD", url: "FHD_STREAM_URL" },
      { label: "HD", url: "HD_STREAM_URL" }
    ]
  },

  {
    id: "match-02",
    league: "Premier League",
    home: "Arsenal",
    away: "Chelsea",
    homeLogo: "ARSENAL_LOGO_URL",
    awayLogo: "CHELSEA_LOGO_URL",
    kickoff: "2026-08-06T19:30:00+06:30",
    status: "upcoming",
    streams: [
      { label: "HD", url: "HD_STREAM_URL" },
      { label: "Backup", url: "BACKUP_STREAM_URL" }
    ]
  },

  {
    id: "match-03",
    league: "La Liga",
    home: "Barcelona",
    away: "Real Madrid",
    homeLogo: "BARCELONA_LOGO_URL",
    awayLogo: "REAL_MADRID_LOGO_URL",
    kickoff: "2026-08-07T21:00:00+06:30",
    status: "live",
    streams: [
      { label: "FHD", url: "FHD_STREAM_URL" },
      { label: "HD", url: "HD_STREAM_URL" },
      { label: "SD", url: "SD_STREAM_URL" }
    ]
];
