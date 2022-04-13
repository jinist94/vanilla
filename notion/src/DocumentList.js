import { request } from "./api.js";
import Document from "./Document.js";
import Root from "./Root.js";

export default function DocumentList({ $target, initialState, onRemove, onAdd, onSelectDocument }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(nextState, "DocumentList nextState");
    this.render();
  };

  this.render = () => {
    this.state.map((doc) => {
      new Root({
        $target: $documentList,
        initialState: doc,
        onRemove,
        onAdd,
        onSelectDocument,
      });
    });
  };

  this.render();

  // 삭제
}
