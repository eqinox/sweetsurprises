import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactMe = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isMapVisible, setIsMapVisible] = useState(false)
  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    window.location.href = `mailto:eqinox@abv.bg?subject=${formData.subject}&body=HI, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  const handleMapClick = () => {
    setIsMapVisible(!isMapVisible);
  };

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

      <div className="flex flex-col space-y-10">
        {/* <h4 className="text-4-xl font-semibold text-center">
          Имам каквото ти е нужно{" "}
          <span className="decoration-[#F7AB0A]/50 underline"> нека говорим.</span>
        </h4> */}

        <div className="space-y-10">
          <div className="flex items-center space-x-5">
            <PhoneIcon className="text-[#F7aB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">+123456789</p>
          </div>

          <div className="flex items-center space-x-5">
            <EnvelopeIcon className="text-[#F7aB0A] h-7 w-7 animate-pulse" />
            <p className="text-2xl">sweet-surprises@gmail.com</p>
          </div>

          {/* <div className="flex items-center space-x-5" onClick={openGoogleMaps}>
            <MapIcon className="text-[#F7aB0A] h-7 w-7 animate-pulse cursor-pointer" />
            <p className="text-2xl">Click to open Google Maps</p>
          </div> */}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-fill mx-auto"
        >
          <div className="flex space-x-2">
            <input
              {...register("name")}
              placeholder="Име"
              className="contactInput"
              type="text"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="contactInput"
              type="email"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Тема"
            className="contactInput"
            type="text"
          />
          <textarea {...register("message")} className="contactInput" />
          <button className="bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold">
            Submit
          </button>
        </form>

      </div>
    </div>
  );
};

export default ContactMe;
