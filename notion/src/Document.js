export default function Document({ $target, initialState, onRemove, onAdd, onSelectDocument }) {
  const $document = document.createElement("li");

  $target.appendChild($document);
  this.state = initialState;

  $document.setAttribute("data-id", this.state.id);
  let isOpen = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  console.log(this.state, "Document state");

  //   const onToggle = () => {
  //     isOpen = !isOpen;
  //     this.render();
  //   };

  this.render = () => {
    $document.innerHTML = `
      <div>
        <button class="toggleBtn">▼</button>
        <span>${doc.title}</span>
        <button class="addBtn"> + </button>
        <button class="removeBtn"> 삭제 </button>
      </div>
      `;

    //   if (doc.documents && doc.documents.length > 0) new Document({ $target: $li, initialState: doc.documents });
  };

  this.render();

  // 문제사항 : 이벤트 발생 시 부모의 element에 click 이벤트가 전달된다.
  $document.addEventListener("click", async (e) => {
    const { target } = e;

    const $li = target.closest("li");
    if ($li) {
      const documentId = $li.dataset.id;
      console.log(e.target);
      if (target.matches(".removeBtn")) onRemove(documentId);
      if (target.matches(".addBtn")) onAdd(documentId);
      if (target.matches(".toggleBtn")) onToggle();
      else {
        onSelectDocument(documentId);
      }
    }
  });
}
