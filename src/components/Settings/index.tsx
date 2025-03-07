/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import { useCallback, useState } from "react";
import MainNav from "../MainNav";
import { Field, Input } from "@zendeskgarden/react-forms";
import React from "react";

const Settings = React.memo(
  ({ updateKey }: { updateKey: (value: string) => void }) => {
    const [keySaved, setKeySaved] = useState(false);
    const updateKeyFn = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        updateKey(event.target.value);
        setKeySaved(true);
      },
      [updateKey]
    );

    const handleOnClick = () => {
      setKeySaved(false);
    };

    return (
      <MainNav>
        <Field>
          <Field.Label>Add your key here</Field.Label>
          <Input onClick={handleOnClick} onBlur={updateKeyFn} />
          {keySaved && <Field.Label>Key is saved</Field.Label>}
        </Field>
      </MainNav>
    );
  }
);
export default Settings;
