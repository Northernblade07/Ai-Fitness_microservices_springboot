import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  getActivityDetail,
  getActivityrecommendations,
} from "../services/api";

import {
  FaRunning,
  FaClock,
  FaFire,
  FaBrain,
  FaLightbulb,
  FaArrowUp,
  FaShieldAlt
} from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { FaHourglassStart } from "react-icons/fa";


const ActivityDetails = () => {

  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const fetchActivityDetail = async () => {

    try {

      const res = await getActivityDetail(id);
      setActivity(res.data);
    } catch (error) {

      console.error("Failed to fetch activity:", error);

    } finally {

      setLoadingActivity(false);

    }

  };

  const fetchActivityRecommendation = async () => {

    setLoadingRecommendation(true);

    try {

      const res = await getActivityrecommendations(id);
      setRecommendation(res.data);
    } catch (error) {

      console.error("Failed to fetch recommendation:", error);

    } finally {

      setLoadingRecommendation(false);

    }

  };

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  if (loadingActivity) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300">
        Loading activity...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="p-8 mt-20 text-red-500">
        Activity not found
      </div>
    );
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto mt-24 px-4"
    >

      {/* Header */}

      <h2 className="text-3xl font-bold mb-10 text-white">
        Activity Analysis
      </h2>

      {/* Activity Info Card */}

      <div className="glass-card rounded-2xl shadow-xl p-6 space-y-4">

        <InfoRow
          icon={<FaRunning />}
          label="Activity"
          value={activity.type}
        />

        <InfoRow
          icon={<FaClock />}
          label="Duration"
          value={`${activity.duration} minutes`}
        />

        <InfoRow
          icon={<FaFire />}
          label="Calories"
          value={`${activity.caloriesBurned} kcal`}
        />

        <InfoRow
        icon={<CiTimer />
}
          label="Created"
          value={new Date(activity.createdAt).toLocaleString()}
        />

             <InfoRow
             icon={<FaHourglassStart />
}
          label="Start Time"
          value={new Date(activity.startTime).toLocaleString()}
        />

        {/* Additional Metrics */}

        {activity.additionalMetrics && (

          <div>

            <p className="text-gray-100 text-md mb-2">
              Additional Metrics
            </p>

            <div className="grid grid-cols-2 gap-3">

              {Object.entries(activity.additionalMetrics).map(([key, value]) => (

                <div
                  key={key}
                  className="bg-white/10 rounded-lg p-3 text-sm text-white"
                >
                  <span className="text-gray-300">{key}</span>: {value}
                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* AI Button */}

      <button
        onClick={fetchActivityRecommendation}
        className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition"
      >
        Generate AI Recommendation
      </button>

      {loadingRecommendation && (
        <p className="mt-4 text-gray-400">
          AI is analyzing your workout...
        </p>
      )}

      {/* Recommendation */}

      {recommendation && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 space-y-6"
        >

          {/* AI Analysis */}

          <Section
            icon={<FaBrain />}
            title="AI Analysis"
            content={recommendation.recommendation}
          />

          {/* Safety */}

          <ListSection
            icon={<FaShieldAlt />}
            title="Safety Tips"
            items={recommendation.safety}
          />
          {/* Suggestions */}

          <ListSection
            icon={<FaLightbulb />}
            title="Suggestions"
            items={recommendation.suggestions}
          />

          {/* Improvements */}

          <ListSection
            icon={<FaArrowUp />}
            title="Improvements"
            items={recommendation.improvements}
          />

          


        </motion.div>

      )}

    </motion.div>

  );

};

export default ActivityDetails;



/* Info Row */

const InfoRow = ({ icon, label, value }) => {

  return (

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-2 text-gray-300">

        {icon}

        <span>{label}</span>

      </div>

      <span className="font-semibold text-white">
        {value}
      </span>

    </div>

  );

};



/* Text Section */

const Section = ({ icon, title, content }) => {

  return (

    <div className="glass-card rounded-xl p-6">

      <div className="flex items-center gap-2 mb-2 text-white font-semibold">

        {icon}

        {title}

      </div>

      <p className="text-gray-300 whitespace-pre-line">
        {content}
      </p>

    </div>

  );

};



/* List Section */

const ListSection = ({ icon, title, items }) => {

  if (!items || !items.length) return null;

  return (

    <div className="glass-card rounded-xl p-6">

      <div className="flex items-center gap-2 mb-3 text-white font-semibold">

        {icon}

        {title}

      </div>

      <ul className="list-disc pl-5 space-y-1 text-gray-300">

        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

      </ul>

    </div>

  );

};