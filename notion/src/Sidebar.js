import { request } from "./api.js";
import Document from "./Document.js";
import Header from "./Header.js";
import DocumentList from "./DocumentList.js";
// {
//     id: 1, // Document id
//     title: "노션을 만들자", // Document title
//     documents: [
//       {
//         id: 2,
//         title: "블라블라",
//         documents: [
//           {
//             id: 3,
//             title: "함냐함냐",
//             documents: [],
//           },
//         ],
//       },
//     ],
//   },

export default function Sidebar({ $target, initialState, onSelectDocument }) {
  this.state = initialState;
  const $sidebarContainer = document.createElement("div");
  $target.appendChild($sidebarContainer);

  this.setState = (nextState) => {
    console.log(nextState, "Sidebar nextState");
    this.state = nextState;
    documentList.setState(nextState);
    this.render();
  };

  new Header({ $target: $sidebarContainer, initialState: { username: "Jinist" } });

  const documentList = new DocumentList({
    $target: $sidebarContainer,
    initialState: this.state,
    onRemove: async (documentId) => {
      await request(`/documents/${documentId}`, { method: "DELETE" });
      fetchGetDocuments();
    },
    onAdd: async (documentId) => {
      fetchAddDocument(documentId);
    },
    onSelectDocument,
  });

  this.render = () => {};

  $sidebarContainer.addEventListener("click", () => {});

  // 새 페이지 추가 버튼
  const $button = document.createElement("button");
  $button.innerHTML = "새 페이지 추가";
  $sidebarContainer.appendChild($button);

  $button.addEventListener("click", async () => {
    const res = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음!",
        parent: null,
      }),
    });
    // const edit = await request(`/documents/${documentId}`, {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     title: "제목 수정",
    //     content: "내용 수정",
    //   }),
    // });
    fetchGetDocuments();
    console.log(res);
  });

  const fetchGetDocuments = async () => {
    const documents = await request("/documents");
    console.log(documents, "fetch documents");
    this.setState(documents);
  };

  const fetchAddDocument = async (documentId) => {
    await request(`/documents`, { method: "POST", body: JSON.stringify({ title: "제목 없음", parent: documentId }) });
    fetchGetDocuments();
  };

  fetchGetDocuments();
}
