import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { FaRobot, FaChartLine, FaRunning } from "react-icons/fa";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

const Home = () => {

  return (

    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* floating glowing blobs */}

      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
        >
          AI Powered  
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
            {" "}Fitness Tracking
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto"
        >
          Track workouts, analyze performance, and receive intelligent
          recommendations powered by AI.
        </motion.p>

        {/* CTA */}

        <motion.div
          variants={item}
          className="mt-10"
        >
          <Link to="/activities">

            <Button
              variant="contained"
              size="large"
              sx={{
                padding: "12px 32px",
                borderRadius: "999px",
                background:
                  "linear-gradient(45deg,#6366f1,#9333ea)",
                fontWeight: "bold",
                boxShadow: "0px 8px 30px rgba(99,102,241,0.6)"
              }}
            >
              Start Tracking
            </Button>

          </Link>
        </motion.div>

      </motion.div>

      {/* Features Section */}

      <motion.div
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ delay:0.5 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl"
      >

        <FeatureCard
          icon={<FaRunning />}
          title="Activity Tracking"
          desc="Log running, cycling, swimming, and more."
        />

        <FeatureCard
          icon={<FaChartLine />}
          title="Performance Analytics"
          desc="Understand calories, duration, and trends."
        />

        <FeatureCard
          icon={<FaRobot />}
          title="AI Recommendations"
          desc="Smart suggestions to improve your fitness."
        />

      </motion.div>

    </div>
  );
};

export default Home;



/* Feature Card Component */

const FeatureCard = ({ icon, title, desc }) => {

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass-card p-8 rounded-2xl text-white"
    >

      <div className="text-3xl mb-4 text-indigo-300">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-200 text-sm">
        {desc}
      </p>

    </motion.div>

  );
};