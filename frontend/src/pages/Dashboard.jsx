import { motion } from "framer-motion";
import AnalyticsCard from "../components/AnalyticsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";
import { getActivity } from "../services/api";

import { FaFire, FaRunning, FaChartPie } from "react-icons/fa";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#f43f5e", "#14b8a6"];

const Dashboard = () => {

  const [activities, setActivities] = useState([]);
  const [weeklyCalories, setWeeklyCalories] = useState([]);
  const [activityDistribution, setActivityDistribution] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const fetchActivities = async () => {

    try {

      const res = await getActivity();
      const data = res.data;

      setActivities(data);

      processAnalytics(data);

    } catch (err) {

      console.error("Failed to fetch activities", err);

    }

  };

  const processAnalytics = (data) => {

    let caloriesSum = 0;

    const weekdayMap = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    const activityTypeMap = {};

    data.forEach((activity) => {

      caloriesSum += activity.caloriesBurned || 0;

      const day = new Date(activity.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });

      weekdayMap[day] += activity.caloriesBurned || 0;

      if (!activityTypeMap[activity.type]) {
        activityTypeMap[activity.type] = 0;
      }

      activityTypeMap[activity.type]++;

    });

    const weeklyData = Object.keys(weekdayMap).map((day) => ({
      day,
      calories: weekdayMap[day],
    }));

    const typeDistribution = Object.keys(activityTypeMap).map((type) => ({
      name: type,
      value: activityTypeMap[type],
    }));

    setWeeklyCalories(weeklyData);
    setActivityDistribution(typeDistribution);
    setTotalCalories(caloriesSum);

  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (

    <div className="px-4 md:px-8 py-12 max-w-7xl mx-auto mt-15">

      {/* Header */}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-white"
      >
        Fitness Dashboard
      </motion.h2>

      {/* Analytics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        <AnalyticsCard
          title="Calories Burned"
          value={`${totalCalories} kcal`}
          icon={<FaFire />}
        />

        <AnalyticsCard
          title="Total Workouts"
          value={activities.length}
          icon={<FaRunning />}
        />

        <AnalyticsCard
          title="Activity Types"
          value={activityDistribution.length}
          icon={<FaChartPie />}
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">

        {/* Weekly Chart */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-6"
        >

          <h3 className="text-white font-semibold mb-6">
            Weekly Calories Burned
          </h3>

          <ResponsiveContainer width="100%" height={280}>

            <BarChart data={weeklyCalories}>

              <XAxis dataKey="day" stroke="#ddd" />

              <YAxis stroke="#ddd" />

              <Tooltip />

              <Bar
                dataKey="calories"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* Pie Chart */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-6"
        >

          <h3 className="text-white font-semibold mb-6">
            Activity Distribution
          </h3>

          <ResponsiveContainer width="100%" height={280}>

            <PieChart>

              <Pie
                data={activityDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >

                {activityDistribution.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

    </div>

  );

};

export default Dashboard;