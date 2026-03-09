import React, { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import AnimatedBackground from "../components/AnimatedBackground";
import { motion } from "framer-motion";

const Activity = () => {

  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => {
    setRefresh(prev => !prev);
  };

  return (

    <div className="relative min-h-screen flex flex-col items-center px-4 py-16 mt-15">

      <AnimatedBackground />

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        className="w-full max-w-6xl space-y-16"
      >

        {/* Form */}

        <ActivityForm onActivityAdded={handleAdded} />

        {/* Activity List */}

        <ActivityList refresh={refresh} />

      </motion.div>

    </div>

  );
};

export default Activity;