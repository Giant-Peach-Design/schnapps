export default function editorLinks() {
  window._wpLoadBlockEditor.then(() => {
    setTimeout(() => {
      const editor = document.querySelector(".edit-post-visual-editor");
      if (editor) {
        const links = editor.querySelectorAll("a");

        if (links.length) {
          links.forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
            });
          });
        }
      }
    }, 1000);
  });
}
