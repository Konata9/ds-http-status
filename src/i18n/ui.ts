const en = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  switchLabel: '中文',
  switchLang: 'zh-CN',
  skip: 'Skip to content',
  nav: {
    index: 'Index',
    about: 'About',
  },
  home: {
    title: 'DeepSeek-chan HTTP Status Codes, Illustrated',
    description:
      'Ten HTTP status codes, illustrated by DeepSeek-chan and explained without jargon. 200, 401, 403, 404, 408, 414, 418, 429, 500, and 503, with RFC references and practical fixes.',
    h1: 'Every status code has a face.',
    h1Lines: ['Every status code', 'has a face.'],
    h1LinesNarrow: ['Every status', 'code has a face.'],
    lede: 'Ten HTTP codes, illustrated by DeepSeek-chan and explained without jargon.',
    platesTitle: 'The plates',
    platesNote:
      'Ordered by code. Open a plate for the meaning, the usual causes, and what to do.',
    familiesTitle: 'Three families',
    familiesNote: 'The first digit tells you who is responsible.',
    use: {
      title: 'Use the status image',
      image: 'Image',
      example: 'Example',
    },
  },
  families: {
    outside: '1xx / 3xx: not in this edition.',
  },
  detail: {
    meaningH: 'What does it mean?',
    whenH: 'When does it happen?',
    fixH: 'How do you fix it?',
    serverH: 'If you run the server',
    visitorH: 'If you are just visiting',
    techH: 'Technical notes',
    classLabel: 'Status class',
    rfcLabel: 'RFC',
    cacheableLabel: 'Cacheable by default',
    yes: 'Yes',
    no: 'No',
    headersLabel: 'Common headers',
    relatedH: 'Related plates',
    directH: 'Use the status image',
    imageLabel: 'Image',
    sourcesH: 'Sources',
    previous: 'Previous plate',
    next: 'Next plate',
    backToIndex: 'Back to the index',
    plateLabel: 'Plate',
  },
  about: {
    title: 'About | DeepSeek-chan HTTP Field Guide',
    description:
      'About the DeepSeek-chan HTTP Field Guide: credits, sources, privacy, and the illustrator Fatal1tyV.',
    h1: 'About this guide',
    lede: 'Ten plates, two languages, and a very patient whale.',
    whatH: 'What this is',
    whatP1:
      'This is an unofficial fan project: an illustrated field guide to ten HTTP status codes. The definitions follow RFC 9110, RFC 6585, and RFC 2324, with links to the exact sections on every entry.',
    whatP2:
      "The guide covers only the ten codes illustrated here. It is a reference for readers and developers, not a replacement for the RFCs or your framework's documentation.",
    creditsH: 'Credits and thanks',
    creditsThanks:
      'Thank you, Fatal1tyV. These plates give every status code a face; without them this would be a table of numbers.',
    creditsLinkLabel: 'Fatal1tyV on Xiaohongshu',
    sourcesH: 'Sources',
    sourcesP:
      'Every entry links to its RFC section and MDN page. If a definition here disagrees with the RFC, the RFC wins.',
    privacyH: 'Privacy and technology',
    privacyP:
      'The site is static HTML built with Astro. Text uses the macOS and Windows system fonts, and the illustrations are served from this domain. Google Analytics 4 measures aggregate traffic; it may set cookies and sends usage data to Google. No other third-party scripts run.',
    madeH: 'Made by',
    madeBefore: 'Built and maintained by ',
    madeAfter: '. The source is on GitHub.',
    repoLink: 'View the repository',
  },
  footer: {
    aboutH: 'About',
    aboutP:
      'An unofficial illustrated guide to ten HTTP status codes. Definitions checked against the RFCs.',
    sourcesH: 'Sources',
    machineH: 'Machine-readable',
    unofficial: 'Unofficial fan project. Not affiliated with DeepSeek.',
    credit: 'Illustrations credited in About.',
    edition: 'Edition 1.0',
    llms: 'llms.txt',
    json: 'status.json',
    sitemap: 'Sitemap',
  },
};

