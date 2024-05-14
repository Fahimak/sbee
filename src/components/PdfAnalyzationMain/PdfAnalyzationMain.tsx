import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import UploadSection from "./components/UploadSection";
import ChatInputSection from "./components/ChatInputSection";

import styles from "./styles.module.css";

const PdfAnalyzationMain = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <UploadSection />
        <ChatInputSection />
      </div>
    </DndProvider>
  );
};

export default PdfAnalyzationMain;
