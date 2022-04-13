export default function Editor({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $editor = document.createElement("div");
  $target.appendChild($editor);
  $editor.classList.add("editor");

  this.render = () => {
    const { title, content } = this.state;
    $editor.innerHTML = `
    <input class="editor-title" name="title" type="text" placeholder="제목" value="${title}">
    <textarea class="editor-content" name="content">${content}</textarea>
  `;
  };

  this.render();
}
