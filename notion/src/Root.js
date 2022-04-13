export default function Root({ $target, initialState }) {
  this.state = initialState;
  console.log(this.state, "RootState");
  const $document = document.createElement("ul");
  $target.appendChild($document);

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $document.innerHTML = `
        <div>
            <button class="toggleBtn">▼</button>
            <span>${this.state.title}</span>
            <button class="addBtn"> + </button>
            <button class="removeBtn"> 삭제 </button>
        </div>
    `;
    if (this.state.documents && this.state.documents.length > 0) {
      this.state.map((doc) => {
        new Document({ $target: $document, initialState: doc });
      });
    }
  };
}
