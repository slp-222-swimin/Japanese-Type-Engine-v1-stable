import { JPTEEngine } from 'https://cdn.jsdelivr.net/gh/slp-222-swimin/Japanese-Type-Engine-v1-stable/src/index.js';

// --- Word Data List ---
// format: { kana: string, kanji: string }
const WORD_LIST = {
    length2: [
        { kana: "あめ", kanji: "雨" }, { kana: "いぬ", kanji: "犬" }, { kana: "ねこ", kanji: "猫" }, { kana: "ほん", kanji: "本" },
        { kana: "そら", kanji: "空" }, { kana: "やま", kanji: "山" }, { kana: "かわ", kanji: "川" }, { kana: "うみ", kanji: "海" },
        { kana: "かぜ", kanji: "風" }, { kana: "つき", kanji: "月" }, { kana: "はな", kanji: "花" }, { kana: "もり", kanji: "森" },
        { kana: "ゆき", kanji: "雪" }, { kana: "ほし", kanji: "星" }, { kana: "とり", kanji: "鳥" }, { kana: "ゆめ", kanji: "夢" },
        { kana: "なつ", kanji: "夏" }, { kana: "ふゆ", kanji: "冬" }, { kana: "あき", kanji: "秋" }, { kana: "はる", kanji: "春" },
        { kana: "かみ", kanji: "神" }, { kana: "ひと", kanji: "人" }, { kana: "きぬ", kanji: "絹" }, { kana: "とき", kanji: "時" },
        { kana: "こえ", kanji: "声" }, { kana: "いろ", kanji: "色" }, { kana: "みち", kanji: "道" }, { kana: "かね", kanji: "金" },
        { kana: "しろ", kanji: "城" }, { kana: "たび", kanji: "旅" },
        { kana: "くも", kanji: "雲" }, { kana: "かめ", kanji: "亀" }, { kana: "かご", kanji: "籠" }, { kana: "まど", kanji: "窓" },
        { kana: "いす", kanji: "椅子" }, { kana: "かぎ", kanji: "鍵" }, { kana: "はた", kanji: "旗" }, { kana: "うた", kanji: "歌" },
        { kana: "おと", kanji: "音" },
    ],
    length3: [
        { kana: "さくら", kanji: "桜" }, { kana: "みらい", kanji: "未来" }, { kana: "きぼう", kanji: "希望" }, { kana: "うちゅう", kanji: "宇宙" },
        { kana: "こころ", kanji: "心" }, { kana: "いのち", kanji: "命" }, { kana: "きずな", kanji: "絆" }, { kana: "かがみ", kanji: "鏡" },
        { kana: "めがね", kanji: "眼鏡" }, { kana: "ひかり", kanji: "光" }, { kana: "せかい", kanji: "世界" }, { kana: "てんき", kanji: "天気" },
        { kana: "くるま", kanji: "車" }, { kana: "りんご", kanji: "林檎" }, { kana: "みかん", kanji: "蜜柑" }, { kana: "とけい", kanji: "時計" },
        { kana: "つくえ", kanji: "机" }, { kana: "かばん", kanji: "鞄" }, { kana: "ぴあの", kanji: "ピアノ" }, { kana: "てがみ", kanji: "手紙" },
        { kana: "きせつ", kanji: "季節" }, { kana: "れきし", kanji: "歴史" }, { kana: "まほう", kanji: "魔法" }, { kana: "おしろ", kanji: "お城" },
        { kana: "こおり", kanji: "氷" }, { kana: "かもめ", kanji: "かもめ" }, { kana: "つばめ", kanji: "燕" }, { kana: "すずめ", kanji: "雀" },
        { kana: "あらし", kanji: "嵐" }, { kana: "しずく", kanji: "雫" },
        { kana: "ことば", kanji: "言葉" }, { kana: "みかい", kanji: "未開" }, { kana: "とうき", kanji: "陶器" }, { kana: "すてき", kanji: "素敵" },
        { kana: "みらい", kanji: "未来" }, { kana: "くずは", kanji: "葛葉" }, { kana: "こあら", kanji: "コアラ" }, { kana: "からす", kanji: "鴉" },
        { kana: "たぬき", kanji: "狸" }, { kana: "きつね", kanji: "狐" }
    ],
    length4: [
        { kana: "しんらい", kanji: "信頼" }, { kana: "どりょく", kanji: "努力" }, { kana: "かんしゃ", kanji: "感謝" }, { kana: "ぼうけん", kanji: "冒険" },
        { kana: "せんべつ", kanji: "選別" }, { kana: "へいこう", kanji: "平行" }, { kana: "えんぴつ", kanji: "鉛筆" }, { kana: "のぶなが", kanji: "信長" },
        { kana: "しょくじ", kanji: "食事" }, { kana: "せんせい", kanji: "先生" }, { kana: "でんしゃ", kanji: "電車" }, { kana: "ゆうびん", kanji: "郵便" },
        { kana: "おんがく", kanji: "音楽" }, { kana: "しゃしん", kanji: "写真" }, { kana: "ともだち", kanji: "友達" }, { kana: "きょねん", kanji: "去年" },
        { kana: "らいねん", kanji: "来年" }, { kana: "せんげつ", kanji: "先月" }, { kana: "こんげつ", kanji: "今月" }, { kana: "らいげつ", kanji: "来月" },
        { kana: "たいこう", kanji: "対抗" }, { kana: "べんとう", kanji: "弁当" }, { kana: "せんたく", kanji: "洗濯" }, { kana: "りょうり", kanji: "料理" },
        { kana: "けっこん", kanji: "結婚" }, { kana: "うんどう", kanji: "運動" }, { kana: "しっぱい", kanji: "失敗" }, { kana: "せいこう", kanji: "成功" },
        { kana: "じゅんび", kanji: "準備" }, { kana: "びょうき", kanji: "病気" }, { kana: "しじゅう", kanji: "始終" }, { kana: "たびびと", kanji: "旅人" }
    ],
    length5: [
        { kana: "ほうせんか", kanji: "ホウセンカ" }, { kana: "ちんこんか", kanji: "鎮魂歌" }, { kana: "えるされむ", kanji: "エルサレム" }, { kana: "ちょべりぐ", kanji: "チョベリグ" },
        { kana: "ついったー", kanji: "ツイッター" }, { kana: "でくのぼう", kanji: "デクノボウ" }, { kana: "くれじっと", kanji: "クレジット" }, { kana: "きょうすき", kanji: "今日好き" },
        { kana: "しんごうき", kanji: "信号機" }, { kana: "としょかん", kanji: "図書館" }, { kana: "れいぞうこ", kanji: "冷蔵庫" }, { kana: "せんたくき", kanji: "洗濯機" },
        { kana: "でんわばん", kanji: "電話番" }, { kana: "おんがくか", kanji: "音楽家" }, { kana: "ゆうえんち", kanji: "遊園地" }, { kana: "なつやすみ", kanji: "夏休み" },
        { kana: "はるやすみ", kanji: "春休み" }, { kana: "ふゆやすみ", kanji: "冬休み" }, { kana: "ひるごはん", kanji: "昼ご飯" }, { kana: "よるごはん", kanji: "夜ご飯" },
        { kana: "てらわろす", kanji: "テラワロス" }, { kana: "ぬるぽがっ", kanji: "ぬるぽガッ" }, { kana: "ぐぐれかす", kanji: "ggrks" }, { kana: "はんとしろむ", kanji: "半年ROM" },
        { kana: "しょぼーん", kanji: "（´・ω・｀）" },
        { kana: "あきはばら", kanji: "秋葉原" }, { kana: "しゅんかしゅうとう", kanji: "春夏秋冬" }, { kana: "ふんいき", kanji: "雰囲気" }, { kana: "じゃんけん", kanji: "じゃんけん" },
        { kana: "えきすとら", kanji: "エキストラ" }, { kana: "あどばいす", kanji: "アドバイス" }, { kana: "しなもん", kanji: "シナモン" }, { kana: "くりあんす", kanji: "クリアンス" },
        { kana: "かみひこうき", kanji: "紙飛行機" }, { kana: "つきみうどん", kanji: "月見うどん" }
    ],
    length6: [
        { kana: "せいぶつがく", kanji: "生物学" }, { kana: "かくちょうし", kanji: "拡張子" }, { kana: "たいけんだん", kanji: "体験談" }, { kana: "こねくしょん", kanji: "コネクション" },
        { kana: "そうぞうしん", kanji: "創造神" }, { kana: "とうかんかく", kanji: "等間隔" }, { kana: "ですくとっぷ", kanji: "デスクトップ" }, { kana: "ぱらめーたー", kanji: "パラメーター" },
        { kana: "あいきゃっち", kanji: "アイキャッチ" }, { kana: "あうとどあ", kanji: "アウトドア" }, { kana: "あなうんさー", kanji: "アナウンサー" }, { kana: "いらすとれーたー", kanji: "イラストレーター" },
        { kana: "うぉーみんぐ", kanji: "ウォーミング" }, { kana: "えきねっと", kanji: "えきねっと" }, { kana: "おんらいん", kanji: "オンライン" }, { kana: "かたろぐ", kanji: "カタログ" },
        { kana: "かぷせる", kanji: "カプセル" }, { kana: "かれんだー", kanji: "カレンダー" }, { kana: "きーぼーど", kanji: "キーボード" }, { kana: "くりえいたー", kanji: "クリエイター" },
        { kana: "けーきわーく", kanji: "ケーキワーク" }, { kana: "こんぱくと", kanji: "コンパクト" }, { kana: "さーきゅれーたー", kanji: "サーキュレーター" }, { kana: "さーばー", kanji: "サーバー" },
        { kana: "じぇねれーた", kanji: "ジェネレーター" }, { kana: "すまーとふぉん", kanji: "スマートフォン" }, { kana: "せきゅりてぃ", kanji: "セキュリティ" }, { kana: "てくのろじー", kanji: "テクノロジー" },
        { kana: "でぃすぷれい", kanji: "ディスプレイ" }, { kana: "でじたる", kanji: "デジタル" },
        { kana: "いんてりじぇんす", kanji: "インテリジェンス" }, { kana: "あぷりけーしょん", kanji: "アプリケーション" }, { kana: "めあどばれ", kanji: "メアドバレ" }, { kana: "あかうんと", kanji: "アカウント" },
        { kana: "さいばーすぺーす", kanji: "サイバースペース" }, { kana: "はっかー", kanji: "ハッカー" }, { kana: "いんふら", kanji: "インフラ" }, { kana: "めいんてなんす", kanji: "メンテナンス" },
        { kana: "ばっくあっぷ", kanji: "バックアップ" }, { kana: "りかばりー", kanji: "リカバリー" }
    ],
    length7plus: [
        { kana: "わがはいはねこである", kanji: "吾輩は猫である" }, { kana: "なまえはまだない", kanji: "名前はまだ無い" }, { kana: "めろすはげきどした", kanji: "メロスは激怒した" },
        { kana: "じゅげむじゅげむ", kanji: "寿限無寿限無" }, { kana: "しょぎょうむじょう", kanji: "諸行無常" }, { kana: "ぜんぜんぜんせ", kanji: "前前前世" },
        { kana: "となりのととろ", kanji: "となりのトトロ" }, { kana: "とうきょうとっきょきょかきょく", kanji: "東京特許許可局" }, { kana: "にわのにわにはにわにわとりがいる", kanji: "庭の庭には二羽鶏がいる" },
        { kana: "よろしくおねがいいたします", kanji: "よろしくお願いいたします" }, { kana: "もうしわけございません", kanji: "申し訳ございません" }, { kana: "おかえりなさいませ", kanji: "おかえりなさいませ" },
        { kana: "ごちそうさまでした", kanji: "ごちそうさまでした" }, { kana: "なろうけいしゅじんこう", kanji: "なろう系主人公" }, { kana: "どらごんすれいやー", kanji: "ドラゴンスレイヤー" },
        { kana: "はーりーぽったー", kanji: "ハリーポッター" }, { kana: "しゃーろっくほーむず", kanji: "シャーロックホームズ" }, { kana: "かいとうにじゅうめんそう", kanji: "怪盗二十面相" },
        { kana: "なはすべてをあらわす", kanji: "名はすべてを表す" }, { kana: "しんじつはいつもひとつ", kanji: "真実はいつも一つ" }, { kana: "ときをかけるしょうじょ", kanji: "時をかける少女" },
        { kana: "わすれられないひび", kanji: "忘れられない日々" }, { kana: "いんたーねっとえくすぷろーら", kanji: "インターネットエクスプローラ" }, { kana: "じごくのさたもかねしだい", kanji: "地獄の沙汰も金次第" },
        { kana: "きゅうきょくのせんたく", kanji: "究極の選択" }, { kana: "ぜんじどうせんたくき", kanji: "全自動洗濯機" }, { kana: "すうぱーうるとらぐれーと", kanji: "スーパーウルトラグレード" },
        { kana: "たいようのきせつ", kanji: "太陽の季節" }, { kana: "だいちをふみしめて", kanji: "大地を踏みしめて" }, { kana: "げんそうてきなよる", kanji: "幻想的な夜" },
        { kana: "まほうしょうじょ", kanji: "魔法少女" }, { kana: "せいけんのでんせつ", kanji: "聖剣の伝説" }, { kana: "ふめつのたましい", kanji: "不滅の魂" },
        { kana: "なまむぎなまごめなまたまご", kanji: "生麦生米生卵" }, { kana: "ちりもつもればやまとなる", kanji: "塵も積もれば山となる" }, { kana: "いちごいちえのであい", kanji: "一期一会の出会い" },
        { kana: "じこべすとこうしん", kanji: "自己ベスト更新" }, { kana: "たいぴんぐますたー", kanji: "タイピングマスター" }, { kana: "でんせつのぷれいやー", kanji: "伝説のプレイヤー" },
        { kana: "どうしてこうなった", kanji: "どうしてこうなった" }, { kana: "おまえはもうしんでいる", kanji: "お前はもう死んでいる" }, { kana: "しょうにんよっきゅう", kanji: "承認欲求" },
        { kana: "はいはいわろすわろす", kanji: "はいはいワロスワロス" }, { kana: "そんなそうびでだいじょうぶか", kanji: "そんな装備で大丈夫か" }, { kana: "いちばんいいのをたのむ", kanji: "一番いいのを頼む" },
        { kana: "ここからはわたしのたーん", kanji: "ここからは私のターン" }, { kana: "きゅうよめいさいひょう", kanji: "給与明細表" },
        { kana: "にんげんしっかく", kanji: "人間失格" }, { kana: "はしれめろす", kanji: "走れメロス" }, { kana: "てぶくろをかいに", kanji: "手袋を買いに" },
        { kana: "ちゅうもんのおおいりょうりてん", kanji: "注文の多い料理店" }, { kana: "ぎんがてつどうのよる", kanji: "銀河鉄道の夜" }, { kana: "つきがきれいですね", kanji: "月が綺麗ですね" },
        { kana: "あまてらすおおみかみ", kanji: "天照大御神" }, { kana: "いざなぎといざなみ", kanji: "イザナギとイザナミ" }, { kana: "やまたのおろち", kanji: "ヤマタノオロチ" },
        { kana: "せいしょくしゃのつぶやき", kanji: "聖職者の呟き" }, { kana: "かざんのふんか", kanji: "火山の噴火" }, { kana: "ゆびわのものがたり", kanji: "指輪の物語" },
        { kana: "りゅうきゅうおうこく", kanji: "琉球王国" }, { kana: "さよならじんるい", kanji: "さよなら人類" }, { kana: "そらとぶえんばん", kanji: "空飛ぶ円盤" },
        { kana: "ちきゅうはあおかった", kanji: "地球は青かった" }, { kana: "おまえのぱんをたべたかずを", kanji: "お前のパンを食べた数を" },
        { kana: "だがことわる", kanji: "だが断る" }, { kana: "おらおらおらおら", kanji: "オラオラオラオラ" }, { kana: "むだむだむだむだ", kanji: "無駄無駄無駄無駄" },
        { kana: "ひだりてはそえるだけ", kanji: "左手はそえるだけ" }, { kana: "あきらめたらそこでしあいしゅうりょう", kanji: "諦めたらそこで試合終了" },
        { kana: "わらえばいいとおもうよ", kanji: "笑えばいいと思うよ" }, { kana: "にげちゃだめだにげちゃだめだ", kanji: "逃げちゃダメだ逃げちゃダメだ" }, { kana: "みろ！ひとがごみのようだ！", kanji: "見ろ！人がゴミのようだ！" },
        { kana: "ばるす！", kanji: "バルス！" }, { kana: "けいかくどおり", kanji: "計画通り" }, { kana: "うそだっ！", kanji: "嘘だッ！" },
        { kana: "はたらいらたまけだ", kanji: "働いたら負けだ" }, { kana: "それってあなたのかんそうですよね", kanji: "それってあなたの感想ですよね" },
        { kana: "りょういきてんかい", kanji: "領域展開" }, { kana: "むりょうくうしょ", kanji: "無量空処" },
        { kana: "しつもんをしつもんでかえすな", kanji: "質問を質問で返すな" }, { kana: "きみのあいばが！", kanji: "君の愛馬が！" },
        { kana: "なんとかなれー！", kanji: "なんとかなれー！" }, { kana: "ちょうどいちねんまえの", kanji: "ちょうど一年前の" }, { kana: "ちゃーはんつくるよ", kanji: "チャーハン作るよ" },
        { kana: "そすうをかぞえておちつくんだ", kanji: "素数を数えて落ち着くんだ" }, { kana: "おかわいいこと", kanji: "お可愛いこと" }, { kana: "りじっどぼでぃ", kanji: "リジッドボディ" },
        { kana: "すぱいだーまっ！", kanji: "スパイダーマッ！" }, { kana: "おとこのひとっていつもそうですね...！", kanji: "男の人っていつもそうですね...！" }
    ]
};

