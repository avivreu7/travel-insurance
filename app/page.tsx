"use client";

import { useState, useEffect, useRef } from "react";
import Image from 'next/image';

// --- אייקון ווטסאפ (ללא שינוי) ---
const WhatsAppIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.75 13.96c.27.13.41.41.41.72v1.43c0 .8-.53 1.16-1.22 1.16h-.06c-1.81 0-3.52-.72-4.88-2.05-1.35-1.33-2.1-3.02-2.1-4.81V10.3c0-.7.41-1.27 1.22-1.27.31 0 .59.14.72.41l.59 1.18c.14.27.13.6-.02.88l-.53.97c-.11.2-.12.45 0 .66.5.88 1.26 1.63 2.16 2.16.21.12.46.11.66 0l.97-.53c.27-.15.6-.16.88-.02l1.18.59zm-4.6-7.52a7.3 7.3 0 00-6.8 11.45l-1.5 3.61 3.76-1.46a7.3 7.3 0 104.54-13.6zm0 1.4a5.9 5.9 0 110 11.8 5.9 5.9 0 010-11.8z"/></svg>
);

export default function Home() {
    // --- State והקבועים (ללא שינוי) ---
    const [passengers, setPassengers] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", destination: "", passengers: 1, departure: "", return: "", birthDates: [''], });
    const [errors, setErrors] = useState({});
    const [minDate, setMinDate] = useState("");
    const formRef = useRef(null);
    const [openFAQ, setOpenFAQ] = useState(null);
    const contactInfo = { name: "צביקה ראובן", phone: "08-8555880", mobile: "052-3376220", email: "zvi@r-ins.co.il", address: "קיבוץ גת", hours: { weekdays: "08:00 - 20:00", friday: "08:00 - 15:00", } };
    const benefits = [ { title: "שקט נפשי מוחלט", description: "כיסוי רפואי מקיף 24/7 בכל נקודה בעולם, ללא הפתעות.", icon: "🏥" }, { title: "גמישות מלאה", description: "כיסוי לביטול או קיצור נסיעה מסיבות מגוונות, כדי שתזמינו בביטחון.", icon: "✈️" }, { title: "הגנה על הרכוש", description: "אל דאגה לכבודה שלכם - פיצוי מהיר במקרה אובדן או גניבה.", icon: "🧳" }, { title: "חופשה אקטיבית?", description: "אנחנו איתכם גם בפעילויות אתגריות וספורט חורף.", icon: "🏂" }, { title: "תמיכה אישית ברגע האמת", description: "מוקד חירום דובר עברית זמין עבורכם מסביב לשעון.", icon: "☎️" }, { title: "ביטוח מותאם למציאות", description: "כולל כיסוי מורחב למגפות כמו קורונה, כולל ביטולים והוצאות.", icon: "🦠" } ];
    const faqs = [ { question: "למה אי אפשר לטוס בלי ביטוח נסיעות היום?", answer: "הוצאות רפואיות בחו\"ל יכולות להגיע לסכומים אסטרונומיים. ביטוח נסיעות מגן עליכם מפני קטסטרופה כלכלית ומכסה גם אירועים כמו ביטול טיסה, אובדן כבודה ועוד, ומאפשר לכם לטוס בראש שקט באמת." }, { question: "מתי הזמן הכי חכם לרכוש את הביטוח?", answer: "ההמלצה החמה היא מיד עם הזמנת כרטיסי הטיסה או חבילת הנופש. כך תהיו מכוסים גם לתרחישי ביטול *לפני* הנסיעה. אך אל דאגה, אפשר לרכוש גם ממש עד העלייה למטוס." }, { question: "מה ההבדל בין סוגי הפוליסות?", answer: "קיימים רבדים שונים של כיסוי, החל מבסיסי ועד מקיף פלוס ספורט אתגרי, הריון, ועוד. צביקה ראובן, המומחה שלנו, ישמח לייעץ לכם ולהתאים את הפוליסה המושלמת עבורכם ועבור אופי הנסיעה שלכם." }, { question: "הביטוח מכסה ספורט אתגרי כמו סקי או צלילה?", answer: "בהחלט! אנו מציעים הרחבות ייעודיות לכיסוי פעילויות ספורט אתגרי וספורט חורף. חשוב ליידע אותנו בעת הבקשה כדי שנוכל לכלול את הכיסוי הנכון בהצעה." } ];

    // --- פונקציות (ללא שינוי) ---
    useEffect(() => { const today = new Date(); const yyyy = today.getFullYear(); const mm = String(today.getMonth() + 1).padStart(2, '0'); const dd = String(today.getDate()).padStart(2, '0'); setMinDate(`${yyyy}-${mm}-${dd}`); }, []);
    const handlePassengersChange = (e) => { const value = parseInt(e.target.value); if (!isNaN(value) && value > 0 && value <= 10) { setPassengers(value); setFormData(prev => ({ ...prev, passengers: value, birthDates: Array(value).fill('').map((_, i) => prev.birthDates[i] || '') })); } };
    const handleInputChange = (e) => { const { name, value } = e.target; if (name.startsWith('birth')) { const index = parseInt(name.substring(5), 10); setFormData(prev => { const newBirthDates = [...prev.birthDates]; newBirthDates[index] = value; return { ...prev, birthDates: newBirthDates }; }); if (errors[`birth${index}`]) { setErrors(prev => ({ ...prev, [`birth${index}`]: null })); } } else { setFormData(prev => ({ ...prev, [name]: value })); if (errors[name]) { setErrors(prev => ({ ...prev, [name]: null })); } } };
    const validateForm = () => { const newErrors = {}; const today = new Date(); today.setHours(0, 0, 0, 0); if (!formData.name || !/^[א-תa-zA-Z\s]{2,}$/.test(formData.name.trim())) newErrors.name = "אנא הזן שם מלא תקין"; if (!formData.phone || !/^(05\d{8}|0[2-9]\d{7})$/.test(formData.phone.trim())) newErrors.phone = "יש להזין מספר טלפון ישראלי תקין (סלולרי או קווי)"; if (!formData.destination || formData.destination.trim().length < 2) newErrors.destination = "יש להזין את יעד הנסיעה הראשי"; if (!formData.departure) newErrors.departure = "יש לבחור תאריך יציאה"; else if (new Date(formData.departure) < today) newErrors.departure = "תאריך היציאה לא יכול להיות בעבר"; if (!formData.return) newErrors.return = "יש לבחור תאריך חזרה"; else if (formData.departure && new Date(formData.return) < new Date(formData.departure)) newErrors.return = "תאריך החזרה חייב להיות אחרי תאריך היציאה"; let firstBirthDateError = false; formData.birthDates.forEach((date, index) => { if (!date) { if(!firstBirthDateError) { newErrors[`birth${index}`] = `אנא בחר תאריך לידה לנוסע ${index + 1}`; firstBirthDateError = true; } else if (!newErrors[`birth${index}`]) { newErrors[`birth${index}`] = ''; } } else { try { const birthDate = new Date(date); if (isNaN(birthDate.getTime())) { if(!firstBirthDateError) { newErrors[`birth${index}`] = `תאריך לידה לא תקין (נוסע ${index + 1})`; firstBirthDateError = true; } else { newErrors[`birth${index}`] = '';} return; } const maxBirthDate = new Date(minDate); if (birthDate > maxBirthDate) { newErrors[`birth${index}`] = `תאריך לידה לא יכול להיות בעתיד (נוסע ${index + 1})`; } else { let age = today.getFullYear() - birthDate.getFullYear(); const m = today.getMonth() - birthDate.getMonth(); if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; } if (age < 0) { newErrors[`birth${index}`] = `גיל לא תקין (נוסע ${index + 1})`; } else if (age > 120) { newErrors[`birth${index}`] = `גיל לא סביר (מעל 120) (נוסע ${index + 1})`; } } } catch (error) { if(!firstBirthDateError) { newErrors[`birth${index}`] = `תאריך לידה בפורמט לא תקין (נוסע ${index + 1})`; firstBirthDateError = true; } else { newErrors[`birth${index}`] = '';} } } }); setErrors(newErrors); return Object.keys(newErrors).filter(key => typeof newErrors[key] === 'string' && newErrors[key].length > 0).length === 0; };
    const renderBirthDateInputs = () => { return Array.from({ length: passengers }, (_, i) => ( <div key={i} className="mb-4 relative"> <label htmlFor={`birth${i}`} className="form-label-refined">תאריך לידה נוסע {i + 1}:<span className="text-red-500">*</span></label> <input type="date" id={`birth${i}`} name={`birth${i}`} value={formData.birthDates[i] || ''} className={`input-style-refined ${errors[`birth${i}`] !== undefined ? 'input-error-refined' : 'input-valid-refined'}`} required max={minDate} onChange={handleInputChange} aria-invalid={errors[`birth${i}`] !== undefined} aria-describedby={errors[`birth${i}`] ? `birth-error-${i}` : undefined} /> {errors[`birth${i}`] && <p id={`birth-error-${i}`} className="error-message-refined">{errors[`birth${i}`]}</p>} </div> )); };
    const scrollToForm = () => { const offset = 80; const elementPosition = formRef.current?.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); };
    const toggleFAQ = (index) => { setOpenFAQ(openFAQ === index ? null : index); };
    const handleSubmit = (e) => { e.preventDefault(); setIsSubmitting(true); if (!validateForm()) { setIsSubmitting(false); const firstErrorKey = Object.keys(errors).find(key => errors[key]); if (firstErrorKey) { const errorElement = document.querySelector(`[name="${firstErrorKey}"]`); if (errorElement) { const offset = 120; const elementPosition = errorElement.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); if (typeof errorElement.focus === 'function') { errorElement.focus({ preventScroll: true }); } } else { scrollToForm(); } } else { scrollToForm(); } return; } let message = `*היי ${contactInfo.name}, בקשה להצעת מחיר לביטוח נסיעות* 📄✈️\n\n`; message += `*שם:* ${formData.name.trim()}\n`; message += `*טלפון:* ${formData.phone.trim()}\n`; message += `*יעד עיקרי:* ${formData.destination.trim()}\n`; message += `*תאריך יציאה:* ${formData.departure ? new Date(formData.departure).toLocaleDateString('he-IL') : 'לא צוין'}\n`; message += `*תאריך חזרה:* ${formData.return ? new Date(formData.return).toLocaleDateString('he-IL') : 'לא צוין'}\n`; message += `*מספר נוסעים:* ${formData.passengers}\n\n`; message += `*תאריכי לידה (נוסע: dd/mm/yyyy):*\n`; formData.birthDates.forEach((date, index) => { let formattedDate = 'לא הוזן'; if (date) { try { const [year, month, day] = date.split('-'); formattedDate = `${day}/${month}/${year}`; } catch { formattedDate = date; } } message += ` ${index + 1}: ${formattedDate}\n`; }); message += `\nאשמח לחזרה עם הצעה מותאמת 🙏`; const encoded = encodeURIComponent(message); setFormSubmitted(true); setTimeout(() => { const whatsappUrl = `https://api.whatsapp.com/send?phone=972${contactInfo.mobile.substring(1)}&text=${encoded}`; window.open(whatsappUrl, '_blank', 'noopener,noreferrer'); setIsSubmitting(false); }, 1500); };

    return (
        // <<< הוסר מפה: bg-gray-100 text-gray-800 font-['Assistant',_sans-serif] >>>
        <div dir="rtl">

            {/* --- Hero Section (ללא שינוי) --- */}
            <section className="relative text-white min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center px-4 py-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-800/70 to-black/50 z-0"></div>
                <div className="relative z-10 max-w-3xl mx-auto"> <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight shadow-text"> צאו לחופשה <span className="text-cyan-300">בראש שקט</span> </h1> <p className="text-lg md:text-2xl text-gray-200 mb-8 font-light max-w-xl mx-auto shadow-text"> ביטוח נסיעות מקיף שיגן עליכם מכל הפתעה, בכל מקום בעולם. קבלו הצעה מותאמת אישית תוך דקות. </p> <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full text-xl transition duration-300 ease-in-out shadow-lg transform hover:scale-105"> קבלו הצעת מחיר משתלמת <span aria-hidden="true">→</span> </button> </div>
            </section>

            {/* --- אזור "הכירו את צביקה" (ללא שינוי) --- */}
            <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
                 <div className="container mx-auto px-4 max-w-5xl"> <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"> <div className="flex-shrink-0 flex flex-col items-center gap-6 w-full lg:w-1/3"> <Image src="/zvika-photo.jpg" alt={`תמונה של ${contactInfo.name}`} width={200} height={200} className="rounded-full object-cover shadow-lg border-4 border-white" /> <Image src="/zvika-logo.png" alt={`לוגו - ${contactInfo.name} סוכנות לביטוח`} width={180} height={60} className="object-contain" /> </div> <div className="text-center lg:text-right flex-grow"> <h2 className="text-3xl lg:text-4xl font-bold text-teal-800 mb-4">נעים להכיר, {contactInfo.name}</h2> <p className="text-lg text-gray-700 mb-5 leading-relaxed"> מומחה לביטוחי נסיעות עם ותק וניסיון של שנים רבות. המטרה שלי היא לא רק למכור לכם פוליסה, אלא להתאים לכם באופן אישי את הכיסוי המדויק שאתם צריכים, במחיר הוגן ועם שירות אישי וזמין - לפני הנסיעה, במהלכה וגם אם חלילה קורה משהו. </p> <p className="text-gray-600 mb-6"> אני מזמין אתכם למלא את הפרטים בטופס למטה או פשוט לשלוח לי הודעה בוואטסאפ ונמצא יחד את הפתרון המושלם לחופשה הבטוחה שלכם. </p> <a href={`https://api.whatsapp.com/send?phone=972${contactInfo.mobile.substring(1)}&text=${encodeURIComponent(`היי ${contactInfo.name}, ראיתי את האתר ואשמח להתייעץ לגבי ביטוח נסיעות`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-2 px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" > <WhatsAppIcon /> דברו איתי בוואטסאפ </a> </div> </div> </div>
            </section>

            {/* --- Benefits Section (ללא שינוי) --- */}
            <section className="bg-gray-50 py-16 lg:py-24">
                 <div className="container mx-auto px-4"> <h2 className="text-3xl lg:text-4xl font-bold text-center text-teal-800 mb-16">היתרונות שמבטיחים לכם נסיעה מושלמת</h2> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {benefits.map((benefit, index) => ( <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 ease-in-out flex flex-col items-center text-center"> <div className="text-5xl mb-5 text-teal-500">{benefit.icon}</div> <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3> <p className="text-gray-600 text-sm leading-relaxed flex-grow">{benefit.description}</p> </div> ))} </div> </div>
            </section>

            {/* --- Form Section (עיצוב עדין) --- */}
            <section ref={formRef} className="py-16 lg:py-24 bg-gray-100">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center text-teal-800 mb-12">מלאו פרטים וקבלו הצעה משתלמת</h2>
                    {formSubmitted ? (
                         <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-md shadow-sm text-center" role="alert">
                             <span className="text-2xl font-semibold block mb-2">✅ תודה רבה!</span>
                             <span className="block sm:inline text-lg">פרטי הבקשה נשלחים כעת לוואטסאפ של {contactInfo.name}. הוא ייצור קשר בהקדם!</span>
                            <p className="mt-3 text-sm">מעביר אותך לוואטסאפ...</p>
                         </div>
                    ) : (
                         <form onSubmit={handleSubmit} noValidate className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-200/80 space-y-10">
                            {/* חלק 1 */}
                             <div>
                                <h3 className="form-subtitle-refined">פרטים אישיים</h3>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-5">
                                     <div>
                                         <label htmlFor="name" className="form-label-refined">שם מלא<span className="text-red-500">*</span></label>
                                         <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`input-style-refined ${errors.name ? 'input-error-refined' : 'input-valid-refined'}`} placeholder="ישראל ישראלי" required aria-required="true"/>
                                        {errors.name && <p className="error-message-refined">{errors.name}</p>}
                                    </div>
                                     <div>
                                         <label htmlFor="phone" className="form-label-refined">טלפון נייד<span className="text-red-500">*</span></label>
                                         <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={`input-style-refined ${errors.phone ? 'input-error-refined' : 'input-valid-refined'}`} placeholder="05X-XXXXXXX" required aria-required="true" dir="ltr" />
                                        {errors.phone && <p className="error-message-refined">{errors.phone}</p>}
                                    </div>
                                 </div>
                            </div>
                            {/* חלק 2 */}
                             <div>
                                <h3 className="form-subtitle-refined">פרטי הנסיעה</h3>
                                <div className="mt-5 space-y-6">
                                     <div>
                                         <label htmlFor="destination" className="form-label-refined">יעד עיקרי<span className="text-red-500">*</span></label>
                                         <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleInputChange} className={`input-style-refined ${errors.destination ? 'input-error-refined' : 'input-valid-refined'}`} placeholder="תאילנד, איטליה..." required aria-required="true" />
                                         {errors.destination && <p className="error-message-refined">{errors.destination}</p>}
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <div>
                                             <label htmlFor="departure" className="form-label-refined">תאריך יציאה<span className="text-red-500">*</span></label>
                                            <input type="date" id="departure" name="departure" value={formData.departure} onChange={handleInputChange} className={`input-style-refined ${errors.departure ? 'input-error-refined' : 'input-valid-refined'}`} min={minDate} required aria-required="true" />
                                             {errors.departure && <p className="error-message-refined">{errors.departure}</p>}
                                        </div>
                                        <div>
                                             <label htmlFor="return" className="form-label-refined">תאריך חזרה<span className="text-red-500">*</span></label>
                                             <input type="date" id="return" name="return" value={formData.return} onChange={handleInputChange} className={`input-style-refined ${errors.return ? 'input-error-refined' : 'input-valid-refined'}`} min={formData.departure || minDate} required aria-required="true" />
                                             {errors.return && <p className="error-message-refined">{errors.return}</p>}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                            {/* חלק 3 */}
                            <div>
                                 <h3 className="form-subtitle-refined">פרטי הנוסעים</h3>
                                <div className="mt-5">
                                     <label htmlFor="passengers" className="form-label-refined">מספר נוסעים<span className="text-red-500">*</span></label>
                                     <input type="number" id="passengers" name="passengers" value={passengers} onChange={handlePassengersChange} className="input-style-refined w-full md:w-40" min="1" max="10" required aria-required="true" />
                                </div>
                                {passengers > 0 && (
                                     <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                                         <p className="text-gray-600 mb-5 font-medium text-center md:text-right">נא למלא תאריך לידה עבור כל נוסע:</p>
                                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                                             {renderBirthDateInputs()}
                                         </div>
                                     </div>
                                 )}
                             </div>
                            {/* כפתור שליחה */}
                            <button type="submit" disabled={isSubmitting} className="w-full mt-10 flex items-center justify-center gap-x-3 px-6 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200">
                               {isSubmitting ? ( <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>מעבד בקשה...</span></> ) : ( <><WhatsAppIcon /><span>שליחת פרטים בוואטסאפ להצעה אישית</span></> )}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* --- FAQ Section (ללא שינוי) --- */}
            <section className="bg-white py-16 lg:py-24">
                {/* ... תוכן שאלות נפוצות ... */}
                 <div className="container mx-auto px-4 max-w-4xl"> <h2 className="text-3xl lg:text-4xl font-bold text-center text-teal-800 mb-12">עדיין מתלבטים? שאלות נפוצות</h2> <div className="space-y-5"> {faqs.map((faq, index) => ( <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"> <button onClick={() => toggleFAQ(index)} className="w-full text-right text-lg font-semibold p-5 flex justify-between items-center hover:bg-teal-50/50 focus:outline-none focus:bg-teal-50/50 transition duration-150 ease-in-out" aria-expanded={openFAQ === index} aria-controls={`faq-answer-${index}`} > <span className="text-gray-800">{faq.question}</span> <svg className={`w-6 h-6 text-teal-600 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> </button> <div id={`faq-answer-${index}`} className={`overflow-hidden transition-all duration-500 ease-in-out ${openFAQ === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`} > <div className="p-5 border-t border-gray-200"> <p className="text-gray-600 leading-relaxed">{faq.answer}</p> </div> </div> </div> ))} </div> <p className="text-center text-gray-600 mt-10">יש לכם שאלה נוספת? <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-teal-600 font-semibold hover:underline">צרו איתנו קשר!</a></p> </div>
             </section>

            {/* --- Contact Section (ללא שינוי) --- */}
             <section id="contact" className="bg-teal-800 text-teal-100 py-16 lg:py-24">
                {/* ... תוכן יצירת קשר ... */}
                 <div className="container mx-auto px-4 text-center"> <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">{contactInfo.name} לשירותכם</h2> <p className="max-w-2xl mx-auto text-lg text-teal-200 mb-12">לכל שאלה, התייעצות או בקשה - אל תהססו לפנות. {contactInfo.name} והצוות (אם רלוונטי) זמינים לסייע לכם בבחירת הביטוח הנכון וגם ברגע האמת בחו"ל.</p> <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-lg"> <div className="bg-teal-700 p-6 rounded-lg shadow-md flex flex-col items-center"> <span className="text-3xl mb-3">📞</span> <h3 className="font-semibold text-white mb-1">טלפונים ליצירת קשר</h3> <a href={`tel:${contactInfo.mobile}`} className="hover:text-white hover:underline block">{contactInfo.mobile} (נייד + וואטסאפ)</a> <a href={`tel:${contactInfo.phone}`} className="hover:text-white hover:underline block text-sm mt-1">{contactInfo.phone} (משרד)</a> </div> <div className="bg-teal-700 p-6 rounded-lg shadow-md flex flex-col items-center"> <span className="text-3xl mb-3">📧</span> <h3 className="font-semibold text-white mb-1">דואר אלקטרוני</h3> <a href={`mailto:${contactInfo.email}`} className="hover:text-white hover:underline break-words">{contactInfo.email}</a> </div> <div className="bg-teal-700 p-6 rounded-lg shadow-md flex flex-col items-center"> <span className="text-3xl mb-3">📍</span> <h3 className="font-semibold text-white mb-1">שעות פעילות וכתובת</h3> <p>א'-ה': {contactInfo.hours.weekdays}</p> <p>ו': {contactInfo.hours.friday}</p> <p className="mt-1">{contactInfo.address}</p> </div> </div> </div>
             </section>

            {/* --- Footer (ללא שינוי) --- */}
            <footer className="bg-gray-800 text-gray-400 text-center py-8 px-4">
                <div className="mb-4 flex justify-center"> <Image src="/zvika-logo.png" alt={`לוגו - ${contactInfo.name} סוכנות לביטוח`} width={100} height={100} className="object-contain" /> </div>
                <p>© {new Date().getFullYear()} {contactInfo.name} - סוכנות לביטוח. מורשה משרד האוצר.</p>
                <p className="text-sm mt-1">המידע המוצג הינו כללי בלבד ואין לראות בו המלצה או תחליף לייעוץ אישי. תנאי הפוליסה המלאים הם הקובעים.</p>
             </footer>

            {/* ================================================= */}
            {/* ===== הגדרות CSS גלובליות כולל גודל פונט ===== */}
            {/* ================================================= */}
            <style jsx global>{`
                /* הגדרת בסיס Tailwind */
                @tailwind base;
                @tailwind components;
                @tailwind utilities;

                @layer base {
                  html {
                    font-size: 106.25%; /* <-- הגדלה קלה בפונט הבסיס (בערך 17px) */
                    scroll-behavior: smooth;
                    -webkit-tap-highlight-color: transparent;
                  }

                  body {
                     @apply bg-gray-100 text-gray-800 antialiased; /* רקע, צבע והחלקה */
                     font-family: 'Assistant', sans-serif; /* <<< ודא שהפונט הזה זמין בפרויקט */
                  }
                }

                /* סגנונות בסיסיים נוספים */
                .shadow-text { text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6); }

                /* סגנונות מעודנים לטופס */
                .form-label-refined { @apply block mb-2 text-sm font-medium text-gray-600; }
                .form-subtitle-refined { @apply text-lg font-semibold text-gray-700 mb-6; }
                .input-style-refined {
                    @apply w-full p-3 px-4 border border-gray-300 rounded-md text-right transition duration-200 ease-in-out;
                    @apply bg-white text-gray-800 placeholder-gray-400;
                    @apply focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500;
                    @apply text-base leading-6 shadow-sm;
                }
                .input-style-refined[type="date"] { @apply relative; }
                input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; filter: grayscale(50%); transition: opacity 0.2s; margin-right: 0.5rem; }
                input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 0.8; }

                 /* עיצוב שגיאות */
                 .input-error-refined { @apply border-red-400 ring-1 ring-red-300 bg-red-50/40; }
                 .input-valid-refined { /* אין צורך במשהו מיוחד */ }
                 .error-message-refined { @apply text-red-600 text-xs mt-1.5; }

                 /* ודא שהפונט מוגדר בפרויקט */
                 /* @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap'); */
            `}</style>
        </div>
    );
}