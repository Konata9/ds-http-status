import type { APIRoute } from 'astro';
import { statuses } from '../data/statuses';
import { canonicalUrl } from '../data/site';
import { statusUrls } from '../lib/statusUrls';

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# DeepSeek-chan HTTP Field Guide: full text',
    '',
    '> An unofficial bilingual reference to ten HTTP status codes, illustrated by Fatal1tyV and explained with RFC citations. This file is written for AI crawlers and developers who want the whole guide in one request.',
    '',
    `Site: ${canonicalUrl('/')}`,
    'Edition: 1.0, updated 2026-10-25',
    'Illustrations: Fatal1tyV (Xiaohongshu) https://www.xiaohongshu.com/user/profile/691f24b6000000003702fdbd',
    'License note: the illustrations belong to Fatal1tyV. The definitions follow RFC 9110, RFC 6585, and RFC 2324.',
    '',
    '## Status family overview',
    '',
    '- 1xx informational: the request was received; the server is still working.',
    '- 2xx success: the request was received, understood, and accepted.',
    '- 3xx redirection: further action is needed to complete the request.',
    '- 4xx client error: the request is the problem.',
    '- 5xx server error: the request was valid; the server could not complete it.',
    '',
  ];

  for (const status of statuses) {
    lines.push(
      `## ${status.code} ${status.reason}`,
      '',
      `English: ${statusUrls(status.code).page.en.url}`,
      `中文: ${statusUrls(status.code).page.zh.url}`,
      `RFC: ${status.tech.rfc} (${status.tech.rfcUrl})`,
      `Cacheable by default: ${status.tech.cacheable ? 'yes' : 'no'}`,
      status.tech.headers.length > 0
        ? `Common headers: ${status.tech.headers.join(', ')}`
        : 'Common headers: none',
      '',
      `EN: ${status.lead.en}`,
      `中文：${status.lead.zh}`,
      '',
      '### What it means',
      '',
      ...status.meaning.en.map((paragraph) => `- ${paragraph}`),
      '',
      '### 是什么意思',
      '',
      ...status.meaning.zh.map((paragraph) => `- ${paragraph}`),
      '',
      '### When it happens',
      '',
      ...status.when.en.map((item) => `- ${item}`),
      '',
      '### 什么时候会出现',
      '',
      ...status.when.zh.map((item) => `- ${item}`),
      '',
      '### If you run the server',
      '',
      ...status.server.en.map((item) => `- ${item}`),
      '',
      '### 如果你是开发者',
      '',
      ...status.server.zh.map((item) => `- ${item}`),
      '',
      '### If you are just visiting',
      '',
      ...status.visitor.en.map((item) => `- ${item}`),
      '',
      '### 如果你只是访客',
      '',
      ...status.visitor.zh.map((item) => `- ${item}`),
      '',
      `Sources: ${status.sources.map((source) => `${source.label} (${source.url})`).join('; ')}`,
      '',
      '---',
      '',
    );
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
