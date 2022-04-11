export default function Editor({ $target, initialState = { title: "", content: "" }, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;" />
    <div name="content" contentEditable="true" style="width:600px; height:600px; border:1px solid black;"></div>
  `;
  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);

    // 서버에서 내려오는 개행 값 \n
    // textarea에서는 \n으로 개행을 처리해 준다.
    this.render();
  };

  this.render = () => {
    const richContents = this.state.content
      .split("\n")
      .map((line) => {
        if (line.indexOf("# ") === 0) {
          return `<h1>${line.substr(1)}</h1>`;
        } else if (line.indexOf("##  ") === 0) {
          return `<h2>${line.substr(3)}</h2>`;
        } else if (line.indexOf("###  ") === 0) {
          return `<h3>${line.substr(3)}</h3>`;
        }
        return line;
      })
      .join("<br>");

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = richContents;
  };

  this.render();
  // conten

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);
    onEditing(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);
  });
}
