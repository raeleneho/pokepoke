import { Suspense } from "react";

import HomeContent from "../components/HomeContent";
import SplashScreen from "../components/SplashScreen";

const Home = () => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
