//import LineChart from '../components/LineChart';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="h-screen w-screeen flex justify-center items-center ">
    <div className="basis-1/5">
        <Navbar/>
    </div>
    <div className="basis-4/5 w-1/5 m-10 p-10 rounded-xl bg-white">
      {/* <LineChart /> */}
    </div>
</div>
  );
}
