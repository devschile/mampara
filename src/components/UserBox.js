export default {
  props: ['name'],
  template: 
  `<h3>Hola {{ emoji }}<code>&lt;{{ name.split(' ')[0] }}&gt;</code></h3>`,
  data() {
    return {
      emoji: '👋',
    }
  },
  methods: {
    randomEmoji() {
      const emojis = ['✌️', '🤝', '👋', '🤙', '🙌']
      this.set('emoji', emojis.sort(() => 0.5 - Math.random())[0])
    }
  },
  hooks: {
    mounted() {
      this.callMethod('randomEmoji', [])
    }
  }
}
