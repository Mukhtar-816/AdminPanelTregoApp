
const Card = ({ title, children, className }) => (
  <section
    className={` ${className} w-full flex flex-col bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] p-5 rounded-xl border-2 border-white/10 backdrop-blur-xl hover:translate-y-[-10px] hover:shadow-2xl transition-all duration-300 hover:border-t-2 hover:border-t-blue-500`}
  >
    {title && (
      <h1 className="text-white text-2xl font-semibold mb-4">{title}</h1>
    )}
    {children}
  </section>
);

export default Card;