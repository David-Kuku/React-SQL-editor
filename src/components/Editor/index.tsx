import React, { useCallback } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-cobalt";
import PlayIcon from "../../icons/playIcon";
import styles from './editor.module.css'

interface Props {
  setQuery: (val: string) => void;
  value: string;
  setValue: (val: string) => void;

}
const Editor = React.memo(({ setQuery, value, setValue }: Props) => {
  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = useCallback(() => {
    var Z = value.toLowerCase().slice(value.indexOf("from") + "from".length);
    setQuery(Z.split(" ")[1]);

    console.log(Z)
  }, [value]);

  return (
    <main
      className={styles.container}
    >
      <label htmlFor="editor">
        <AceEditor
          aria-label="editor"
          mode="mysql"
          theme="cobalt"
          name="editor"
          fontSize={16}
          minLines={15}
          maxLines={10}
          width="100%"
          showPrintMargin={false}
          showGutter
          placeholder="Write your Query here..."
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
          value={value}
          onChange={onChange}
        />
      </label>
      <div>
        <button className={styles.playButton} onClick={onSubmit}>
          <PlayIcon />
          <p>Run Query</p>
        </button>
      </div>
    </main>
  );
});

export default Editor;
