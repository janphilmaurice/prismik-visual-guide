import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Comparison",
    description: "Compare values between categories to reveal rankings, size differences or standout elements.",
    chartPreview: "BarChart",
    chartTypes: [
      { name: "BarChart", label: "Bar Chart", explanation: "Best for comparing discrete values across categories." },
      { name: "DotPlot", label: "Dot Plot", explanation: "Highlights differences while avoiding chart clutter." },
      { name: "LollipopChart", label: "Lollipop Chart", explanation: "Like a bar chart, but with a cleaner, more minimal visual." }
    ]
  },
  {
    title: "Change Over Time",
    description: "Show how variables evolve across time to identify trends and patterns.",
    chartPreview: "LineChart",
    chartTypes: [
      { name: "LineChart", label: "Line Chart", explanation: "Ideal for tracking continuous data over intervals." },
      { name: "AreaChart", label: "Area Chart", explanation: "Displays volume beneath a trend line, good for totals." },
      { name: "SlopeChart", label: "Slope Chart", explanation: "Compares changes between two points in time." }
    ]
  },
  {
    title: "Distribution",
    description: "Reveal how data points are spread across a range.",
    chartPreview: "Histogram",
    chartTypes: [
      { name: "Histogram", label: "Histogram", explanation: "Shows frequency of values within intervals." },
      { name: "BoxPlot", label: "Box Plot", explanation: "Displays median, quartiles, and outliers." },
      { name: "ViolinPlot", label: "Violin Plot", explanation: "Adds density curve to a box plot." }
    ]
  },
  {
    title: "Part-to-Whole",
    description: "Illustrate how individual parts make up a complete whole.",
    chartPreview: "PieChart",
    chartTypes: [
      { name: "PieChart", label: "Pie Chart", explanation: "Classic for showing parts of a whole at a glance." },
      { name: "StackedBar", label: "Stacked Bar", explanation: "Visualize sub-categories inside total values." },
      { name: "Treemap", label: "Treemap", explanation: "Efficiently shows proportion with nested boxes." }
    ]
  },
  {
    title: "Relationship",
    description: "Show the connection or correlation between variables.",
    chartPreview: "ScatterPlot",
    chartTypes: [
      { name: "ScatterPlot", label: "Scatter Plot", explanation: "Standard for showing two-variable relationships." },
      { name: "BubbleChart", label: "Bubble Chart", explanation: "Adds a third variable with size." },
      { name: "ConnectedScatter", label: "Connected Scatter", explanation: "Tracks progression over time between points." }
    ]
  }
];

const animatedExamples = {
  BarChart: () => (
    <svg width="100" height="60">
      <rect x="10" y="30" width="15" height="30" fill="#38bdf8">
        <animate attributeName="height" values="30;45;30" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="35" y="20" width="15" height="40" fill="#0ea5e9">
        <animate attributeName="height" values="40;25;40" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <rect x="60" y="10" width="15" height="50" fill="#0284c7">
        <animate attributeName="height" values="50;35;50" dur="1.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  ),
  LineChart: () => (
    <svg width="100" height="60">
      <polyline
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        points="0,50 20,30 40,20 60,25 80,10 100,15"
      >
        <animate attributeName="points" dur="2s" repeatCount="indefinite"
          values="0,50 20,30 40,20 60,25 80,10 100,15;
                  0,45 20,35 40,25 60,20 80,15 100,10;
                  0,50 20,30 40,20 60,25 80,10 100,15" />
      </polyline>
    </svg>
  ),
  PieChart: () => (
    <svg viewBox="0 0 32 32" width="60" height="60">
      <circle r="16" cx="16" cy="16" fill="#0ea5e9" />
      <path d="M16 16 L32 16 A16 16 0 0 1 16 0 Z" fill="#38bdf8">
        <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  ),
  Histogram: () => (
    <svg width="100" height="60">
      {[0, 1, 2, 3].map((d, i) => (
        <rect key={i} x={10 + i * 20} y="20" width="10" height={10 + i * 10} fill="#0ea5e9">
          <animate attributeName="height" values={`${10 + i * 10};${20 + i * 5};${10 + i * 10}`} dur="1.8s" repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  ),
  ScatterPlot: () => (
    <svg width="100" height="60">
      {[15, 35, 55, 75].map((x, i) => (
        <circle key={i} cx={x} cy={30 + i * 3} r="4" fill="#38bdf8">
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
};

export default function VisualGuide() {
  const [activeCategory, setActiveCategory] = useState(null);
  const selected = categories.find(cat => cat.title === activeCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen text-neutral-900 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
          Prismik Visual Guide
        </h1>
        <p className="text-neutral-700 mt-4 text-lg max-w-2xl mx-auto">
          There are many ways to show data – so how do you pick the right one?
        </p>
        <p className="text-neutral-500 mt-2 max-w-2xl mx-auto">
          This is a simple starting point for creating clear and meaningful visuals.
        </p>
      </div>

      {!activeCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <motion.div
              key={cat.title}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 250 }}
              onClick={() => setActiveCategory(cat.title)}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 space-y-4">
                <div className="w-full flex justify-center">
                  {animatedExamples[cat.chartPreview]?.()}
                </div>
                <h2 className="text-xl font-semibold text-neutral-900">{cat.title}</h2>
                <p className="text-sm text-neutral-600">{cat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <button
            className="mb-8 text-sm underline text-neutral-500 hover:text-neutral-800"
            onClick={() => setActiveCategory(null)}
          >
            ← Back to all categories
          </button>
          <h2 className="text-3xl font-semibold mb-4">{selected.title}</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-10 text-base">{selected.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {selected.chartTypes.map(({ name, label, explanation }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 250 }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 space-y-4">
                  <div className="w-full flex justify-center">
                    {animatedExamples[name]?.() ?? <div style={{ width: 100, height: 60, background: '#f1f5f9' }} />}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{label}</h3>
                  <p className="text-sm text-neutral-600">{explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
