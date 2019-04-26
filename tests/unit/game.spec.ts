import { GameXoXo } from '@/game'

describe('test-game-core', () => {
  test('stage-0', () => {
    const game = new GameXoXo()

    expect(typeof GameXoXo).toBe('function')
    expect(game.options.grid).toBe(3)
  })


  test('stage-1', () => {
    const game = new GameXoXo()

    expect(game.place([4, 4], 'x')).toBe(false)
    expect(game.place([1, 1], 'x')).toBe(void 0)
    expect(game.place([1, 1], 'x')).toBe(false)
  })

  test('stage-2', () => {
    const game = new GameXoXo()

    game.next([1, 1])
    expect(game.active).toBe('x')

    game.next([1, 2])
    expect(game.active).toBe('o')

    expect(() => {
      game.next([1, 2])
    }).toThrow('place position illegal')

    const stage0 = [
      ['x', 'o', null],
      [null, null, null],
      [null, null, null]
    ]

    expect(game.stage).toEqual(stage0)
  })

  test('stage-3', () => {
    const stage0 = [
      ['x', 'o', null],
      [null, null, null],
      [null, null, null]
    ]

    const stage1 = [
      ['x', 'o', null],
      [null, 'x', null],
      [null, null, 'x']
    ]

    const stage2 = [
      ['o', 'o', 'o'],
      [null, 'x', null],
      [null, null, 'x']
    ]

    const stage3 = [
      ['o', 'x', 'o'],
      ['o', 'x', null],
      ['o', null, 'x']
    ]

    const stage4 = [
      ['o', 'x', 'o'],
      [null, 'o', null],
      ['o', null, 'x']
    ]

    const stage5 = [
      ['x', 'x', 'o'],
      ['o', null, 'x'],
      ['o', 'o', 'o'],
    ]

    expect(GameXoXo.checkStageSettled(stage0)).toBe(false)
    expect(GameXoXo.checkStageSettled(stage1)).toBe(true)
    expect(GameXoXo.checkStageSettled(stage2)).toBe(true)
    expect(GameXoXo.checkStageSettled(stage3)).toBe(true)
    expect(GameXoXo.checkStageSettled(stage4)).toBe(true)
    expect(GameXoXo.checkStageSettled(stage5)).toBe(true)
  })
})
