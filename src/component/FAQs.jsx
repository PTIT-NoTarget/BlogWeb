
import { useEffect, useState } from "react";

function FAQs() {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(timeSpent === 60){
      console.log("Time's up!")
    }
  }, [timeSpent]);

  return (
    <div>
      <p>Thời gian đã dành: {timeSpent} giây</p>
      {/* Các thành phần khác của trang */}
    </div>
  );
}

export default FAQs;
