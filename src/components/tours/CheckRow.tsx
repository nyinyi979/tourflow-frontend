import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";

export default function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-foreground"
      >
        {label}
      </Label>
    </div>
  );
}
