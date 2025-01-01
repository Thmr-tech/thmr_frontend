import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faUsersGear, faGlobe } from '@fortawesome/free-solid-svg-icons';

function Advantages() {
    return (
        <div className="flex flex-wrap-reverse gap-6 justify-center mt-14">
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faUsersGear} size="3x" className='text-customBlue' />
                <div className="pt-8">
                    <p className="text-lg font-medium">
                    رفع جودة العمليات الاشرافية الخاصة بالصناديق من خلال حلول مبتكرة                     </p>
                </div>
            </div>
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faPeopleArrows} size="3x" className='text-customBlue' />
                <div className="pt-8">
                    <p className="text-lg font-medium">
                        بناء روابط تشاركية توسع من آفاق وفرص الصناديق العائلية
                    </p>
                </div>
            </div>
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faGlobe} size="3x" className='text-customBlue' />
                <div className="pt-8">
                    <p className="text-lg font-medium">
                        تقديم حلول رقمية لإدارة النشاط المالي الخاص بالصناديق
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Advantages;
