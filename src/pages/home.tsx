import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Understand Complex Topics with
          <span className="text-blue-600"> AI-Powered 3D Visualization</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ask questions and receive answers with interactive 3D visualizations that make learning intuitive and engaging.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="font-semibold">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="font-semibold">
              Sign In
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <Brain className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
          <p className="text-gray-600">
            Advanced AI algorithms generate detailed explanations with interactive 3D models.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <Sparkles className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive 3D</h3>
          <p className="text-gray-600">
            Manipulate and explore concepts through interactive 3D visualizations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <Lock className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Features</h3>
          <p className="text-gray-600">
            Access advanced features and priority support with our premium subscription.
          </p>
        </motion.div>
      </div>
    </div>
  );
};