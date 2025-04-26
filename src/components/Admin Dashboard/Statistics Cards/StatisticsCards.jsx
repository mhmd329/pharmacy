import StatisticsCard from "./StatisticsCard";

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-6">
      <StatisticsCard
        title={"اجمالي العملاء"}
       precent={"1.5%"}
        number={"5.000"}
      />
      <StatisticsCard
        title={"عائد الربح"}
        precent={"10.6%"}
        number={"$81.000"}
        mainTitleColor="text-white"
        mainBg="bg-[#EE446E]"
        precentColor="text-[#00FF0C]"
        strokeColor="#00FF0C"
        numberColor="text-white"
        subTitleColor="text-[#F6F6F6]"
      />
      <StatisticsCard
        title={"عدد المنتجات"}
        precent={"1.5%"}
        number={"5.000"}
      />
      <StatisticsCard
        title={"اجمالي التحويلات"}
        precent={"3.6%"}
        number={"12.000"}
      />
    </div>
  );
};

export default StatisticsCards;
