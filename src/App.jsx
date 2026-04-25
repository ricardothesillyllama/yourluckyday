import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
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
  { id: "mega",  flag: "🇺🇸", name: "Mega Millions",     main: { min: 1, max: 70, count: 5, color: "#2B4EAE" }, bonus: { min: 1, max: 25, count: 1, color: "#FFD700", label: "Mega Ball"   } },
  { id: "power", flag: "🇺🇸", name: "Powerball",         main: { min: 1, max: 69, count: 5, color: "#C0392B" }, bonus: { min: 1, max: 26, count: 1, color: "#C0392B", label: "Powerball"   } },
  { id: "p3",    flag: "🇺🇸", name: "Pick 3",            digits: 3 },
  { id: "p4",    flag: "🇺🇸", name: "Pick 4",            digits: 4 },
  { id: "euro",  flag: "🇪🇺", name: "EuroMillions",      main: { min: 1, max: 50, count: 5, color: "#2B4EAE" }, bonus: { min: 1, max: 12, count: 2, color: "#FFD700", label: "Lucky Stars" } },
  { id: "mark6", flag: "🇭🇰", name: "Mark Six 六合彩",   main: { min: 1, max: 49, count: 6, color: "#F97316" }, bonus: { min: 1, max: 49, count: 1, color: "#888",    label: "Extra Ball"  } },
  { id: "lu6",   flag: "🌍",  name: "Lucky 6 (Generic)", main: { min: 1, max: 49, count: 6, color: "#2D9B6F" } },
];

const LUCKY_COLORS = [
  { zh: "大红",   en: "Crimson Red",   hex: "#C0392B", mzh: "热情旺盛，财运大开", men: "Passion blazing, wealth incoming"      },
  { zh: "金黄",   en: "Golden Yellow", hex: "#F4B942", mzh: "富贵吉祥，黄金满屋", men: "Prosperity & golden fortune"           },
  { zh: "翡翠绿", en: "Jade Green",    hex: "#2D9B6F", mzh: "生机盎然，事业顺遂", men: "Vitality & career success"             },
  { zh: "宝蓝",   en: "Sapphire Blue", hex: "#2B4EAE", mzh: "智慧清明，贵人相助", men: "Wisdom & helpful encounters"           },
  { zh: "紫罗兰", en: "Violet",        hex: "#8B5CF6", mzh: "高贵典雅，人缘极佳", men: "Noble spirit, great connections"       },
  { zh: "玫瑰金", en: "Rose Gold",     hex: "#C9747A", mzh: "浪漫甜蜜，桃花运旺", men: "Romance & love luck strong"            },
  { zh: "橙橘",   en: "Tangerine",     hex: "#F97316", mzh: "活力四射，喜事连连", men: "Vibrant energy & joyful surprises"     },
  { zh: "珍珠白", en: "Pearl White",   hex: "#D4C9B8", mzh: "纯洁祥瑞，万事顺心", men: "Purity, clarity & smooth sailing"      },
];

const DIRECTIONS = [
  { zh: "正北", en: "North",     deg: 0   }, { zh: "东北", en: "Northeast", deg: 45  },
  { zh: "正东", en: "East",      deg: 90  }, { zh: "东南", en: "Southeast", deg: 135 },
  { zh: "正南", en: "South",     deg: 180 }, { zh: "西南", en: "Southwest", deg: 225 },
  { zh: "正西", en: "West",      deg: 270 }, { zh: "西北", en: "Northwest", deg: 315 },
];

const FORTUNES = [
  { zh: "今日宜大胆出击，机遇就在转角处等待。", en: "Fortune favors the bold — take that first step today."        },
  { zh: "静水流深，沉默中蕴藏巨大力量。",        en: "Still waters run deep. Your silence holds immense power."     },
  { zh: "贵人从远方而来，保持微笑广结善缘。",    en: "A helpful stranger is closer than you think. Stay open."      },
  { zh: "财不入急门，稳扎稳打方为上策。",        en: "Wealth rewards patience, not urgency. Play the long game."    },
  { zh: "今日创意爆棚，大胆表达你的想法！",      en: "Your creativity peaks today — express yourself boldly!"       },
  { zh: "旧缘有望重续，意外之喜悄然而至。",      en: "An old connection resurfaces. A pleasant surprise awaits."     },
  { zh: "今日桃花运极旺，单身者注意！",          en: "Love luck is strong today. Keep your heart open!"             },
  { zh: "厚积薄发，时机成熟自然水到渠成。",      en: "Your efforts are quietly compounding. Harvest time is near."  },
];

