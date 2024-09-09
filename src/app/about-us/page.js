"use client"
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import styles from './page.module.css';

const AboutUs = () => {

    const partnersImageLinks = [
        { src: '/partners/notino.png', alt: 'orma', id: 11 },
    ]

    return <section style={{
        marginBottom: '70px'
    }}
    >

        <article className={styles.article}>
            <div
                className={styles.articleInfo}
            >
                <h2>Добре дошли в Sweet Surprises – вашият оазис на красотата и релакса!</h2>
                <p>
                    В сърцето на нашето уютно студио съчетаваме грижата за вашата кожа с неустоими моменти на релаксация и удоволствие. Ние вярваме,
                    че истинската красота идва отвътре, затова създадохме място, където можете да се отпуснете и да се насладите на себе си,
                    докато нашите професионалисти се грижат за вашия външен вид.
                </p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div >
                        <PhotoView src="/temp/welcome/1.jpeg">
                            <Image
                                src="/temp/welcome/1.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView> 
                        <PhotoView src="/temp/welcome/2.jpg">
                            <Image
                                src="/temp/welcome/2.jpg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                        <PhotoView src="/temp/welcome/3.jpeg">
                            <Image
                                src="/temp/welcome/3.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>
        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Нашите услуги включват</h2>
                <p>
                    Солариум: Насладете се на естествен и здравословен тен с нашите съвременни солариуми. Постигнете мечтания загар, докато се отпуснете в комфортна и безопасна среда.

                    Масаж: Потопете се в света на релаксацията с нашите професионални масажи.
                    Отпуснете стреса и напрежението с разнообразие от масажни техники, които ще възвърнат баланса и енергията на вашето тяло.

                    Маникюр и педикюр: Вашите ръце и крака заслужават най-добрата грижа. Ние предлагаме широка гама от маникюр и педикюр услуги, които ще подчертаят вашата красота и стил.
                </p>
            </div>
            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div>
                        <PhotoView src="/temp/services/1.jpeg">
                            <Image
                                src="/temp/services/1.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                        <PhotoView src="/temp/services/2.jpg">
                            <Image
                                src="/temp/services/2.jpg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                        <PhotoView src="/temp/services/3.jpg">
                            <Image
                                src="/temp/services/3.jpg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>



        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Защо да изберете нас</h2>
                <p>
                    В Sweet Surprises сме посветени на това да предоставим на нашите клиенти изключително преживяване.
                    Всяка процедура е изпълнена с професионализъм, използвайки само висококачествени продукти.
                    Вашето удовлетворение е наш приоритет и се стремим всеки път да надминем вашите очаквания.
                </p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div>
                        <PhotoView src="/temp/whyus/1.jpg">
                            <Image
                                src="/temp/whyus/1.jpg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                        <PhotoView src="/temp/whyus/2.jpeg">
                            <Image
                                src="/temp/whyus/2.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>

        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Очакваме ви с нетърпение!</h2>
                <p>
                    Заповядайте в Sweet Surprises и си подарете моменти на истинска грижа и релакс.
                    В нашето студио ще откриете всичко необходимо, за да се почувствате красиви, свежи и уверени.
                    Времето прекарано при нас е инвестиция във вашето добро настроение и самочувствие.
                </p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div>
                        <PhotoView src="/temp/we're-waiting/1.jpeg">
                            <Image
                                src="/temp/we're-waiting/1.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                        <PhotoView src="/temp/we're-waiting/2.jpeg">
                            <Image
                                src="/temp/we're-waiting/2.jpeg"
                                alt="test"
                                width={200}
                                height={150}
                            />
                        </PhotoView>
                    </div>
                </PhotoProvider>
            </div>
        </article>

        <article>
            <h3 style={{ textAlign: 'center', color: 'black' }}>Партньори</h3>
            <div className={styles.partnersImageContainer}>
                {partnersImageLinks.map((image) => {
                    return (<div
                        key={image.id}
                        className={styles.partner}
                        style={{ margin: '15px' }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>)
                })}
            </div>
        </article>

    </section>;
};

export default AboutUs;
