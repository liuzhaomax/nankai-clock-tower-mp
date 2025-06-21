import { sleep } from '@/utils/time.ts'
import Taro from '@tarojs/taro'

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
  ctx: Taro.CanvasContext
  // ctx: CanvasRenderingContext2D; // h5写法

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

    this.ctx.draw() // weapp写法
  }
}

export const blood = async (): Promise<void> => {
  await sleep(3000)
  const h = 100
  const w = 345
  const ctx = Taro.createCanvasContext('canvas-blood')
  if (!ctx) return
  // h5写法
  // const canvas = document.createElement('canvas');
  // ctx = canvas.getContext('2d');
  // if (!ctx) return;
  //
  // const container = document.getElementById('Title-wrap');
  // container?.appendChild(canvas);
  // canvas.height = h;
  // canvas.width = w;

  const bloodDrops: Blood[] = [
    // 血
    new Blood(13, 76, 0.7, 0.9, ctx),
    new Blood(31, 72, 1, 1.2, ctx),
    new Blood(38, 30, 1.3, 1.5, ctx),
    new Blood(70, 38, 1.2, 1, ctx),
    new Blood(80, 74, 1.6, 1.7, ctx),
    // 染
    new Blood(100, 68, 1, 1.3, ctx),
    new Blood(115, 40, 0.8, 0.8, ctx),
    new Blood(135, 75, 1, 1.3, ctx),
    new Blood(160, 62, 1.5, 1.9, ctx),
    // 钟
    new Blood(182, 50, 0.8, 0.9, ctx),
    new Blood(203, 72, 1, 1.4, ctx),
    new Blood(220, 55, 0.7, 0.8, ctx),
    new Blood(230, 82, 1, 1.1, ctx),
    new Blood(250, 40, 1.3, 0.9, ctx),
    // 楼
    new Blood(268, 72, 1.3, 0.7, ctx),
    new Blood(280, 82, 1.2, 1.3, ctx),
    new Blood(300, 80, 0.8, 1, ctx),
    new Blood(334, 62, 1.8, 1.2, ctx),
  ]

  let stop = false

  const loop = async (): Promise<void> => {
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
      // requestAnimationFrame(loop); // h5写法
      Taro.nextTick(loop)
    }
  }

  loop()
}