// --- Game State & Engine Initialization ---
const PROGRESSION_SEQUENCE = [
    { type: 'length2', count: 7 },
    { type: 'length3', count: 7 },
    { type: 'length4', count: 7 },
    { type: 'length5', count: 7 },
    { type: 'length6', count: 7 },
    { type: 'length7plus', count: 20 }
];

let gameState = {
    isPlaying: false,
    timer: 90,
    timerInterval: null,
    score: 0,
    currentConsecutiveKeys: 0,
    currentWordStreak: 0,
    currentWordMistakes: 0,
    progressionIndex: 0,
    currentTypeCount: 0,
    wordPools: {}, // Shuffled copies of WORD_LIST
    bestScore: 0,
    timerStarted: false
};

const engine = new JPTEEngine({
    options: {
        strictNn: true,
        allowBackspace: false, // Disallow backspace to enforce mistake logic
        ignoreSpace: true
    }
});

// --- DOM Elements ---
const UI = {
    screens: {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-container'),
        result: document.getElementById('result-screen')
    },
    timer: document.getElementById('timer-display'),
    score: document.getElementById('score-display'),
    scorePopup: document.getElementById('score-popup'),
    displays: {
        kanji: document.getElementById('kanji-display'),
        kana: document.getElementById('kana-display'),
        typed: document.getElementById('typed-romaji'),
        remaining: document.getElementById('remaining-romaji')
    },
    stats: {
        kpm: document.getElementById('kpm-display'),
        accuracy: document.getElementById('accuracy-display'),
        combo: document.getElementById('combo-display'),
        wordStreak: document.getElementById('word-streak-display')
    },
    sections: {
        typing: document.querySelector('.typing-section'),
        progressFill: document.getElementById('word-progress')
    },
    resultStats: {
        finalScore: document.getElementById('final-score'),
        kpm: document.getElementById('result-kpm'),
        accuracy: document.getElementById('result-accuracy'),
        maxCombo: document.getElementById('result-max-combo'),
        maxWordStreak: document.getElementById('result-max-word-combo'),
        correct: document.getElementById('result-correct'),
        miss: document.getElementById('result-miss')
    },
    buttons: {
        start: document.getElementById('start-btn'),
        restart: document.getElementById('restart-btn')
    }
};

