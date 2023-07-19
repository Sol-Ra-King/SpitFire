import React, { LegacyRef } from "react";

interface Props {
  onSubmitHandler: React.FormEventHandler<HTMLFormElement>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const InputBox: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.onSubmitHandler} action="">
      <input ref={props.inputRef as LegacyRef<HTMLInputElement>} type="text" />
      <button type="submit">Search Artist</button>
    </form>
  );
};

export default InputBox;
