
import { motion, AnimatePresence } from "framer-motion";
import GenerationForm from "@/components/dashboardPage/GenerationForm";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const { user } = useSelector((state) => state.auth);



  console.log(user);

  return (
    <div className="space-y-8 md:space-y-16">
      {/* Header section */}
      <motion.div
        className="text-center space-y-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-snap-text-primary tracking-tighter">
          Upload Notes
        </h1>
        <p className="text-base sm:text-xl text-snap-text-secondary max-w-2xl mx-auto">
          Experience the future of learning by transforming your notes into structured AI insights.
        </p>
      </motion.div>

      {/* Functional area */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <GenerationForm />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
