import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa"

const TopRatedAttorneys = () => {
    const attorneys =[
        {
            id: 1,
            name: "Musharraf Karim",
            img: "https://img.freepik.com/premium-photo/happy-laughing-old-bearded-business-man-leader_941600-6823.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "As an Accident Law specialist, I'm committed to guiding you through the legal complexities of accidents. With years of experience, I aim to ensure you receive the justice and support you deserve.",
            practiceArea: "Accident Law",
            client: 32,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "musharraf@gmail.com"
        },
        {
            id: 2,
            name: "Linkon Chowdhury",
            img: "https://img.freepik.com/free-photo/portrait-cheerful-hairless-elder-man-dressed-dark-blue-suit-against-dark-background_613910-17566.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "In the world of Business Law, my goal is to provide unwavering guidance to businesses of all sizes. I'm dedicated to using my expertise to help your business thrive within the bounds of the law.",
            practiceArea: "Business Law",
            client: 35,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "linkon@gmail.com"
        },
        {
            id: 3,
            name: "Rakibul hasan",
            img: "https://img.freepik.com/premium-photo/confident-elderly-businessman_882186-5441.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "With a compassionate approach, I specialize in Family Law to help families navigate sensitive legal matters. I'm here to offer support and legal solutions that ensure your family's well-being.",
            practiceArea: "Family Law",
            client: 22,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "rakib@gmail.com"
        },
        {
            id: 4,
            name: "Mustafa Rabbani",
            img: "https://img.freepik.com/free-photo/handsome-corporate-man-real-estate-agent-assistant-smiling-hold-hands-together-how-may-i-help-you-smiling-friendly-polite-assist-customer-white-background_176420-45257.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "In Education Law, I'm dedicated to assisting educational institutions and students with their legal needs. My commitment to the field ensures that educational endeavors are protected and upheld.",
            practiceArea: "Education Law",
            client: 19,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "mustafa@gmail.com"
        },
        {
            id: 5,
            name: "Al Imran Tonmoy",
            img: "https://img.freepik.com/free-photo/business-man-curly-cute-handsome-guy-black-suit-close-up-smiling_140725-162638.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "As an Insurance Law expert, I'm here to offer comprehensive support to individuals and companies dealing with insurance matters. My knowledge and dedication make me a trusted advocate for your insurance needs.",
            practiceArea: "Insurance Law",
            client: 44,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "tonmoy@gmail.com"
        },
        {
            id: 6,
            name: "Jashim Bhuiyan",
            img: "https://img.freepik.com/free-photo/portrait-smiling-caucasian-senior-businessman_1262-2142.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            about: "Specializing in Culprit Law, my mission is to provide fair representation and ensure justice for those facing legal challenges. I'm dedicated to advocating for your rights and upholding the principles of justice.",
            practiceArea: "Culprit Law",
            client: 28,
            facebook: "https:/www.facebook.com/",
            linkedin: "https:/www.linkedin.com/",
            twitter: "https:/www.twitter.com/",
            email: "jashim@gmail.com"
        }
    ]
    return (
        <section className='container mb-10'>
            <SectionTitle title="Top Rated" redTitle="Attorneys" para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione id dolores velit tenetur. Illo." />

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 duration-300'>
            {
                attorneys.map(attorney=> 
                <div key={attorney.id} className='rounded-lg p-5 bg-lightDark border border-primary w-80 mx-auto'>
                    <img className='w-40 h-40 object-cover rounded-full mx-auto border border-primary' src={attorney.img} alt="" />
                    <p className='text-primary font-semibold text-2xl mt-5'>{attorney.name}</p>
                    <p>{attorney.practiceArea} Specialist</p>
                    <p className='text-sm'>Happy Client: {attorney.client}</p>
                    <p>Email: {attorney.email}</p>
                    <div className='flex justify-center gap-3 items-center mt-5'>
                        <div className='flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark cursor-pointer'>
                            <FaFacebookF />
                        </div>
                        <div className='flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark cursor-pointer'>
                            <FaLinkedin />
                        </div>
                        <div className='flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark cursor-pointer'>
                            <FaTwitter />
                        </div>
                    </div>
                </div>)
            }
            </div>
            <Link className='flex justify-center' to="/attorneys" ><button className='text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5'>Show more</button></Link>
        </section>
    );
};

export default TopRatedAttorneys;