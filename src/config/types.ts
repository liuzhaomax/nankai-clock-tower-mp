import { GAME_VERSIONS } from '@/config/constants'

// Player
export interface Player {
  base: PlayerBaseInfo
  game: PlayerGameInfo
}

export interface PlayerBaseInfo {
  id: string
  name: string
  avatar?: string
}

export interface PlayerGameInfo {
  seat?: number
  ready?: boolean
  // role?: string
  // roleType?: string
}

// Room
export type GameVersionType = (typeof GAME_VERSIONS)[keyof typeof GAME_VERSIONS]

export interface Room {
  id: string
  name: string
  host: string
  playerCount: number
  gameVersion: GameVersionType
  // roleTypeAllocated?: RoleTypeAllocated
  // players?: Array<Player>
}

// export interface RoleTypeAllocated {
//   townsfolks: number
//   outsiders: number
//   minions: number
//   Demons: number
// }
