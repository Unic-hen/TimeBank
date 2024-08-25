import DescLine from "@/components/DescLine";
import { descMap } from "@/utils/desc";
const DescBox = ({ items, addons }) => {
  return (
    <div>
      {Object.entries(items).map(([key, value]) => {
        return <DescLine key={key} label={descMap[key]} desc={value} />;
      })}
      {addons}
    </div>
  );
};
export default DescBox;