// --- Utility Functions ---
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function adjustFontSize(element, baseSizeRem, containerWidth) {
    element.style.fontSize = `${baseSizeRem}rem`;
    let currentSize = baseSizeRem;
    // Allow up to 0.5rem minimum to avoid unreadable text
    while (element.scrollWidth > containerWidth && currentSize > 0.5) {
        currentSize -= 0.1;
        element.style.fontSize = `${currentSize}rem`;
    }
}

function initWordPools() {
    gameState.wordPools = {};
    for (const key in WORD_LIST) {
        gameState.wordPools[key] = shuffleArray(WORD_LIST[key]);
    }
}

function getNextWord() {
    const currentPhase = PROGRESSION_SEQUENCE[gameState.progressionIndex];
    if (!currentPhase) {
        // Fallback or restart progression if exhausted conceptually
        gameState.progressionIndex = 0;
        return getNextWord();
    }

    const type = currentPhase.type;
    let pool = gameState.wordPools[type];

    // Reshuffle if pool is empty
    if (!pool || pool.length === 0) {
        gameState.wordPools[type] = shuffleArray(WORD_LIST[type]);
        pool = gameState.wordPools[type];
    }

    const word = pool.pop();

    // Advance progression logic
    gameState.currentTypeCount++;
    if (gameState.currentTypeCount >= currentPhase.count) {
        gameState.currentTypeCount = 0;
        gameState.progressionIndex++;
        // If we reach the end of the sequence, loop back
        if (gameState.progressionIndex >= PROGRESSION_SEQUENCE.length) {
            gameState.progressionIndex = 0;
        }
    }

    return word;
}

