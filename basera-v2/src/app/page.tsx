import AppBar from "@/components/AppBar";
import { FaLink, FaDesktop } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 rtl">
      {/* AppBar */}
      <AppBar />

      {/* Body */}
      <div className="flex flex-col items-center justify-center text-right mt-10 space-y-10 text-white px-4 sm:px-6 lg:px-8">
        {/* Text */}
        <div className="text-lg">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            أهلاً بكم في بصيرة
          </h1>
          <p className="max-w-xl text-xl leading-loose font-light">
            منصة إلكترونية تساعد ذوي الإعاقة البصرية فحص الروابط للتأكد من
            سلامتها.
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
          {/* First Button: فحص الروابط */}
          <a
            href="#"
            className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-5 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <FaLink className="ml-3 text-3xl" />
              <span className="font-semibold text-xl">فحص الروابط</span>
            </div>
            <span className="text-white font-medium text-lg">الدخول</span>
          </a>

          {/* Second Button: منصات تدعم ذوي الاعاقة البصرية */}
          <a
            href="#"
            className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-400 text-white px-6 py-5 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <FaDesktop className="ml-3 text-3xl" />
              <span className="font-semibold text-xl">
                منصات تدعم ذوي الاعاقة البصرية
              </span>
            </div>
            <span className="text-white font-medium text-lg">الدخول</span>
          </a>
        </div>
      </div>
    </div>
  );
}
