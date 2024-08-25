import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Link } from "react-router-dom";
const Exhibition = ({ list }) => {
  return (
    <div className="exhibition">
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <Link to={item.url} alt={item.title}>
              <div className="list-item">
                <span className="title">{item.title}</span>
                <span className="date">{item.time.slice(0, 10)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Exhibition; // 编写一个React组件，该组件能够展示一个展览。
