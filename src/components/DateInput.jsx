import { CalendarDays } from 'lucide-react';

export default function DateInput({ label, value, onChange, min }) {
  const openPicker = (event) => {
    try {
      event.currentTarget.showPicker?.();
    } catch {
      // Some browsers only allow the picker during direct pointer activation.
    }
  };

  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-[8px] border border-ink-200 bg-ink-50 px-4 py-3 transition focus-within:border-ocean-500 focus-within:ring-4 focus-within:ring-ocean-100">
      <CalendarDays className="h-5 w-5 shrink-0 text-ocean-600" />
      <span className="grid flex-1 gap-1">
        <span className="text-xs font-extrabold uppercase text-ink-500">{label}</span>
        <input
          type="date"
          min={min}
          value={value}
          onClick={openPicker}
          onFocus={openPicker}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 cursor-pointer border-0 bg-transparent p-0 text-sm font-bold text-ink-900 outline-none [color-scheme:dark]"
        />
      </span>
    </label>
  );
}
