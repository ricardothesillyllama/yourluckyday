import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const STAR_SIGNS = [
  { zh: "白羊座", en: "Aries",        emoji: "♈", dates: "Mar 21–Apr 19" },
  { zh: "金牛座", en: "Taurus",       emoji: "♉", dates: "Apr 20–May 20" },
  { zh: "双子座", en: "Gemini",       emoji: "♊", dates: "May 21–Jun 20" },
  { zh: "巨蟹座", en: "Cancer",       emoji: "♋", dates: "Jun 21–Jul 22" },
  { zh: "狮子座", en: "Leo",          emoji: "♌", dates: "Jul 23–Aug 22" },
  { zh: "处女座", en: "Virgo",        emoji: "♍", dates: "Aug 23–Sep 22" },
  { zh: "天秤座", en: "Libra",        emoji: "♎", dates: "Sep 23–Oct 22" },
  { zh: "天蝎座", en: "Scorpio",      emoji: "♏", dates: "Oct 23–Nov 21" },
  { zh: "射手座", en: "Sagittarius",  emoji: "♐", dates: "Nov 22–Dec 21" },
  { zh: "摩羯座", en: "Capricorn",    emoji: "♑", dates: "Dec 22–Jan 19" },
  { zh: "水瓶座", en: "Aquarius",     emoji: "♒", dates: "Jan 20–Feb 18" },
  { zh: "双鱼座", en: "Pisces",       emoji: "♓", dates: "Feb 19–Mar 20" },
];

const CHINESE_ZODIAC = [
  { zh: "鼠", en: "Rat",     emoji: "🐭", years: "2008,1996,1984" },
  { zh: "牛", en: "Ox",      emoji: "🐮", years: "2009,1997,1985" },
  { zh: "虎", en: "Tiger",   emoji: "🐯", years: "2010,1998,1986" },
  { zh: "兔", en: "Rabbit",  emoji: "🐰", years: "2011,1999,1987" },
  { zh: "龙", en: "Dragon",  emoji: "🐲", years: "2012,2000,1988" },
  { zh: "蛇", en: "Snake",   emoji: "🐍", years: "2013,2001,1989" },
  { zh: "马", en: "Horse",   emoji: "🐴", years: "2014,2002,1990" },
  { zh: "羊", en: "Goat",    emoji: "🐑", years: "2015,2003,1991" },
  { zh: "猴", en: "Monkey",  emoji: "🐵", years: "2016,2004,1992" },
  { zh: "鸡", en: "Rooster", emoji: "🐓", years: "2017,2005,1993" },
  { zh: "狗", en: "Dog",     emoji: "🐶", years: "2018,2006,1994" },
  { zh: "猪", en: "Pig",     emoji: "🐷", years: "2019,2007,1995" },
];

const LOTTERY_GAMES = [
  { id: "mega",  flag: "🇺🇸", name: "Mega Millions",    main: { min: 1, max: 70, count: 5, color: "#2B4EAE" }, bonus: { min: 1, max: 25, count: 1, color: "#FFD700", label: "Mega Ball" } },
  { id: "power", flag: "🇺🇸", name: "Powerball",        main: { min: 1, max: 69, count: 5, color: "#C0392B" }, bonus: { min: 1, max: 26, count: 1, color: "#C0392B", label: "Powerball" } },
  { id: "p3",    flag: "🇺🇸", name: "Pick 3",           digits: 3 },
  { id: "p4",    flag: "🇺🇸", name: "Pick 4",           digits: 4 },
  { id: "euro",  flag: "🇪🇺", name: "EuroMillions",     main: { min: 1, max: 50, count: 5, color: "#2B4EAE" }, bonus: { min: 1, max: 12, count: 2, color: "#FFD700", label: "Lucky Stars" } },
  { id: "mark6", flag: "🇭🇰", name: "Mark Six 六合彩",  main: { min: 1, max: 49, count: 6, color: "#F97316" }, bonus: { min: 1, max: 49, count: 1, color: "#888", label: "Extra Ball" } },
  { id: "lu6",   flag: "🌍",  name: "Lucky 6 (Generic)",main: { min: 1, max: 49, count: 6, color: "#2D9B6F" } },
];

