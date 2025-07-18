import imgcorn from '../assets/corn.svg';

export default function Header() {
  return (
    <header className="w-full bg-[#5a8a6b] px-6 py-4 flex items-center justify-between">   
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#f59e0b] rounded-lg flex items-center justify-center">
          <img className="" src={imgcorn} alt="Logo" />
        </div>
        <span className="font-bold text-white text-lg">AgroTech Safra</span>
      </div>     
    </header>
  );
}