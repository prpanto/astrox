<template>
  <div v-if="editor">
    <div class="flex items-center space-x-1 mb-4">
      <UTooltip text="Bold" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-bold" @click="editor.chain().focus().toggleBold().run()" activeClass="text-red-500" /> <!-- editor.isActive('bold') -->
      </UTooltip> {{ editor.isActive('bold') }}
      <UTooltip text="Italic" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-italic" @click="editor.chain().focus().toggleItalic().run()" /> <!-- !editor.isActive('italic' -->
      </UTooltip>
      <UTooltip text="Strike" :popper="{ placement: 'top' }">
        <UButton icon="i-radix-icons-text" @click="editor.chain().focus().toggleStrike().run()" />
      </UTooltip>
      <UTooltip text="Clear Marks" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-format-clear" @click="editor.chain().focus().unsetAllMarks().run()" /> <!-- !editor.isActive('paragraph' -->
      </UTooltip>
      <UTooltip text="Paragraph" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-paragraph" @click="editor.chain().focus().setParagraph().run()" /> 
      </UTooltip>
      <UTooltip text="Header 1" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" /> <!-- !editor.isActive('heading', { level: 1 }) -->
      </UTooltip>
      <UTooltip text="Header 2" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h2" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" /> <!-- !editor.isActive('heading', { level: 2 }) -->
      </UTooltip>
      <UTooltip text="Header 3" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h3" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" /> <!-- !editor.isActive('heading', { level: 3 }) -->
      </UTooltip>
      <UTooltip text="Header 4" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h4" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" /> <!-- !editor.isActive('heading', { level: 4 }) -->
      </UTooltip>
      <UTooltip text="Header 5" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h5" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" /> <!-- !editor.isActive('heading', { level: 5 }) -->
      </UTooltip>
      <UTooltip text="Header 6" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-type-h6" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" /> <!-- !editor.isActive('heading', { level: 6 }) -->
      </UTooltip>
      <UTooltip text="Bullet List" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-format-list-bulleted" @click="editor.chain().focus().toggleBulletList().run()" /> <!-- !editor.isActive('bulletList') -->
      </UTooltip>
      <UTooltip text="Code Block" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-code-tags" @click="editor.chain().focus().toggleCodeBlock().run()" /> <!-- !editor.isActive('codeBlock') -->
      </UTooltip>
      <UTooltip text="Horizontal Rule" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-horizontal-line" @click="editor.chain().focus().setHorizontalRule().run()" />
      </UTooltip>
      <!-- <UTooltip text="Hard Break" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-format-page-break" @click="editor.chain().focus().setHardBreak().run()" />
      </UTooltip> -->
      <UTooltip text="Highlight" :popper="{ placement: 'top' }">
        <UButton icon="i-bi-highlighter" @click="editor.chain().focus().toggleHighlight().run()" /> <!-- !editor.isActive('highlight') -->
      </UTooltip>
      <UTooltip text="Text Color" :popper="{ placement: 'top' }">
        <input type="color" value="#958DF1" @change="setColor" class="w-7 border-none rounded focus:outline-none" />
      </UTooltip>
      <UTooltip text="Block Quote" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-comment-quote" @click="editor.chain().focus().toggleBlockquote().run()" /> <!-- !editor.isActive('blockquote') -->
      </UTooltip>
      <UTooltip text="Text Align Left" :popper="{ placement: 'top' }">
        <UButton icon="i-radix-icons-text-align-left" @click="editor.chain().focus().setTextAlign('left').run()" /> <!-- !editor.isActive({ textAlign: 'left' }) -->
      </UTooltip>
      <UTooltip text="Text Align Center" :popper="{ placement: 'top' }">
        <UButton icon="i-radix-icons-text-align-center" @click="editor.chain().focus().setTextAlign('center').run()" /> <!-- !editor.isActive({ textAlign: 'center' }) -->
      </UTooltip>
      <UTooltip text="Text Align Right" :popper="{ placement: 'top' }">
        <UButton icon="i-radix-icons-text-align-right" @click="editor.chain().focus().setTextAlign('right').run()" /> <!-- !editor.isActive({ textAlign: 'right' }) -->
      </UTooltip>
      <UTooltip text="Text Align Justify" :popper="{ placement: 'top' }">
        <UButton icon="i-radix-icons-text-align-justify" @click="editor.chain().focus().setTextAlign('justify').run()" /> <!-- !editor.isActive({ textAlign: 'justify' }) -->
      </UTooltip>
      <UTooltip text="Undo" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-undo" @click="editor.chain().focus().undo().run()" /> <!-- !editor.can().chain().focus().undo().run() -->
      </UTooltip>
      <UTooltip text="Redo" :popper="{ placement: 'top' }">
        <UButton icon="i-mdi-redo" @click="editor.chain().focus().redo().run()" /> <!-- !editor.can().chain().focus().redo().run() -->
      </UTooltip>
    </div>

    <EditorContent :editor="editor"  class="h-full [&>.tiptap]:h-full focus:[&>.tiptap]:outline-none" />
  </div>
</template>

<script setup>
import { EditorContent, Editor, Extension } from '@tiptap/vue-3'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { StarterKit } from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const editor = ref()

function setColor(event) {
  editor.chain().focus().setColor(event.target.value).run()
}

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value.getHTML() === value
    if (!isSame) {
      editor.value.commands.setContent(value, false)
    }
  }
)

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: props.editable,
    editorProps: {
      attributes: {
        class: ''
      }
    },
    extensions: [StarterKit, Highlight, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    onUpdate: () => {
      emit('update:modelValue', editor.value?.getHTML())
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
  editor.value = null
})

</script>