// Full 22-card Major Arcana tarot deck
const TAROT_DECK = [
  { id: 0,  zh: "愚者",     en: "The Fool",         emoji: "🌀", bg: "#1a0d2e", border: "#9b59b6", mzh: "新旅程，无惧前行，万物皆有可能",        men: "New beginnings — a fearless leap into infinite possibility"      },
  { id: 1,  zh: "魔术师",   en: "The Magician",     emoji: "✨", bg: "#2a1200", border: "#F97316", mzh: "意志如铁，工具俱全，行动时机已到",       men: "You have all the skills you need — act with full intention"      },
  { id: 2,  zh: "女祭司",   en: "High Priestess",   emoji: "🌙", bg: "#060c2a", border: "#3498db", mzh: "内在智慧觉醒，静观其变，时机将至",       men: "Trust your intuition; hidden knowledge is surfacing"             },
  { id: 3,  zh: "女皇",     en: "The Empress",      emoji: "🌸", bg: "#0a2010", border: "#2ecc71", mzh: "丰盛滋养，创意盎然，感情甜蜜",          men: "Abundance, creativity, and nurturing warmth surround you"        },
  { id: 4,  zh: "皇帝",     en: "The Emperor",      emoji: "⚔️", bg: "#2a0808", border: "#e74c3c", mzh: "掌控全局，建立秩序，权威稳如泰山",       men: "Structure and authority bring stability — lead confidently"      },
  { id: 5,  zh: "教皇",     en: "The Hierophant",   emoji: "🔔", bg: "#1a0a28", border: "#8e44ad", mzh: "传统智慧指引，精神导师现身",            men: "Traditional wisdom and a trusted mentor appear"                  },
  { id: 6,  zh: "恋人",     en: "The Lovers",       emoji: "💕", bg: "#2a0a16", border: "#e91e8c", mzh: "灵魂共鸣，关系深化，面临重要抉择",       men: "A meaningful choice in love; deep soul connection beckons"       },
  { id: 7,  zh: "战车",     en: "The Chariot",      emoji: "🏆", bg: "#1a1800", border: "#F4B942", mzh: "意志驾驭逆境，势如破竹，胜利在望",       men: "Willpower and determination drive you to victory"                },
  { id: 8,  zh: "力量",     en: "Strength",         emoji: "🦁", bg: "#2a1400", border: "#e67e22", mzh: "以柔克刚，内心强大，耐力长久",          men: "Gentle inner courage overcomes every obstacle"                   },
  { id: 9,  zh: "隐士",     en: "The Hermit",       emoji: "🔦", bg: "#0a1414", border: "#95a5a6", mzh: "独处沉思，内省寻道，智慧于静中降临",     men: "Solitude and reflection illuminate your true path"               },
  { id: 10, zh: "命运之轮", en: "Wheel of Fortune", emoji: "☯️", bg: "#08082a", border: "#FFD700", mzh: "命运轮转向好，好运即将来临，把握时机",    men: "The wheel turns in your favor — seize this moment"              },
  { id: 11, zh: "正义",     en: "Justice",          emoji: "⚖️", bg: "#0a0a1a", border: "#3498db", mzh: "公正裁决，因果循环，诚信自有回报",       men: "Truth and fairness align; karma rewards integrity"               },
  { id: 12, zh: "倒吊人",   en: "The Hanged Man",   emoji: "🌿", bg: "#041a14", border: "#1abc9c", mzh: "放手得自由，换个角度看世界",            men: "Release and surrender reveal a powerful new perspective"          },
  { id: 13, zh: "死神",     en: "Death",            emoji: "🌑", bg: "#0a0a0a", border: "#7f8c8d", mzh: "终结即新生，勇于蜕变，告别旧我",        men: "Endings create space for powerful transformation"                },
  { id: 14, zh: "节制",     en: "Temperance",       emoji: "🌊", bg: "#041418", border: "#1abc9c", mzh: "调和平衡，耐心调配，自然水到渠成",       men: "Balance, patience, and flow create something beautiful"          },
  { id: 15, zh: "恶魔",     en: "The Devil",        emoji: "⛓️", bg: "#1a0800", border: "#c0392b", mzh: "看清束缚，直面阴影，挣脱枷锁得解脱",     men: "See what holds you back — freedom starts with honest reflection"  },
  { id: 16, zh: "塔",       en: "The Tower",        emoji: "⚡", bg: "#0a0400", border: "#e67e22", mzh: "打破旧格局，突变开新机，涅槃重生",       men: "A sudden shake-up clears the way for something far greater"      },
  { id: 17, zh: "星星",     en: "The Star",         emoji: "⭐", bg: "#04041a", border: "#5dade2", mzh: "希望重燃，心愿将成，前途一片光明",       men: "Hope, renewal, and inspiration light your way forward"           },
  { id: 18, zh: "月亮",     en: "The Moon",         emoji: "🌕", bg: "#080414", border: "#9b59b6", mzh: "幻象渐散，直觉引路，真相浮现",          men: "Trust your deepest instincts as illusions begin to fade"         },
  { id: 19, zh: "太阳",     en: "The Sun",          emoji: "☀️", bg: "#1a1200", border: "#FFD700", mzh: "光明普照，喜悦充盈，万事皆顺",          men: "Pure joy, clarity, and brilliant success shine on you"           },
  { id: 20, zh: "审判",     en: "Judgement",        emoji: "🎺", bg: "#08081a", border: "#e74c3c", mzh: "觉醒时刻，应答召唤，展开全新篇章",       men: "A profound awakening — your true calling is summoning you"       },
  { id: 21, zh: "世界",     en: "The World",        emoji: "🌍", bg: "#041408", border: "#2ecc71", mzh: "圆满完成，宇宙祝福，新循环由此开启",     men: "Completion and wholeness — you have truly arrived"               },
];

