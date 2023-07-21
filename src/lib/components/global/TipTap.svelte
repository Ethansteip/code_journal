<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Paragraph.configure({
      HTMLAttributes: {
        class: 'my-custom-paragraph',
      },
      ],
      
      editorProps: {
    attributes: {
      class: 'border-2 h-[30rem] p-5 border-primary-500 rounded-lg m-5 focus:outline-none',
    },
  },
      content: '',
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

<section class="flex flex-col w-2/3 mt-10">
  {#if editor}
  <div class="flex bg-gray-700 p-2 gap-x-3 mx-5 rounded-lg w-fit">
    <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
    class:active={editor.isActive('heading', { level: 1 })}
    class="btn variant-filled-surface"
  >
    H1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
    class="btn variant-filled-surface"
  >
    H2
  </button>
  <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}
    class="btn variant-filled-surface">
    P
  </button>
  </div>
  
  {/if}
  
  <div bind:this={element} />
</section>



<style>
  .ProseMirror p {
    font-weight: 700;
}
</style>