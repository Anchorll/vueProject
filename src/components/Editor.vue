<template>
    <div>
        <div ref="editor" :key="k" style="text-align:left; width: 800px"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import userApi from '@/network/user'
    let editor
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          k: 0
        }
      },
      props: {
        type: {
          type: String,
          required: true
        },
        change: {
          type: Function,
          required: true
        },
        value: {
          type: String
        }
      },
      beforeMount () {
        this.editorContent = this.formatString(this.value)
      },
      mounted() {
        this.$nextTick(() => {
          editor = new E(this.$refs.editor)
          editor.customConfig.onchange = (html) => {
            this.editorContent = html
            console.log(html)
            this.change(html)
          }
          let user = userApi.current()
          console.log(this.type)
          editor.customConfig.uploadImgServer = `/api/file/upload/${this.type}`
          editor.customConfig.uploadImgHeader = {
            'Content-type': 'multipart/form-data',
            'Authorization': `${user.type} ${user.token}`
          }
          editor.customConfig.uploadFileName = 'file'
          editor.customConfig.customAlert = function (info) {
              console.log(info)
          }
          editor.customConfig.uploadImgHooks = {
            customInsert:  (insertImg, result) => {
              var url = this.$utils.formatMedia(result.content)
              insertImg(url)
            }
          }
          editor.create()
          this.setContent()
          // editor.txt.html(this.editorContent)
        })
      },
      watch: {
        value () {
          this.setContent()
          // if (val) this.setContent()
        }
      },
      methods: {
        getContent: function () {
            console.log(this.editorContent)
        },
        setContent () {
          this.editorContent = this.formatString()
          editor.txt.html(this.editorContent)
        },
        formatString () {
          let string = this.value.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
            console.log(match)
            console.log(capture)
            if (!capture.startsWith('http') || !capture.startsWith('https')) {
             // return `<img src="${this.$utils.formatMedia(capture)}" alt="图片${capture}">`
              return `<img src="capture" alt="图片${capture}">`

            } else {
              return match
            }
          })
          return string
        }
      }
    }
</script>

<style scoped lang="less">
/deep/.w-e-text img{
  width: 600px;
}
</style>