// --- Audio System ---
let audioCtx = null;
let bgmBuffer = null;
let bgmSource = null;
let bgmGainNode = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Load BGM
async function loadBGM() {
    try {
        const response = await fetch('BGM.ogg');
        const arrayBuffer = await response.arrayBuffer();
        const ctx = getAudioContext();
        bgmBuffer = await ctx.decodeAudioData(arrayBuffer);
        console.log("BGM loaded successfully");
    } catch (e) {
        console.error("Failed to load BGM:", e);
    }
}

function startBGM() {
    if (!bgmBuffer) return;
    const ctx = getAudioContext();

    // Stop if already playing
    stopBGM();

    bgmSource = ctx.createBufferSource();
    bgmSource.buffer = bgmBuffer;
    bgmSource.loop = true;

    bgmGainNode = ctx.createGain();
    bgmGainNode.gain.setValueAtTime(0.125, ctx.currentTime);

    bgmSource.connect(bgmGainNode);
    bgmGainNode.connect(ctx.destination);

    bgmSource.start(0);
}

function stopBGM() {
    if (bgmSource) {
        bgmSource.stop();
        bgmSource = null;
    }
}

// Preload BGM
loadBGM();

function playPopSound() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
}

function playMissSound() {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

function playStartSound() {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [440, 554, 659, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.3, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.3);
    });
}

