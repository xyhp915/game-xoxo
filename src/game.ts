interface XoXoOptions {
  grid: number
  onPlace?: (stage: any) => void
  onSettled?: () => void
}

const defaultOptions: XoXoOptions = {
  grid: 3
}

type flag = 'x' | 'o' | null
type position = [number, number]

interface IXoXo {
  place (pos: position, flag: flag): void | boolean

  next (pos: position): void

  resolveNextFlag (): flag

  isSettled (): boolean
}

/**
 * game class for xoxo
 */
class GameXoXo implements IXoXo {
  private readonly _stage: Array<Array<flag>>
  private readonly _options: XoXoOptions
  private _settled: boolean = false
  private _active: flag = null

  constructor (options: XoXoOptions = defaultOptions) {
    this._options = Object.assign({}, defaultOptions, options)

    const {grid} = this._options
    this._stage = Array.from(Array(grid)).map(() => {
      return Array.from(Array(grid)).fill(null)
    })
  }

  isSettled (): boolean {
    return GameXoXo.checkStageSettled([
      ...this._stage
    ])
  }

  static checkStageSettled (stage: Array<Array<any>>): boolean {
    const n = stage.length

    const settled = Array.from(Array(n)).some((_, i) => {
      const isHead = i === 0
      const isTail = i === (n - 1)
      let result: boolean = false


      result = listEveryItemSame(stage[i])

      if (!result) {
        result = listEveryItemSame(stage.map((_, r) => {
          return stage[r][i]
        }))
      }


      if (!result && (isHead || isTail)) {
        // check the diagonal items
        result = listEveryItemSame(stage.map((_, r) => {
          if (isHead) {
            return stage[r][r]
          } else {
            return stage[r][n - r - 1]
          }
        }))
      }


      return result
    })

    return settled

    /**
     * you known that
     * @param list
     */
    function listEveryItemSame (list: Array<flag>) {
      return ['x', 'o'].some((flag) => {
        return list.every(item => {
          return item != null && flag === item
        })
      })
    }
  }

  next (this: GameXoXo, pos: position): void {
    if (this._settled) {
      throw new Error('game is settled')
    }

    const {onSettled, onPlace} = this._options
    const flag = this.resolveNextFlag()
    const ok = this.place(pos, flag)

    if (ok === false) {
      throw new Error('place position illegal')
    } else {
      this._active = flag

      onPlace && onPlace.call(this, [...this._stage])
    }

    // check stage settled status
    if (this.isSettled()) {
      onSettled && onSettled.call(this)

      this._settled = true
    }
  }

  place (this: GameXoXo, pos: position, flag: flag): void | boolean {
    const {grid} = this._options
    const [row, col] = pos

    if (row <= 0 || row > grid || col <= 0 || col > grid) {
      return false
    }

    const [x, y] = [row - 1, col - 1]

    if (this._stage[x][y] != null) {
      return false
    }

    this._stage[x][y] = flag
  }

  resolveNextFlag (): flag {
    if (this._active == null) {
      return 'x'
    }

    return this._active === 'x' ? 'o' : 'x'
  }

  get options (): XoXoOptions {
    return {
      ...this._options
    }
  }

  get active (): flag {
    return this._active
  }

  get stage (): Array<Array<flag>> {
    return [...this._stage].map(r => {
      return [...r]
    })
  }
}

export {
  GameXoXo
}
