import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { Link } from 'react-router-dom';

const TopRatedAttorneys = () => {
    const attorneys =[
        {
            id: 1,
            name: "Musharraf Karim",
            img: "https://img.freepik.com/premium-photo/happy-laughing-old-bearded-business-man-leader_941600-6823.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Accident Law",
            client: 32
        },
        {
            id: 2,
            name: "Linkon Chowdhury",
            img: "https://img.freepik.com/free-photo/portrait-cheerful-hairless-elder-man-dressed-dark-blue-suit-against-dark-background_613910-17566.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Business Law",
            client: 32
        },
        {
            id: 3,
            name: "Rakibul hasan",
            img: "https://img.freepik.com/premium-photo/confident-elderly-businessman_882186-5441.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Family Law",
            client: 32
        },
        {
            id: 4,
            name: "Mustafa Rabbani",
            img: "https://img.freepik.com/free-photo/handsome-corporate-man-real-estate-agent-assistant-smiling-hold-hands-together-how-may-i-help-you-smiling-friendly-polite-assist-customer-white-background_176420-45257.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Education Law",
            client: 32
        },
        {
            id: 5,
            name: "Al Imran Tonmoy",
            img: "https://img.freepik.com/free-photo/business-man-curly-cute-handsome-guy-black-suit-close-up-smiling_140725-162638.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Insurance Law",
            client: 32
        },
        {
            id: 6,
            name: "Jashim Bhuiyan",
            img: "https://img.freepik.com/free-photo/portrait-smiling-caucasian-senior-businessman_1262-2142.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "cne  grtt h r  r h rehwer hy rth er ther ther h h h   herty her ty er th er th rth ",
            practiceArea: "Culprit Law",
            client: 32
        }
    ]
    return (
        <section className='container mb-10'>
            <SectionTitle title="Top Rated" redTitle="Attorneys" para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione id dolores velit tenetur. Illo." />

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 duration-300'>
            {
                attorneys.map(attorney=> 
                <div key={attorney.id} className='rounded p-5 bg-lightDark border w-80 mx-auto'>
                    <img className='w-40 h-40 object-cover rounded-full mx-auto' src={attorney.img} alt="" />
                    <p className='italic'>"{attorney.about}"</p>
                    <p>{attorney.name}</p>
                    <p>{attorney.practiceArea}</p>
                </div>)
            }
            </div>
            <Link className='flex justify-center' to="/attorneys" ><button className='text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5'>Show more</button></Link>
        </section>
    );
};

export default TopRatedAttorneys;