function playBonusSound() {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.4);
    });
}

function playFinishSound(rankSymbol) {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (rankSymbol === 'X') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(110, now);
        osc1.frequency.exponentialRampToValueAtTime(440, now + 1);
        osc2.frequency.setValueAtTime(165, now);
        osc2.frequency.exponentialRampToValueAtTime(660, now + 1.2);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 2);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(now + 2);
        osc2.stop(now + 2);
    } else if (['SSS', 'SS', 'S'].includes(rankSymbol)) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 1);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 1.5);
    } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.5);
    }
}

function showScorePopup(amount, isSpecial = false) {
    UI.scorePopup.textContent = `+${amount}`;

    // Retrigger animation
    UI.scorePopup.classList.remove('show', 'special');
    void UI.scorePopup.offsetWidth; // Trigger reflow

    if (isSpecial) {
        UI.scorePopup.classList.add('special');
    } else {
        UI.scorePopup.classList.add('show');
    }

    // Bump score text
    UI.score.classList.remove('bump');
    void UI.score.offsetWidth;
    UI.score.classList.add('bump');
    setTimeout(() => {
        UI.score.classList.remove('bump');
    }, 150);
}

function animateCombo() {
    UI.stats.combo.classList.add('combo-pop');
    setTimeout(() => {
        UI.stats.combo.classList.remove('combo-pop');
    }, 150);
}

