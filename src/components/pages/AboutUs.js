import React from 'react';

export default function AboutUs() {
    return (
        <div className="py-10 px-5 text-right md:px-20" dir="rtl">
            <div className="max-w-4xl mx-auto mt-28 bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-extrabold text-customBlue text-center mb-6">من نحن؟</h1>
                <p className="text-lg text-gray-700 leading-8 mb-6 font-bold">
                    نحن <span className="font-bold text-customBlue">شركة حلول ثمر </span>
                    في صدد بناء وإطلاق منصة وتطبيق ثمر للصناديق العائلية، لتكون بوابتكم لتعزيز وإدارة  الصناديق العائلية باحترافية
                </p>

                <section className="mb-8">
                    <p className="text-gray-700 leading-7">
                        نعمل في شركة حلول ثمر على تقديم تجربة جديدة ومبتكرة لإدارة الموارد المالية المشتركة للعائلات من خلال توفير نافذة آمنة تتيح للعائلات إدارة صناديقهم المالية بسهولة وكفاءة لتعزيز استدامة الصناديق والتزامها بالمتطلبات القانونية، حيث نعمل حاليا على بناء عدد من الخدمات الأولية التي ستوفر في النموذج الاولي والتي نسعى من خلالها إلى تمكين الصناديق العائلية في تحقيق مستوى عالي من الاستدامة المالية وأن نكون مساهمين في الاستراتيجية الوطنية لنمو القطاع الغير ربحي.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">ما الذي نعمل على تقديمه ؟</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-4">
                        <li><strong>إدارة مالية متطورة:</strong>
                            <br />
                            حلول رقمية تسهل مراقبة وإدارة المساهمات المالية الخاصة بالصندوق بكل سلاسة وبأعلى درجات الأمان والخصوصية.</li>
                        <li><strong>الالتزام القانوني:</strong>
                            <br />
                            أدوات فعالة تساعد على تسهيل الامتثال
                            لمتطلبات التنظيم والشفافية القانونية.</li>
                        <li><strong>إشراف مبتكر:</strong>
                            <br />
                            تقديم حلول إدارية مبتكرة ترفع من جودة الاشراف المالي داخل الصناديق.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
                    <p className="text-gray-700 leading-7">
                        نسعد بخدمتكم والرد على استفساراتكم عبر:
                        <br />
                        <strong className="font-bold">البريد الإلكتروني:</strong> thmrtech@gmail.com
                    </p>
                </section>

                <section className='text-center'>
                    <p className="text-xl font-bold text-gray-800 mb-4 mt-8">سعياً منا لحصولكم على أفضل تجربة فإننا نسعد بمشاركتكم هذا الاستبيان: </p>
                    <a
                        href="https://survey.porsline.com/s/G0Zsccwg"
                        className="inline-block bg-customBlue text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
                    >
                        اضغط هنا للمشاركة في الاستبيان
                    </a>
                </section>
            </div>
        </div>
    );
}
