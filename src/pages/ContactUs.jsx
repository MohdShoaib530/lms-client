import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/RegexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function ContactForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("all fields are required");
    }

    if (formData.name.length < 3) {
      return toast.error(`Name must be atleast 3 characters`);
    }

    if (formData.message.length < 20) {
      return toast.error(`message should be atleast 20 characters`);
    }

    if (!isEmail(formData.email)) {
      return toast.error(`Please enter a valid email`);
    }

    try {
      const response = axiosInstance.post("/contact", formData);
      toast.promise(response, {
        loading: "Sending your message",
        success: "message sent successfully, we will contact soon",
        error: "Something went wrong!",
      });
      const result = await response;
      console.log("resutl", result);

      if (result?.data?.message) {
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <HomeLayout>
      <div className="bg-gray-800 relative flex items-center justify-center pt-36 pb-8 w-full">
        <form
          action=""
          noValidate
          onSubmit={onFormSubmit}
          className="bg-gray-700 flex flex-col justify-center gap-3 text-white rounded-lg  px-4 py-1 w-fit"
        >
          <h3 className="text-2xl font-bold text-center">Contact Us</h3>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleUserInput}
              type="text"
              required
              name="name"
              id="name"
              placeholder="Enter your Name.."
              className="bg-transparent px-2 py-1 border border-black outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleUserInput}
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-2 py-1 border border-black outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-semibold">
              message
            </label>
            <textarea
              value={formData.message}
              onChange={handleUserInput}
              required
              name="message"
              id="message"
              placeholder="Enter your message.."
              className="resize-none h-20 outline-none bg-transparent px-2 py-1 border border-black"
            />
          </div>
          <button
            type="submit"
            className="hover:bg-yellow-600 w-full border border-yellow-500 bg-yellow-500 rounded-md py-2 font-semibold "
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactForm;