const LUCKY_COLORS = [
  { zh: "大红",   en: "Crimson Red",   hex: "#C0392B", mzh: "热情旺盛，财运大开", men: "Passion blazing, wealth incoming" },
  { zh: "金黄",   en: "Golden Yellow", hex: "#F4B942", mzh: "富贵吉祥，黄金满屋", men: "Prosperity & golden fortune" },
  { zh: "翡翠绿", en: "Jade Green",    hex: "#2D9B6F", mzh: "生机盎然，事业顺遂", men: "Vitality & career success" },
  { zh: "宝蓝",   en: "Sapphire Blue", hex: "#2B4EAE", mzh: "智慧清明，贵人相助", men: "Wisdom & helpful encounters" },
  { zh: "紫罗兰", en: "Violet",        hex: "#8B5CF6", mzh: "高贵典雅，人缘极佳", men: "Noble spirit, great connections" },
  { zh: "玫瑰金", en: "Rose Gold",     hex: "#C9747A", mzh: "浪漫甜蜜，桃花运旺", men: "Romance & love luck strong" },
  { zh: "橙橘",   en: "Tangerine",     hex: "#F97316", mzh: "活力四射，喜事连连", men: "Vibrant energy & joyful surprises" },
  { zh: "珍珠白", en: "Pearl White",   hex: "#D4C9B8", mzh: "纯洁祥瑞，万事顺心", men: "Purity, clarity & smooth sailing" },
];

const DIRECTIONS = [
  { zh: "正北", en: "North",     deg: 0   }, { zh: "东北", en: "Northeast", deg: 45  },
  { zh: "正东", en: "East",      deg: 90  }, { zh: "东南", en: "Southeast", deg: 135 },
  { zh: "正南", en: "South",     deg: 180 }, { zh: "西南", en: "Southwest", deg: 225 },
  { zh: "正西", en: "West",      deg: 270 }, { zh: "西北", en: "Northwest", deg: 315 },
];

const FORTUNES = [
  { zh: "今日宜大胆出击，机遇就在转角处等待。",   en: "Fortune favors the bold — take that first step today." },
  { zh: "静水流深，沉默中蕴藏巨大力量。",          en: "Still waters run deep. Your silence holds immense power." },
  { zh: "贵人从远方而来，保持微笑广结善缘。",      en: "A helpful stranger is closer than you think. Stay open." },
  { zh: "财不入急门，稳扎稳打方为上策。",          en: "Wealth rewards patience, not urgency. Play the long game." },
  { zh: "今日创意爆棚，大胆表达你的想法！",        en: "Your creativity peaks today — express yourself boldly!" },
  { zh: "旧缘有望重续，意外之喜悄然而至。",        en: "An old connection resurfaces. A pleasant surprise awaits." },
  { zh: "今日桃花运极旺，单身者注意！",            en: "Love luck is strong today. Keep your heart open!" },
  { zh: "厚积薄发，时机成熟自然水到渠成。",        en: "Your efforts are quietly compounding. Harvest time is near." },
];