const zh: typeof en = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  switchLabel: 'English',
  switchLang: 'en',
  skip: '跳到正文',
  nav: {
    index: '图鉴',
    about: '关于',
  },
  home: {
    title: 'DeepSeek 娘 HTTP 状态图鉴｜十个状态码，十张插画',
    description:
      '用 DeepSeek 娘插画读懂 10 个 HTTP 状态码：200、401、403、404、408、414、418、429、500、503。含中文释义、RFC 出处、常见场景与处理建议。',
    h1: '每个 HTTP 状态码，都有表情。',
    h1Lines: ['每个 HTTP', '状态码，都有表情。'],
    h1LinesNarrow: ['每个 HTTP', '状态码，都有表情。'],
    lede: '十个状态码，由 DeepSeek 娘出演，用人话解释清楚。',
    platesTitle: '图版',
    platesNote: '按状态码排列。点开一张图版，查看含义、常见场景和处理方法。',
    familiesTitle: '三个家族',
    familiesNote: '第一位数字告诉你问题出在哪一方。',
    use: {
      title: '使用状态图片',
      image: '图片',
      example: '示例',
    },
  },
  families: {
    outside: '1xx / 3xx：这一版没有。',
  },
  detail: {
    meaningH: '是什么意思？',
    whenH: '什么时候会出现？',
    fixH: '怎么处理？',
    serverH: '如果你是开发者',
    visitorH: '如果你只是访客',
    techH: '技术信息',
    classLabel: '状态类',
    rfcLabel: 'RFC',
    cacheableLabel: '默认是否可缓存',
    yes: '是',
    no: '否',
    headersLabel: '常见响应头',
    relatedH: '相关状态',
    directH: '使用状态图片',
    imageLabel: '图片',
    sourcesH: '出处',
    previous: '上一张图版',
    next: '下一张图版',
    backToIndex: '返回图鉴',
    plateLabel: '图版',
  },
  about: {
    title: '关于｜DeepSeek 娘 HTTP 状态图鉴',
    description: '关于这本 DeepSeek 娘 HTTP 状态图鉴：插画署名、致谢、出处、隐私说明。',
    h1: '关于这本图鉴',
    lede: '十张图版，两种语言，一只很有耐心的鲸鱼。',
    whatH: '这是什么',
    whatP1:
      '这是一个非官方粉丝项目：十个 HTTP 状态码的插画图鉴。定义依据 RFC 9110、RFC 6585 和 RFC 2324，每一条都给出原文链接。',
    whatP2:
      '这本图鉴只收录这里画出的十个状态码。它是给读者和开发者的参考，不替代 RFC 或你所使用框架的文档。',
    creditsH: '署名与致谢',
    creditsThanks:
      '谢谢 Fatal1tyV。这些图版让每个状态码都有了表情；没有它们，这里只是一张数字表。',
    creditsLinkLabel: 'Fatal1tyV 的小红书主页',
    sourcesH: '出处',
    sourcesP:
      '每个条目都链接到对应的 RFC 章节和 MDN 页面。如果这里的解释和 RFC 不一致，以 RFC 为准。',
    privacyH: '隐私与技术',
    privacyP:
      '本站是用 Astro 构建的静态 HTML。文字使用 macOS 和 Windows 的系统字体，插画由本站域名提供。本站使用 Google Analytics 4 统计访问量，它可能会设置 Cookie 并向 Google 发送使用数据；除此之外不加载其他第三方脚本。',
    madeH: '作者',
    madeBefore: '由 ',
    madeAfter: ' 构建和维护。源码在 GitHub。',
    repoLink: '查看仓库',
  },
  footer: {
    aboutH: '关于',
    aboutP: '十个 HTTP 状态码的非官方插画图鉴。定义对照 RFC 核对。',
    sourcesH: '出处',
    machineH: '机器可读',
    unofficial: '非官方粉丝项目，与 DeepSeek 无关。',
    credit: '插画署名见关于页。',
    edition: '版本 1.0',
    llms: 'llms.txt',
    json: 'status.json',
    sitemap: '站点地图',
  },
};

/** English-only copy for the custom 404 page. */
export const notFoundCopy = {
  title: 'Page not found | DeepSeek-chan HTTP Field Guide',
  description: 'The page you followed does not exist. The HTTP status guide does.',
  h1: 'This page is not in the guide.',
  p: 'The address you followed does not exist. The 404 plate does, and so do the other nine.',
  enLink: 'Go to the English index',
};

export const ui = { en, zh };