// --- Game Logic ---

function loadNewWord() {
    const word = getNextWord();
    engine.newWord(word.kana);

    UI.displays.kanji.textContent = word.kanji;
    UI.displays.kana.textContent = word.kana;

    // Initial UI state for the new word
    UI.displays.typed.textContent = "";
    // Grab the initial guide from the engine
    const guide = engine.getShortestRemainingRomaji() || "";
    UI.displays.remaining.textContent = guide;

    // Auto-resize long text to fit in one line
    const containerWidth = UI.sections.typing.offsetWidth * 0.95; // Use 95% of container width
    adjustFontSize(UI.displays.kanji, 3.5, containerWidth);

    updateProgressBar();

    gameState.currentWordMistakes = 0;
}

function updateStatsUI() {
    UI.stats.kpm.textContent = Math.floor(engine.stats.kpm);
    UI.stats.accuracy.textContent = `${(engine.stats.accuracy * 100).toFixed(1)}%`;
    UI.stats.combo.textContent = engine.stats.currentCombo;
    UI.stats.wordStreak.textContent = `${gameState.currentWordStreak} / 5`;
    UI.score.textContent = gameState.score;
}

function calculateRank(score) {
    if (score > 900000) return { symbol: 'X', class: 'rank-x' };
    if (score >= 750000) return { symbol: 'SSS', class: 'rank-sss' };
    if (score >= 600000) return { symbol: 'SS', class: 'rank-ss' };
    if (score >= 525000) return { symbol: 'S', class: 'rank-s' };
    if (score >= 450000) return { symbol: 'A+', class: 'rank-aplus' };
    if (score >= 360000) return { symbol: 'A', class: 'rank-a' };
    if (score >= 300000) return { symbol: 'B+', class: 'rank-bplus' };
    if (score >= 240000) return { symbol: 'B', class: 'rank-b' };
    if (score >= 150000) return { symbol: 'B-', class: 'rank-bminus' };
    if (score >= 90000) return { symbol: 'C+', class: 'rank-cplus' };
    if (score >= 30000) return { symbol: 'C', class: 'rank-c' };
    return { symbol: 'D', class: 'rank-d' };
}

