<div class="h-full {className}" bind:this={editorContainer}></div>

<script>
  import { basicSetup, EditorView } from "codemirror"
  import { placeholder, keymap } from "@codemirror/view"
  import { json } from "@codemirror/lang-json"
  import { onMount } from "svelte";
  import { indentWithTab } from "@codemirror/commands"
  import { indentUnit } from "@codemirror/language"

  let editorContainer
  export let className = ""
  export let readOnly = false
  export let placeholderText = ""
  export let code = ''

  onMount(() => {
    const extensions = [
      basicSetup,
      json(),
      keymap.of([indentWithTab]),
      indentUnit.of("  "),
      EditorView.updateListener.of(update => {
        if (update.docChanged)
          code = update.state.doc.toString()
      })
    ]

    if (readOnly)
      extensions.push(EditorView.editable.of(false))
    if (placeholder.length >= 1)
      extensions.push(placeholder(placeholderText))

    const editor = new EditorView({
      doc: code,
      extensions: extensions,
      parent: editorContainer
    })
  })
</script>