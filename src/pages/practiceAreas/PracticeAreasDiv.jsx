import React from 'react';

const PracticeAreasDiv = ({practiceArea}) => {
    const {name, img, attorneys, contents}= practiceArea
    return (
        <div className="rounded-lg border border-primary p-5 w-80 mx-auto duration-300 h-full">
            <img
                className="w-16 md:w-20 h-16 md:h-20 object-cover bg-white text-secondary p-2 rounded-full mb-3"
                src={img}
                alt=""
              />
             <p className="text-2xl font-semibold mt-5 mb-2 cursor-pointer text-primary hover:underline duration-300 w-fit">
                {name}
              </p>
              <p>Expert Attorneys: {attorneys}</p>
              <ul className="pl-5 mt-5">
                {contents.map((content, index) => (
                  <div key={index}>
                    <li className="list-item list-disc">{content}</li>
                  </div>
                ))}
              </ul>
        </div>
    );
};

export default PracticeAreasDiv;