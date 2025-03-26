import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://personal-blog-6a2.pages.dev", // replace this with your deployed domain
  author: "Eric",
  desc: "",
  profile: "https://personal-blog-6a2.pages.dev",
  title: "ebh",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 1000,
  postPerPage: 1000,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showSearch: false,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-AU"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/eb-h",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "X",
    href: "https://x.com/Quickly_Rainbow",
    linkTitle: `${SITE.title} on twitter`,
    active: true,
  },
  {
    name: "RSS",
    href: "/rss.xml",
    linkTitle: ` ${SITE.title} RSS Feed`,
    active: true,
  },
];
