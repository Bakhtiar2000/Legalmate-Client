import React, { useRef } from 'react';
import SectionTitle from "../../components/SectionTitle";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const SendMail = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6cj9dkq', 'template_oumfitc', form.current, '5scPk13_dW8HI-vmZ')
            .then((result) => {
                e.target.reset()
                Swal.fire(
                    'Message has been Sent!',
                    'Thanks for connecting with us!',
                    'success'
                  )
            }, (error) => {
                console.log(error.text);
            });

    };
    return (
        <section className='pt-5 pb-20'>
            <div className='container'>
            <SectionTitle title="Get in Touch"  redTitle="With Us" para="Send Us a Message" />
                <div className='flex flex-col xl:flex-row justify-center items-center gap-8 bg-lightDark py-10 rounded-lg'>

                    {/* Map */}
                    <div className="relative mx-auto overflow-hidden">
                        <iframe
                            className="w-72 h-72 md:w-[500px] md:h-[500px] border border-purple rounded-md m-4"
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5883.0758572185!2d90.2328906!3d24.0261625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e7476bf143bd%3A0x294a5f0f54fd353a!2sZahid%20telecom%20%26%20electronicsStore!5e0!3m2!1sen!2sbd!4v1668667428200!5m2!1sen!2sbd"
                            style={{ filter: 'contrast(1.2)',  }}
                            allowFullScreen
                        ></iframe>
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>

                    {/* Mail Form  */}
                    <div className='max-w-xl mx-auto text-center text-black'>
                    <form ref={form} onSubmit={sendEmail}>
                        <input
                            className='w-full px-6 py-[18px] border outline-none focus:border-primary mb-5'
                            type="text"
                            name="from_name"
                            placeholder="Name:" 
                            required
                        />

                        <input
                            className='w-full px-6 py-[18px] border outline-none focus:border-primary mb-5'
                            type="email"
                            name="from_email"
                            placeholder="Mail:" 
                            required
                        />

                        <textarea
                            className='w-full px-6 py-[18px] border outline-none focus:border-primary mb-5'
                            name="message"
                            rows="6"
                            placeholder='Message:'></textarea>
                        <button type='submit' className='bg-transparent px-5 py-[18px] text-white border hover:border-secondary hover:bg-secondary duration-300 hover:shadow-green/20'>Send message</button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    );
};

export default SendMail;