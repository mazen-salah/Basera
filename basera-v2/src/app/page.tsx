import AppBar from "@/components/AppBar";
import { FaLink, FaDesktop } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50" />
      {/* Gradient Overlay */}
      <div className="min-h-screen bg-gradient-to-br from-black to-blue-700 absolute inset-0" />

      {/* AppBar */}
      <AppBar />

      {/* Body */}
      <div className="flex flex-col items-center justify-center text-right mt-10 space-y-10 text-white px-4 sm:px-6 lg:px-8 relative z-10">
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
          <Button
            href="#"
            gradientFrom="blue-500"
            gradientTo="teal-400"
            icon={<FaDesktop className="text-3xl" />}
            text="منصات تدعم ذوي الاعاقة البصرية"
          />
          <Button
            href="#"
            gradientFrom="blue-500"
            gradientTo="teal-400"
            icon={<FaLink className="text-3xl" />}
            text="فحص الروابط"
          />
        </div>
      </div>
    </div>
  );
}

interface ButtonProps {
  href: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  href,
  gradientFrom,
  gradientTo,
  icon,
  text,
}) => (
  <a
    href={href}
    className={`flex items-center justify-between bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-${gradientFrom} focus:ring-opacity-50`}
  >
    <div className="flex items-center">
      {icon}
      <span className="font-semibold text-xl mr-4">{text}</span>
    </div>
    <span className="text-white font-medium text-lg">دخول</span>
  </a>
);
