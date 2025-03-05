import { useState } from "react";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import MainNav from "../MainNav";
import Recorder from "../Recorder";
import { Tabs } from "@zendeskgarden/react-tabs";
import React from "react";
import Loading from "../Loading";
import Error from "../Error";
import RecordingPage from "../RecordingPage";

const Home = React.memo(() => {
  const [selectedTab, setSelectedTab] = useState("start-recording");
  const { loading, error, data } = useFetchCustomers();

  return (
    <MainNav>
      {loading && <Loading />}
      {error && <Error />}
      {data && (
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <Tabs.TabList>
            <Tabs.Tab item="start-recording">Start Recording</Tabs.Tab>
            <Tabs.Tab item="unsaved-recordings">Unsaved Recordings</Tabs.Tab>
            <Tabs.Tab item="saved-recordings">Previous Recordings</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.TabPanel item="start-recording">
            <RecordingPage />
          </Tabs.TabPanel>
          <Tabs.TabPanel item="unsaved-recordings">
            Unsaved Recording
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
