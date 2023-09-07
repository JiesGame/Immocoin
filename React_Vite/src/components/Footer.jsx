import { useLocation } from "react-router-dom";

export const Footer = () => {

  const location = useLocation();
  const isNotFoundPage = location.pathname === "/404";

  if (!isNotFoundPage) {
    return ( 
    <footer className="bg-gray-100 w-full bottom-0 sticky">
      <div className="w-full p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://github.com/" className="flex items-center mb-4 sm:mb-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" className="h-8 mr-3" alt="GitHub Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">JiesGame</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/JiesGame" className="hover:underline">JiesGame™</a>. All Rights Reserved.</span>
      </div>
      <div className="" />
    </footer>
    );
  }
};