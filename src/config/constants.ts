export enum MODULES {
  HOME = 'home',
  ROOM = 'room',
  GAME = 'game',
  REVIEW = 'review',
}

export const PAGES = {
  HOME: `pages/${MODULES.HOME}/index`,
  ROOM: `pages/${MODULES.ROOM}/index`,
  GAME: `pages/${MODULES.GAME}/index`,
  REVIEW: `pages/${MODULES.REVIEW}/index`,
}

export const SUB_PACKAGES = 'subPackages'

export const ROUTES = {
  HOME: `/${PAGES.HOME}`,
  ROOM: `/${SUB_PACKAGES}/${MODULES.ROOM}/${PAGES.ROOM}`,
  GAME: `/${SUB_PACKAGES}/${MODULES.GAME}/${PAGES.GAME}`,
  REVIEW: `/${SUB_PACKAGES}/${MODULES.REVIEW}/${PAGES.REVIEW}`,
}

export enum GAME_VERSIONS {
  TroubleBrewing = '暗流涌动',
  BadMoonRising = '黯月初升',
  SectsAndViolets = '教派与紫罗兰',
  NightmareBlossoms = '梦殒春宵',
  TempleFair = '华灯初上',
  MountainsWeep = '山雨欲来',
}

export enum STORAGE_KEY {
  PUK = 'puk',
  TOKEN = 'token',
  USER_ID = 'userId',
  PLAYER_COUNT = 'playerCount',
}
