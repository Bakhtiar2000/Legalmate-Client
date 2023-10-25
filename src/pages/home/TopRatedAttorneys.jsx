import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import useAttorneys from "../../hooks/useAttorneys";
import AttorneyDiv from "../../components/AttorneyDiv";

const TopRatedAttorneys = () => {
  const [attorneysData] = useAttorneys();

  return (
    <section className="container mb-10">
      <SectionTitle
        title="Top Rated"
        redTitle="Attorneys"
        para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione id dolores velit tenetur. Illo."
      />
      {
        attorneysData.slice(0,3).map((attorney) => <AttorneyDiv key={attorney._id} attorney={attorney}></AttorneyDiv>)
      }
      <Link className="flex justify-center" to="/attorneys">
        <button className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5">
          Show more
        </button>
      </Link>
    </section>
  );
};

export default TopRatedAttorneys;