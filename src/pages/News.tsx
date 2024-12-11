import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import NewsCard from '../components/news/NewsCard';
import { FloatingElements, GradientBlob, GridPattern } from '../components/shared/BackgroundElements';
import Input from '../components/shared/Input';

const newsItems = [
  {
    id: 1,
    title: "Revolutionary AI-Powered Diagnostics in Healthcare",
    excerpt: "How artificial intelligence is transforming medical diagnosis and improving accuracy rates.",
    category: "Technology",
    date: "March 15, 2024",
    author: "Dr. Anup Patil",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=2069",
    likes: 1245,
    comments: 89,
    readTime: "6 min",
    tags: ["AI", "Healthcare", "Innovation"]
  },
  {
    id: 2,
    title: "The Rise of Telemedicine in India",
    excerpt: "Exploring how digital healthcare is reaching remote areas and transforming patient care.",
    category: "Digital Health",
    date: "March 14, 2024",
    author: "Dhruv Mehta",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
    likes: 892,
    comments: 56,
    readTime: "5 min",
    tags: ["Telemedicine", "Rural Health", "Technology"]
  },
  {
    id: 3,
    title: "Mindfulness and Mental Health: A Scientific Approach",
    excerpt: "Understanding the science behind mindfulness and its impact on mental wellbeing.",
    category: "Mental Health",
    date: "March 13, 2024",
    author: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
    likes: 756,
    comments: 45,
    readTime: "8 min",
    tags: ["Mental Health", "Mindfulness", "Wellness"]
  },
  {
    id: 4,
    title: "Revolutionizing Healthcare UX Design",
    excerpt: "How user experience design is making healthcare more accessible and user-friendly.",
    category: "Design",
    date: "March 12, 2024",
    author: "Akshada Kale",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    likes: 543,
    comments: 34,
    readTime: "4 min",
    tags: ["UX Design", "Healthcare", "Accessibility"]
  },
  {
    id: 5,
    title: "Traditional Medicine Meets Modern Technology",
    excerpt: "Bridging the gap between ancient wisdom and contemporary healthcare solutions.",
    category: "Innovation",
    date: "March 11, 2024",
    author: "Dr. Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1581093458791-4b041a98425f?auto=format&fit=crop&q=80&w=2070",
    likes: 678,
    comments: 42,
    readTime: "7 min",
    tags: ["Traditional Medicine", "Technology", "Integration"]
  },
  {
    id: 6,
    title: "The Future of Personalized Medicine",
    excerpt: "How genetic testing and AI are enabling truly personalized healthcare solutions.",
    category: "Research",
    date: "March 10, 2024",
    author: "Dr. Priya Sharma",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2070",
    likes: 892,
    comments: 67,
    readTime: "9 min",
    tags: ["Personalized Medicine", "Genetics", "Future Health"]
  }
];

const News = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", "Technology", "Mental Health", "Innovation", "Research", "Design", "Digital Health"];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative overflow-hidden"
    >
      <FloatingElements />
      <GradientBlob />
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Latest Health Insights"
          subtitle="Stay informed with cutting-edge healthcare developments"
          gradient="from-blue-500 to-cyan-500"
        />

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label=""
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
              className="bg-white/50"
            />
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/50 text-gray-600 hover:bg-blue-50'
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default News;