function updateProgressBar(context = null) {
    // If context is not passed, try to estimate from current state
    if (!context) {
        // At start of word, progress is 0
        if (UI.displays.typed.textContent === "") {
            UI.sections.progressFill.style.width = "0%";
            return;
        }
    }

    const totalSegments = UI.displays.kana.textContent.length;
    const completedSegments = context ? (context.segmentIndex || 0) : 0;

    const percent = totalSegments > 0 ? (completedSegments / totalSegments) * 100 : 0;
    UI.sections.progressFill.style.width = `${percent}%`;
}


// --- Event Listeners : JPTE ---

engine.on('correct', (res) => {
    // Start timer on first correct key
    if (!gameState.timerStarted) {
        startTimer();
    }
    
    playPopSound();

    // Calculate Score
    gameState.currentConsecutiveKeys++;

    // Bonus scaling: every 5 consecutive keys = +50 points bonus
    const multiplierLevel = Math.floor((gameState.currentConsecutiveKeys - 1) / 5);
    const addedScore = 100 + (multiplierLevel * 50);

    gameState.score += addedScore;

    showScorePopup(addedScore);
    animateCombo();

    // Update Typing Displays
    UI.displays.typed.textContent = res.currentBuffer;
    UI.displays.remaining.textContent = res.remainingRomaji || "";

    updateStatsUI();
    updateProgressBar(res);
});

engine.on('mistake', (res) => {
    playMissSound();

    // Reset combo/streaks
    gameState.currentConsecutiveKeys = 0;
    gameState.currentWordMistakes++;

    // Visual shake effect
    UI.sections.typing.classList.add('shake');

    // Highlight next expected character in red
    const currentRemaining = UI.displays.remaining.textContent;
    if (currentRemaining.length > 0) {
        const firstChar = currentRemaining[0];
        const rest = currentRemaining.substring(1);
        UI.displays.remaining.innerHTML = `<span class="miss-highlight">${firstChar}</span>${rest}`;
    }

    setTimeout(() => {
        UI.sections.typing.classList.remove('shake');
    }, 200);

    updateStatsUI();
});

engine.on('complete', (stats) => {
    UI.sections.progressFill.style.width = '100%';

    if (gameState.currentWordMistakes === 0) {
        gameState.currentWordStreak++;
        if (gameState.currentWordStreak === 5) {
            // Word Streak Bonus
            gameState.score += 3000;
            showScorePopup(3000, true);
            playBonusSound();
            gameState.currentWordStreak = 0; // Reset after bonus
        }
    } else {
        gameState.currentWordStreak = 0;
    }

    // Update max streak
    if (gameState.currentWordStreak > gameState.maxWordStreakRecord) {
        gameState.maxWordStreakRecord = gameState.currentWordStreak;
    }

    updateStatsUI();

    // Short delay before loading next word for better UX
    setTimeout(loadNewWord, 100);
});


// --- Game Flow Control ---

function startGame() {
    // Reset Engine Stats manually as they are read-only properties in JPTE internally, 
    // but the engine tracks them cumulatively unless we re-instantiate or if the engine provides a reset.
    // For safety, we re-instantiate the engine per game if we can't reset stats natively.
    // But per specification: "エンジンのインスタンスが保持する累計統計データ"
    // Let's reset the public fields.
    engine.stats.kpm = 0;
    engine.stats.accuracy = 1;
    engine.stats.correctCount = 0;
    engine.stats.mistakeCount = 0;
    engine.stats.currentCombo = 0;
    engine.stats.maxCombo = 0;

    gameState = {
        isPlaying: true,
        timer: 90,
        timerInterval: null,
        timerStarted: false,
        score: 0,
        currentConsecutiveKeys: 0,
        currentWordStreak: 0,
        currentWordMistakes: 0,
        progressionIndex: 0,
        currentTypeCount: 0,
        wordPools: {},
        maxWordStreakRecord: 0
    };

    initWordPools();

    // UI Transitions
    UI.screens.start.classList.remove('active');
    UI.screens.result.classList.add('hidden');
    UI.screens.game.classList.remove('hidden');

    UI.timer.parentElement.classList.remove('danger');
    UI.timer.textContent = gameState.timer;

    playStartSound();
    startBGM();

    // Start Data
    loadNewWord();
    updateStatsUI();

    // Note: Timer is NOT started here anymore. 
    // It starts in the first 'correct' engine event.
}

