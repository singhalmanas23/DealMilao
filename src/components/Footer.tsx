import React from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 py-6 sm:flex-row">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <div className="text-center md:text-left md:mr-6">
              <h4 className="text-xl text-gray-100">Contact Information</h4>
              <p className="mt-2">Email : dealmilao@gmail.com</p>
              <p>Address : Dehradun,India</p>
            </div>
            <div className="flex flex-col items-center justify-center sm:ml-8 md:ml-32 lg:ml-64">
              <div>© DealMilao</div>
              <div>Created by Manas Singhal</div>
            </div>
          </div>
          <div className="flex space-x-4 text-xl text-white">
            <a
              href="https://www.linkedin.com/in/manas-singhal-1878082a7/"
              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/manas._.s_/"
              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/singhalmanas23"
              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:singhalmanas34@gmail.com?subject=Your%20Subject&body=Your%20Message"
              className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center"
            >
              <IoMdMail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
