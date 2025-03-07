import React, { useState } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import MainNav from "../MainNav";
import { Tabs } from "@zendeskgarden/react-tabs";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import RecordingPage from "../RecordingPage";
import UnsavedRecordings from "../UnsavedRecordings";

const Home = React.memo(() => {
  const [selectedTab, setSelectedTab] = useState("start-recording");
  const { loading, error, data } = useGetCurrentUser();

  return (
    <MainNav>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error} />}
      {data && (
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <Tabs.TabList>
            <Tabs.Tab item="start-recording">Start Recording</Tabs.Tab>
            <Tabs.Tab item="unsaved-recordings">Unsaved Recordings</Tabs.Tab>
            <Tabs.Tab item="saved-recordings">Previous Recordings</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanel item="start-recording">
            <RecordingPage userData={data} />
          </Tabs.TabPanel>
          <Tabs.TabPanel item="unsaved-recordings">
            <UnsavedRecordings userData={data} />
          </Tabs.TabPanel>
          <Tabs.TabPanel item="saved-recordings">
            Previous Recording
          </Tabs.TabPanel>
        </Tabs>
      )}
    </MainNav>
  );
});

export default Home;
