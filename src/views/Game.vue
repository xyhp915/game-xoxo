<template>
  <div class="game-xoxo">
    <h2>
      XoXo Game
    </h2>

    <div class="game-panel" :style="_panelStyle">
      <table class="game-table">
        <tr v-for="(row, $r) in stage">
          <td v-for="(cell, $c) in row" @click="_onPlace([$r, $c])">
            {{ cell }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { GameXoXo } from '@/game'

  export default {
    name: 'GameXoXoDashboard',

    data () {
      this.$game = new GameXoXo({
        grid: 8,
        onPlace: this._gamePlaceCallback.bind(this),
        onSettled: this._gameSettledCallback.bind(this)
      })

      return {
        settled: false,
        stage: this.$game.stage
      }
    },

    methods: {
      _onPlace(pos) {
        if (this.settled) {
          return window.alert('已经有人赢了...')
        }

        this.$game.next(pos.map(i => i + 1))
      },

      _gamePlaceCallback (stage) {
        this.stage = stage
      },

      _gameSettledCallback() {
        setTimeout(() => {
          window.alert('好像有人赢了吧...')
          this.settled = true
        }, 50)
      }
    },

    computed: {
      _panelStyle () {
        const style = {}
        const width = (this.$game.options.grid) * 150

        style.width = `${width}px`

        return style
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  .game-panel {
    background-color: aliceblue;
    margin: 100px auto;

    transform: scale(.5);
    transform-origin: top;
  }

  .game-table {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-collapse: collapse;
  }

  .game-table td {
    border: 1px solid black;
    font-size: 80px;
    color: black;
    width: 150px;
    height: 150px;
    overflow: hidden;
    line-height: 1em;
  }

  .game-table td:hover {
    background-color: antiquewhite;
    cursor: pointer;
  }
</style>
