<template>
  <div class="blog-detail">
    <h1>
      <span
        class="
          mt-2
          block
          text-3xl text-center
          leading-8
          font-extrabold
          tracking-tight
          text-gray-900
          sm:text-4xl
        "
        >{{ blog.title }}</span
      >
      <span
        class="
          block
          text-base text-center text-gray-600
          font-semibold
          tracking-wide
          capitalize
          mt-2
        "
        >By {{ blog.author }}</span
      >
    </h1>
    <div
      ref="target"
      class="mt-8 text-xl text-gray-500 leading-8"
      contenteditable="true"
      @input="testFunction"
    >
      {{ blog.content }}
    </div>
    <span v-if="addHighlighter">
      <v-swatches v-model="color"></v-swatches>
    </span>
    <!-- <input class="hidden" value="Text to select" @select="testFunction" /> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import VSwatches from 'vue-swatches'

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'

export default {
  components: { VSwatches },
  props: {
    blog: Object
  },
  data() {
    return {
      addHighlighter: false,
      color: null,
      scrollPosition: 0,
      selectedText: ''
    }
  },
  mounted() {
    document.addEventListener('scroll', this.updateScroll)
    document.addEventListener('mouseup', event => {
      if (
        event.target === this.$refs.target ||
        event.target.contains(this.$refs.target)
      )
        this.testFunction()
    })
  },
  methods: {
    ...mapActions('words', ['triggerAddWordAction']),
    ...mapMutations('words', ['setWordToCreate']),
    updateScroll() {
      this.scrollPosition = window.scrollY
      console.log(window.screenY)
    },
    showBtn() {
      console.log('active')
    },
    testFunction() {
      const bodyElement = document.getElementsByTagName('BODY')[0]
      const selectedText = window.getSelection().toString()
      const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u
      if (selectedText.match(alphanumeric)) {
        console.log('selected TEXT', selectedText)
        this.selectedText = selectedText
        this.addHighlighter = true
        const craateDiv = window.getSelection().getRangeAt(0)
        const rect = craateDiv.getBoundingClientRect()
        const textSelectionTooltipContainer = document.createElement('div')
        textSelectionTooltipContainer.setAttribute(
          'id',
          'textSelectionTooltipContainer'
        )
        textSelectionTooltipContainer.innerHTML = `<button onclick="setHighlighter" style="background-color:yellow;" id="textShareTwitterBtn">HighLight</button>`
        console.log(rect.top, 'rect', this.scrollPosition)
        // eslint-disable-next-line no-undef
        const containerTop = `${this.scrollPosition + rect.top - 20}px`
        console.log(containerTop)
        const containerLeft = `${rect.left + rect.width / 2 - 50}px`
        textSelectionTooltipContainer.style.transform = `translate3d(${containerLeft},${containerTop}, 0px)`
        bodyElement.appendChild(textSelectionTooltipContainer)
      }
    },
    createToolTip() {
      const bodyElement = document.getElementsByTagName('BODY')[0]
      const selectedText = window.getSelection().toString()
      const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u
      if (selectedText.match(alphanumeric)) {
        // const craateDiv = window.getSelection().getRangeAt(0)
        const textSelectionTooltipContainer = document.createElement('div')
        textSelectionTooltipContainer.setAttribute(
          'id',
          'textSelectionTooltipContainer'
        )
        textSelectionTooltipContainer.innerHTML = `<button style="background-color:yellow;" id="textShareTwitterBtn">HighLight</button>`
        bodyElement.removeChild(textSelectionTooltipContainer)
      }
    },
    setHighlighter() {
      console.log(this.selectedText)
      this.setWordToCreate(this.selectedText)
      this.triggerAddWordAction()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.blog-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
