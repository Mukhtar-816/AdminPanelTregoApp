import LineGraph from "./lineGraph";

const StatRow = ({ label, value, max = 100, Graph = false }) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="flex justify-between items-center py-3 space-x-5 text-md border-b border-white/10 last:border-b-0">
      <span className="text-white/60">{label}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
      {Graph && <LineGraph filled={percentage} />}
    </div>
  );
};


export default StatRow;