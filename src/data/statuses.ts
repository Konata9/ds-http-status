import type { ImageMetadata } from 'astro';
import { referenceLinks } from './references';
import img100 from '../assets/status/100.png';
import img200 from '../assets/status/200.png';
import img302 from '../assets/status/302.png';
import img304 from '../assets/status/304.png';
import img400 from '../assets/status/400.png';
import img401 from '../assets/status/401.png';
import img402 from '../assets/status/402.png';
import img403 from '../assets/status/403.png';
import img404 from '../assets/status/404.png';
import img408 from '../assets/status/408.png';
import img409 from '../assets/status/409.png';
import img413 from '../assets/status/413.png';
import img414 from '../assets/status/414.png';
import img418 from '../assets/status/418.png';
import img429 from '../assets/status/429.png';
import img451 from '../assets/status/451.png';
import img500 from '../assets/status/500.png';
import img502 from '../assets/status/502.png';
import img503 from '../assets/status/503.png';

export type Locale = 'en' | 'zh';
export type StatusClass = 1 | 2 | 3 | 4 | 5;

export interface Bilingual {
  en: string;
  zh: string;
}

export interface BilingualList {
  en: string[];
  zh: string[];
}

export interface Status {
  code: number;
  plate: string;
  reason: string;
  reasonZh: string;
  class: StatusClass;
  image: ImageMetadata;
  imageAlt: Bilingual;
  card: Bilingual;
  summary: Bilingual;
  lead: Bilingual;
  meaning: BilingualList;
  when: BilingualList;
  server: BilingualList;
  visitor: BilingualList;
  related: Array<{ code: number; note: Bilingual }>;
  tech: {
    rfc: string;
    rfcUrl: string;
    cacheable: boolean;
    headers: string[];
    note?: Bilingual;
  };
  sources: Array<{ label: string; url: string }>;
}

const rfc9110 = (section: string) =>
  `${referenceLinks.rfc9110.url}#section-${section}`;

const mdn = (code: number) => `${referenceLinks.mdnStatus.url}/${code}`;

