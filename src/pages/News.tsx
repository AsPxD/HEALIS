import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import NewsCard from '../components/news/NewsCard';
import { FloatingElements, GradientBlob, GridPattern } from '../components/shared/BackgroundElements';
import Input from '../components/shared/Input';
import jsonData from '../data/news.json';

const News = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Flatten all articles from different categories
  const allArticles = Object.entries(jsonData.articles).flatMap(([category, articles]) => 
    articles.map(article => ({ ...article, category }))
  );

  const categories = ["All", ...jsonData.categories];

  const filteredNews = React.useMemo(() => {
    return allArticles.filter((article: any) => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allArticles]);

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

        {/* Search Section */}
        <div className="mb-12">
          <Input
            label=""
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="bg-white/50"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
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

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article, index) => (
            <NewsCard 
              key={index} 
              article={{
                id: index,
                title: article.title,
                excerpt: article.description,
                category: article.category, // Use the category from the mapping
                date: article.publishedDate,
                author: article.source,
                image: article.imageUrl || '', 
                likes: 0,
                comments: 0,
                readTime: "3 min",
                tags: [],
                url: article.url
              }} 
            />
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