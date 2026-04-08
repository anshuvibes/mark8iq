interface StatCardProps {
  number: string;
  label: string;
  trend: string;
}

export function StatCard({ number, label, trend }: StatCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-2">
      <span className="m8-h3-xl" style={{ color: '#8E59FF' }}>{number}</span>
      <span className="m8-p4" style={{ color: '#080D19' }}>{label}</span>
      <span className="m8-p6" style={{ color: '#7CBC71' }}>{trend}</span>
    </div>
  );
}
