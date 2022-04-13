export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $target.appendChild($header);
  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `
        <h3>${this.state.username} 님의 Notion</h3>
    `;
  };
  this.render();
}