const FORTUNE_CARDS = [
  { emoji: "🌟", en: "The stars shine on you! Wealth & joy are converging your way.",    zh: "今日星辰最耀眼！财富与喜悦同时向你涌来。",   rank_en: "JACKPOT LUCK",    rank_zh: "鸿运当头", score: 5, bg: "#4a0808", border: "#FFD700" },
  { emoji: "💰", en: "A golden opportunity is knocking — open the door boldly!",          zh: "黄金机遇正在敲门，大胆开门迎接！",            rank_en: "GREAT FORTUNE",   rank_zh: "大吉大利", score: 4, bg: "#0a2a14", border: "#2D9B6F" },
  { emoji: "❤️", en: "Love and warmth surround you. Someone special is thinking of you.", zh: "爱与温暖环绕你，有人正在思念着你。",          rank_en: "LOVE LUCK",       rank_zh: "桃花盛开", score: 4, bg: "#2a0a14", border: "#C9747A" },
  { emoji: "🚀", en: "Bold moves pay off today. Trust your instincts and take that leap.",zh: "今日勇者无畏！相信直觉，大胆行动。",          rank_en: "CAREER BOOST",    rank_zh: "事业腾飞", score: 3, bg: "#0a142a", border: "#2B4EAE" },
  { emoji: "🌙", en: "Rest & reflect today. Tomorrow's fortune will be far greater!",     zh: "今日宜静养思考，明日运势更旺！",              rank_en: "REST & RECHARGE", rank_zh: "蓄势待发", score: 2, bg: "#130a2a", border: "#8B5CF6" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const R = (s, i) => Math.abs(Math.sin(s * 9301 + i * 49297 + 233)) % 1;

function genLucky(si, zi) {
  const d = new Date(), base = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const s = base + (si ?? 99) * 137 + (zi ?? 77) * 31;
  return {
    num:      Math.floor(R(s, 1) * 99) + 1,
    color:    LUCKY_COLORS[Math.floor(R(s, 2) * LUCKY_COLORS.length)],
    dir:      DIRECTIONS[Math.floor(R(s, 3) * DIRECTIONS.length)],
    fortIdx:  Math.floor(R(s, 4) * FORTUNES.length),
  };
}

function genLotteryNums(game, seed) {
  if (game.digits) {
    return { main: Array.from({ length: game.digits }, (_, i) => Math.floor(R(seed, i + 10) * 10)) };
  }
  const used = new Set(), main = [];
  let i = 0;
  while (main.length < game.main.count) {
    const n = Math.floor(R(seed + i, i + 20) * (game.main.max - game.main.min + 1)) + game.main.min;
    if (!used.has(n)) { used.add(n); main.push(n); }
    i++;
  }
  main.sort((a, b) => a - b);
  const bonus = [];
  if (game.bonus) {
    const usedB = new Set(); let j = 0;
    while (bonus.length < game.bonus.count) {
      const n = Math.floor(R(seed + j, j + 50) * (game.bonus.max - game.bonus.min + 1)) + game.bonus.min;
      if (!usedB.has(n)) { usedB.add(n); bonus.push(n); }
      j++;
    }
  }
  return { main, bonus };
}

async function callClaude(star, zodiac, lang) {
  const today = new Date().toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const who = lang === "zh"
    ? (star && zodiac ? `${star.zh}（属${zodiac.zh}）` : star ? star.zh : zodiac ? `属${zodiac.zh}` : "今日来访者")
    : (star && zodiac ? `${star.en}, Year of the ${zodiac.en}` : star ? star.en : zodiac ? `Year of the ${zodiac.en}` : "today's visitor");
  const p = lang === "zh"
    ? `你是运势大师。为${who}生成今日（${today}）运势。涵盖整体✨、爱情💕、事业💼、财运💰，每项1-2句加emoji，约140字，直接输出。`
    : `You're a mystical fortune teller. Generate today's (${today}) horoscope for ${who}. Cover overall✨, love💕, career💼, wealth💰 — 1-2 sentences each with emojis, ~90 words. Output directly.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: p }] }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || (lang === "zh" ? "星象汇聚，好运降临…" : "Great energy surrounds you today!");
  } catch {
    return lang === "zh" ? "今日星象能量汇聚，好运不断向你奔涌而来！" : "Great energy surrounds you today. Fortune is yours!";
  }
}

// ─── COMPASS ─────────────────────────────────────────────────────────────────
function Compass({ dir }) {
  const xy = (deg, r) => { const a = ((deg - 90) * Math.PI) / 180; return { x: 56 + r * Math.cos(a), y: 56 + r * Math.sin(a) }; };
  const { deg } = dir, tip = xy(deg, 34), tail = xy((deg + 180) % 360, 24), lp = xy((deg + 90) % 360, 7), rp = xy((deg + 270) % 360, 7);
  return (
    <svg width="112" height="112" viewBox="0 0 112 112">
      <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="1" />
      <circle cx="56" cy="56" r="40" fill="rgba(0,0,0,0.25)" stroke="rgba(255,215,0,0.25)" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const p1 = xy(a, 40), p2 = xy(a, a % 90 === 0 ? 32 : 36); return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,215,0,0.35)" strokeWidth={a % 90 === 0 ? 1.5 : 0.7} />; })}
      {[{ l: "N", d: 0 }, { l: "E", d: 90 }, { l: "S", d: 180 }, { l: "W", d: 270 }].map(({ l, d }) => { const p = xy(d, 47); return <text key={d} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill={d === deg ? "#FFD700" : "rgba(255,215,0,0.38)"}>{l}</text>; })}
      <polygon points={`${tip.x},${tip.y} ${lp.x},${lp.y} ${tail.x},${tail.y} ${rp.x},${rp.y}`} fill="#FFD700" opacity=".92" />
      <circle cx="56" cy="56" r="3.5" fill="#FFD700" />
      <circle cx="56" cy="56" r="1.8" fill="#7B1113" />
    </svg>
  );
}

// ─── AD BANNER ───────────────────────────────────────────────────────────────
function AdBanner({ noAds }) {
  if (noAds) return null;
  return (
    <div style={{ border: "1px dashed rgba(255,215,0,0.15)", borderRadius: 12, padding: "10px 16px", textAlign: "center", background: "rgba(255,255,255,0.02)", margin: "8px 0" }}>
      <div style={{ fontSize: 9, color: "rgba(255,215,0,0.22)", letterSpacing: 2, marginBottom: 4 }}>AD</div>
      {/*
        ↓↓ REPLACE THIS WITH YOUR GOOGLE ADMOB / ADSENSE CODE ↓↓
        For web PWA: use Google AdSense <ins class="adsbygoogle"> tag
        For future app wrapper: use AdMob banner
      */}
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.1)", fontStyle: "italic" }}>[ AdSense — replace with your ad unit ]</div>
      </div>
    </div>
  );
}

// ─── FORTUNE TAB ─────────────────────────────────────────────────────────────
function FortuneTab({ lang, T, noAds }) {
  const [star, setStar] = useState(null);
  const [zodiac, setZodiac] = useState(null);
  const [showZodiac, setShowZodiac] = useState(false);
  const [lucky, setLucky] = useState(null);
  const [horoscope, setHoroscope] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reveal = async () => {
    const si = star   ? STAR_SIGNS.findIndex(s => s.en === star.en)     : null;
    const zi = zodiac ? CHINESE_ZODIAC.findIndex(z => z.en === zodiac.en) : null;
    setLucky(genLucky(si, zi)); setDone(true); setLoading(true);
    try   { setHoroscope(await callClaude(star, zodiac, lang)); }
    catch { setHoroscope(T("星象汇聚，好运降临…", "Great energy surrounds you. Fortune is yours!")); }
    finally { setLoading(false); }
  };

  const reset = () => { setDone(false); setLucky(null); setHoroscope(""); setStar(null); setZodiac(null); setShowZodiac(false); };

  if (!done) return (
    <div>
      <AdBanner noAds={noAds} />

      {/* Star sign */}
      <div style={{ marginTop: 14, marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "rgba(255,215,0,0.5)", letterSpacing: 3 }}>♈ {T("选择星座", "Star Sign")}</div>
          <div style={{ fontSize: 10, color: "rgba(255,215,0,0.28)" }}>{T("可选", "optional")}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 7 }}>
          {STAR_SIGNS.map(s => (
            <button key={s.en} className={`g${star?.en === s.en ? " sel" : ""}`} onClick={() => setStar(star?.en === s.en ? null : s)}>
              <div style={{ fontSize: 18 }}>{s.emoji}</div>
              <div style={{ fontSize: 10, marginTop: 2 }}>{lang === "zh" ? s.zh : s.en.slice(0, 3)}</div>
            </button>
          ))}
        </div>
        {star && <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,215,0,0.38)", marginTop: 6 }}>{lang === "zh" ? star.zh : star.en} · {star.dates}</div>}
      </div>

      {/* Chinese zodiac — collapsible */}
      <div style={{ marginBottom: 22, marginTop: 10 }}>
        <button onClick={() => setShowZodiac(v => !v)} style={{
          width: "100%", background: "rgba(255,215,0,0.04)", border: "1px dashed rgba(255,215,0,0.2)",
          borderRadius: 12, padding: "10px 16px", cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{zodiac ? zodiac.emoji : "🐲"}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 12, color: zodiac ? "#FFD700" : "rgba(255,215,0,0.5)" }}>
                {zodiac
                  ? (lang === "zh" ? `属${zodiac.zh}` : `Year of the ${zodiac.en}`)
                  : T("也知道你的属相？", "Know your Chinese Zodiac?")}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,215,0,0.25)" }}>
                {T("可选，让运势更精准", "Optional — makes your reading more personal")}
              </div>
            </div>
          </div>
          <span style={{ color: "rgba(255,215,0,0.35)", fontSize: 13 }}>{showZodiac ? "▲" : "▼"}</span>
        </button>

        {showZodiac && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 7 }}>
              {CHINESE_ZODIAC.map(z => (
                <button key={z.en} className={`g${zodiac?.en === z.en ? " sel" : ""}`} onClick={() => setZodiac(zodiac?.en === z.en ? null : z)}>
                  <div style={{ fontSize: 18 }}>{z.emoji}</div>
                  <div style={{ fontSize: 10, marginTop: 2 }}>{lang === "zh" ? z.zh : z.en.slice(0, 3)}</div>
                  <div style={{ fontSize: 9, opacity: .4 }}>{z.years.split(",")[0]}…</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "rgba(255,215,0,0.28)" }}>
              {T("按农历出生年份选择", "Select based on your lunar birth year")}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="rb" onClick={reveal}>✨ {T("开启今日好运", "Reveal My Fortune")} ✨</button>
        <div style={{ fontSize: 11, color: "rgba(255,215,0,0.25)", marginTop: 8 }}>
          {star || zodiac
            ? T(
                `已选: ${[star ? star.zh : null, zodiac ? `属${zodiac.zh}` : null].filter(Boolean).join(" · ")}`,
                `Selected: ${[star ? star.en : null, zodiac ? `Year of ${zodiac.en}` : null].filter(Boolean).join(" · ")}`
              )
            : T("无需选择，直接点击开始！", "No selection needed — just tap to begin!")}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="cd" style={{ background: "linear-gradient(135deg,#7B0D0D,#B52020)", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,215,0,0.55)", letterSpacing: 2, marginBottom: 6 }}>{T("幸运数字", "LUCKY NUMBER")}</div>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#FFD700", lineHeight: 1, fontFamily: "serif" }}>{lucky.num}</div>
        </div>
        <div className="cd" style={{ background: "linear-gradient(135deg,#7B0D0D,#B52020)", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(255,215,0,0.55)", letterSpacing: 2, marginBottom: 10 }}>{T("幸运颜色", "LUCKY COLOR")}</div>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: lucky.color.hex, margin: "0 auto 8px", border: "2.5px solid rgba(255,215,0,0.45)", boxShadow: `0 0 18px ${lucky.color.hex}88` }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>{lang === "zh" ? lucky.color.zh : lucky.color.en}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.4 }}>{lang === "zh" ? lucky.color.mzh : lucky.color.men}</div>
        </div>
      </div>

      <div className="cd" style={{ background: "linear-gradient(135deg,#0d1a2e,#0a1528)" }}>
        <div style={{ fontSize: 11, color: "rgba(255,215,0,0.55)", letterSpacing: 2, marginBottom: 12, textAlign: "center" }}>{T("幸运方位", "LUCKY DIRECTION")}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center" }}>
          <Compass dir={lucky.dir} />
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFD700", lineHeight: 1 }}>{lang === "zh" ? lucky.dir.zh : lucky.dir.en}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8, lineHeight: 1.7 }}>
              {T(`今日面朝${lucky.dir.zh}方\n财运事业双丰收`, `Face ${lucky.dir.en} today\nfor wealth & career luck`)}
            </div>
          </div>
        </div>
      </div>

      <div className="cd" style={{ background: "linear-gradient(135deg,#3B0D1E,#6B1228)" }}>
        <div style={{ fontSize: 11, color: "rgba(255,215,0,0.55)", letterSpacing: 2, marginBottom: 10 }}>{T("今日开运提示", "TODAY'S FORTUNE")}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.9, fontStyle: "italic" }}>
          「{lang === "zh" ? FORTUNES[lucky.fortIdx].zh : FORTUNES[lucky.fortIdx].en}」
        </div>
      </div>

      <AdBanner noAds={noAds} />

      <div className="cd" style={{ background: "linear-gradient(135deg,#0F1E45,#0a1230)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: star ? 30 : 22 }}>{star ? star.emoji : "🔮"}</span>
          {zodiac && <span style={{ fontSize: 26 }}>{zodiac.emoji}</span>}
          <div style={{ marginLeft: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>
              {lang === "zh"
                ? ([star ? star.zh : null, zodiac ? `属${zodiac.zh}` : null].filter(Boolean).join(" · ") || "今日运势")
                : ([star ? star.en : null, zodiac ? `Year of ${zodiac.en}` : null].filter(Boolean).join(" · ") || "Your Daily Fortune")}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,215,0,0.38)" }}>{T("AI运势推算", "AI-Powered Horoscope")}</div>
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFD700", animation: `bo .7s ${i * .18}s ease-in-out infinite` }} />)}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,215,0,0.38)", marginTop: 10 }}>{T("星象推算中…", "Reading the stars…")}</div>
          </div>
        ) : (
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.9 }}>{horoscope}</div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="sb" onClick={reset}>↩ {T("重新开始", "Start Over")}</button>
      </div>
    </div>
  );
}

// ─── LOTTERY TAB ─────────────────────────────────────────────────────────────
function LotteryTab({ lang, T, noAds, isPremium }) {
  const [sel, setSel]   = useState(null);
  const [nums, setNums] = useState(null);
  const d = new Date(), seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + 42;
  const generate = () => setNums(genLotteryNums(sel, seed + LOTTERY_GAMES.findIndex(g => g.id === sel.id) * 77));
  const isLight = (hex) => ["#FFD700", "#F4B942", "#D4C9B8"].includes(hex);

  return (
    <div>
      <AdBanner noAds={noAds} />
      <div style={{ fontSize: 11, color: "rgba(255,215,0,0.5)", letterSpacing: 3, textAlign: "center", marginBottom: 14, marginTop: 14 }}>
        🎰 {T("选择彩票类型", "Select Lottery Game")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {LOTTERY_GAMES.map(g => {
          const locked = !isPremium && g.id !== "mega" && g.id !== "power";
          return (
            <button key={g.id} className={`g${sel?.id === g.id ? " sel" : ""}`}
              onClick={() => locked ? alert(T("$0.99解锁全部彩票！", "Unlock all games for $0.99!")) : setSel(g)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", textAlign: "left", opacity: locked ? .55 : 1 }}>
              <span style={{ fontSize: 20 }}>{g.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{g.name}</div>
                <div style={{ fontSize: 11, opacity: .55 }}>
                  {g.digits ? `${g.digits} digits (0–9)` : `${g.main.count} from ${g.main.min}–${g.main.max}${g.bonus ? ` + ${g.bonus.count} ${g.bonus.label}` : ""}`}
                </div>
              </div>
              {locked
                ? <span style={{ fontSize: 11, background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.28)", borderRadius: 6, padding: "2px 8px", color: "#FFD700" }}>🔒 $0.99</span>
                : sel?.id === g.id && <span style={{ fontSize: 16, color: "#FFD700" }}>✓</span>}
            </button>
          );
        })}
      </div>
      {sel && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button className="rb" onClick={generate}>✨ {T("生成幸运号码", "Generate Lucky Numbers")} ✨</button>
          </div>
          {nums && (
            <div className="cd" style={{ background: "linear-gradient(135deg,#0d1a2e,#0a1528)", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,215,0,0.55)", letterSpacing: 2, marginBottom: 4 }}>{sel.flag} {sel.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,215,0,0.35)", marginBottom: 14 }}>{T("今日幸运号码", "Today's Lucky Numbers")}</div>
              {sel.digits ? (
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  {nums.main.map((n, i) => (
                    <div key={i} style={{ width: 52, height: 52, borderRadius: 10, background: "#7B0D0D", border: "2px solid #FFD700", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 22, color: "#FFD700", animation: `pi .35s ${i * .08}s both` }}>{n}</div>
                  ))}
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: nums.bonus?.length ? 12 : 0 }}>
                    {nums.main.map((n, i) => (
                      <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: sel.main.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: isLight(sel.main.color) ? "#1a0a0a" : "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.35)", animation: `pi .35s ${i * .07}s both` }}>{n}</div>
                    ))}
                  </div>
                  {nums.bonus?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,215,0,0.4)", marginBottom: 10 }}>+ {sel.bonus.label}</div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        {nums.bonus.map((n, i) => (
                          <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: sel.bonus.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: isLight(sel.bonus.color) ? "#1a0a0a" : "#fff", border: "2px solid rgba(255,255,255,0.2)", animation: `pi .4s ${(nums.main.length + i) * .07}s both` }}>{n}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div style={{ fontSize: 10, color: "rgba(255,215,0,0.2)", marginTop: 14 }}>{T("纯娱乐 · 不构成投注建议", "For entertainment only · Not financial advice")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MINI GAME TAB ────────────────────────────────────────────────────────────
function MiniGameTab({ lang, T, noAds }) {
  const [cards]  = useState(() => [...FORTUNE_CARDS].sort(() => Math.random() - .5));
  const [flipped, setFlipped] = useState([false, false, false, false, false]);
  const [chosen, setChosen]   = useState(null);

  const flip = (i) => {
    if (chosen !== null || flipped[i]) return;
    const nf = [...flipped]; nf[i] = true;
    setFlipped(nf); setChosen(i);
  };
  const reset = () => { setFlipped([false, false, false, false, false]); setChosen(null); };

  return (
    <div>
      <AdBanner noAds={noAds} />
      <div className="cd" style={{ background: "linear-gradient(135deg,#0F1E45,#0a1230)", marginTop: 14 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFD700", marginBottom: 4 }}>{T("今日运势翻牌", "Fortune Card Flip")}</div>
          <div style={{ fontSize: 12, color: "rgba(255,215,0,0.45)" }}>
            {chosen !== null
              ? T("✨ 今日运势揭晓！", "✨ Your fortune is revealed!")
              : T("选择一张牌，揭示你的今日运势", "Pick one card to reveal your daily fortune")}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18 }}>
          {cards.map((card, i) => {
            const up = flipped[i];
            return (
              <div key={i} onClick={() => flip(i)} style={{ width: 64, flex: "0 0 64px", height: 96, cursor: chosen !== null && !up ? "default" : "pointer", perspective: "600px", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, transition: "transform .6s cubic-bezier(.4,0,.2,1)", transformStyle: "preserve-3d", transform: up ? "rotateY(180deg)" : "none" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 10, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "linear-gradient(135deg,#7B0D0D,#4a0a0a)", border: `2px solid ${chosen === i ? "#FFD700" : "rgba(255,215,0,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🎴</div>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 10, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: `linear-gradient(135deg,${card.bg},${card.bg}cc)`, border: `2px solid ${card.border}`, transform: "rotateY(180deg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: 6 }}>
                    <div style={{ fontSize: 22 }}>{card.emoji}</div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: card.border, textAlign: "center", letterSpacing: .5 }}>{lang === "zh" ? card.rank_zh : card.rank_en}</div>
                    <div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }, (_, j) => <span key={j} style={{ fontSize: 7, color: j < card.score ? "#FFD700" : "rgba(255,215,0,0.18)" }}>★</span>)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {chosen !== null && (
          <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "16px", border: `1px solid ${cards[chosen].border}`, animation: "fu .4s both" }}>
            <div style={{ fontSize: 22, textAlign: "center", marginBottom: 8 }}>{cards[chosen].emoji}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, textAlign: "center" }}>
              {lang === "zh" ? cards[chosen].zh : cards[chosen].en}
            </div>
          </div>
        )}
        {chosen !== null && (
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button className="sb" onClick={reset}>🔄 {T("再来一次", "Play Again")}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]         = useState("zh");
  const [tab, setTab]           = useState("fortune");
  const [isPremium, setIsPremium] = useState(() => {
    try { return localStorage.getItem("yld_premium") === "1"; } catch { return false; }
  });

  const T = (zh, en) => lang === "zh" ? zh : en;
  const today = new Date();

  const unlock = () => {
    // In production: replace with Stripe / payment provider
    // For now simulates a successful purchase
    setIsPremium(true);
    try { localStorage.setItem("yld_premium", "1"); } catch {}
    alert(T("感谢支持！🎉 广告已关闭，全部彩票已解锁。", "Thank you! 🎉 Ads removed & all lottery games unlocked."));
  };

  const TABS = [
    { id: "fortune", icon: "🔮", label: T("今日运势", "Fortune") },
    { id: "lottery", icon: "🎱", label: T("幸运彩票", "Lottery") },
    { id: "game",    icon: "🎮", label: T("趣味游戏", "Mini Game") },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Cinzel:wght@700&family=Noto+Serif+SC:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overscroll-behavior-y: contain; }
        @keyframes tw  { 0%,100%{opacity:.1;transform:scale(.6)} 50%{opacity:.8;transform:scale(1.3)} }
        @keyframes fu  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pi  { from{transform:scale(0) rotate(-15deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        @keyframes bo  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pu  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        .g { cursor:pointer; background:rgba(255,215,0,0.06); border:1.5px solid rgba(255,215,0,0.18); border-radius:12px; padding:10px 5px; text-align:center; transition:all .2s; color:rgba(255,215,0,0.65); font-family:inherit; width:100%; }
        .g:hover  { background:rgba(255,215,0,0.15); border-color:rgba(255,215,0,0.5); transform:translateY(-2px); }
        .g:active { transform:scale(0.96); }
        .g.sel    { background:rgba(255,215,0,0.22); border-color:#FFD700; box-shadow:0 0 12px rgba(255,215,0,0.28); color:#FFD700; }
        .rb { background:linear-gradient(135deg,#FFD700,#FF8C00); border:none; border-radius:50px; padding:14px 40px; font-size:16px; font-weight:900; color:#3B0D0D; cursor:pointer; transition:all .2s; letter-spacing:2px; box-shadow:0 6px 24px rgba(255,140,0,0.5); font-family:inherit; animation:pu 2.4s ease-in-out infinite; }
        .rb:hover  { transform:translateY(-3px) scale(1.04); box-shadow:0 10px 32px rgba(255,140,0,0.7); animation:none; }
        .rb:active { transform:scale(0.97); animation:none; }
        .rb:disabled { opacity:.3; cursor:not-allowed; animation:none; transform:none; }
        .cd { border-radius:20px; padding:20px; border:1.5px solid rgba(255,215,0,0.28); animation:fu .5s both; }
        .sb { background:transparent; border:1.5px solid rgba(255,215,0,0.22); border-radius:50px; padding:9px 22px; font-size:13px; color:rgba(255,215,0,0.6); cursor:pointer; transition:all .2s; font-family:inherit; }
        .sb:hover  { border-color:rgba(255,215,0,0.6); color:#FFD700; }
        .sb:active { transform:scale(0.97); }
        .lb { background:transparent; border:1.5px solid rgba(255,215,0,0.22); border-radius:8px; padding:5px 12px; font-size:13px; cursor:pointer; transition:all .15s; font-family:inherit; }
        .lb.on { background:rgba(255,215,0,0.2); border-color:#FFD700; color:#FFD700; }
        .lb:not(.on) { color:rgba(255,215,0,0.4); }
      `}</style>

      {/* Star background */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(160deg,#120608 0%,#1e0a0a 45%,#130820 100%)", zIndex: -2 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 40 }, (_, i) => ({ x: (i * 37 + 13) % 100, y: (i * 53 + 7) % 100, s: (i % 4) + 1, d: (i * .7) % 3 })).map((s, i) => (
          <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, borderRadius: "50%", background: "#FFD700", animation: `tw ${2 + s.d}s ease-in-out ${s.d}s infinite` }} />
        ))}
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 16px 72px", fontFamily: "'Noto Serif SC',serif", color: "rgba(255,255,255,0.88)" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "28px 0 14px", position: "relative" }}>
          <div style={{ position: "absolute", top: 28, right: 0, display: "flex", gap: 6 }}>
            {["zh", "en"].map(l => <button key={l} className={`lb${lang === l ? " on" : ""}`} onClick={() => setLang(l)}>{l === "zh" ? "中文" : "EN"}</button>)}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,215,0,0.35)", letterSpacing: 6 }}>✦ ✦ ✦</div>
          <h1 style={{ fontSize: "clamp(32px,7vw,52px)", fontWeight: 900, margin: "6px 0 4px", color: "#FFD700", fontFamily: "'Ma Shan Zheng','Cinzel',serif", textShadow: "0 0 32px rgba(255,165,0,0.4)", letterSpacing: 4 }}>
            {T("今日大吉", "Your Lucky Day")}
          </h1>
          <div style={{ fontSize: 10, color: "rgba(255,215,0,0.38)", letterSpacing: 4 }}>{T("YOUR LUCKY DAY", "今日大吉")}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 6 }}>
            {today.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}
          </div>
        </div>

        {/* Remove-ads / premium banner */}
        {!isPremium ? (
          <div style={{ background: "rgba(255,215,0,0.05)", borderRadius: 12, padding: "11px 16px", border: "1px solid rgba(255,215,0,0.18)", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>✨</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFD700" }}>{T("去除广告 · 解锁全部彩票", "Remove Ads · All Lottery Games")}</div>
              <div style={{ fontSize: 10, color: "rgba(255,215,0,0.4)" }}>{T("一次购买，永久使用", "One-time purchase · Yours forever")}</div>
            </div>
            <button onClick={unlock} style={{ background: "linear-gradient(135deg,#FFD700,#FF8C00)", border: "none", borderRadius: 50, padding: "8px 16px", color: "#3B0D0D", fontWeight: 900, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
              $0.99
            </button>
          </div>
        ) : (
          <div style={{ background: "rgba(100,255,100,0.06)", borderRadius: 12, padding: "9px 16px", border: "1px solid rgba(100,255,100,0.2)", marginBottom: 14, textAlign: "center", fontSize: 12, color: "#7EE8A2" }}>
            ✓ {T("已解锁全部功能，感谢支持！", "All features unlocked — thank you!")}
          </div>
        )}

        {/* Tab navigation */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "rgba(0,0,0,0.28)", borderRadius: 14, padding: 5 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "9px 6px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit",
              background:    tab === t.id ? "rgba(255,215,0,0.18)" : "transparent",
              color:         tab === t.id ? "#FFD700" : "rgba(255,215,0,0.42)",
              fontSize: 11, fontWeight: tab === t.id ? 700 : 400, transition: "all .2s",
              borderBottom:  tab === t.id ? "2px solid #FFD700" : "2px solid transparent",
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{t.icon}</div>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "fortune" && <FortuneTab lang={lang} T={T} noAds={isPremium} />}
        {tab === "lottery" && <LotteryTab lang={lang} T={T} noAds={isPremium} isPremium={isPremium} />}
        {tab === "game"    && <MiniGameTab lang={lang} T={T} noAds={isPremium} />}

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: 2, lineHeight: 2 }}>
          {T("纯娱乐性质 · 仅供参考 · 请勿当真", "For entertainment only · All in good fun")}<br />
          © {today.getFullYear()} Your Lucky Day · 今日大吉
        </div>
      </div>
    </>
  );
}