const SPREADS = [
  { id: "three", name_zh: "三张牌展开",     name_en: "3-Card Spread", count: 3, premium: false, pos_zh: ["过去","现在","未来"],                       pos_en: ["Past","Present","Future"]                                },
  { id: "five",  name_zh: "五张牌十字展开", name_en: "5-Card Cross",  count: 5, premium: true,  pos_zh: ["现状","挑战","基础","过去","潜力"],           pos_en: ["Situation","Challenge","Foundation","Past","Potential"]   },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const R = (s, i) => Math.abs(Math.sin(s * 9301 + i * 49297 + 233)) % 1;

// Derives Chinese zodiac from birth year (approximate — ignores lunar new year boundary)
function zodiacFromYear(y) {
  const n = parseInt(y);
  if (!n || n < 1900 || n > 2100) return null;
  return CHINESE_ZODIAC[((n - 2008) % 12 + 12) % 12];
}

// Folds name characters into a numeric seed contribution
function nameCode(name) {
  if (!name) return 0;
  return [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

function genLucky(si, zi, nc) {
  const d = new Date(), base = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const s = base + (si ?? 99) * 137 + (zi ?? 77) * 31 + (nc ?? 0) * 7;
  return {
    num:     Math.floor(R(s, 1) * 99) + 1,
    color:   LUCKY_COLORS[Math.floor(R(s, 2) * LUCKY_COLORS.length)],
    dir:     DIRECTIONS[Math.floor(R(s, 3) * DIRECTIONS.length)],
    fortIdx: Math.floor(R(s, 4) * FORTUNES.length),
  };
}

// Lucky number integrated: one main ball is anchored to the reading's lucky number (range-wrapped)
function genLotteryNums(game, seed, luckyNum) {
  if (game.digits) {
    return { main: Array.from({ length: game.digits }, (_, i) => Math.floor(R(seed, i + 10) * 10)), anchorIdx: null };
  }
  const used = new Set(), main = [];
  let anchorNum = null, anchorIdx = null;
  if (luckyNum) {
    const range = game.main.max - game.main.min + 1;
    anchorNum = ((luckyNum - game.main.min) % range + range) % range + game.main.min;
    used.add(anchorNum); main.push(anchorNum);
  }
  let i = 0;
  while (main.length < game.main.count) {
    const n = Math.floor(R(seed + i, i + 20) * (game.main.max - game.main.min + 1)) + game.main.min;
    if (!used.has(n)) { used.add(n); main.push(n); }
    i++;
  }
  main.sort((a, b) => a - b);
  if (anchorNum !== null) anchorIdx = main.indexOf(anchorNum);
  const bonus = [];
  if (game.bonus) {
    const usedB = new Set(); let j = 0;
    while (bonus.length < game.bonus.count) {
      const n = Math.floor(R(seed + j, j + 50) * (game.bonus.max - game.bonus.min + 1)) + game.bonus.min;
      if (!usedB.has(n)) { usedB.add(n); bonus.push(n); }
      j++;
    }
  }
  return { main, bonus, anchorIdx };
}

// ─── API CALLS (Groq via Vercel /api/fortune proxy) ──────────────────────────
async function callGroq(star, zodiac, lang, name, birthYear, luckyNum) {
  const today = new Date().toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const who = lang === "zh"
    ? [name, star?.zh, zodiac ? `属${zodiac.zh}` : null, birthYear ? `${birthYear}年生` : null].filter(Boolean).join("，") || "今日来访者"
    : [name, star?.en, zodiac ? `Year of the ${zodiac.en}` : null, birthYear ? `born ${birthYear}` : null].filter(Boolean).join(", ") || "today's visitor";
  const luckyNote = luckyNum
    ? (lang === "zh"
        ? `今日幸运数字已由星象推算得出为${luckyNum}，请自然融入运势描述，勿另行生成其他数字。`
        : `The lucky number has already been calculated as ${luckyNum} — reference it naturally, do not invent a different one.`)
    : "";
  const p = lang === "zh"
    ? `你是运势大师。为${who}生成今日（${today}）运势。涵盖整体✨、爱情💕、事业💼、财运💰，每项1-2句加emoji，约140字。${luckyNote}重要：纯文本输出，禁止使用任何Markdown格式（无**加粗**、无---分割线、无#标题），直接输出正文。`
    : `You're a mystical fortune teller. Generate today's (${today}) horoscope for ${who}. Cover overall✨, love💕, career💼, wealth💰 — 1-2 sentences each with emojis, ~90 words. ${luckyNote} IMPORTANT: plain text only — absolutely no markdown, no **bold**, no --- dividers, no # headers. Output prose directly.`;
  try {
    const res = await fetch("/api/fortune", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 1000, messages: [{ role: "user", content: p }] }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || (lang === "zh" ? "星象汇聚，好运降临…" : "Great energy surrounds you today!");
  } catch {
    return lang === "zh" ? "今日星象能量汇聚，好运不断向你奔涌而来！" : "Great energy surrounds you today. Fortune is yours!";
  }
}

async function callGroqTarot(cards, positions, lang) {
  const list = cards.map((c, i) => lang === "zh"
    ? `${positions[i]}：${c.zh}（${c.men}）`
    : `${positions[i]}: ${c.en} — ${c.men}`
  ).join(lang === "zh" ? "；" : "; ");
  const p = lang === "zh"
    ? `你是塔罗牌大师。解读这个牌阵：${list}。为每张牌结合其位置给出1-2句深刻解读，并给出整体洞见，约200字。纯文本输出，禁止使用任何Markdown格式，直接输出正文。`
    : `You're a tarot master. Interpret this spread: ${list}. Give 1-2 insightful sentences per card in its positional context, then an overall synthesis, ~150 words. Plain text only — no markdown, no bold, no headers. Output prose directly.`;
  try {
    const res = await fetch("/api/fortune", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 1200, messages: [{ role: "user", content: p }] }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || (lang === "zh" ? "牌意深远，命运正在展开…" : "The cards speak of a meaningful journey unfolding…");
  } catch {
    return lang === "zh" ? "牌面相互呼应，命运正在展开，请静心感受其中深意。" : "The cards speak in harmony — trust what surfaces from within.";
  }
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Compass({ dir }) {
  const [deg, setDeg] = useState(dir.deg + 720);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDeg(dir.deg));
    return () => cancelAnimationFrame(id);
  }, [dir.deg]);
  const xy = (d, r) => { const a = ((d - 90) * Math.PI) / 180; return { x: 56 + r * Math.cos(a), y: 56 + r * Math.sin(a) }; };
  const tip = xy(0, 34), tail = xy(180, 24), lp = xy(90, 7), rp = xy(270, 7);
  return (
    <svg width="112" height="112" viewBox="0 0 112 112">
      <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="1" />
      <circle cx="56" cy="56" r="40" fill="rgba(0,0,0,0.25)" stroke="rgba(255,215,0,0.25)" strokeWidth="1" />
      {[0,45,90,135,180,225,270,315].map(a => { const p1=xy(a,40),p2=xy(a,a%90===0?32:36); return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,215,0,0.35)" strokeWidth={a%90===0?1.5:0.7}/>; })}
      {[{l:"N",d:0},{l:"E",d:90},{l:"S",d:180},{l:"W",d:270}].map(({l,d})=>{ const p=xy(d,47); return <text key={d} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="rgba(255,215,0,0.38)">{l}</text>; })}
      <g style={{ transform:`rotate(${deg}deg)`, transformOrigin:"56px 56px", transition:"transform 1.4s cubic-bezier(.22,1,.36,1)" }}>
        <polygon points={`${tip.x},${tip.y} ${lp.x},${lp.y} ${tail.x},${tail.y} ${rp.x},${rp.y}`} fill="#FFD700" opacity=".92"/>
      </g>
      <circle cx="56" cy="56" r="3.5" fill="#FFD700"/>
      <circle cx="56" cy="56" r="1.8" fill="#7B1113"/>
    </svg>
  );
}

function AdBanner({ lang, noAds }) {
  if (noAds) return null;
  return (
    <div style={{ border:"1px dashed rgba(255,215,0,0.15)", borderRadius:12, padding:"10px 16px", textAlign:"center", background:"rgba(255,255,255,0.02)", margin:"8px 0" }}>
      <div style={{ fontSize:9, color:"rgba(255,215,0,0.22)", letterSpacing:2, marginBottom:4 }}>{lang==="zh"?"广告":"AD"}</div>
      {/* ↓↓ REPLACE WITH YOUR GOOGLE ADMOB / ADSENSE CODE ↓↓ */}
      <div style={{ height:52, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.1)", fontStyle:"italic" }}>[ AdSense — replace with your ad unit ]</div>
      </div>
    </div>
  );
}

function ShareModal({ lucky, horoscope, star, zodiac, name, birthYear, lang, T, onClose }) {
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString(lang==="zh"?"zh-CN":"en-US",{year:"numeric",month:"long",day:"numeric"});
  const lines = [
    "✨ " + T("今日大吉","Your Lucky Day") + " ✨", "",
    name ? T(`${name}的今日运势`,`${name}'s Fortune`) + ` · ${today}` : today, "",
    [star   ?(lang==="zh"?`${star.emoji} ${star.zh}`:`${star.emoji} ${star.en}`):null,
     zodiac ?(lang==="zh"?`${zodiac.emoji} 属${zodiac.zh}`:`${zodiac.emoji} Year of the ${zodiac.en}`):null,
     birthYear?T(`${birthYear}年生`,`Born ${birthYear}`):null].filter(Boolean).join("  ·  "),
    "",
    T(`🔢 幸运数字：${lucky.num}`,`🔢 Lucky Number: ${lucky.num}`),
    T(`🎨 幸运颜色：${lucky.color.zh} (${lucky.color.en})`,`🎨 Lucky Color: ${lucky.color.en}`),
    T(`🧭 幸运方位：${lucky.dir.zh}`,`🧭 Lucky Direction: ${lucky.dir.en}`),
    "", T("📖 今日箴言：","📖 Today's Fortune:"),
    `「${lang==="zh"?FORTUNES[lucky.fortIdx].zh:FORTUNES[lucky.fortIdx].en}」`,
    "", horoscope?T("🔮 运势推算：","🔮 Horoscope:")+"\n"+horoscope:"",
    "", "— 今日大吉 · yourluckyday.app",
  ].filter(l=>l!==undefined);
  const text = lines.join("\n");
  const copy = () => { navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}); };
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(160deg,#1a0a12,#0d0818)",border:"1.5px solid rgba(255,215,0,0.35)",borderRadius:20,padding:24,maxWidth:420,width:"100%",boxShadow:"0 0 60px rgba(255,140,0,0.2)",animation:"fu .3s both"}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.4)",letterSpacing:3,marginBottom:12,textAlign:"center"}}>✦ {T("分享你的运势","SHARE YOUR FORTUNE")} ✦</div>
        <pre style={{fontSize:12,color:"rgba(255,255,255,0.75)",lineHeight:1.8,whiteSpace:"pre-wrap",background:"rgba(0,0,0,0.3)",borderRadius:12,padding:14,maxHeight:280,overflowY:"auto",fontFamily:"'Noto Serif SC',serif",marginBottom:14}}>{text}</pre>
        <div style={{display:"flex",gap:10}}>
          <button onClick={copy} style={{flex:1,background:copied?"rgba(100,255,100,0.15)":"linear-gradient(135deg,#FFD700,#FF8C00)",border:copied?"1px solid rgba(100,255,100,0.4)":"none",borderRadius:50,padding:"11px 0",fontWeight:900,fontSize:14,cursor:"pointer",fontFamily:"inherit",color:copied?"#7EE8A2":"#3B0D0D",transition:"all .2s"}}>
            {copied?T("✓ 已复制！","✓ Copied!"):T("📋 复制","📋 Copy")}
          </button>
          <button onClick={onClose} style={{background:"transparent",border:"1.5px solid rgba(255,215,0,0.22)",borderRadius:50,padding:"11px 20px",color:"rgba(255,215,0,0.5)",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
            {T("关闭","Close")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FORTUNE TAB ─────────────────────────────────────────────────────────────
function FortuneTab({ lang, T, noAds, savedName, savedBirthYear, onLucky }) {
  const [name,       setName]      = useState(savedName || "");
  const [birthYear,  setBirthYear] = useState(savedBirthYear || "");
  const [star,       setStar]      = useState(null);
  const [zodiac,     setZodiac]    = useState(null);
  const [showZodiac, setShowZodiac]= useState(false);
  const [lucky,      setLucky]     = useState(null);
  const [horoscope,  setHoroscope] = useState("");
  const [loading,    setLoading]   = useState(false);
  const [done,       setDone]      = useState(false);
  const [showShare,  setShowShare] = useState(false);
  const [sparkle,    setSparkle]   = useState(false);

  useEffect(()=>{ try{localStorage.setItem("lkd_name",name);}catch{} },[name]);
  useEffect(()=>{ try{localStorage.setItem("lkd_year",birthYear);}catch{} },[birthYear]);

  // Auto-derive zodiac from birth year
  useEffect(()=>{
    if(birthYear.length===4){ const z=zodiacFromYear(birthYear); if(z) setZodiac(z); }
  },[birthYear]);

  const reveal = async () => {
    const si = star   ? STAR_SIGNS.findIndex(s=>s.en===star.en)       : null;
    const zi = zodiac ? CHINESE_ZODIAC.findIndex(z=>z.en===zodiac.en) : null;
    const nc = nameCode(name);
    const l  = genLucky(si, zi, nc);
    setLucky(l); setDone(true); setLoading(true);
    onLucky(l.num);
    setTimeout(()=>setSparkle(true),600);
    setTimeout(()=>setSparkle(false),1800);
    try   { setHoroscope(await callGroq(star,zodiac,lang,name||null,birthYear||null,l.num)); }
    catch { setHoroscope(T("星象汇聚，好运降临…","Great energy surrounds you. Fortune is yours!")); }
    finally { setLoading(false); }
  };

  const reset = () => {
    setDone(false); setLucky(null); setHoroscope(""); setStar(null);
    setZodiac(null); setShowZodiac(false); setSparkle(false); onLucky(null);
  };

  if (!done) return (
    <div>
      <AdBanner lang={lang} noAds={noAds}/>

      {/* Name */}
      <div style={{marginTop:14,marginBottom:14}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.5)",letterSpacing:3,marginBottom:8}}>👤 {T("姓名（可选）","Your Name (optional)")}</div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder={T("输入你的名字…","Enter your name…")}
          style={{width:"100%",background:"rgba(255,215,0,0.06)",border:"1.5px solid rgba(255,215,0,0.22)",borderRadius:12,padding:"10px 14px",color:"rgba(255,255,255,0.85)",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
      </div>

      {/* Birth year */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.5)",letterSpacing:3,marginBottom:8}}>🎂 {T("出生年份（可选）","Birth Year (optional)")}</div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <input value={birthYear} onChange={e=>setBirthYear(e.target.value.replace(/\D/g,"").slice(0,4))}
            placeholder={T("如：1990","e.g. 1990")} maxLength={4}
            style={{width:120,background:"rgba(255,215,0,0.06)",border:"1.5px solid rgba(255,215,0,0.22)",borderRadius:12,padding:"10px 14px",color:"rgba(255,255,255,0.85)",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
          {zodiac&&(
            <div style={{display:"flex",alignItems:"center",gap:6,animation:"fu .3s both"}}>
              <span style={{fontSize:22}}>{zodiac.emoji}</span>
              <div>
                <div style={{fontSize:12,color:"#FFD700",fontWeight:700}}>{lang==="zh"?`属${zodiac.zh}`:`Year of the ${zodiac.en}`}</div>
                <div style={{fontSize:10,color:"rgba(255,215,0,0.35)"}}>{T("已自动识别","Auto-detected")}</div>
              </div>
            </div>
          )}
        </div>
        {birthYear.length===4&&!zodiac&&<div style={{fontSize:11,color:"rgba(255,100,100,0.5)",marginTop:4}}>{T("年份超出范围","Year out of range")}</div>}
      </div>

      {/* Star sign */}
      <div style={{marginBottom:6}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{fontSize:11,color:"rgba(255,215,0,0.5)",letterSpacing:3}}>♈ {T("选择星座","Star Sign")}</div>
          <div style={{fontSize:10,color:"rgba(255,215,0,0.28)"}}>{T("可选","optional")}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:7}}>
          {STAR_SIGNS.map(s=>(
            <button key={s.en} className={`g${star?.en===s.en?" sel":""}`} onClick={()=>setStar(star?.en===s.en?null:s)}>
              <div style={{fontSize:18}}>{s.emoji}</div>
              <div style={{fontSize:10,marginTop:2}}>{lang==="zh"?s.zh:s.en.slice(0,3)}</div>
            </button>
          ))}
        </div>
        {star&&<div style={{textAlign:"center",fontSize:11,color:"rgba(255,215,0,0.38)",marginTop:6}}>{lang==="zh"?star.zh:star.en} · {star.dates}</div>}
      </div>

      {/* Chinese zodiac — collapsible manual override */}
      <div style={{marginBottom:22,marginTop:10}}>
        <button onClick={()=>setShowZodiac(v=>!v)} style={{width:"100%",background:"rgba(255,215,0,0.04)",border:"1px dashed rgba(255,215,0,0.2)",borderRadius:12,padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:11,color:"rgba(255,215,0,0.35)"}}>{T("手动选择属相","Manually pick Chinese zodiac")} {zodiac?`(${lang==="zh"?zodiac.zh:zodiac.en})`:""}</div>
          <span style={{color:"rgba(255,215,0,0.3)",fontSize:12}}>{showZodiac?"▲":"▼"}</span>
        </button>
        {showZodiac&&(
          <div style={{marginTop:8,animation:"fu .3s both"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:7}}>
              {CHINESE_ZODIAC.map(z=>(
                <button key={z.en} className={`g${zodiac?.en===z.en?" sel":""}`} onClick={()=>setZodiac(zodiac?.en===z.en?null:z)}>
                  <div style={{fontSize:18}}>{z.emoji}</div>
                  <div style={{fontSize:10,marginTop:2}}>{lang==="zh"?z.zh:z.en.slice(0,3)}</div>
                  <div style={{fontSize:9,opacity:.4}}>{z.years.split(",")[0]}…</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{textAlign:"center"}}>
        <button className="rb" onClick={reveal}>✨ {T("开启今日好运","Reveal My Fortune")} ✨</button>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.25)",marginTop:8}}>
          {[name,star,zodiac,birthYear].some(Boolean)
            ?T("已填写个人信息，运势更精准","Personal info added — your reading will be more accurate")
            :T("无需填写也可直接开始！","No info needed — just tap to begin!")}
        </div>
      </div>
    </div>
  );

  // ── Results ──
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>

        {/* Lucky number */}
        <div className="cd" style={{background:"linear-gradient(135deg,#7B0D0D,#B52020)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          {sparkle&&Array.from({length:10},(_,i)=>(
            <div key={i} style={{position:"absolute",left:`${10+i*9}%`,bottom:"10%",fontSize:10+i%3*4,animation:`rise .9s ${i*.08}s ease-out forwards`,pointerEvents:"none"}}>✨</div>
          ))}
          <div style={{fontSize:11,color:"rgba(255,215,0,0.55)",letterSpacing:2,marginBottom:6}}>{T("幸运数字","LUCKY NUMBER")}</div>
          <div style={{fontSize:62,fontWeight:900,color:"#FFD700",lineHeight:1,fontFamily:"serif",animation:"numPop .6s cubic-bezier(.34,1.56,.64,1) both"}}>{lucky.num}</div>
          <div style={{fontSize:10,color:"rgba(255,215,0,0.3)",marginTop:4}}>{T("今日专属数字","Your number for today")}</div>
        </div>

        {/* Lucky color */}
        <div className="cd" style={{background:"linear-gradient(135deg,#7B0D0D,#B52020)",textAlign:"center"}}>
          <div style={{fontSize:11,color:"rgba(255,215,0,0.55)",letterSpacing:2,marginBottom:10}}>{T("幸运颜色","LUCKY COLOR")}</div>
          <div style={{width:52,height:52,borderRadius:"50%",background:lucky.color.hex,margin:"0 auto 8px",border:"2.5px solid rgba(255,215,0,0.45)",boxShadow:`0 0 24px ${lucky.color.hex}aa`,animation:"colorGlow 2s ease-in-out infinite alternate"}}/>
          <div style={{fontSize:14,fontWeight:700,color:"#FFD700"}}>{lang==="zh"?lucky.color.zh:lucky.color.en}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",marginTop:4,lineHeight:1.4}}>{lang==="zh"?lucky.color.mzh:lucky.color.men}</div>
        </div>
      </div>

      {/* Compass */}
      <div className="cd" style={{background:"linear-gradient(135deg,#0d1a2e,#0a1528)"}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.55)",letterSpacing:2,marginBottom:12,textAlign:"center"}}>{T("幸运方位","LUCKY DIRECTION")}</div>
        <div style={{display:"flex",alignItems:"center",gap:20,justifyContent:"center"}}>
          <Compass dir={lucky.dir}/>
          <div>
            <div style={{fontSize:28,fontWeight:900,color:"#FFD700",lineHeight:1}}>{lang==="zh"?lucky.dir.zh:lucky.dir.en}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginTop:8,lineHeight:1.7}}>
              {T(`今日面朝${lucky.dir.zh}方\n财运事业双丰收`,`Face ${lucky.dir.en} today\nfor wealth & career luck`)}
            </div>
          </div>
        </div>
      </div>

      {/* Fortune */}
      <div className="cd" style={{background:"linear-gradient(135deg,#3B0D1E,#6B1228)"}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.55)",letterSpacing:2,marginBottom:10}}>{T("今日箴言","TODAY'S FORTUNE")}</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,0.82)",lineHeight:1.9,fontStyle:"italic"}}>
          「{lang==="zh"?FORTUNES[lucky.fortIdx].zh:FORTUNES[lucky.fortIdx].en}」
        </div>
      </div>

      <AdBanner lang={lang} noAds={noAds}/>

      {/* AI horoscope */}
      <div className="cd" style={{background:"linear-gradient(135deg,#0F1E45,#0a1230)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:star?30:22}}>{star?star.emoji:"🔮"}</span>
          {zodiac&&<span style={{fontSize:26}}>{zodiac.emoji}</span>}
          <div style={{marginLeft:4}}>
            <div style={{fontSize:14,fontWeight:700,color:"#FFD700"}}>
              {lang==="zh"
                ?([name,star?star.zh:null,zodiac?`属${zodiac.zh}`:null].filter(Boolean).join(" · ")||"今日运势")
                :([name,star?star.en:null,zodiac?`Year of ${zodiac.en}`:null].filter(Boolean).join(" · ")||"Your Daily Fortune")}
            </div>
            <div style={{fontSize:11,color:"rgba(255,215,0,0.38)"}}>{T("AI运势推算","AI-Powered Horoscope")}</div>
          </div>
        </div>
        {loading?(
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{display:"flex",gap:8,justifyContent:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#FFD700",animation:`bo .7s ${i*.18}s ease-in-out infinite`}}/>)}
            </div>
            <div style={{fontSize:12,color:"rgba(255,215,0,0.38)",marginTop:10}}>{T("星象推算中…","Reading the stars…")}</div>
          </div>
        ):(
          <div style={{fontSize:14,color:"rgba(255,255,255,0.82)",lineHeight:1.9}}>{horoscope}</div>
        )}
      </div>

      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button className="sb" onClick={reset}>↩ {T("重新开始","Start Over")}</button>
        <button className="sb" onClick={()=>setShowShare(true)} style={{borderColor:"rgba(255,215,0,0.4)",color:"rgba(255,215,0,0.7)"}}>
          📤 {T("分享运势","Share Fortune")}
        </button>
      </div>

      {showShare&&<ShareModal lucky={lucky} horoscope={horoscope} star={star} zodiac={zodiac} name={name} birthYear={birthYear} lang={lang} T={T} onClose={()=>setShowShare(false)}/>}
    </div>
  );
}

// ─── LOTTERY TAB ─────────────────────────────────────────────────────────────
function LotteryTab({ lang, T, noAds, isPremium, luckyNum }) {
  const [sel,  setSel]  = useState(null);
  const [nums, setNums] = useState(null);
  const d = new Date(), seed = d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()+42;
  const generate = () => setNums(genLotteryNums(sel,seed+LOTTERY_GAMES.findIndex(g=>g.id===sel.id)*77,luckyNum));
  const isLight = (hex) => ["#FFD700","#F4B942","#D4C9B8"].includes(hex);

  return (
    <div>
      <AdBanner lang={lang} noAds={noAds}/>
      {luckyNum&&(
        <div style={{background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.25)",borderRadius:12,padding:"10px 14px",marginTop:8,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>🔗</span>
          <div style={{fontSize:12,color:"rgba(255,215,0,0.7)",lineHeight:1.6}}>
            {T(`今日幸运数字 ${luckyNum} 将融入号码推算中`,`Your lucky number ${luckyNum} from today's reading is woven into the picks`)}
          </div>
        </div>
      )}
      <div style={{fontSize:11,color:"rgba(255,215,0,0.5)",letterSpacing:3,textAlign:"center",marginBottom:14,marginTop:14}}>
        🎰 {T("选择彩票类型","Select Lottery Game")}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
        {LOTTERY_GAMES.map(g=>{
          const locked=!isPremium&&g.id!=="mega"&&g.id!=="power";
          return(
            <button key={g.id} className={`g${sel?.id===g.id?" sel":""}`}
              onClick={()=>locked?alert(T("$0.99解锁全部彩票！","Unlock all games for $0.99!")):setSel(g)}
              style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",textAlign:"left",opacity:locked?.55:1}}>
              <span style={{fontSize:20}}>{g.flag}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600}}>{g.name}</div>
                <div style={{fontSize:11,opacity:.55}}>
                  {g.digits?`${g.digits} digits (0–9)`:`${g.main.count} from ${g.main.min}–${g.main.max}${g.bonus?` + ${g.bonus.count} ${g.bonus.label}`:""}`}
                </div>
              </div>
              {locked
                ?<span style={{fontSize:11,background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.28)",borderRadius:6,padding:"2px 8px",color:"#FFD700"}}>🔒 $0.99</span>
                :sel?.id===g.id&&<span style={{fontSize:16,color:"#FFD700"}}>✓</span>}
            </button>
          );
        })}
      </div>
      {sel&&(
        <div>
          <div style={{textAlign:"center",marginBottom:16}}>
            <button className="rb" onClick={generate}>✨ {T("生成幸运号码","Generate Lucky Numbers")} ✨</button>
          </div>
          {nums&&(
            <div className="cd" style={{background:"linear-gradient(135deg,#0d1a2e,#0a1528)",textAlign:"center"}}>
              <div style={{fontSize:11,color:"rgba(255,215,0,0.55)",letterSpacing:2,marginBottom:4}}>{sel.flag} {sel.name}</div>
              <div style={{fontSize:11,color:"rgba(255,215,0,0.35)",marginBottom:14}}>{T("今日幸运号码","Today's Lucky Numbers")}</div>
              {sel.digits?(
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                  {nums.main.map((n,i)=>(
                    <div key={i} style={{width:52,height:52,borderRadius:10,background:"#7B0D0D",border:"2px solid #FFD700",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:22,color:"#FFD700",animation:`pi .35s ${i*.08}s both`}}>{n}</div>
                  ))}
                </div>
              ):(
                <div>
                  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:nums.bonus?.length?12:0}}>
                    {nums.main.map((n,i)=>{
                      const isAnchor=nums.anchorIdx===i;
                      return(
                        <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                          <div style={{width:44,height:44,borderRadius:"50%",background:sel.main.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,color:isLight(sel.main.color)?"#1a0a0a":"#fff",boxShadow:isAnchor?`0 0 16px #FFD700,0 0 32px rgba(255,215,0,0.4)`:"0 2px 8px rgba(0,0,0,0.35)",border:isAnchor?"2px solid #FFD700":"none",animation:`pi .35s ${i*.07}s both`}}>{n}</div>
                          {isAnchor&&<div style={{fontSize:8,color:"#FFD700",letterSpacing:.5,animation:"fu .5s .4s both"}}>✨ {T("幸运","LUCKY")}</div>}
                        </div>
                      );
                    })}
                  </div>
                  {nums.bonus?.length>0&&(
                    <div>
                      <div style={{fontSize:11,color:"rgba(255,215,0,0.4)",marginBottom:10}}>+ {sel.bonus.label}</div>
                      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                        {nums.bonus.map((n,i)=>(
                          <div key={i} style={{width:44,height:44,borderRadius:"50%",background:sel.bonus.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,color:isLight(sel.bonus.color)?"#1a0a0a":"#fff",border:"2px solid rgba(255,255,255,0.2)",animation:`pi .4s ${(nums.main.length+i)*.07}s both`}}>{n}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {nums.anchorIdx!==null&&(
                    <div style={{fontSize:11,color:"rgba(255,215,0,0.4)",marginTop:14,fontStyle:"italic"}}>
                      ✨ {T(`✨球来自你的幸运数字 ${luckyNum}，已换算入此游戏范围`,`✨ ball derived from your lucky number ${luckyNum}, mapped to this game's range`)}
                    </div>
                  )}
                </div>
              )}
              <div style={{fontSize:10,color:"rgba(255,215,0,0.2)",marginTop:14}}>{T("纯娱乐 · 不构成投注建议","For entertainment only · Not financial advice")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TAROT TAB ────────────────────────────────────────────────────────────────
function TarotTab({ lang, T, noAds, isPremium }) {
  const [spread,    setSpread]    = useState(null);
  const [drawn,     setDrawn]     = useState([]);
  const [revealed,  setRevealed]  = useState([]);
  const [activePos, setActivePos] = useState(0);
  const [aiReading, setAiReading] = useState("");
  const [aiLoading, setAiLoad]    = useState(false);
  const [particles, setParticles] = useState(null);

  const startSpread = (sp) => {
    if(sp.premium&&!isPremium){alert(T("五张牌展开需要解锁高级版（$0.99）！","5-Card Cross requires Premium ($0.99)!"));return;}
    const shuffled=[...TAROT_DECK].sort(()=>Math.random()-.5).slice(0,sp.count);
    setSpread(sp);setDrawn(shuffled);setRevealed(Array(sp.count).fill(false));setActivePos(0);setAiReading("");
  };

  const flipCard=(i)=>{
    if(i!==activePos)return;
    const nr=[...revealed];nr[i]=true;
    setRevealed(nr);setActivePos(i+1);
    setParticles(i);setTimeout(()=>setParticles(null),1000);
  };

  const reset=()=>{setSpread(null);setDrawn([]);setRevealed([]);setActivePos(0);setAiReading("");setAiLoad(false);};

  const getAIReading=async()=>{
    setAiLoad(true);
    const positions=lang==="zh"?spread.pos_zh:spread.pos_en;
    try  {setAiReading(await callGroqTarot(drawn,positions,lang));}
    catch{setAiReading(T("牌面相互呼应，命运正在展开。","The cards speak in harmony."));}
    finally{setAiLoad(false);}
  };

  const allRevealed=revealed.length>0&&revealed.every(Boolean);
  const positions=spread?(lang==="zh"?spread.pos_zh:spread.pos_en):[];

  if(!spread) return(
    <div>
      <AdBanner lang={lang} noAds={noAds}/>
      <div style={{textAlign:"center",marginTop:20,marginBottom:16}}>
        <div style={{fontSize:16,fontWeight:700,color:"#FFD700",marginBottom:6}}>{T("塔罗牌阅读","Tarot Reading")}</div>
        <div style={{fontSize:12,color:"rgba(255,215,0,0.45)",lineHeight:1.7}}>{T("从22张大阿尔卡纳牌中，\n揭示你的命运轨迹。","Draw from the 22 Major Arcana cards\nto illuminate your path.")}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        {SPREADS.map(sp=>(
          <button key={sp.id} onClick={()=>startSpread(sp)} className="g" style={{padding:"16px 18px",display:"flex",alignItems:"center",gap:14,textAlign:"left",opacity:sp.premium&&!isPremium?.85:1}}>
            <div style={{fontSize:26}}>{sp.id==="three"?"🃏":"🎴"}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:"#FFD700"}}>{lang==="zh"?sp.name_zh:sp.name_en}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",marginTop:2}}>{lang==="zh"?sp.pos_zh.join(" · "):sp.pos_en.join(" · ")}</div>
              {sp.premium&&<div style={{fontSize:10,color:"rgba(255,215,0,0.4)",marginTop:4}}>✨ {T("含AI解读","Includes AI Reading")} · {isPremium?T("已解锁","Unlocked"):"$0.99"}</div>}
            </div>
            {sp.premium&&!isPremium&&<span style={{fontSize:16}}>🔒</span>}
          </button>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:8}}>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.3)",letterSpacing:2,marginBottom:12}}>{T("大阿尔卡纳 · 22张","MAJOR ARCANA · 22 CARDS")}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
          {TAROT_DECK.map(c=>(
            <div key={c.id} title={lang==="zh"?c.zh:c.en}
              style={{width:32,height:44,borderRadius:6,background:c.bg,border:`1px solid ${c.border}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"transform .2s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px) scale(1.08)"}
              onMouseLeave={e=>e.currentTarget.style.transform=""}>
              {c.emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return(
    <div>
      <AdBanner lang={lang} noAds={noAds}/>
      <div style={{textAlign:"center",marginBottom:16,marginTop:14}}>
        <div style={{fontSize:13,fontWeight:700,color:"#FFD700"}}>{lang==="zh"?spread.name_zh:spread.name_en}</div>
        <div style={{fontSize:11,color:"rgba(255,215,0,0.4)",marginTop:3}}>
          {allRevealed?T("✨ 牌阵已揭示","✨ Spread revealed"):T(`点击第 ${activePos+1} 张牌揭示`,`Tap card ${activePos+1} to reveal`)}
        </div>
      </div>

      {/* Cards */}
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
        {drawn.map((card,i)=>{
          const up=revealed[i],isNext=i===activePos&&!up;
          return(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div style={{fontSize:9,color:up?"rgba(255,215,0,0.6)":"rgba(255,215,0,0.25)",letterSpacing:1,textTransform:"uppercase"}}>{positions[i]}</div>
              <div onClick={()=>flipCard(i)} style={{width:62,height:96,cursor:isNext?"pointer":"default",perspective:"600px",position:"relative"}}>
                {particles===i&&Array.from({length:8},(_,p)=>(
                  <div key={p} style={{position:"absolute",left:`${15+p*9}%`,bottom:"5%",fontSize:10+p%3*5,pointerEvents:"none",zIndex:10,animation:`rise .9s ${p*.06}s ease-out forwards`}}>
                    {["✨","⭐","💫","🌟"][p%4]}
                  </div>
                ))}
                <div style={{position:"absolute",inset:0,transition:"transform .7s cubic-bezier(.4,0,.2,1)",transformStyle:"preserve-3d",transform:up?"rotateY(180deg)":"none"}}>
                  <div style={{position:"absolute",inset:0,borderRadius:10,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",background:"linear-gradient(135deg,#7B0D0D,#4a0a0a)",border:`2px solid ${isNext?"#FFD700":"rgba(255,215,0,0.22)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:isNext?"0 0 16px rgba(255,215,0,0.4)":"none",animation:isNext?"pu 2s ease-in-out infinite":"none"}}>🎴</div>
                  <div style={{position:"absolute",inset:0,borderRadius:10,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",background:`linear-gradient(160deg,${card.bg},${card.bg}ee)`,border:`2px solid ${card.border}`,transform:"rotateY(180deg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,padding:5}}>
                    <div style={{fontSize:22}}>{card.emoji}</div>
                    <div style={{fontSize:8,fontWeight:700,color:card.border,textAlign:"center",letterSpacing:.3,lineHeight:1.3}}>{lang==="zh"?card.zh:card.en.replace(" ","\n")}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card meanings */}
      {revealed.some(Boolean)&&(
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
          {drawn.map((card,i)=>!revealed[i]?null:(
            <div key={i} className="cd" style={{background:`linear-gradient(135deg,${card.bg},${card.bg}cc)`,border:`1.5px solid ${card.border}44`,animation:`fu .4s ${i*.08}s both`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>{card.emoji}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:card.border}}>{lang==="zh"?card.zh:card.en}</div>
                  <div style={{fontSize:10,color:"rgba(255,215,0,0.4)"}}>{positions[i]}</div>
                </div>
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",lineHeight:1.7}}>{lang==="zh"?card.mzh:card.men}</div>
            </div>
          ))}
        </div>
      )}

      {/* AI reading */}
      {allRevealed&&(
        <div className="cd" style={{background:"linear-gradient(135deg,#0a0820,#140a2a)",border:"1.5px solid rgba(150,100,255,0.3)",marginBottom:14}}>
          <div style={{fontSize:11,color:"rgba(180,130,255,0.6)",letterSpacing:2,marginBottom:10}}>🔮 {T("AI塔罗解读","AI Tarot Reading")}</div>
          {aiReading?(
            <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",lineHeight:1.9}}>{aiReading}</div>
          ):aiLoading?(
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#8B5CF6",animation:`bo .7s ${i*.18}s ease-in-out infinite`}}/>)}
              </div>
              <div style={{fontSize:12,color:"rgba(180,130,255,0.5)",marginTop:10}}>{T("解读牌阵中…","Interpreting your spread…")}</div>
            </div>
          ):isPremium?(
            <button onClick={getAIReading} className="rb" style={{width:"100%",background:"linear-gradient(135deg,#6B21A8,#4C1D95)",boxShadow:"0 6px 24px rgba(139,92,246,0.4)"}}>
              ✨ {T("获取AI解读","Get AI Reading")} ✨
            </button>
          ):(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:12,color:"rgba(180,130,255,0.6)",marginBottom:12,lineHeight:1.7}}>{T("解锁高级版获取完整AI解读","Unlock Premium for a full AI interpretation of your spread")}</div>
              <div style={{fontSize:11,color:"rgba(255,215,0,0.3)",fontStyle:"italic"}}>{T("以下每张牌的基本含义供免费参考 ↑","Basic meanings shown above are free ↑")}</div>
            </div>
          )}
        </div>
      )}

      <div style={{textAlign:"center"}}>
        <button className="sb" onClick={reset}>↩ {T("重新洗牌","New Reading")}</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,      setLang]      = useState(()=>{ try{return localStorage.getItem("lkd_lang")||"zh";}catch{return"zh";} });
  const [tab,       setTab]       = useState("fortune");
  const [isPremium, setIsPremium] = useState(()=>{ try{return localStorage.getItem("yld_premium")==="1";}catch{return false;} });
  const [luckyNum,  setLuckyNum]  = useState(null);
  const [savedName]               = useState(()=>{ try{return localStorage.getItem("lkd_name")||"";}catch{return"";} });
  const [savedYear]               = useState(()=>{ try{return localStorage.getItem("lkd_year")||"";}catch{return"";} });

  useEffect(()=>{ try{localStorage.setItem("lkd_lang",lang);}catch{} },[lang]);

  const T=(zh,en)=>lang==="zh"?zh:en;
  const today=new Date();

  const unlock=()=>{
    // In production: replace with Stripe / payment provider
    setIsPremium(true);
    try{localStorage.setItem("yld_premium","1");}catch{}
    alert(T("感谢支持！🎉 广告已关闭，全部功能已解锁。","Thank you! 🎉 Ads removed & all features unlocked."));
  };

  const TABS=[
    {id:"fortune",icon:"🔮",label:T("今日运势","Fortune")},
    {id:"lottery",icon:"🎱",label:T("幸运彩票","Lottery")},
    {id:"game",   icon:"🎴",label:T("塔罗牌",  "Tarot")  },
  ];

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Cinzel:wght@700&family=Noto+Serif+SC:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{overscroll-behavior-y:contain;}
        @keyframes tw      {0%,100%{opacity:.1;transform:scale(.6)}50%{opacity:.8;transform:scale(1.3)}}
        @keyframes fu      {from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pi      {from{transform:scale(0) rotate(-15deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
        @keyframes bo      {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pu      {0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes rise    {from{transform:translateY(0) scale(1);opacity:1}to{transform:translateY(-70px) scale(0.2);opacity:0}}
        @keyframes numPop  {0%{transform:scale(0) rotate(-10deg);opacity:0}70%{transform:scale(1.18) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes colorGlow{from{box-shadow:0 0 12px currentColor}to{box-shadow:0 0 32px currentColor,0 0 56px currentColor}}
        .g{cursor:pointer;background:rgba(255,215,0,0.06);border:1.5px solid rgba(255,215,0,0.18);border-radius:12px;padding:10px 5px;text-align:center;transition:all .2s;color:rgba(255,215,0,0.65);font-family:inherit;width:100%;}
        .g:hover {background:rgba(255,215,0,0.15);border-color:rgba(255,215,0,0.5);transform:translateY(-2px);}
        .g:active{transform:scale(0.96);}
        .g.sel   {background:rgba(255,215,0,0.22);border-color:#FFD700;box-shadow:0 0 12px rgba(255,215,0,0.28);color:#FFD700;}
        .rb{background:linear-gradient(135deg,#FFD700,#FF8C00);border:none;border-radius:50px;padding:14px 40px;font-size:16px;font-weight:900;color:#3B0D0D;cursor:pointer;transition:all .2s;letter-spacing:2px;box-shadow:0 6px 24px rgba(255,140,0,0.5);font-family:inherit;animation:pu 2.4s ease-in-out infinite;}
        .rb:hover {transform:translateY(-3px) scale(1.04);box-shadow:0 10px 32px rgba(255,140,0,0.7);animation:none;}
        .rb:active{transform:scale(0.97);animation:none;}
        .rb:disabled{opacity:.3;cursor:not-allowed;animation:none;transform:none;}
        .cd{border-radius:20px;padding:20px;border:1.5px solid rgba(255,215,0,0.28);animation:fu .5s both;}
        .sb{background:transparent;border:1.5px solid rgba(255,215,0,0.22);border-radius:50px;padding:9px 22px;font-size:13px;color:rgba(255,215,0,0.6);cursor:pointer;transition:all .2s;font-family:inherit;}
        .sb:hover {border-color:rgba(255,215,0,0.6);color:#FFD700;}
        .sb:active{transform:scale(0.97);}
        .lb{background:transparent;border:1.5px solid rgba(255,215,0,0.22);border-radius:8px;padding:5px 12px;font-size:13px;cursor:pointer;transition:all .15s;font-family:inherit;}
        .lb.on    {background:rgba(255,215,0,0.2);border-color:#FFD700;color:#FFD700;}
        .lb:not(.on){color:rgba(255,215,0,0.4);}
        input::placeholder{color:rgba(255,215,0,0.25);}
        input:focus{border-color:rgba(255,215,0,0.55)!important;box-shadow:0 0 0 3px rgba(255,215,0,0.08);}
      `}</style>

      <div style={{position:"fixed",inset:0,background:"linear-gradient(160deg,#120608 0%,#1e0a0a 45%,#130820 100%)",zIndex:-2}}/>
      <div style={{position:"fixed",inset:0,zIndex:-1,overflow:"hidden",pointerEvents:"none"}}>
        {Array.from({length:40},(_,i)=>({x:(i*37+13)%100,y:(i*53+7)%100,s:(i%4)+1,d:(i*.7)%3})).map((s,i)=>(
          <div key={i} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:"50%",background:"#FFD700",animation:`tw ${2+s.d}s ease-in-out ${s.d}s infinite`}}/>
        ))}
      </div>

      <div style={{maxWidth:540,margin:"0 auto",padding:"0 16px 72px",fontFamily:"'Noto Serif SC',serif",color:"rgba(255,255,255,0.88)"}}>

        {/* Header */}
        <div style={{textAlign:"center",padding:"28px 0 14px",position:"relative"}}>
          <div style={{position:"absolute",top:28,right:0,display:"flex",gap:6}}>
            {["zh","en"].map(l=><button key={l} className={`lb${lang===l?" on":""}`} onClick={()=>setLang(l)}>{l==="zh"?"中文":"EN"}</button>)}
          </div>
          <div style={{fontSize:10,color:"rgba(255,215,0,0.35)",letterSpacing:6}}>✦ ✦ ✦</div>
          <h1 style={{fontSize:"clamp(32px,7vw,52px)",fontWeight:900,margin:"6px 0 4px",color:"#FFD700",fontFamily:"'Ma Shan Zheng','Cinzel',serif",textShadow:"0 0 32px rgba(255,165,0,0.4)",letterSpacing:4}}>
            {T("今日大吉","Your Lucky Day")}
          </h1>
          <div style={{fontSize:10,color:"rgba(255,215,0,0.38)",letterSpacing:4}}>{T("YOUR LUCKY DAY","今日大吉")}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.22)",marginTop:6}}>
            {today.toLocaleDateString(lang==="zh"?"zh-CN":"en-US",{year:"numeric",month:"long",day:"numeric",weekday:"long"})}
          </div>
        </div>

        {/* Premium banner */}
        {!isPremium?(
          <div style={{background:"rgba(255,215,0,0.05)",borderRadius:12,padding:"11px 16px",border:"1px solid rgba(255,215,0,0.18)",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:18}}>✨</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#FFD700"}}>{T("去除广告 · 全部彩票 · 五张牌阵 · AI塔罗解读","Remove Ads · All Lottery · 5-Card Spread · AI Tarot Reading")}</div>
              <div style={{fontSize:10,color:"rgba(255,215,0,0.4)"}}>{T("一次购买，永久使用","One-time purchase · Yours forever")}</div>
            </div>
            <button onClick={unlock} style={{background:"linear-gradient(135deg,#FFD700,#FF8C00)",border:"none",borderRadius:50,padding:"8px 16px",color:"#3B0D0D",fontWeight:900,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
              $0.99
            </button>
          </div>
        ):(
          <div style={{background:"rgba(100,255,100,0.06)",borderRadius:12,padding:"9px 16px",border:"1px solid rgba(100,255,100,0.2)",marginBottom:14,textAlign:"center",fontSize:12,color:"#7EE8A2"}}>
            ✓ {T("已解锁全部功能，感谢支持！","All features unlocked — thank you!")}
          </div>
        )}

        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:18,background:"rgba(0,0,0,0.28)",borderRadius:14,padding:5}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flex:1,padding:"9px 6px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",
              background:  tab===t.id?"rgba(255,215,0,0.18)":"transparent",
              color:       tab===t.id?"#FFD700":"rgba(255,215,0,0.42)",
              fontSize:11,fontWeight:tab===t.id?700:400,transition:"all .2s",
              borderBottom:tab===t.id?"2px solid #FFD700":"2px solid transparent",
            }}>
              <div style={{fontSize:16,marginBottom:2}}>{t.icon}</div>
              {t.label}
            </button>
          ))}
        </div>

        {tab==="fortune"&&<FortuneTab lang={lang} T={T} noAds={isPremium} savedName={savedName} savedBirthYear={savedYear} onLucky={setLuckyNum}/>}
        {tab==="lottery"&&<LotteryTab lang={lang} T={T} noAds={isPremium} isPremium={isPremium} luckyNum={luckyNum}/>}
        {tab==="game"   &&<TarotTab   lang={lang} T={T} noAds={isPremium} isPremium={isPremium}/>}

        <div style={{textAlign:"center",marginTop:32,fontSize:10,color:"rgba(255,255,255,0.12)",letterSpacing:2,lineHeight:2}}>
          {T("纯娱乐性质 · 仅供参考 · 请勿当真","For entertainment only · All in good fun")}<br/>
          © {today.getFullYear()} Your Lucky Day · 今日大吉
        </div>
      </div>
    </>
  );
}