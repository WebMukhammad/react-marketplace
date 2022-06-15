import React from "react";
import "./style.scss";

function Commission({ price, percent, minimal, title }) {
  const commission = React.useMemo(() => {
    const expression = (price / 100) * percent;
    return expression > minimal ? Math.round(expression) : Math.round(minimal);
  }, [price, minimal, percent]);

  return (
    <div className="comission">
      <div className="comission__row">
        {(percent || percent === 0) && (minimal || minimal === 0) ? (
          <>
            <div className="comission__percent">{percent}%</div>
            <div className="comission__crop" title="commission">
              {commission}₽
            </div>
          </>
        ) : (
          "-"
        )}
      </div>
      <div className="comission__row">
        <div className="comission__text">{title}</div>
      </div>
    </div>
  );
}

export default Commission;
