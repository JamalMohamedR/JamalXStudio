import React, { useState } from 'react';
import '@fontsource/audiowide';
import logo from '../assets/images/logo.png';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

function NavBar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black border-b border-gray-800 shadow-md">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 h-20">

        {/* Logo - Click scrolls to top */}
        <div className="flex-shrink-0">
          <Link to="home" smooth={true} duration={500} offset={-80}>
            <img
              src={logo}
              alt="Logo"
              className="h-10 sm:h-12 md:h-12 lg:h-14 xl:h-16 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>

        {/* Full Nav - Visible on xl and above */}
        <div className="hidden xl:flex items-center gap-8 bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent font-audiowide text-base xl:text-lg">
          <Link to="home" smooth={true} duration={500} offset={-80} className="  hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Home</Link>
          <Link to="about" smooth={true} duration={500} offset={-80} className="hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">About</Link>
          <Link to="projects" smooth={true} duration={500} offset={-80} className="hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Projects</Link>
          <Link to="experience" smooth={true} duration={500} offset={-80} className="hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Experience</Link>
          {/* <Link to="contact" smooth={true} duration={500} offset={-80} className="hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Contact</Link> */}

          {/* Optional CTA Button */}
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-80}
            className="ml-4 px-4 py-2 border border-white rounded-full hover:bg-cyan-400 hover:bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent transition cursor-pointer"
          >
            Contact Me
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden">
         <button 
    onClick={toggleNavBar} 
    aria-label="Close menu"
    className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] p-2 rounded-lg"
  >
    <Menu size={28} color="white" />
  </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black transform transition-transform duration-300 ease-in-out z-40 shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
       <div className="flex justify-end p-5">
  <button 
    onClick={toggleNavBar} 
    aria-label="Close menu"
    className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] p-2 rounded-lg"
  >
    <X size={28} color="white" />
  </button>
</div>
        <nav className="flex flex-col space-y-6 px-6  font-audiowide text-base">
          <Link onClick={toggleNavBar} to="home" smooth={true} duration={500} offset={-80} className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Home</Link>
          <Link onClick={toggleNavBar} to="about" smooth={true} duration={500} offset={-80} className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">About</Link>
          <Link onClick={toggleNavBar} to="projects" smooth={true} duration={500} offset={-80} className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Projects</Link>
          <Link onClick={toggleNavBar} to="experience" smooth={true} duration={500} offset={-80} className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Experience</Link>
          <Link onClick={toggleNavBar} to="contact" smooth={true} duration={500} offset={-80} className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent cursor-pointer">Contact</Link>
        </nav>
      </div>
    </nav>
  );
}

export default NavBar;
