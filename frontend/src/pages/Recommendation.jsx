import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserRecommendations } from "../services/api";
import { motion } from "framer-motion";
import { FaBrain, FaArrowUp, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground";
import { Link } from "react-router";

const Recommendation = () => {

  const userId = useSelector((state) => state.auth.userId);

  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {

    try {

      const res = await getUserRecommendations(userId);

      setRecommendations(res.data);
        console.log(res)
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    async function getrec() {
        if (userId) fetchRecommendations();
    }
    getrec();
  }, [userId]);

  if (!recommendations.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        No AI recommendations available yet.
      </div>
    );
  }

  return (

    <div className="relative min-h-screen px-4 py-16 mt-10">

      <AnimatedBackground />

      <div className="max-w-6xl mx-auto space-y-10">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          AI Fitness Recommendations
        </motion.h1>

        {recommendations.map((rec) => (


          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-8 space-y-6"
          >

            {/* Activity Type */}

            <div className="flex items-center gap-3 text-indigo-700 text-lg font-semibold justify-between">
              <div className="flex items-center gap-3">
              <FaBrain />
              {rec.activityType} AI Analysis
              </div>

<Link to={`/activities/${rec.activityId}`} className="flex">

                 <button
        className="px-6 py-3  bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition rounded-bl-2xl"
      >
        See Activity Details
      </button>
</Link>


            </div>

            {/* Full Recommendation */}

            <div className="text-gray-200 whitespace-pre-line">
              {rec.recommendation}
            </div>

            {/* Improvements */}

            <Section
              title="Improvements"
              icon={<FaArrowUp />}
              items={rec.improvements}
            />

            {/* Suggestions */}

            <Section
              title="Workout Suggestions"
              icon={<FaLightbulb />}
              items={rec.suggestions}
            />

            {/* Safety */}

            <Section
              title="Safety Guidelines"
              icon={<FaShieldAlt />}
              items={rec.safety}
            />


          </motion.div>
        ))}

      </div>

    </div>
  );
};

export default Recommendation;



/* Section Component */

const Section = ({ title, icon, items }) => {

  if (!items || !items.length) return null;

  return (

    <div>

      <div className="flex items-center gap-2 text-white font-semibold mb-2">
        {icon}
        {title}
      </div>

      <ul className="list-disc ml-6 space-y-1 text-gray-300">

        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

      </ul>

    </div>

  );

};