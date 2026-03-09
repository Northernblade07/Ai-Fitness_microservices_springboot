import { Avatar, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaEnvelope, FaUserShield, FaIdBadge } from "react-icons/fa";

const Profile = () => {

  const user = useSelector((state) => state.auth.user);
  const userId = useSelector((state) => state.auth.userId);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white mt-15">
        No user logged in
      </div>
    );
  }

  const initials =
    (user?.given_name?.charAt(0) || "") +
    (user?.family_name?.charAt(0) || "");

  return (

    <div className="px-4 py-16 flex justify-center mt-15">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full max-w-lg rounded-3xl p-8 text-center gap-2"
      >

        {/* Avatar */}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative w-fit mx-auto"
        >

          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60"></div>

          <Avatar
            sx={{ width: 110, height: 110 }}
            className="relative border-4 border-white text-xl bg-blue-400"
          >
            {initials}
          </Avatar>

        </motion.div>

        {/* Name */}

        <h2 className="text-2xl font-bold mt-6 text-white">
          {user?.given_name} {user?.family_name}
        </h2>

        <p className="text-gray-300">
          Fitly-AI App User
        </p>

        {/* Profile Info */}

        <div className="mt-8 space-y-4 text-left">

          <InfoRow
            icon={<FaEnvelope />}
            label="Email"
            value={user?.email}
          />

          <InfoRow
            icon={<FaIdBadge />}
            label="User ID"
            value={userId}
          />

          <InfoRow
            icon={<FaUserShield />}
            label="Authentication"
            value="Keycloak Secure Login"
          />

        </div>

        {/* Token Info */}

        <div className="mt-6">

          <Chip
            label="Authenticated Session"
            sx={{
              background: "rgba(255,255,255,0.15)",
              color: "white"
            }}
          />

        </div>

        <button
        className="mt-8 px-6 py-3  bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition rounded-bl-2xl"
      >
        See Activity Details
      </button>


        <button
        className="mt-8 px-6 py-3  bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-105 transition rounded-bl-2xl"
      >
        See Activity Details
      </button>

      </motion.div>

    </div>

  );
};

export default Profile;



/* Info Row Component */

const InfoRow = ({ icon, label, value }) => {

  return (

    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 bg-white/10 rounded-xl p-4"
    >

      <div className="text-indigo-300 text-lg">
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="text-white text-sm font-medium break-all">
          {value}
        </p>

      </div>

    </motion.div>

  );

};