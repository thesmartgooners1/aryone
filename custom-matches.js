// User အားလုံးမြင်စေချင်သော permanent football matches ကို ဒီ array ထဲထည့်ပြီး GitHub သို့ upload လုပ်ပါ။
window.ARYONE_FOOTBALL_MATCHES=[
  {
    id:'demo-football',
    league:'AR YONE Friendly',
    home:'AR YONE Blue',
    away:'AR YONE Red',
    homeLogo:'',
    awayLogo:'',
    kickoff:'2026-08-05T20:00:00+06:30',
    status:'upcoming',
    // Link တစ်ခုထက်ပိုထည့်နိုင်သည်။ ပထမဆုံး link ကို အလိုအလျောက်ဖွင့်မည်။
    streams:[
      {label:'SD',url:'https://example.com/match-sd.m3u8'},
      {label:'HD',url:'https://example.com/match-hd.m3u8'},
      {label:'FHD',url:'https://example.com/match-fhd.m3u8'}
    ]
  }
];
