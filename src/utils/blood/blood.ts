import { sleep } from '@/utils/time.ts'
import { Canvas, createSelectorQuery, CanvasContext, NodesRef } from '@tarojs/taro'

interface BloodDrop {
  x: number
  y: number
  r: number
  cy: number
  speed: number
  opacity: number
  draw: () => void
}

class Blood implements BloodDrop {
  x: number
  y: number
  r: number
  cy: number
  speed: number
  opacity: number
  ctx: CanvasContext

  constructor(x: number, y: number, r: number, s: number, ctx: Taro.CanvasContext) {
    this.x = x
    this.y = y
    this.r = r
    this.cy = y
    this.speed = s
    this.opacity = 1 // 初始透明度为1，完全不透明
    this.ctx = ctx
  }

  draw(): void {
    this.ctx.globalAlpha = this.opacity // 设置圆的透明度
    this.ctx.beginPath()
    this.ctx.arc(this.x + 1, this.cy, this.r, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(160, 42, 42, 0.5)' // 半透明的红色
    this.ctx.fill()
  }
}

const drawBlood = async (res: NodesRef[]): Promise<void> => {
  await sleep(3000)
  const h = 200
  const w = 345
  const canvas: Canvas = res[0].node as unknown as Canvas
  const ctx: CanvasContext = canvas.getContext('2d') as CanvasContext
  if (!ctx) return
  canvas.height = h
  canvas.width = w

  const bloodDrops: Blood[] = [
    // 南
    new Blood(20, 80, 0.7, 0.9, ctx),
    new Blood(31, 81, 1, 1.2, ctx),
    new Blood(45, 92, 1.3, 1.5, ctx),
    new Blood(62, 23, 1.2, 1, ctx),
    new Blood(70, 92, 1.6, 1.7, ctx),
    // 开
    new Blood(103, 68, 1, 1.3, ctx),
    new Blood(124, 64, 1.8, 0.8, ctx),
    new Blood(142, 80, 1, 1.3, ctx),
    new Blood(160, 54, 1.5, 1.9, ctx),
    // 钟
    new Blood(182, 50, 0.8, 0.9, ctx),
    new Blood(203, 72, 1, 1.4, ctx),
    new Blood(216, 55, 0.7, 0.8, ctx),
    new Blood(228, 82, 1, 1.1, ctx),
    new Blood(245, 46, 1.3, 0.9, ctx),
    // 楼
    new Blood(265, 76, 1.3, 0.7, ctx),
    new Blood(278, 82, 1.2, 1.3, ctx),
    new Blood(294, 80, 0.8, 1, ctx),
    new Blood(328, 68, 1.8, 1.2, ctx),
  ]

  let stop = false

  const loop = (): void => {
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < bloodDrops.length; ++i) {
      const drop = bloodDrops[i]
      drop.opacity -= 0.006 // 透明度降低速度
      drop.r -= 0.005 // 半径减小

      if (drop.r <= 0) {
        stop = true
        break
      }

      if (Math.random() > 0.5) {
        drop.cy += drop.speed
      } else {
        drop.cy += drop.speed / 3
      }

      if (drop.cy > h) {
        drop.cy = drop.y
      }

      drop.cy += drop.speed
      drop.draw()
    }

    if (!stop) {
      canvas.requestAnimationFrame(loop)
    }
  }

  loop()
}

export const blood = (): void => {
  const query = createSelectorQuery()
  query.select('#canvas').fields({ node: true, size: true }).exec(drawBlood)
}
