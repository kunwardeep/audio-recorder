import useFetchCustomers from "../../hooks/useFetchCustomers";
import AudioRecorder from "../AudioRecorder";
import MainNav from "../MainNav";
import Recorder from "../Recorder";

const Home = () => {
  const { loading, error, data } = useFetchCustomers();
  console.log("hooks", loading, error, data);

  return (
    <MainNav>
      <Recorder />
      <AudioRecorder />
    </MainNav>
  );
};
export default Home;
