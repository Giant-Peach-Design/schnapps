export default function editorLinks() {
  window._wpLoadBlockEditor.then(() => {
    setTimeout(() => {
      const editor = document.querySelector(".edit-post-visual-editor");

      if (editor) {
        editor.addEventListener("click", (event) => {
          if(event.target.tagName === 'A') {
            event.preventDefault();
          }
        });
      }
    }, 1000);
  });
}
