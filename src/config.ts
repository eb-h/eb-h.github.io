import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Eric",
  profile: "https://satnaing.dev/",
  desc: "",
  title: "ebh",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 20,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  //editPost: {
  //  url: "https://github.com/satnaing/astro-paper/edit/main/src/content/blog",
  //  text: "Suggest Changes",
  //  appendFilePath: true,
  //},
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
  //{
  //  name: "X",
  //  href: "https://github.com/satnaing/astro-paper",
  //  linkTitle: `${SITE.title} on X`,
  //  active: false,
  //},
];
