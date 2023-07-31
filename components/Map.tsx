import {
    PhoneIcon,
    MapPinIcon,
    EnvelopeIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";


const Map = () => {

    const openGoogleMaps = () => {
        window.open(
            "https://www.google.com/maps?q=42.673816901896984,23.26378880375552",
            "_blank"
        );
    };

    return (
        <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center ">
            <h3 className="absolute top-24 uppercase tracking-[20px] text-yellow-500 text-2xl ">
                Контакти
            </h3>

            <div className="flex flex-col space-y-10">  <div>
                <iframe
                    title="Google Maps"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.852104932205!2d23.26378880375552!3d42.673816901896984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0zCjs0zMi42IkUxwrAxOC8wMyAyM8KwMjEnMzUuMCJF!5e0!3m2!1sen!2sbg!4v1625158248208!5m2!1sen!2sbg"
                ></iframe>
            </div>

            </div>
        </div>
    );
};

export default Map;
