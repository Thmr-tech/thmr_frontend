import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faUsersGear, faGlobe } from '@fortawesome/free-solid-svg-icons';
import AOS from "aos";
import "aos/dist/aos.css";


function Advantages() {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="flex flex-wrap-reverse gap-6 justify-center mt-14" data-aos="fade-up" data-aos-duration="1000">
            {[
                {
                    icon: faUsersGear,
                    text: "رفع جودة العمليات الاشرافية الخاصة بالصناديق من خلال حلول مبتكرة",
                },
                {
                    icon: faPeopleArrows,
                    text: "بناء روابط تشاركية توسع من آفاق وفرص الصناديق العائلية",
                },
                {
                    icon: faGlobe,
                    text: "تقديم حلول رقمية لإدارة النشاط المالي الخاص بالصناديق",
                },
            ].map((card, index) => (
                <div
                    key={index}
                    className="relative w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg overflow-hidden rounded-2xl"
                >
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-customBlue/10 via-transparent to-transparent pointer-events-none"></div>
                    <FontAwesomeIcon icon={card.icon} size="3x" className="text-customBlue" />
                    <div className="pt-8">
                        <p className="text-lg font-medium">{card.text}</p>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Advantages;
