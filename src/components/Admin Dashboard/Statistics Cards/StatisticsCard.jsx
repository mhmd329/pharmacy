import { GoArrowUpLeft } from "react-icons/go";

const StatisticsCard = ({
  title,
  precent,
  subTitle = "منذ اخر اسبوع",
  number,
  mainBg = "bg-white",
  mainTitleColor = "text-black",
  subTitleColor = "text-[#7E7D7D]",
  numberColor = "text-[#EE446E]",
  precentColor = "text-[#00AF0A]",
  strokeColor = "#00AF0A",
}) => {
  return (
    <div
      className={`aspect-video border-1 border-[#E7E7E7] p-3 md:p-5 ${mainTitleColor} ${mainBg} rounded-2xl flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[14px] md:text-[16px]">{title}</h4>
        <GoArrowUpLeft size={20} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className={` ${precentColor} text-[12px] font-bold flex items-center gap-1`}>
            {precent}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.55291 15.4191L6.38134 10.5201L11.2803 13.3485L15.523 6.00006"
                stroke={strokeColor}
                strokeWidth="1.4"
                strokeMiterlimit="5.759"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.6251 6.77649L15.5229 6.00003L16.2994 8.89781"
                stroke={strokeColor}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          <p className={`text-[12px] ${subTitleColor}`}>{subTitle}</p>
        </div>
        <p className={`${numberColor} text-[20px] md:text-[30px] font-medium`}>{number}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
