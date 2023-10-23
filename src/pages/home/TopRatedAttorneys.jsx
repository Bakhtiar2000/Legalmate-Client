import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import useAttorneys from "../../hooks/useAttorneys";

const TopRatedAttorneys = () => {
  const [attorneysData] = useAttorneys();

  return (
    <section className="container mb-10">
      <SectionTitle
        title="Top Rated"
        redTitle="Attorneys"
        para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione id dolores velit tenetur. Illo."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 duration-300">
      {
        attorneysData.map((attorney) => (
          <div
            key={attorney._id}
            className="relative group rounded-lg p-5 bg-lightDark border border-primary w-80 mx-auto"
          >
            <img
              className="w-40 h-40 object-cover rounded-full mx-auto border border-primary"
              src={attorney.img}
              alt=""
            />
            <p className="text-primary font-semibold text-2xl mt-5">
              {attorney.name}
            </p>
            <p>{attorney.practiceArea} Specialist</p>
            <p className="text-sm">Happy Client: {attorney.client}</p>
            <p>Email: {attorney.email}</p>

            {/* TODO: add link address */}
            <Link className="bg-primary/50 text-white group-hover:inline-block hidden p-3 rounded-md absolute top-1 right-1 md:-right-16 group-hover:right-1 duration-300 hover:bg-primary shadow-xl shadow-purple/20 hover:shadow-white/20">
              <HiOutlineExternalLink size="20px" />
            </Link>

            <div className="flex justify-center gap-3 items-center mt-5">
              <a href={attorney.facebook} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                <FaFacebookF />
              </a>
              <a href={attorney.linkedin} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                <FaLinkedin />
              </a>
              <a href={attorney.twitter} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                <FaTwitter />
              </a>
            </div>
          </div>
        ))
        }
      </div>
      <Link className="flex justify-center" to="/attorneys">
        <button className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5">
          Show more
        </button>
      </Link>
    </section>
  );
};

export default TopRatedAttorneys;