import type { ImageMetadata } from 'astro';
import { referenceLinks } from './references';
import img200 from '../assets/status/200.png';
import img401 from '../assets/status/401.png';
import img403 from '../assets/status/403.png';
import img404 from '../assets/status/404.png';
import img408 from '../assets/status/408.png';
import img414 from '../assets/status/414.png';
import img418 from '../assets/status/418.png';
import img429 from '../assets/status/429.png';
import img500 from '../assets/status/500.png';
import img503 from '../assets/status/503.png';

export type Locale = 'en' | 'zh';
export type StatusClass = 2 | 4 | 5;

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
    code: 200,
    plate: '01',
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
    code: 401,
    plate: '02',
    reason: 'Unauthorized',
    reasonZh: '未认证',
    class: 4,
    image: img401,
    imageAlt: {
      en: 'DeepSeek-chan at a security gate, holding up a hand to refuse an ID card offered by a man in a suit.',
      zh: 'DeepSeek 娘在安检闸机前抬手拒绝一位西装男递来的证件。',
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
    code: 403,
    plate: '03',
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
    plate: '04',
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
    plate: '05',
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
    code: 414,
    plate: '06',
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
    plate: '07',
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
    plate: '08',
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
    code: 500,
    plate: '09',
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
    code: 503,
    plate: '10',
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
  2: {
    en: 'Success',
    zh: '成功',
    shortMeaning: {
      en: 'It worked.',
      zh: '成功了。',
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
    { 2: [], 4: [], 5: [] } as Record<StatusClass, Status[]>,
  );
}

export function getStatus(code: number): Status {
  const status = statusByCode.get(code);
  if (!status) {
    throw new Error(`Unknown status code: ${code}`);
  }
  return status;
}
