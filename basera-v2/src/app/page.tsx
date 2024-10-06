import AppBar from "@/components/AppBar";
import Link from "next/link";
import { FaLink, FaDesktop } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      {/* AppBar */}
      <AppBar />

      {/* Body */}
      <div className="flex flex-col items-center justify-center text-center mt-10 space-y-10 text-white">
        {/* Text */}
        <div className="text-lg" dir="rtl">
          <h1 className="text-4xl font-bold">أهلاً بكم في بصيرة</h1>
          <p className="mt-4">
            منصة إلكترونية تساعد ذوي الإعاقة البصرية فحص الروابط للتأكد من
            سلامتها.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-8">
          {/* First Button: فحص الروابط */}
          <Link href="#" passHref>
            <div className="bg-white text-blue-600 flex items-center px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100">
              <FaLink className="mr-3 text-2xl" />
              <span className="font-semibold text-lg">فحص الروابط</span>
              <span className="ml-4 text-blue-400">الدخول</span>
            </div>
          </Link>

          {/* Second Button: منصات تدعم ذوي الاعاقة البصرية */}
          <Link href="#" passHref>
            <div className="bg-white text-blue-600 flex items-center px-6 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100">
              <FaDesktop className="mr-3 text-2xl" />
              <span className="font-semibold text-lg">
                منصات تدعم ذوي الاعاقة البصرية
              </span>
              <span className="ml-4 text-blue-400">الدخول</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