export const statuses: Status[] = [
  {
    code: 100,
    plate: '01',
    reason: 'Continue',
    reasonZh: '继续',
    class: 1,
    image: img100,
    imageAlt: {
      en: 'DeepSeek-chan reaches eagerly across a table for a steaming bowl of rice being handed to her, with side dishes spread in front of her.',
      zh: 'DeepSeek 娘隔着一张桌子，伸手去接一碗递来的热米饭，面前摆着几碟小菜。',
    },
    card: {
      en: 'Keep going, the server is listening.',
      zh: '继续发，服务器在听。',
    },
    summary: {
      en: 'Interim response: the server has the request so far and wants the rest.',
      zh: '临时响应：服务器已收到请求开头，愿意接收剩余内容。',
    },
    lead: {
      en: '100 Continue is an informational response, not a final one. It means the server has received the initial part of the request and has not rejected it, and is ready for the client to send the rest — usually the body.',
      zh: '100 Continue 是信息响应，不是最终结果。它表示服务器已经收到请求的开头部分，没有拒绝，并且愿意让客户端把剩下的内容（通常是请求正文）发过来。',
    },
    meaning: {
      en: [
        'A 100 response is an interim response. It cannot contain a body, and it is always followed by a final response. A client that did not ask for it may simply discard it.',
        'It is most often tied to the Expect header: a client sends Expect: 100-continue before a large body, and the server answers 100 when it is willing to accept that body.',
      ],
      zh: [
        '100 是临时响应，不能带正文，后面一定还会有一个最终响应。客户端如果没要求过它，直接忽略即可。',
        '它通常和 Expect 头一起用：客户端在发送大正文前带上 Expect: 100-continue，服务器愿意接收时回一个 100。',
      ],
    },
    when: {
      en: [
        'A client sends Expect: 100-continue before a large upload.',
        'A server wants to reject an oversized body before it arrives.',
        'A proxy holds a request while it checks the origin.',
      ],
      zh: [
        '客户端在上传大文件前发送 Expect: 100-continue。',
        '服务器想在正文到达前就拒绝一个过大的请求。',
        '代理在等待源站确认时，先垫一个 100。',
      ],
    },
    server: {
      en: [
        'Do not send 100 to HTTP/1.0 clients; they do not understand 1xx responses.',
        'Use it to reject an unacceptable body early, instead of reading the whole payload first.',
        'Remember 100 is interim; always follow it with a real final status.',
      ],
      zh: [
        '不要给 HTTP/1.0 客户端发 100，它们不理解 1xx 响应。',
        '用它提前拒绝不能接受的正文，而不是先把整个载荷读完。',
        '记住 100 是临时的，后面一定要跟一个真正的最终状态码。',
      ],
    },
    visitor: {
      en: [
        'Nothing to fix. This is a handshake between client and server.',
        'If the request then fails with 413 or 400, the problem is the payload, not the 100.',
      ],
      zh: [
        '不需要处理，这只是客户端和服务器之间的一次握手。',
        '如果之后又返回 413 或 400，问题在载荷，不在这个 100。',
      ],
    },
    related: [
      { code: 200, note: { en: 'The final success that usually follows.', zh: '通常跟在后面的最终成功。' } },
      { code: 413, note: { en: 'The body the server refused to accept.', zh: '服务器拒绝接收的正文。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.2.1',
      rfcUrl: rfc9110('15.2.1'),
      cacheable: false,
      headers: [],
      note: {
        en: 'Interim 1xx response; it must not be sent to an HTTP/1.0 client.',
        zh: '1xx 临时响应；不能发给 HTTP/1.0 客户端。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.2.1', url: rfc9110('15.2.1') },
      { label: 'MDN: 100 Continue', url: mdn(100) },
    ],
  },
  {
    code: 200,
    plate: '02',
    reason: 'OK',
    reasonZh: '成功',
    class: 2,
    image: img200,
    imageAlt: {
      en: 'DeepSeek-chan, a blue-haired whale girl in a maid outfit, happily eating a bowl of rice with sparkles around her.',
      zh: 'DeepSeek 娘穿着女仆装，开心地捧着一碗米饭，周围闪着星光。',
    },
    card: {
      en: 'The request worked.',
      zh: '请求成功。',
    },
    summary: {
      en: 'The request succeeded; the response depends on the method.',
      zh: '请求成功；响应内容取决于请求方法。',
    },
    lead: {
      en: '200 OK means the request succeeded. What comes back depends on the method: a GET returns the resource, a POST returns the result or status of the action, and PUT or DELETE returns the status of the action.',
      zh: '200 OK 表示请求成功。返回什么取决于请求方法：GET 返回资源本身，POST 返回操作结果或状态，PUT 和 DELETE 返回操作状态。',
    },
    meaning: {
      en: [
        'A 200 response is heuristically cacheable unless the method definition or explicit cache headers say otherwise. It is the default success code for a successful GET, but it is not the only correct success code.',
        'The response body is a representation of the target resource for GET and HEAD, the status or result of the action for POST, and the status of the action for PUT and DELETE.',
      ],
      zh: [
        '除非方法定义或缓存头另有说明，200 响应默认可以被启发式缓存。它是 GET 成功时最常用的状态码，但不是唯一正确的成功码。',
        '对 GET 和 HEAD，响应体是目标资源的表示；对 POST，是操作结果或状态；对 PUT 和 DELETE，是操作状态。',
      ],
    },
    when: {
      en: [
        'A page or API resource is returned successfully.',
        'A form submission succeeds and you want to return the result.',
        'A PUT or DELETE completes and you want to confirm it.',
      ],
      zh: [
        '页面或 API 资源成功返回。',
        '表单提交成功，需要返回结果。',
        'PUT 或 DELETE 完成，需要确认操作结果。',
      ],
    },
    server: {
      en: [
        'Use 201 Created when the request created a resource and you can return its URL.',
        'Use 204 No Content when the action succeeded and there is no body to return.',
        'Do not return 200 with an error message in the body. That is a soft error and it breaks clients, caches, and monitoring.',
      ],
      zh: [
        '创建了新资源时用 201 Created，并在 Location 头里给出资源地址。',
        '操作成功但不需要返回内容时用 204 No Content。',
        '不要用 200 包着一个错误信息返回。这种“软错误”会骗过客户端、缓存和监控。',
      ],
    },
    visitor: {
      en: [
        'Nothing to fix. The request worked.',
        'If the page looks wrong, the problem is in the content, not the status code.',
      ],
      zh: [
        '不需要处理，请求成功了。',
        '如果页面内容不对，那是内容的问题，不是状态码的问题。',
      ],
    },
    related: [
      { code: 404, note: { en: 'When the resource is not there.', zh: '资源不存在时。' } },
      { code: 503, note: { en: 'When the server cannot serve it.', zh: '服务器暂时无法提供时。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.3.1',
      rfcUrl: rfc9110('15.3.1'),
      cacheable: true,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.3.1', url: rfc9110('15.3.1') },
      { label: 'MDN: 200 OK', url: mdn(200) },
    ],
  },
  {
    code: 302,
    plate: '03',
    reason: 'Found',
    reasonZh: '临时重定向',
    class: 3,
    image: img302,
    imageAlt: {
      en: 'DeepSeek-chan sits at a new table eating rice, while an arrow points from a table with a no-entry sign toward her.',
      zh: 'DeepSeek 娘换到另一张桌子吃饭，一个箭头从立着禁止标志的旧桌子指向她。',
    },
    card: {
      en: 'Temporarily over there.',
      zh: '暂时在那边。',
    },
    summary: {
      en: 'The resource is temporarily at a different URI.',
      zh: '资源暂时位于另一个 URI。',
    },
    lead: {
      en: '302 Found means the target resource temporarily lives under a different URI. The client should keep using the original URI for future requests; the redirect may change again.',
      zh: '302 Found 表示目标资源暂时移到了另一个 URI。客户端以后仍应使用原来的地址，因为这个跳转可能还会变。',
    },
    meaning: {
      en: [
        'The server should send a Location header with the other URI, and the user agent may follow it automatically. The response body is usually a short note with a link.',
        'For historical reasons, a user agent may rewrite a POST into a GET when it follows a 302. If the method must be preserved, use 307 instead.',
      ],
      zh: [
        '服务器应该用 Location 头给出另一个 URI，浏览器可以自动跳过去。响应正文通常只是一句带链接的提示。',
        '出于历史原因，浏览器跟随 302 时可能把 POST 改成 GET。如果必须保留方法，用 307。',
      ],
    },
    when: {
      en: [
        'A page moves while a redesign is in progress.',
        'A login flow sends a user to a temporary landing page.',
        'A/B testing routes some visitors elsewhere for a while.',
      ],
      zh: [
        '改版期间页面暂时换了位置。',
        '登录流程把用户先送到一个临时落地页。',
        'A/B 测试暂时把部分访客导到别处。',
      ],
    },
    server: {
      en: [
        'Always send Location; a 302 without it leaves the client with nowhere to go.',
        'Use 302 for temporary moves and 301 for permanent ones.',
        'Use 307 (or 308) when the request method must survive the redirect.',
      ],
      zh: [
        '一定要带 Location；没有它的 302 让客户端无处可去。',
        '临时迁移用 302，永久迁移用 301。',
        '需要保留请求方法时用 307（或 308）。',
      ],
    },
    visitor: {
      en: [
        'Follow the redirect; your browser usually does this for you.',
        'If it loops back to the same page, the redirect is misconfigured and the site needs to fix it.',
      ],
      zh: [
        '跟着跳转走就行，浏览器通常会替你完成。',
        '如果又跳回同一页，那是重定向配错了，需要站点来修。',
      ],
    },
    related: [
      { code: 200, note: { en: 'The eventual answer after following it.', zh: '跟随跳转后最终得到的响应。' } },
      { code: 404, note: { en: 'The destination no longer exists.', zh: '跳转目标已经不存在。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.4.3',
      rfcUrl: rfc9110('15.4.3'),
      cacheable: false,
      headers: ['Location'],
      note: {
        en: 'User agents may change POST to GET on a 302.',
        zh: '跟随 302 时，用户代理可能把 POST 改成 GET。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.4.3', url: rfc9110('15.4.3') },
      { label: 'MDN: 302 Found', url: mdn(302) },
    ],
  },
  {
    code: 304,
    plate: '04',
    reason: 'Not Modified',
    reasonZh: '未修改',
    class: 3,
    image: img304,
    imageAlt: {
      en: 'DeepSeek-chan takes a bowl of rice from a refrigerator labelled CACHE, which is packed with identical rice bowls.',
      zh: 'DeepSeek 娘从一个贴着 CACHE 标签、装满米饭碗的冰箱里取出一碗。',
    },
    card: {
      en: 'You already have the latest copy.',
      zh: '你手上的就是最新的。',
    },
    summary: {
      en: 'A conditional request hit; the cached copy is still valid.',
      zh: '条件请求命中，缓存副本仍然有效。',
    },
    lead: {
      en: '304 Not Modified is the answer to a conditional GET or HEAD. The resource has not changed since the version the client already has, so there is nothing new to send.',
      zh: '304 Not Modified 是条件 GET 或 HEAD 的答复。资源自客户端已有的版本以来没有变化，所以没什么可发的。',
    },
    meaning: {
      en: [
        'A 304 has no body. It tells the client to keep using the representation it already stored, as if the server had answered 200 OK.',
        'The server should send the metadata that a 200 would have carried — such as ETag, Cache-Control, and Vary — so the cache can refresh its entry.',
      ],
      zh: [
        '304 没有正文。它让客户端继续使用已经存好的副本，效果等同于服务器回了 200 OK。',
        '服务器应带上 200 会有的元数据，比如 ETag、Cache-Control、Vary，好让缓存更新自己的记录。',
      ],
    },
    when: {
      en: [
        'A browser revalidates a page with If-None-Match or If-Modified-Since.',
        'A CDN checks whether a cached asset is still fresh.',
        'A client polls for updates and gets "no change" back.',
      ],
      zh: [
        '浏览器用 If-None-Match 或 If-Modified-Since 重新校验页面。',
        'CDN 检查缓存资源是否仍然新鲜。',
        '客户端轮询更新，得到“没变化”的答复。',
      ],
    },
    server: {
      en: [
        'Send validators (ETag or Last-Modified) so clients can revalidate instead of re-downloading.',
        'On a 304, echo the same ETag and cache headers a 200 would send.',
        'Do not attach a body to a 304; it will be ignored or treated as an error.',
      ],
      zh: [
        '给响应加校验器（ETag 或 Last-Modified），让客户端能校验而不是重新下载。',
        '返回 304 时，带上 200 会有的 ETag 和缓存头。',
        '304 不要带正文，它会被忽略，甚至被当成错误。',
      ],
    },
    visitor: {
      en: [
        'Nothing to do; your cached copy is still correct.',
        'If content looks stale after a 304, the cache itself is stale; a hard refresh usually fixes it.',
      ],
      zh: [
        '不用做任何事，你缓存里的副本仍然是对的。',
        '如果 304 之后内容还是旧的，那是缓存本身过期了，强制刷新通常能解决。',
      ],
    },
    related: [
      { code: 200, note: { en: 'What you would otherwise receive.', zh: '本来会收到的完整响应。' } },
      { code: 404, note: { en: 'The revalidation target may be gone.', zh: '要校验的资源可能已经不存在。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.4.5',
      rfcUrl: rfc9110('15.4.5'),
      cacheable: false,
      headers: ['ETag', 'Last-Modified', 'Cache-Control'],
      note: {
        en: 'A 304 is not stored as a response; it updates the representation a cache already holds.',
        zh: '304 本身不作为响应缓存，而是更新缓存已有的副本。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.4.5', url: rfc9110('15.4.5') },
      { label: 'MDN: 304 Not Modified', url: mdn(304) },
    ],
  },
  {
    code: 400,
    plate: '05',
    reason: 'Bad Request',
    reasonZh: '错误请求',
    class: 4,
    image: img400,
    imageAlt: {
      en: 'A waiter with an order pad looks bewildered as DeepSeek-chan speaks a stream of garbled characters, a question mark beside her.',
      zh: '服务员拿着点餐板一脸茫然，DeepSeek 娘嘴里吐出一串乱码，旁边打着问号。',
    },
    card: {
      en: 'The request made no sense.',
      zh: '这个请求看不懂。',
    },
    summary: {
      en: 'The server cannot process the request as sent.',
      zh: '服务器无法按原样处理这个请求。',
    },
    lead: {
      en: '400 Bad Request means the server cannot or will not process the request because of something it sees as a client error — malformed syntax, invalid framing, or deceptive request routing.',
      zh: '400 Bad Request 表示服务器因为某个它认定为客户端错误的原因，无法或不愿处理这个请求——语法错误、报文框架无效，或者请求路由有欺骗性。',
    },
    meaning: {
      en: [
        'It is the generic client-side catch-all. Anything the server cannot parse or will not accept, and that has no more specific code, can land here.',
        'The problem is usually in the request line, headers, or body — not in the server. Retrying the same malformed request will keep failing.',
      ],
      zh: [
        '它是客户端错误的通用兜底。凡是服务器解析不了、又没有更具体状态码的请求，都可能落到这里。',
        '问题通常出在请求行、请求头或正文，而不是服务器。原样重试这个有毛病的请求还是会失败。',
      ],
    },
    when: {
      en: [
        'A request line or header is malformed.',
        'A body is corrupt, truncated, or the wrong encoding.',
        'A client sends a request the server deliberately refuses, such as a mismatched Host.',
      ],
      zh: [
        '请求行或请求头格式错误。',
        '正文损坏、被截断，或者编码不对。',
        '客户端发出了服务器刻意拒绝的请求，比如 Host 对不上。',
      ],
    },
    server: {
      en: [
        'Log the raw request enough to see what was malformed, but do not echo it back to the user.',
        'Prefer a more specific code when one fits: 404, 413, 415, or 422.',
        'Return a short message that helps the client fix the request, not a generic error.',
      ],
      zh: [
        '把原始请求记进日志以便定位，但不要原样回显给用户。',
        '有更具体的状态码就用：404、413、415 或 422。',
        '返回一句能帮客户端修正请求的提示，而不是笼统的报错。',
      ],
    },
    visitor: {
      en: [
        'A 400 is almost never your fault as a visitor; a broken link or buggy client sent a bad request.',
        'If you typed the URL by hand, check it for typos or illegal characters.',
      ],
      zh: [
        '作为访客，400 几乎不是你造成的；通常是坏链接或客户端 bug 发了坏请求。',
        '如果是手动输入的地址，检查有没有拼错或非法字符。',
      ],
    },
    related: [
      { code: 401, note: { en: 'Missing credentials, not a broken request.', zh: '缺凭据，不是请求坏了。' } },
      { code: 413, note: { en: 'The body is too large, a specific 400.', zh: '正文太大，是更具体的一类 400。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.1',
      rfcUrl: rfc9110('15.5.1'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.1', url: rfc9110('15.5.1') },
      { label: 'MDN: 400 Bad Request', url: mdn(400) },
    ],
  },
  {
    code: 401,
    plate: '06',
    reason: 'Unauthorized',
    reasonZh: '未认证',
    class: 4,
    image: img401,
    imageAlt: {
      en: 'DeepSeek-chan presses an access card to a server-room reader; the lock shows a red cross.',
      zh: 'DeepSeek 娘把门禁卡贴在服务器机房门锁上，读卡器亮起红色的叉。',
    },
    card: {
      en: 'No valid credentials.',
      zh: '没有有效的身份凭据。',
    },
    summary: {
      en: 'Authentication is missing or invalid; the name is misleading.',
      zh: '缺少或无效的身份认证；中文常译“未授权”，但实际是“未认证”。',
    },
    lead: {
      en: '401 Unauthorized means the request lacks valid authentication credentials. Despite the name, it is about authentication, not permission. The server must include a WWW-Authenticate header describing the challenge.',
      zh: '401 Unauthorized 表示请求缺少有效的身份凭据。它的名字容易误导：这是“未认证”，不是“没权限”。服务器必须用 WWW-Authenticate 头说明认证方式。',
    },
    meaning: {
      en: [
        'The server can accept credentials but the request did not include them, or the ones it included were rejected. The client may retry with a new Authorization header.',
        'If the client already tried and the same challenge comes back, the user agent should show the response body, which usually explains what went wrong.',
      ],
      zh: [
        '服务器可以接受凭据，但请求没带，或者带的凭据被拒绝了。客户端可以换一个 Authorization 头重试。',
        '如果客户端已经试过，服务器仍返回同样的挑战，用户代理应该把响应内容展示给用户，里面通常会解释原因。',
      ],
    },
    when: {
      en: [
        'A missing, expired, or malformed access token.',
        'A login form was submitted with the wrong password.',
        'An API key was omitted or sent under the wrong header.',
      ],
      zh: [
        '访问令牌缺失、过期或格式错误。',
        '登录表单提交了错误的密码。',
        'API key 没带，或者放错了请求头。',
      ],
    },
    server: {
      en: [
        'Send WWW-Authenticate with at least one challenge. A 401 without it is incomplete.',
        'Keep the error body short and useful; do not leak whether a username exists.',
        'Use 403 when the user is authenticated but not allowed to perform the action.',
      ],
      zh: [
        '返回 WWW-Authenticate，至少给出一种认证挑战。没有这个头的 401 是不完整的。',
        '错误内容要短且有用；不要泄露某个用户名是否存在。',
        '用户已经通过认证但没有权限时，用 403，不要用 401。',
      ],
    },
    visitor: {
      en: [
        'Sign in again, or check that you are using the right account.',
        'If you are already signed in, clear the site session and retry.',
      ],
      zh: [
        '重新登录，或者确认自己用的是正确的账号。',
        '如果已经登录，清掉这个站的会话再试。',
      ],
    },
    related: [
      { code: 403, note: { en: 'Authenticated but not allowed.', zh: '已认证，但没有权限。' } },
      { code: 429, note: { en: 'Too many login attempts.', zh: '登录尝试太频繁。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.2',
      rfcUrl: rfc9110('15.5.2'),
      cacheable: false,
      headers: ['WWW-Authenticate'],
    },
    sources: [
      { label: 'RFC 9110 §15.5.2', url: rfc9110('15.5.2') },
      { label: 'MDN: 401 Unauthorized', url: mdn(401) },
    ],
  },
  {
    code: 402,
    plate: '07',
    reason: 'Payment Required',
    reasonZh: '需要付款',
    class: 4,
    image: img402,
    imageAlt: {
      en: 'A hand holds out a bill and a card terminal while DeepSeek-chan clutches an empty rice bowl, sweating.',
      zh: '一只手递来账单和刷卡机，DeepSeek 娘抱着空碗，满头大汗。',
    },
    card: {
      en: 'Pay first.',
      zh: '先付钱。',
    },
    summary: {
      en: 'Reserved by HTTP; some APIs use it for payment walls.',
      zh: 'HTTP 保留的状态码；部分 API 用它表示需要付费。',
    },
    lead: {
      en: '402 Payment Required is reserved for future use by RFC 9110. It has no standardized semantics yet, but some APIs borrow it to signal that the request needs a paid account or a topped-up balance.',
      zh: '402 Payment Required 在 RFC 9110 里被保留，尚未定义标准语义。但有些 API 借用它来表示需要付费账号或充值才能继续。',
    },
    meaning: {
      en: [
        'Because the code is reserved, its meaning is not fixed by any specification. Whatever an API means by 402 is its own contract, and it should document it.',
        'In practice it usually means "not enough credit" or "subscription required" — a kind of refusal that is neither authentication (401) nor permission (403).',
      ],
      zh: [
        '因为它是保留码，语义没有被任何规范固定。某个 API 里的 402 具体指什么，是它自己的契约，应当写进文档。',
        '实践中它通常表示“余额不足”或“需要订阅”——一种既不是认证（401）也不是权限（403）的拒绝。',
      ],
    },
    when: {
      en: [
        'An API tier or quota requires payment.',
        'A service returns 402 for a trial that has ended.',
        'A platform withholds content behind a paywall.',
      ],
      zh: [
        '某个 API 等级或配额需要付费。',
        '服务对已经结束的试用期返回 402。',
        '平台把内容挡在付费墙之后。',
      ],
    },
    server: {
      en: [
        'If you use 402, document exactly what it means in your API contract.',
        'Prefer 401 for missing credentials and 403 for insufficient permission; do not overload 402.',
        'Return enough detail for the client to know how to pay or upgrade.',
      ],
      zh: [
        '如果你用 402，把它的确切含义写进 API 契约。',
        '缺凭据用 401，没权限用 403，别让 402 背这些锅。',
        '返回足够的信息，让客户端知道怎么付款或升级。',
      ],
    },
    visitor: {
      en: [
        'If you hit a real 402, the resource needs payment or a higher tier.',
        'There is nothing to retry until the account is paid or upgraded.',
      ],
      zh: [
        '如果真碰到 402，说明这个资源需要付费或更高的等级。',
        '在账户付费或升级之前，重试没有意义。',
      ],
    },
    related: [
      { code: 401, note: { en: 'Who you are, not whether you paid.', zh: '你是谁，而不是有没有付钱。' } },
      { code: 403, note: { en: 'Entitled but not allowed.', zh: '有资格，但被拒绝。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.3',
      rfcUrl: rfc9110('15.5.3'),
      cacheable: false,
      headers: [],
      note: {
        en: 'Reserved for future use; no standardized semantics.',
        zh: '保留码，尚无标准语义。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.5.3', url: rfc9110('15.5.3') },
      { label: 'MDN: 402 Payment Required', url: mdn(402) },
    ],
  },
  {
    code: 403,
    plate: '08',
    reason: 'Forbidden',
    reasonZh: '禁止访问',
    class: 4,
    image: img403,
    imageAlt: {
      en: 'DeepSeek-chan clutching a rice bowl and scowling at a hand reaching for it, with a red prohibition sign above.',
      zh: 'DeepSeek 娘抱着饭碗，皱眉瞪着一只伸过来的手，旁边是红色禁止标志。',
    },
    card: {
      en: 'Understood, then refused.',
      zh: '听懂了，但拒绝执行。',
    },
    summary: {
      en: 'Authenticated or not, the server will not perform this request.',
      zh: '无论是否已认证，服务器都拒绝执行这个请求。',
    },
    lead: {
      en: '403 Forbidden means the server understood the request but refuses to fulfill it. The credentials may be valid; they are simply not enough. Repeating the same request with the same credentials will not help.',
      zh: '403 Forbidden 表示服务器听懂了请求，但拒绝执行。凭据可能是有效的，只是权限不够。用同样的凭据重复请求没有用。',
    },
    meaning: {
      en: [
        'The server can explain why in the response body, but it is not required to. It may also return 404 instead of 403 to hide whether a resource exists.',
        'If credentials were supplied, the server considers them insufficient. A different account or a different permission may work; a retry with the same one will not.',
      ],
      zh: [
        '服务器可以在响应体里解释原因，但不是必须的。它也可能用 404 代替 403，避免暴露资源是否存在。',
        '如果请求带了凭据，服务器认为这些凭据权限不够。换账号或换权限可能有用；用同一个凭据重试没用。',
      ],
    },
    when: {
      en: [
        'The user role does not include this action.',
        'An IP address, country, or user agent is blocked.',
        'File or directory permissions deny the web server.',
        'A WAF or bot rule rejects the request.',
      ],
      zh: [
        '当前角色没有执行这个操作的权限。',
        'IP、地区或 User-Agent 被拦截。',
        '文件或目录权限不允许 Web 服务器读取。',
        'WAF 或反爬规则拒绝了请求。',
      ],
    },
    server: {
      en: [
        'Check roles, scopes, and resource ownership before changing the status code.',
        'Do not ask the client to re-authenticate automatically; a new login will not fix a permission problem.',
        'If the existence of the resource is sensitive, 404 is a legitimate alternative.',
      ],
      zh: [
        '先检查角色、scope 和资源归属，再决定是不是状态码的问题。',
        '不要要求客户端自动重新认证；重新登录解决不了权限问题。',
        '如果资源是否存在本身敏感，用 404 代替 403 是合理的。',
      ],
    },
    visitor: {
      en: [
        'Use an account with the right permission, or ask the site owner.',
        'Do not keep retrying; the same request will keep failing.',
      ],
      zh: [
        '换一个有权限的账号，或者联系站点管理员。',
        '不要反复重试，同样的请求还是会失败。',
      ],
    },
    related: [
      { code: 401, note: { en: 'Missing or invalid credentials.', zh: '缺少凭据或凭据无效。' } },
      { code: 404, note: { en: "Used to hide a resource's existence.", zh: '用来隐藏资源是否存在。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.4',
      rfcUrl: rfc9110('15.5.4'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.4', url: rfc9110('15.5.4') },
      { label: 'MDN: 403 Forbidden', url: mdn(403) },
    ],
  },
  {
    code: 404,
    plate: '09',
    reason: 'Not Found',
    reasonZh: '未找到',
    class: 4,
    image: img404,
    imageAlt: {
      en: 'DeepSeek-chan sitting beside an open rice cooker with an empty bowl, question marks floating above her head.',
      zh: 'DeepSeek 娘坐在打开的电饭煲旁，捧着空碗，头顶飘着问号。',
    },
    card: {
      en: 'The URL routes; nothing is there.',
      zh: '地址能路由，资源不在。',
    },
    summary: {
      en: 'No current representation exists for the target resource.',
      zh: '目标资源没有当前可用的表示。',
    },
    lead: {
      en: '404 Not Found means the server did not find a current representation for the target resource, or is not willing to disclose that one exists. The URL is valid enough to route; the resource behind it is missing.',
      zh: '404 Not Found 表示服务器没有找到目标资源的当前表示，或者不愿意透露它是否存在。地址本身能路由，但地址背后的资源不在了。',
    },
    meaning: {
      en: [
        'A 404 does not say whether the absence is temporary or permanent. If the server knows the resource is permanently gone, 410 Gone is more precise.',
        'A 404 response is heuristically cacheable. That is useful for missing assets, but it also means a temporary mistake can stick in caches if you are not careful.',
      ],
      zh: [
        '404 不说明资源是暂时缺失还是永久移除。如果服务器确定资源已经永久消失，410 Gone 更准确。',
        '404 默认可以被启发式缓存。这对缺失的静态资源很方便，但也意味着临时错误可能被缓存住。',
      ],
    },
    when: {
      en: [
        'A URL was renamed or deleted without a redirect.',
        'A path has a typo or the wrong API version.',
        'A record was deleted and the detail page still links to it.',
        'A route exists but the requested file or slug does not.',
      ],
      zh: [
        'URL 改名或删除后没有做重定向。',
        '路径拼写错误，或者 API 版本写错。',
        '记录被删除，详情页却还链接着它。',
        '路由存在，但请求的文件或 slug 不存在。',
      ],
    },
    server: {
      en: [
        'Add 301 or 308 redirects for renamed URLs that should keep working.',
        'Return 410 Gone for resources you know are permanently removed.',
        'Check for soft 404s: a page that returns 200 while telling the visitor “not found”.',
        'Make the 404 page useful: link back to the index, search, or the nearest relevant page.',
      ],
      zh: [
        '对改名后仍应可用的 URL 加 301 或 308 重定向。',
        '确定永久移除的资源返回 410 Gone。',
        '检查“软 404”：页面写着“找不到”，状态码却是 200。',
        '把 404 页面做有用：给出返回图鉴、搜索或最近相关内容的链接。',
      ],
    },
    visitor: {
      en: [
        'Check the URL for typos.',
        'Go back to the index and search for the page.',
        'If you followed a link from this site, the link is the bug; tell us.',
      ],
      zh: [
        '检查地址有没有拼错。',
        '回到图鉴，重新找一下这个页面。',
        '如果是从本站链接过来的，那是本站的链接该修了，告诉我们。',
      ],
    },
    related: [
      { code: 403, note: { en: 'The server hides a resource instead.', zh: '服务器用 403 隐藏资源。' } },
      { code: 200, note: { en: 'The success case.', zh: '成功的情况。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.5',
      rfcUrl: rfc9110('15.5.5'),
      cacheable: true,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.5', url: rfc9110('15.5.5') },
      { label: 'MDN: 404 Not Found', url: mdn(404) },
    ],
  },
  {
    code: 408,
    plate: '10',
    reason: 'Request Timeout',
    reasonZh: '请求超时',
    class: 4,
    image: img408,
    imageAlt: {
      en: 'DeepSeek-chan asleep at a laptop, a large clock behind her and a stack of papers beside the desk.',
      zh: 'DeepSeek 娘趴在笔记本电脑前睡着了，身后是一个大时钟，桌边堆着文件。',
    },
    card: {
      en: 'The complete request never arrived.',
      zh: '完整请求一直没到。',
    },
    summary: {
      en: 'The server did not receive a complete request in time.',
      zh: '服务器没有在预定时间内收到完整请求。',
    },
    lead: {
      en: '408 Request Timeout means the server did not receive a complete request message within the time it was prepared to wait. It is a client-side timeout, not a gateway timeout.',
      zh: '408 Request Timeout 表示服务器没有在它愿意等待的时间内收到完整的请求消息。它是客户端侧的超时，不是网关超时。',
    },
    meaning: {
      en: [
        'The client may repeat the request if it is still in transit. If the connection is no longer usable, a new connection will be used.',
        'Do not confuse 408 with 504 Gateway Timeout. 504 means a gateway did not get a timely response from an upstream server; 408 means the origin server did not get a complete request from the client.',
      ],
      zh: [
        '如果请求还在传输中，客户端可以重试。如果连接已经不可用，会换一条新连接。',
        '不要把 408 和 504 Gateway Timeout 搞混。504 是网关没等到上游服务器的及时响应；408 是源服务器没等到客户端的完整请求。',
      ],
    },
    when: {
      en: [
        'A slow or unstable client connection.',
        "A large upload that takes longer than the server's header or body timeout.",
        'A keep-alive connection sits idle for too long.',
        'A server or load balancer timeout is set too aggressively.',
      ],
      zh: [
        '客户端网络慢或不稳定。',
        '上传文件太大，超过了服务器的头部或正文超时时间。',
        'keep-alive 连接空闲太久。',
        '服务器或负载均衡的超时时间设得太激进。',
      ],
    },
    server: {
      en: [
        'Retry idempotent requests; do not blindly retry non-idempotent ones.',
        'Check the timeout budget at the client, load balancer, and origin.',
        'Return a clear error and close the connection if the request is incomplete.',
      ],
      zh: [
        '幂等请求可以重试；非幂等请求不要盲目重试。',
        '检查客户端、负载均衡和源站的超时预算。',
        '请求不完整时，返回清晰的错误并关闭连接。',
      ],
    },
    visitor: {
      en: [
        'Reload the page or retry the upload.',
        'If it keeps happening, check your connection and try a smaller upload.',
      ],
      zh: [
        '刷新页面，或者重新上传。',
        '如果一直发生，检查网络，或者把上传内容拆小。',
      ],
    },
    related: [
      { code: 429, note: { en: 'Slow down, but for a different reason.', zh: '也是“慢一点”，但原因不同。' } },
      { code: 503, note: { en: 'The server is unavailable, not the client.', zh: '是服务器不可用，不是客户端慢。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.9',
      rfcUrl: rfc9110('15.5.9'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.9', url: rfc9110('15.5.9') },
      { label: 'MDN: 408 Request Timeout', url: mdn(408) },
    ],
  },
  {
    code: 409,
    plate: '11',
    reason: 'Conflict',
    reasonZh: '冲突',
    class: 4,
    image: img409,
    imageAlt: {
      en: 'Two DeepSeek-chans pull the same bowl of rice in opposite directions, both glaring.',
      zh: '两个 DeepSeek 娘各抓住同一碗米饭的两边，互相对峙。',
    },
    card: {
      en: 'Your change collides with another.',
      zh: '你的改动和别人撞了。',
    },
    summary: {
      en: 'The request conflicts with the resource\u2019s current state.',
      zh: '请求与资源的当前状态冲突。',
    },
    lead: {
      en: '409 Conflict means the request could not be completed because it conflicts with the current state of the target resource. Unlike most errors, it is one the client might be able to resolve and resubmit.',
      zh: '409 Conflict 表示请求因为与目标资源的当前状态冲突而无法完成。和大多数错误不同，这个冲突客户端也许能自己解决后重新提交。',
    },
    meaning: {
      en: [
        'The server should describe the conflict in the body, so the user can recognize the source and decide how to resolve it.',
        'Conflicts most often come from PUT requests: two writers change the same resource, and the later one does not match what the server now has.',
      ],
      zh: [
        '服务器应在正文里说明冲突，让用户能看出原因，再决定怎么解决。',
        '冲突最常见于 PUT：两个人改了同一个资源，后提交的那份和服务器现在的状态对不上。',
      ],
    },
    when: {
      en: [
        'An update uses a stale version or ETag.',
        'Two requests try to create the same unique resource.',
        'A state transition is not allowed from the resource\u2019s current state.',
      ],
      zh: [
        '更新时用了过期的版本号或 ETag。',
        '两个请求试图创建同一个唯一资源。',
        '资源当前状态下不允许这个状态流转。',
      ],
    },
    server: {
      en: [
        'Send a body that names the conflict and how to resolve it.',
        'Use version numbers or ETags so clients can detect staleness before writing.',
        'Use 412 when the conflict is a failed precondition, not a state clash.',
      ],
      zh: [
        '返回正文，说明冲突在哪、怎么解决。',
        '用版本号或 ETag 让客户端在写入前就能发现过期。',
        '如果是前置条件失败而非状态冲突，用 412。',
      ],
    },
    visitor: {
      en: [
        'If a form or API returns 409, refresh and re-check the current state before retrying.',
        'Do not blindly resubmit; your change is racing someone else\u2019s.',
      ],
      zh: [
        '表单或接口返回 409 时，先刷新确认当前状态再重试。',
        '不要盲目重提，你的改动正在和别人的改动赛跑。',
      ],
    },
    related: [
      { code: 400, note: { en: 'A generic rejection, not a state clash.', zh: '笼统的拒绝，不是状态冲突。' } },
      { code: 404, note: { en: 'The resource to update may be gone.', zh: '要更新的资源可能已经不在了。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.10',
      rfcUrl: rfc9110('15.5.10'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.10', url: rfc9110('15.5.10') },
      { label: 'MDN: 409 Conflict', url: mdn(409) },
    ],
  },
  {
    code: 413,
    plate: '12',
    reason: 'Content Too Large',
    reasonZh: '内容过大',
    class: 4,
    image: img413,
    imageAlt: {
      en: 'DeepSeek-chan is wedged inside an overflowing takeout box packed with rice, looking thoroughly annoyed.',
      zh: 'DeepSeek 娘被塞进一个装满米饭、已经撑开的打包盒里，一脸不悦。',
    },
    card: {
      en: 'The payload is too big.',
      zh: '内容太大了。',
    },
    summary: {
      en: 'The request body exceeds the server\u2019s limit.',
      zh: '请求正文超过了服务器愿意处理的限制。',
    },
    lead: {
      en: '413 Content Too Large means the server is refusing the request because the content is larger than it is willing or able to process. The server may terminate the request, or close the connection if the protocol does not allow it.',
      zh: '413 Content Too Large 表示请求内容太大，服务器不愿或无法处理，于是拒绝。服务器可能直接终止请求，协议不允许时则关闭连接。',
    },
    meaning: {
      en: [
        'The limit can be set by the server, a proxy, or a WAF, and it is not part of the core HTTP specification.',
        'If the limit is temporary — for example, a burst of oversized uploads — the server should send Retry-After to say when the client may try again.',
      ],
      zh: [
        '这个上限可以由服务器、代理或 WAF 设定，并不属于 HTTP 核心规范的一部分。',
        '如果限制是临时的——比如一阵过大的上传——服务器应该用 Retry-After 告诉客户端何时可以再试。',
      ],
    },
    when: {
      en: [
        'An upload exceeds a server or proxy size limit.',
        'A request body is larger than the server is configured to buffer.',
        'A WAF blocks a payload above a hard cap.',
      ],
      zh: [
        '上传超过了服务器或代理的大小限制。',
        '请求正文比服务器配置的缓冲上限还大。',
        'WAF 拦截了超过硬性上限的载荷。',
      ],
    },
    server: {
      en: [
        'Set a deliberate limit and document it; do not leave the default unstated.',
        'Use 413 rather than 500 when the cause is the request size.',
        'Send Retry-After if the limit is temporary or being raised soon.',
      ],
      zh: [
        '设定一个明确的限制并写进文档，别让默认值成为谜。',
        '原因是请求太大时用 413，不要用 500。',
        '如果限制是临时的或即将放宽，用 Retry-After。',
      ],
    },
    visitor: {
      en: [
        'Reduce the upload, or split it into smaller parts.',
        'Check the API documentation for the advertised size limit.',
      ],
      zh: [
        '减小上传体积，或拆成更小的部分。',
        '查看接口文档里公布的大小限制。',
      ],
    },
    related: [
      { code: 400, note: { en: 'A malformed request, not a large one.', zh: '是请求坏了，不是太大了。' } },
      { code: 414, note: { en: 'The URI is too long instead.', zh: '这次是 URI 太长了。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.14',
      rfcUrl: rfc9110('15.5.14'),
      cacheable: false,
      headers: ['Retry-After'],
      note: {
        en: 'RFC 9110 renamed this from \u201cPayload Too Large\u201d.',
        zh: 'RFC 9110 把它从 \u201cPayload Too Large\u201d 改名为 \u201cContent Too Large\u201d。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.5.14', url: rfc9110('15.5.14') },
      { label: 'MDN: 413 Content Too Large', url: mdn(413) },
    ],
  },
  {
    code: 414,
    plate: '13',
    reason: 'URI Too Long',
    reasonZh: 'URI 过长',
    class: 4,
    image: img414,
    imageAlt: {
      en: 'DeepSeek-chan flattened under an absurdly long box of egg tarts.',
      zh: 'DeepSeek 娘被一个超长超长的蛋挞盒压在下面。',
    },
    card: {
      en: 'The address is too long.',
      zh: '地址太长了。',
    },
    summary: {
      en: "The target URI exceeds the server's limit.",
      zh: '目标 URI 超过了服务器愿意解析的长度。',
    },
    lead: {
      en: '414 URI Too Long means the server is refusing the request because the target URI is longer than it is willing to interpret. It is rare, and almost always a client-side design problem.',
      zh: '414 URI Too Long 表示目标 URI 太长，服务器不愿意解析，因此拒绝请求。这个状态码不常见，基本都是客户端的设计问题。',
    },
    meaning: {
      en: [
        'The usual causes are a POST turned into a GET with a huge query string, a redirect loop that keeps appending to the URL, or an attack probing length limits.',
        'A 414 response is heuristically cacheable. The old reason phrase was “Request-URI Too Long”; RFC 9110 uses “URI Too Long”.',
      ],
      zh: [
        '常见原因是把 POST 改成了带巨大查询串的 GET、不断追加参数的重定向循环，或者有人在试探长度限制。',
        '414 默认可以被启发式缓存。旧的原因是 “Request-URI Too Long”，RFC 9110 用的是 “URI Too Long”。',
      ],
    },
    when: {
      en: [
        'A filter or search form puts too much state into the query string.',
        'A redirect chain appends the same parameters over and over.',
        'A client sends a huge data payload in the URL instead of the body.',
        'A WAF or server has a low URI length limit.',
      ],
      zh: [
        '筛选或搜索表单把太多状态塞进了查询串。',
        '重定向链反复追加同样的参数。',
        '客户端把大数据塞进 URL，而不是请求体。',
        'WAF 或服务器的 URI 长度限制设得很低。',
      ],
    },
    server: {
      en: [
        'Move large payloads to POST, PUT, or PATCH bodies.',
        'Fix redirect loops before raising the limit.',
        'If you raise the limit, do it deliberately and log the requests that hit it.',
      ],
      zh: [
        '把大载荷移到 POST、PUT 或 PATCH 的请求体里。',
        '先修复重定向循环，再考虑提高限制。',
        '如果确实要放宽限制，要有明确理由，并记录命中限制的请求。',
      ],
    },
    visitor: {
      en: [
        "Shorten the URL or use the site search instead of a long filter link.",
        'If a link from this site caused it, the link is too long; tell us.',
      ],
      zh: [
        '缩短地址，或者用站内搜索代替超长筛选链接。',
        '如果是从本站点开的链接，那就是链接太长了，告诉我们。',
      ],
    },
    related: [
      { code: 403, note: { en: 'A WAF may block the request first.', zh: 'WAF 可能先一步拦截请求。' } },
      { code: 429, note: { en: 'Abuse protection often pairs with rate limits.', zh: '防滥用通常和限流一起出现。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.15',
      rfcUrl: rfc9110('15.5.15'),
      cacheable: true,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.5.15', url: rfc9110('15.5.15') },
      { label: 'MDN: 414 URI Too Long', url: mdn(414) },
    ],
  },
  {
    code: 418,
    plate: '14',
    reason: 'I’m a teapot',
    reasonZh: '我是茶壶',
    class: 4,
    image: img418,
    imageAlt: {
      en: 'DeepSeek-chan peeking out from inside a large blue-and-white teapot.',
      zh: 'DeepSeek 娘从一只蓝白茶壶里探出头来。',
    },
    card: {
      en: 'A real code, reserved as a joke.',
      zh: '真实存在，但被当作玩笑保留。',
    },
    summary: {
      en: 'Reserved for the HTCPCP joke; not for production APIs.',
      zh: '为 HTCPCP 玩笑保留；不要在正式 API 里使用。',
    },
    lead: {
      en: '418 I’m a teapot comes from RFC 2324, the 1998 April Fools’ Hyper Text Coffee Pot Control Protocol. RFC 9110 §15.5.19 lists 418 as “(Unused)” and reserves it; it is a real registered code, but not one you should use for actual errors.',
      zh: '418 I’m a teapot 来自 RFC 2324，也就是 1998 年愚人节的超文本咖啡壶控制协议。RFC 9110 §15.5.19 把 418 列为 “(Unused)” 并保留；它是真实注册的状态码，但不该拿来表示正式错误。',
    },
    meaning: {
      en: [
        'The code is a piece of HTTP folklore. Some sites use it as an Easter egg or to reject unwanted automated requests.',
        'Because it is reserved, do not assign it a new meaning in your API. Clients and intermediaries will not know what to do with it.',
      ],
      zh: [
        '它是 HTTP 文化里的一个梗。有些站点拿它当彩蛋，或者用来拒绝不想要的自动化请求。',
        '因为它已经被保留，不要在自己的 API 里给它新含义。客户端和中间层不知道该怎么处理。',
      ],
    },
    when: {
      en: [
        'An Easter egg on a personal site.',
        'A test suite that checks unusual status codes.',
        'A playful rejection of bots, if the API contract allows it.',
      ],
      zh: [
        '个人站点的彩蛋。',
        '测试套件里验证非常规状态码。',
        '在 API 契约允许的前提下，用玩笑方式拒绝机器人。',
      ],
    },
    server: {
      en: [
        'Do not use 418 for real errors. Use 400, 403, 429, or 503.',
        'If you ship it as an Easter egg, document it so clients are not confused.',
        'Keep the response short and obviously playful.',
      ],
      zh: [
        '正式错误不要用 418。用 400、403、429 或 503。',
        '如果作为彩蛋上线，写进文档，别让客户端困惑。',
        '响应要短，玩笑要明显。',
      ],
    },
    visitor: {
      en: [
        'You found the teapot. There is nothing to fix.',
        'If you expected data, the server is joking; try the normal endpoint.',
      ],
      zh: [
        '你找到茶壶了，没有什么要修的。',
        '如果你本来想要数据，服务器在开玩笑；换正常接口试试。',
      ],
    },
    related: [
      { code: 200, note: { en: 'The normal success answer.', zh: '正常的成功响应。' } },
      { code: 503, note: { en: 'A real temporary failure.', zh: '真正的临时故障。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.5.19',
      rfcUrl: rfc9110('15.5.19'),
      cacheable: false,
      headers: [],
      note: {
        en: 'Reason phrase from RFC 2324 §2.3.2; RFC 9110 calls 418 “(Unused)”.',
        zh: '原因短语来自 RFC 2324 §2.3.2；RFC 9110 把 418 列为 “(Unused)”。',
      },
    },
    sources: [
      { label: 'RFC 9110 §15.5.19', url: rfc9110('15.5.19') },
      { label: 'RFC 2324 §2.3.2', url: 'https://www.rfc-editor.org/rfc/rfc2324.html#section-2.3.2' },
      { label: 'MDN: 418 I’m a teapot', url: mdn(418) },
    ],
  },
  {
    code: 429,
    plate: '15',
    reason: 'Too Many Requests',
    reasonZh: '请求过多',
    class: 4,
    image: img429,
    imageAlt: {
      en: 'DeepSeek-chan at a laptop, overwhelmed by a storm of paper request forms.',
      zh: 'DeepSeek 娘坐在电脑前，被漫天飞来的请求单淹没。',
    },
    card: {
      en: 'You hit the rate limit.',
      zh: '你撞上了限流。',
    },
    summary: {
      en: 'Rate limit exceeded; respect Retry-After.',
      zh: '超过了速率限制；注意 Retry-After。',
    },
    lead: {
      en: '429 Too Many Requests means the client sent too many requests in a given amount of time. It is the standard rate-limiting response, defined in RFC 6585.',
      zh: '429 Too Many Requests 表示客户端在一段时间内发送了太多请求。它是标准的限流响应，定义在 RFC 6585。',
    },
    meaning: {
      en: [
        'The response should explain the limit and may include Retry-After, in seconds or as an HTTP date.',
        'The spec does not define how a server identifies a user or counts requests. Limits can be per user, per IP, per token, or per resource.',
      ],
      zh: [
        '响应里应该说明限制，并可以用 Retry-After 给出等待秒数或 HTTP 日期。',
        '规范没有规定服务器如何识别用户、如何计数。限流可以按用户、IP、令牌或资源来算。',
      ],
    },
    when: {
      en: [
        'API quotas or burst limits.',
        'Repeated login attempts.',
        'Scraping or bot traffic.',
        'A retry storm after an outage.',
      ],
      zh: [
        'API 配额或突发流量限制。',
        '反复尝试登录。',
        '爬虫或机器人流量。',
        '故障恢复后的重试风暴。',
      ],
    },
    server: {
      en: [
        'Send Retry-After and enough detail to make the limit actionable.',
        'Return rate-limit headers consistently; do not change the window silently.',
        'Use 503 for global overload or maintenance, not 429.',
      ],
      zh: [
        '返回 Retry-After，并给出足够的信息，让客户端知道怎么调整。',
        '限流头要一致；不要悄悄改变时间窗口。',
        '全局过载或维护用 503，不要用 429。',
      ],
    },
    visitor: {
      en: [
        'Wait for the time in Retry-After, then retry.',
        'Back off exponentially instead of retrying in a tight loop.',
      ],
      zh: [
        '等到 Retry-After 指定的时间再试。',
        '用指数退避，不要在一个紧凑循环里猛重试。',
      ],
    },
    related: [
      { code: 503, note: { en: 'Global overload, not a per-client limit.', zh: '全局过载，不是单个客户端的限流。' } },
      { code: 408, note: { en: 'The client was too slow, not too fast.', zh: '这次是客户端太慢，不是太快。' } },
    ],
    tech: {
      rfc: 'RFC 6585 §4',
      rfcUrl: 'https://www.rfc-editor.org/rfc/rfc6585.html#section-4',
      cacheable: false,
      headers: ['Retry-After', 'RateLimit-*'],
    },
    sources: [
      { label: 'RFC 6585 §4', url: 'https://www.rfc-editor.org/rfc/rfc6585.html#section-4' },
      { label: 'MDN: 429 Too Many Requests', url: mdn(429) },
    ],
  },
  {
    code: 451,
    plate: '16',
    reason: 'Unavailable For Legal Reasons',
    reasonZh: '因法律原因不可用',
    class: 4,
    image: img451,
    imageAlt: {
      en: 'DeepSeek-chan slumps at a table beside a sign that forbids selling alcohol to minors, sweating.',
      zh: 'DeepSeek 娘趴在桌上，旁边立着“禁止向未成年售酒”的牌子，满头大汗。',
    },
    card: {
      en: 'Legally off the menu.',
      zh: '法律不让上。',
    },
    summary: {
      en: 'The resource is unavailable for legal reasons.',
      zh: '资源因法律原因不可用。',
    },
    lead: {
      en: '451 Unavailable For Legal Reasons means the server is denying access because a legal demand — a court order, a censorship ruling, or similar — forbids it from serving the resource.',
      zh: '451 Unavailable For Legal Reasons 表示服务器因为法律要求——法院命令、审查裁定之类——无法提供这个资源。',
    },
    meaning: {
      en: [
        'The server should include a Link header with rel="blocked-by" pointing to the demand or authority that caused the block.',
        'Unlike 403, which is the server\u2019s own choice, 451 signals an external legal obligation. The code is named after the novel Fahrenheit 451.',
      ],
      zh: [
        '服务器应当带上 rel="blocked-by" 的 Link 头，指向导致封禁的要求或机构。',
        '和服务器自行决定的 403 不同，451 表示这是外部法律义务。这个号码得名于小说《华氏 451》。',
      ],
    },
    when: {
      en: [
        'A court or regulator orders content removed.',
        'A region blocks a resource by law.',
        'A platform geo-blocks content to comply with local rules.',
      ],
      zh: [
        '法院或监管机构要求下架内容。',
        '某地区依法封锁一个资源。',
        '平台为遵守当地法规做地区封锁。',
      ],
    },
    server: {
      en: [
        'Add the Link rel="blocked-by" header when you can identify the demand.',
        'Explain what is blocked and why, without revealing more than the law requires.',
        'Use 403 for your own policy decisions; reserve 451 for actual legal obligations.',
      ],
      zh: [
        '能说明是哪项要求时，加上 Link rel="blocked-by" 头。',
        '说明被封锁的内容和原因，但别泄露法律要求之外的细节。',
        '平台自己的政策用 403；真正的法律义务才用 451。',
      ],
    },
    visitor: {
      en: [
        'There is no client-side fix; the block is external and deliberate.',
        'If you believe the block is wrong, the header may point to the authority to contact.',
      ],
      zh: [
        '客户端这边没有办法，这是外部有意为之的封锁。',
        '如果你觉得封锁有误，头信息可能会指向可以申诉的机构。',
      ],
    },
    related: [
      { code: 403, note: { en: 'The server\u2019s own refusal, not a legal order.', zh: '服务器自己拒绝，不是法律命令。' } },
      { code: 404, note: { en: 'The server may hide a blocked resource.', zh: '服务器可能用 404 隐藏被封锁的资源。' } },
    ],
    tech: {
      rfc: 'RFC 7725 §3',
      rfcUrl: 'https://www.rfc-editor.org/rfc/rfc7725.html#section-3',
      cacheable: true,
      headers: ['Link'],
      note: {
        en: 'Use Link rel="blocked-by" to cite the demand; 451 is cacheable by default.',
        zh: '用 Link rel="blocked-by" 引用该要求；451 默认可缓存。',
      },
    },
    sources: [
      { label: 'RFC 7725 §3', url: 'https://www.rfc-editor.org/rfc/rfc7725.html#section-3' },
      { label: 'MDN: 451 Unavailable For Legal Reasons', url: mdn(451) },
    ],
  },
  {
    code: 500,
    plate: '17',
    reason: 'Internal Server Error',
    reasonZh: '服务器内部错误',
    class: 5,
    image: img500,
    imageAlt: {
      en: 'DeepSeek-chan collapsed on the floor beside a smoking server rack and a monitor showing an error.',
      zh: 'DeepSeek 娘瘫倒在地，旁边是冒烟的服务器机柜和显示 ERROR 的显示器。',
    },
    card: {
      en: 'The server hit an unexpected condition.',
      zh: '服务器遇到了意外情况。',
    },
    summary: {
      en: 'An unexpected server condition prevented the request from completing.',
      zh: '服务器遇到未预期情况，无法完成请求。',
    },
    lead: {
      en: '500 Internal Server Error means the server encountered an unexpected condition that prevented it from fulfilling the request. It is the generic catch-all for server-side bugs and misconfiguration.',
      zh: '500 Internal Server Error 表示服务器遇到了未预期的情况，无法完成请求。它是服务端 bug 和配置错误的通用兜底状态码。',
    },
    meaning: {
      en: [
        'Use 500 when you do not have a more specific code. A database error, an unhandled exception, or a broken template can all end here.',
        'Do not put stack traces or internal paths in the response. Log them with a request ID and show the user a safe error page.',
      ],
      zh: [
        '没有更具体的状态码时用 500。数据库错误、未捕获异常、模板渲染失败都可能走到这里。',
        '不要把堆栈或内部路径放进响应。把它们和请求 ID 一起记进日志，给用户一个安全的错误页。',
      ],
    },
    when: {
      en: [
        'An unhandled exception in application code.',
        'A database or dependency fails mid-request.',
        'A configuration or deployment error.',
        'A template or serialization error.',
      ],
      zh: [
        '应用代码里有未捕获异常。',
        '数据库或依赖在请求中途失败。',
        '配置或部署出错。',
        '模板或序列化出错。',
      ],
    },
    server: {
      en: [
        "Log the error with a request ID and correlate it with the client's report.",
        'Return a safe error page; never expose stack traces.',
        'Use 502 or 504 for gateway and upstream failures; use 503 for maintenance or overload.',
      ],
      zh: [
        '用请求 ID 记录错误，方便和用户反馈对上。',
        '返回安全的错误页；永远不要暴露堆栈。',
        '网关和上游失败用 502 或 504；维护或过载用 503。',
      ],
    },
    visitor: {
      en: [
        'Retry once. If it persists, the site is broken; come back later.',
        'If you can, send the site owner the time and the URL.',
      ],
      zh: [
        '重试一次。如果还是这样，就是站点坏了，晚点再来。',
        '如果可以，把时间和地址发给站点管理员。',
      ],
    },
    related: [
      { code: 503, note: { en: 'Temporary, expected recovery.', zh: '临时状态，预期会恢复。' } },
      { code: 408, note: { en: 'A timeout, not a crash.', zh: '这是超时，不是崩溃。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.6.1',
      rfcUrl: rfc9110('15.6.1'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.6.1', url: rfc9110('15.6.1') },
      { label: 'MDN: 500 Internal Server Error', url: mdn(500) },
    ],
  },
  {
    code: 502,
    plate: '18',
    reason: 'Bad Gateway',
    reasonZh: '网关错误',
    class: 5,
    image: img502,
    imageAlt: {
      en: 'DeepSeek-chan angrily points at a smoking network switch with broken ports and a tangle of cables.',
      zh: 'DeepSeek 娘生气地指着一台冒烟、端口损坏、线缆凌乱的网络交换机。',
    },
    card: {
      en: 'The gateway got garbage back.',
      zh: '网关收到了一团乱码。',
    },
    summary: {
      en: 'A gateway received an invalid response from upstream.',
      zh: '网关从上游收到了无效响应。',
    },
    lead: {
      en: '502 Bad Gateway means the server, acting as a gateway or proxy, received an invalid response from the upstream server it contacted to fulfil the request.',
      zh: '502 Bad Gateway 表示服务器作为网关或代理，从它联系的上游服务器那里收到了一个无效的响应。',
    },
    meaning: {
      en: [
        'The gateway itself is fine; the thing behind it sent back something unusable — a malformed header, a dropped connection, or a crash.',
        'It is distinct from 504, where the upstream did not answer in time. 502 means it answered, but badly.',
      ],
      zh: [
        '网关本身没问题，是它背后的上游返回了没法用的东西——头部损坏、连接中断，或者直接崩了。',
        '它和 504 不同：504 是上游没在时限内回应，502 是上游回了，但回得不对。',
      ],
    },
    when: {
      en: [
        'An upstream server or load balancer crashes mid-response.',
        'A proxy receives a response it cannot parse.',
        'A service restarts while a gateway has a request in flight.',
      ],
      zh: [
        '上游服务器或负载均衡在响应中途崩溃。',
        '代理收到了自己无法解析的响应。',
        '网关还在处理请求时，后端服务重启了。',
      ],
    },
    server: {
      en: [
        'Check the upstream logs first; the gateway is usually the symptom, not the cause.',
        'Return a safe error page; do not leak upstream details to the client.',
        'Use 504 for timeouts and 503 for maintenance, and keep 502 for invalid responses.',
      ],
      zh: [
        '先看上游日志，网关多半只是症状，不是病根。',
        '返回安全的错误页，别把上游的细节泄露给客户端。',
        '超时用 504，维护用 503，502 只留给无效响应。',
      ],
    },
    visitor: {
      en: [
        'Retry once; a transient upstream crash may already be fixed.',
        'If it persists, the site\u2019s backend is broken and only the operator can fix it.',
      ],
      zh: [
        '重试一次，上游的临时崩溃可能已经恢复。',
        '如果一直这样，是站点后端坏了，只有运维能修。',
      ],
    },
    related: [
      { code: 500, note: { en: 'The origin itself failed.', zh: '是源站自己出了问题。' } },
      { code: 503, note: { en: 'The upstream is down, not answering badly.', zh: '上游是挂了，而不是答错了。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.6.3',
      rfcUrl: rfc9110('15.6.3'),
      cacheable: false,
      headers: [],
    },
    sources: [
      { label: 'RFC 9110 §15.6.3', url: rfc9110('15.6.3') },
      { label: 'MDN: 502 Bad Gateway', url: mdn(502) },
    ],
  },
  {
    code: 503,
    plate: '19',
    reason: 'Service Unavailable',
    reasonZh: '服务不可用',
    class: 5,
    image: img503,
    imageAlt: {
      en: 'DeepSeek-chan asleep beside a server rack with a maintenance sign, traffic cone, and toolbox.',
      zh: 'DeepSeek 娘靠在服务器机柜旁睡着，旁边有维修牌、路锥和工具箱。',
    },
    card: {
      en: 'Temporarily unable to serve.',
      zh: '暂时无法提供服务。',
    },
    summary: {
      en: 'Temporary overload or maintenance; retry later.',
      zh: '临时过载或维护；稍后重试。',
    },
    lead: {
      en: '503 Service Unavailable means the server is currently unable to handle the request because of temporary overload or scheduled maintenance. It may include Retry-After to say when to try again.',
      zh: '503 Service Unavailable 表示服务器因为临时过载或计划维护，暂时无法处理请求。它可以用 Retry-After 告诉你什么时候再试。',
    },
    meaning: {
      en: [
        'The condition is expected to be temporary. A 503 does not imply that the server must use it when overloaded; some servers simply refuse the connection.',
        'Use 500 for unexpected bugs. Use 502 or 504 when a gateway or upstream is the problem.',
      ],
      zh: [
        '这是预期会恢复的临时状态。503 不代表服务器过载时必须用它；有些服务器会直接拒绝连接。',
        '未预期 bug 用 500。网关或上游出问题用 502 或 504。',
      ],
    },
    when: {
      en: [
        'Scheduled maintenance.',
        'A traffic spike or resource exhaustion.',
        'A critical dependency is down.',
        'A deployment is in progress.',
      ],
      zh: [
        '计划内维护。',
        '流量突增或资源耗尽。',
        '关键依赖不可用。',
        '正在部署。',
      ],
    },
    server: {
      en: [
        'Send Retry-After when you can estimate the downtime.',
        'Serve a maintenance page that explains the state and when to return.',
        'Do not use 503 for a permanent failure; use a specific 5xx or 4xx code.',
      ],
      zh: [
        '能估算恢复时间时，返回 Retry-After。',
        '给一个维护页面，说明状态和大概恢复时间。',
        '永久失败不要用 503；用更具体的 5xx 或 4xx。',
      ],
    },
    visitor: {
      en: [
        'Wait and retry; the server said it is temporary.',
        "Check the site's status page if it has one.",
      ],
      zh: [
        '等一会儿再试；服务器说这是临时的。',
        '如果站点有状态页，去看一眼。',
      ],
    },
    related: [
      { code: 500, note: { en: 'Unexpected bug, not maintenance.', zh: '未预期 bug，不是维护。' } },
      { code: 429, note: { en: 'Per-client rate limit, not global overload.', zh: '单个客户端限流，不是全局过载。' } },
    ],
    tech: {
      rfc: 'RFC 9110 §15.6.4',
      rfcUrl: rfc9110('15.6.4'),
      cacheable: false,
      headers: ['Retry-After'],
    },
    sources: [
      { label: 'RFC 9110 §15.6.4', url: rfc9110('15.6.4') },
      { label: 'MDN: 503 Service Unavailable', url: mdn(503) },
    ],
  },
];

const statusByCode = new Map(statuses.map((status) => [status.code, status]));

export const classMeta: Record<
  StatusClass,
  { en: string; zh: string; shortMeaning: Bilingual }
> = {
  1: {
    en: 'Informational',
    zh: '信息响应',
    shortMeaning: {
      en: 'Received; still working.',
      zh: '已收到，还在处理。',
    },
  },
  2: {
    en: 'Success',
    zh: '成功',
    shortMeaning: {
      en: 'It worked.',
      zh: '成功了。',
    },
  },
  3: {
    en: 'Redirection',
    zh: '重定向',
    shortMeaning: {
      en: 'Look at another URI.',
      zh: '资源在另一个地址。',
    },
  },
  4: {
    en: 'Client error',
    zh: '客户端错误',
    shortMeaning: {
      en: 'The request is the problem.',
      zh: '问题出在请求。',
    },
  },
  5: {
    en: 'Server error',
    zh: '服务器错误',
    shortMeaning: {
      en: 'The server is the problem.',
      zh: '问题出在服务器。',
    },
  },
};

export function groupStatusesByClass(): Record<StatusClass, Status[]> {
  return statuses.reduce(
    (groups, status) => {
      groups[status.class].push(status);
      return groups;
    },
    { 1: [], 2: [], 3: [], 4: [], 5: [] } as Record<StatusClass, Status[]>,
  );
}

export function getStatus(code: number): Status {
  const status = statusByCode.get(code);
  if (!status) {
    throw new Error(`Unknown status code: ${code}`);
  }
  return status;
}
