import { useEffect, useRef } from "react";
import moment from "moment";
import useAuth from "../hooks/useAuth";

const StartMessage = ({ sms }) => {
    const { currentUser } = useAuth();
    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [sms]);

    return (
        <div>
            <div className="flex flex-col gap-2" ref={scroll}>
                <div className={sms.senderId === currentUser._id ? ' flex flex-col self-end my-2' : 'flex flex-col my-2 self-start'}>
                    <p className={sms.senderId === currentUser._id ? 'text-black bg-green px-3 py-1 rounded-full rounded-br-none shadow-lg shadow-green/40 min-w-[150px] text-center' : 'text-black bg-black px-3 py-1 rounded-full rounded-tl-none shadow-lg shadow-black/40 min-w-[150px] text-center'}>
                        {sms.text.length > 0 ? sms.text : "empty message"}
                    </p>

                    <p className={sms.senderId === currentUser._id ? 'text-xs opacity-50 text-right mt-1' : 'text-xs opacity-50 text-left mt-1'}>
                        {moment(sms.createdAt).startOf('sec').fromNow()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StartMessage;