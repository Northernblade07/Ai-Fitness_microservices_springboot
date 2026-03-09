import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon }) => {

  return (

    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="glass-card rounded-b-2xl p-6 relative overflow-hidden"
    >

      {/* gradient highlight */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-300">
            {title}
          </p>

          <p className="text-3xl font-bold text-white mt-2">
            {value}
          </p>

        </div>

        <div className="text-3xl text-indigo-300">
          {icon}
        </div>

      </div>

    </motion.div>

  );
};

export default AnalyticsCard;