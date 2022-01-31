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
      @input="testFunction"
      v-html="blog.content"
    ></div>
    <!-- <input class="hidden" value="Text to select" @select="testFunction" /> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    blog: Object
  },
  data() {
    return {
      addHighlighter: false,
      color: null,
      scrollPosition: 0,
      selectedText: '',
      textSelectionTooltipContainer: null
    }
  },
  mounted() {
    this.textSelectionTooltipContainer = document.createElement('div')
    this.textSelectionTooltipContainer.setAttribute(
      'id',
      'textSelectionTooltipContainer'
    )
    this.textSelectionTooltipContainer.setAttribute(
      'onclick',
      this.setHighlighter()
    )
    this.textSelectionTooltipContainer.innerHTML = `
        <button id="texthighlight" style="background-color:white; padding: 4px; font-size:12px; border-radius:6px; border: 1px solid blue;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
</svg></i></button>`
    console.log(this.textSelectionTooltipContainer, 'text div')
    // document
    //   .getElementById('#textSelectionTooltipContainer')
    //   .onclick(this.showBtn)
    document.addEventListener('scroll', this.updateScroll)
    document.addEventListener('mouseup', event => {
      if (
        event.target === this.$refs.target ||
        event.target.contains(this.$refs.target)
      )
        this.testFunction()
    })
    // document.addEventListener('click', '#texthighlight', this.setHighlighter())
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
      const selectedText = window.getSelection().toString()
      const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u
      console.log(
        'selected TEXT',
        selectedText,
        selectedText.match(alphanumeric)
      )
      if (selectedText.match(alphanumeric) === null) {
        console.log('selected TEXT', selectedText)
        this.removeLastTooltip()
        this.selectedText = selectedText
        const bodyElement = document.getElementsByTagName('BODY')[0]
        const createDiv = window.getSelection().getRangeAt(0)
        const rect = createDiv.getBoundingClientRect()
        console.log(rect.top, 'rect')
        const position = rect.top + 178
        const containerTop = `${this.scrollPosition + rect.top - position}px`
        console.log(containerTop)
        const containerLeft = `${rect.left + rect.width / 2 - 20}px`
        this.textSelectionTooltipContainer.style.transform = `translate3d(${containerLeft},${containerTop}, 0px)`
        bodyElement.appendChild(this.textSelectionTooltipContainer)
        this.setHighlighter(selectedText)
      }
    },
    removeLastTooltip() {
      const bodyElement = document.getElementsByTagName('BODY')[0]
      bodyElement.addEventListener('mouseup', () => {
        const textu = document.getSelection().toString()
        if (!textu.length) {
          this.textSelectionTooltipContainer.remove()
        }
      })
    },
    setHighlighter(word) {
      console.log(word, 'upda')
      if (word !== '') {
        this.setWordToCreate(word)
        this.triggerAddWordAction()
      }
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
  // width: 100%;
  overflow-x: hidden;
}
</style>
