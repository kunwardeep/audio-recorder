/* eslint-disable @arthurgeron/react-usememo/require-memo */
import React, { useEffect, useCallback, useRef } from "react";
import { Table } from "@zendeskgarden/react-tables";
import styled from "styled-components";
import { useIndexedDBAudio } from "../../hooks/useIndexedDBAudio";
import { ICustomerData } from "../../types";
import AudioPlayer from "../AudioPlayer";
import { Button } from "@zendeskgarden/react-buttons";

const StyledContainer = styled.div`
  overflow-x: auto;
  color-scheme: only ${(p) => p.theme.colors.base};
`;

const StyledTable = styled(Table)`
  min-width: 500px;
`;

const StyledTableCell = styled(Table.Cell)`
  align-content: center;
`;

const DisplayPlayerBoundary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DisplayRecordingsTable = React.memo(
  ({
    currentAudioFiles,
    deleteFileHandler,
  }: {
    deleteFileHandler: (id: string) => void;
    currentAudioFiles: Array<{
      name: string;
      file: Blob;
    }>;
  }) => {
    return (
      <StyledContainer>
        <StyledTable>
          <Table.Head>
            <Table.HeaderRow>
              <Table.HeaderCell style={{ width: "100px" }}></Table.HeaderCell>
              <Table.HeaderCell>Recording Name</Table.HeaderCell>
              <Table.HeaderCell>Unsaved Recording</Table.HeaderCell>
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            {/*eslint-disable-next-line @arthurgeron/react-usememo/require-usememo*/}
            {currentAudioFiles.map((af, i) => {
              return (
                <Table.Row key={af.name + i}>
                  <StyledTableCell>{i + 1}</StyledTableCell>
                  <StyledTableCell>{af.name}</StyledTableCell>
                  <StyledTableCell>
                    <DisplayPlayerBoundary>
                      <AudioPlayer audioBlob={af.file} />
                      <Button
                        onClick={() => deleteFileHandler(af.name)}
                        size="small"
                        isDanger
                      >
                        Delete
                      </Button>
                    </DisplayPlayerBoundary>
                  </StyledTableCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </StyledTable>
      </StyledContainer>
    );
  }
);

const UnsavedRecordings = ({ userData }: { userData: ICustomerData }) => {
  const { audioFiles, getAudioFiles, deleteAudioFile } = useIndexedDBAudio(
    userData.id
  );
  const audioFilesRef = useRef(audioFiles);

  const deleteFileHandler = useCallback(
    (id: string) => {
      deleteAudioFile(id);
    },
    [deleteAudioFile]
  );

  useEffect(() => {
    if (audioFilesRef.current === audioFiles) {
      getAudioFiles();
    } else {
      audioFilesRef.current = audioFiles;
    }
  });

  return (
    <div>
      {audioFiles.length > 0 ? (
        <DisplayRecordingsTable
          currentAudioFiles={audioFiles}
          deleteFileHandler={deleteFileHandler}
        />
      ) : (
        <>No unsaved files</>
      )}
    </div>
  );
};

export default UnsavedRecordings;
