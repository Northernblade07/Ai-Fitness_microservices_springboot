import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  IconButton
} from "@mui/material";

import { motion } from "framer-motion";
import { useState } from "react";
import { addActivity } from "../services/api";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    startTime: "",
  });

  const [metrics, setMetrics] = useState([
    { key: "", value: "" }
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  /* Metric handlers */

  const addMetric = () => {
    setMetrics([...metrics, { key: "", value: "" }]);
  };

  const updateMetric = (index, field, value) => {

    const updated = [...metrics];
    updated[index][field] = value;

    setMetrics(updated);
  };

  const removeMetric = (index) => {

    const updated = metrics.filter((_, i) => i !== index);
    setMetrics(updated);

  };

  /* Submit */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const metricsMap = {};

      metrics.forEach((metric) => {
        if (metric.key) {
          metricsMap[metric.key] = metric.value;
        }
      });

      const payload = {
        ...activity,
        additionalMetrics: metricsMap
      };

      await addActivity(payload);

      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        startTime: "",
      });

      setMetrics([{ key: "", value: "" }]);

      if (onActivityAdded) onActivityAdded();

    } catch (error) {
      console.log(error);
    }

    setLoading(false);

  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >

      <Card className="glass-card rounded-3xl shadow-xl">

        <CardContent className="p-8 space-y-6">

          {/* Title */}

          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-700 ">

            <FaPlusCircle className="text-indigo-400" />

            Log Activity

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Activity Type */}

            <FormControl fullWidth>

              <InputLabel>Activity Type</InputLabel>

              <Select
                name="type"
                value={activity.type}
                onChange={handleChange}
                label="Activity Type"
              >

                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
                <MenuItem value="SWIMMING">Swimming</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>

              </Select>

            </FormControl>

            {/* Duration */}

            <TextField
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={activity.duration}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Calories */}

            <TextField
              label="Calories Burned"
              name="caloriesBurned"
              type="number"
              value={activity.caloriesBurned}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Start Time */}

            <TextField
              label="Start Time"
              name="startTime"
              type="datetime-local"
              value={activity.startTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />

            {/* Additional Metrics */}

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <h3 className="text-white font-semibold text-lg">
                  Additional Metrics
                </h3>

                <Button
                  variant="outlined"
                  onClick={addMetric}
                  startIcon={<IoAddCircle />}
                >
                  Add Metric
                </Button>

              </div>

              {metrics.map((metric, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 items-center"
                >

                  <TextField
                    label="Metric Name"
                    value={metric.key}
                    onChange={(e) =>
                      updateMetric(index, "key", e.target.value)
                    }
                    fullWidth
                  />

                  <TextField
                    label="Value"
                    value={metric.value}
                    onChange={(e) =>
                      updateMetric(index, "value", e.target.value)
                    }
                    fullWidth
                  />

                  <IconButton
                    color="error"
                    onClick={() => removeMetric(index)}
                  >

                    <MdDelete />

                  </IconButton>

                </motion.div>

              ))}

            </div>

            {/* Submit */}

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                background: "linear-gradient(45deg,#6366f1,#9333ea)",
                padding: "12px",
                fontWeight: "bold"
              }}
            >

              {loading ? "Saving..." : "Submit Activity"}

            </Button>

          </form>

        </CardContent>

      </Card>

    </motion.div>

  );

};

export default ActivityForm;