function startTimer() {
    if (gameState.timerStarted) return;
    gameState.timerStarted = true;

    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        UI.timer.textContent = gameState.timer;

        if (gameState.timer <= 10) {
            UI.timer.parentElement.classList.add('danger');
        }

        if (gameState.timer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameState.timerInterval);
    gameState.isPlaying = false;

    // Calculate Rank
    const rankInfo = calculateRank(gameState.score);

    // Play rank-specific finish sound
    playFinishSound(rankInfo.symbol);
    stopBGM();

    // Hide Game, Show Result
    UI.screens.game.classList.add('hidden');
    UI.screens.result.classList.remove('hidden');
    UI.screens.result.classList.add('active');

    // Bind Final Stats
    UI.resultStats.finalScore.textContent = gameState.score;
    UI.resultStats.kpm.textContent = Math.floor(engine.stats.kpm);
    UI.resultStats.accuracy.textContent = `${(engine.stats.accuracy * 100).toFixed(1)}%`;
    UI.resultStats.maxCombo.textContent = engine.stats.maxCombo;
    UI.resultStats.maxWordStreak.textContent = gameState.maxWordStreakRecord;
    UI.resultStats.correct.textContent = engine.stats.correctCount;
    UI.resultStats.miss.textContent = engine.stats.mistakeCount;

    // Rank & Best Score Logic
    const rankSymbolEl = document.getElementById('rank-symbol');
    rankSymbolEl.textContent = rankInfo.symbol;
    rankSymbolEl.className = `rank-symbol ${rankInfo.class}`;

    if (gameState.score > (gameState.bestScore || 0)) {
        gameState.bestScore = gameState.score;
        localStorage.setItem('practype_best_score', gameState.bestScore);
        const bestScoreValEl = document.getElementById('best-score-value');
        if (bestScoreValEl) bestScoreValEl.textContent = gameState.bestScore;
    }
}

function returnToTitle() {
    clearInterval(gameState.timerInterval);
    gameState.isPlaying = false;
    stopBGM();

    // Reset UI to start screen
    UI.screens.game.classList.add('hidden');
    UI.screens.result.classList.add('hidden');
    UI.screens.result.classList.remove('active');
    UI.screens.start.classList.add('active');
}

// --- Global Input Handling ---

window.addEventListener('keydown', (e) => {
    if (e.repeat) return; // Ignore hold

    if (e.key === 'Escape') {
        returnToTitle();
        return;
    }

    if (!gameState.isPlaying) {
        // Allow Space to start if not playing (only on start/result screens)
        if (e.code === 'Space') {
            e.preventDefault();
            startGame();
        }
        return;
    }

    // While playing...
    
    // Disable Space key during gameplay to avoid unintended behavior (JPTE ignoreSpace: true already handles logic)
    if (e.code === 'Space') {
        e.preventDefault();
        return;
    }

    // Forward key to engine
    if (e.key.length === 1 || e.key === 'Backspace') {
        engine.input(e.key);
    }

    // Disable Enter key during gameplay to prevent unexpected behavior (like triggering buttons)
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// Fullscreen handling
document.addEventListener('click', (e) => {
    // Ignore clicks on buttons or links to prevent accidental exit/toggle
    if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A') return;

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Fullscreen error: ${err.message}`);
        });
    }
});

// UI Buttons
UI.buttons.start.addEventListener('click', startGame);
UI.buttons.restart.addEventListener('click', startGame);

// Init on load
const savedBest = localStorage.getItem('practype_best_score');
if (savedBest) {
    gameState.bestScore = parseInt(savedBest, 10);
    document.getElementById('best-score-value').textContent = gameState.bestScore;
}
