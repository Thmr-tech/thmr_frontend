import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faUsersGear, faChartPie } from '@fortawesome/free-solid-svg-icons';

function Advantages() {
    return (
        <div className="flex flex-wrap-reverse gap-6 justify-center mt-14">
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faUsersGear} size="3x" color="green" />
                <div className="pt-8">
                    <h2 className="text-xl font-bold pb-6">إدارة المستفيدين بذكاء</h2>
                    <p className="text-lg font-medium">
                        أضف، عدّل، واحذف بيانات المستفيدين بسهولة
                    </p>
                </div>
            </div>
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faChartColumn} size="3x" color="blue" />
                <div className="pt-8">
                    <h2 className="text-xl font-bold pb-6">تقارير مالية دقيقة</h2>
                    <p className="text-lg font-medium">
                        احصل على إحصاءات شاملة عن المساهمات والمصروفات
                    </p>
                </div>
            </div>
            <div className="w-[341px] bg-white text-center p-12 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <FontAwesomeIcon icon={faChartPie} size="3x" color="gray" />
                <div className="pt-8">
                    <h2 className="text-xl font-bold pb-6">عرض بيانات الصندوق المالية</h2>
                    <p className="text-lg font-medium">
                        تابع الإيرادات والمصروفات بسهولة وبطريقة منظمة
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Advantages;
