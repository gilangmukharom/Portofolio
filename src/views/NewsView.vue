<template>
  <div class="container mx-auto p-3 md:p-8">
    <div class="flex flex-col-reverse md:flex-row relative">
      <div class="w-full md:w-2/3">
        <div class="flex flex-col gap-4 md:px-20 fade-zoom-up">
          <article v-for="article in articles" :key="article.id">
            <a :href="article.url" target="_blank" rel="noreferrer" class="flex w-full bg-[#1e1e1f] border-[#383838] rounded-xl
                     text-left text-white p-5 md:py-7 md:px-8 cursor-pointer
                     hover:bg-[#282828] items-center">
              <div class="w-full pr-4">
                <div class="text-xs mb-1 text-slate-400 flex items-center italic">
                  <div class="h-[1px] w-20 bg-amber-200 md:w-5 aos-init aos-animate mr-2"></div>
                  {{ article.date }}
                </div>
                <h1 class="text-sm md:text-md text-amber-200 font-bold mb-2 paraf">
                  {{ article.title }}
                </h1>
                <div class="text-sm hidden md:block paraf">
                  {{ article.desc }}
                </div>
              </div>
              <div>
                <div class="w-20 h-20 md:w-28 flex items-center md:h-28">
                  <img :src="article.image" class="rounded-lg md:rounded-xl object-cover w-full h-full" alt="" />
                </div>
              </div>
            </a>
          </article>

          <div v-if="articles.length === 0" class="text-center text-sm text-slate-400 py-10">
            No articles found for “{{ activeTopic.label }}”. Try another topic.
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/3 h-fit p-8 md:sticky md:top-24">
        <div class="flex flex-col text-left">
          <div class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">
            Discover fresh updates, tutorials, and trends from the tech world.
          </div>
          <div class="h-[1px] mt-7 mb-7 w-20 bg-amber-200 aos-init aos-animate mr-2"></div>

          <div class="hidden md:block">
            <div class="text-white text-md font-semibold mb-2">Topics</div>
            <div class="mt-3 flex flex-wrap gap-2">
              <button v-for="topic in topics" :key="topic.value" type="button" @click="changeTopic(topic)" class="py-2 px-3 rounded-2xl text-xs cursor-pointer border
                       transition-colors" :class="topic.value === activeTopic.value
                        ? 'bg-amber-300 text-black border-amber-300'
                        : 'bg-[#1e1e1f] text-white border-[#383838] hover:bg-white/20'">
                {{ topic.label }}
              </button>
            </div>

            <div class="mt-4 text-xs text-slate-400">
              Showing articles for: <span class="text-amber-200">{{ activeTopic.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ArticleList />
</template>

<script>
import ArticleList from '@/components/ArticleList.vue';
import axios from 'axios';

export default {
  components: { ArticleList },
  data() {
    return {
      articles: [],
      topics: [
        { label: 'Technology', value: 'technology' },
        { label: 'Programming', value: 'programming' },
        { label: 'AI & Machine Learning', value: 'ai OR machine learning' },
        { label: 'TypeScript', value: 'javascript OR typescript' }
      ],
      activeTopic: { label: 'Technology', value: 'technology' },
      loading: false
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      try {
        this.loading = true;
        const apiKey = "49bfc2718cf8458e9c0b402e8e8ee51b";
        const res = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: this.activeTopic.value || 'technology',
            language: 'id',
            sortBy: 'publishedAt',
            pageSize: 10,
            apiKey
          }
        });

        this.articles = res.data.articles.map((item, index) => ({
          id: index,
          slug: encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-')),
          title: item.title,
          desc: item.description || '',
          date: new Date(item.publishedAt).toLocaleDateString(),
          image: item.urlToImage || '/img/default-blog.png',
          url: item.url
        }));
      } catch (e) {
        console.error(e);
        this.articles = [];
      } finally {
        this.loading = false;
      }
    },
    changeTopic(topic) {
      if (topic.value === this.activeTopic.value) return;
      this.activeTopic = topic;
      this.getArticles();
    }
  }
};
</script>

<style scoped>
.paraf {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media (min-width: 768px) {
  .paraf {
    display: -webkit-box;
  }
}

@keyframes fadeZoomUp {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-zoom-up {
  animation: fadeZoomUp 1s ease-in-out;
}
</style>
