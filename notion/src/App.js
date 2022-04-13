import { request } from "./api.js";
import Sidebar from "./Sidebar.js";
import Editor from "./Editor.js";

export default function App({ $target }) {
  //   this.state = {
  //     rootDocuments: [],
  //     selectedDocument: {},
  //   };

  const onSelectDocument = async (id) => {
    const doc = await request(`/documents/${id}`);
    editor.setState(doc);
  };

  const sidebar = new Sidebar({
    $target,
    initialState: [],
    onSelectDocument,
  });

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
  });
}
