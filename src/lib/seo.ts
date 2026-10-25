import { statuses, type Locale, type Status } from '../data/statuses';
import { aboutPath, canonicalUrl, homePath, site } from '../data/site';
import { ui } from '../i18n/ui';
import { statusUrls } from './statusUrls';

const inLanguage = (locale: Locale) => (locale === 'zh' ? 'zh-CN' : 'en');

export function statusTitle(locale: Locale, status: Status): string {
  if (locale === 'zh') {
    return `${status.code} ${status.reason} 是什么意思？原因与处理建议｜DeepSeek 娘 HTTP 图鉴`;
  }
  return `${status.code} ${status.reason}: Meaning & Fix | DeepSeek HTTP Guide`;
}

export function statusDescription(locale: Locale, status: Status): string {
  if (locale === 'zh') {
    return `${status.code} ${status.reason}：${status.summary.zh} 常见原因、处理方法与 RFC 出处。`;
  }
  return `${status.code} ${status.reason}: ${status.summary.en} Common causes, fixes, and the RFC reference.`;
}

const website = (locale: Locale) => ({
  '@type': 'WebSite',
  '@id': `${canonicalUrl(homePath(locale))}#website`,
  name: site.name[locale],
  url: canonicalUrl(homePath(locale)),
  description: site.description[locale],
  inLanguage: inLanguage(locale),
  author: {
    '@type': 'Person',
    name: site.author.name,
    url: site.author.url,
  },
  isAccessibleForFree: true,
});

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    ...website(locale),
  };
}

export function homeJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': canonicalUrl(homePath(locale)),
    name: ui[locale].home.title,
    url: canonicalUrl(homePath(locale)),
    description: ui[locale].home.description,
    inLanguage: inLanguage(locale),
    isPartOf: website(locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: statuses.length,
      itemListElement: statuses.map((status, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: statusUrls(status.code).page[locale].url,
        name: `${status.code} ${status.reason}`,
      })),
    },
  };
}

function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function statusJsonLd(locale: Locale, status: Status) {
  const urls = statusUrls(status.code);
  const url = urls.page[locale].url;
  const imageUrl = urls.image.url;
  const homeUrl = canonicalUrl(homePath(locale));

  const term = {
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: `${status.code} ${status.reason}`,
    termCode: String(status.code),
    description: status.lead[locale],
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'HTTP status codes',
      url: homeUrl,
    },
    url,
    sameAs: [status.tech.rfcUrl, ...status.sources.map((source) => source.url)].filter(
      (value, index, values) => values.indexOf(value) === index,
    ),
  };

  const page = {
    '@type': 'WebPage',
    '@id': url,
    url,
    name: statusTitle(locale, status),
    description: statusDescription(locale, status),
    inLanguage: inLanguage(locale),
    isPartOf: website(locale),
    about: { '@id': `${url}#term` },
    mainEntity: { '@id': `${url}#term` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': `${url}#image`,
      contentUrl: imageUrl,
      width: 1254,
      height: 1254,
      caption: status.imageAlt[locale],
      creditText: `${site.illustrator.name} (${site.illustrator.platform})`,
      creator: {
        '@type': 'Person',
        name: site.illustrator.name,
        url: site.illustrator.url,
      },
      copyrightNotice: `Illustration by ${site.illustrator.name}`,
    },
    author: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
    datePublished: site.updated,
    dateModified: site.updated,
    breadcrumb: breadcrumbJsonLd([
      { name: ui[locale].nav.index, url: homeUrl },
      { name: `${status.code} ${status.reason}`, url },
    ]),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [page, term],
  };
}

export function aboutJsonLd(locale: Locale) {
  const url = canonicalUrl(aboutPath(locale));
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': url,
    url,
    name: ui[locale].about.h1,
    description: ui[locale].about.description,
    inLanguage: inLanguage(locale),
    isPartOf: website(locale),
    mainEntity: website(locale),
    about: {
      '@type': 'Person',
      name: site.illustrator.name,
      url: site.illustrator.url,
      description: `${site.illustrator.platform} illustrator`,
    },
    author: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
  };
}
