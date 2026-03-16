<script>
export default {
  data() {
    return {
      activeTab: 1,
      items: [
        {
          id: 1,
          name: 'Nova Trading Analytics',
          imageUrl: 'nova',
          status:
            'Web application for stock analysis that helps users track price movements, visualize charts, and evaluate trading opportunities in a simple and intuitive way.',
          tech: 'ReactJS, ExpressJS, PostgreeSQL (Freelance Project)',
          github: 'https://github.com/gilangmukharom/novo',
          demo: 'https://app.nova-trading-analytics.my.id/'
        },
        {
          id: 2,
          name: 'Portofolio Website',
          imageUrl: 'porto',
          status: 'portfolio website to show my skill track record and my resume has a responsive layout and interactive display.',
          tech: 'Vue, Tailwind, (Portofolio Project)',
          github: 'https://github.com/gilangmukharom/portofolio',
          demo: 'gilangmukharom.vercel.app'
        },
        {
          id: 3,
          name: 'Rental Go',
          imageUrl: 'rentalgo',
          status:
            'Web app for renting various items with a simple, responsive interface that connects owners and renters.',
          tech: 'React JS, Tailwind (Mini Project)',
          github: 'https://github.com/gilangmukharom/frontend-rjs',
          demo: 'null'
        },
        {
          id: 4,
          name: 'Lingtar',
          imageUrl: 'lingtar',
          status: 'Website App that has a responsive display to make it easier for parents control his children in school from anywhere.',
          tech: 'React, TypeScript, ExpressJS, PostgreeSQL (Mini Project)',
          github: 'https://github.com/gilangmukharom/lingtar',
          demo: 'null'
        },
        {
          id: 5,
          name: 'Yayasan Nur Asyiffa',
          imageUrl: 'nursyifa',
          status: 'Doctor foundation profile website which has CRUD on admin side for add or edit content and has a responsive layout.',
          tech: 'CodeIgniter 4, Bootstrap, MySQL (Freelance Project)',
          github: 'https://github.com/gilangmukharom/Yayasan_Nursyifa',
          demo: 'https://yayasannurassyifasamarinda.com/'
        },
        {
          id: 6,
          name: 'Sipaldeba',
          imageUrl: 'desa',
          status: 'Website App to make it easier for public village to carry out administrative matters from anywhere.',
          tech: 'Laravel 11, Bootstrap, MySQL (Freelance Project)',
          github: 'https://github.com/gilangmukharom/Desa_CI4',
          demo: 'null'
        },
      ]
    };
  }
}
</script>

<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-amber-50 mx-3">
    <article data-page="about">
      <header>
        <div
          class="text-2xl font-bold text-white mb-10 fadein-bot title-section flex items-center justify-center flex-col">
          <!-- <div class="h-[1px] w-10 bg-amber-200 md:w-20 aos-init aos-animate"></div> -->
          <h4>Past Project Experience</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300">
            Explore the projects I've worked on so far</h4>
        </div>
      </header>
      <section>
        <div
          class="grid grid-cols-1 gap-4 pb-32 md:grid-cols-3 md:gap-3 xl:grid-cols-3 xl:gap-3 2xl:gap-5 fade-zoom-in items-stretch">
          <div v-for="item in items" :key="item.id" class="h-full">
            <div
              class="item-card flex h-full flex-col items-center gap-2 rounded bg-[#1e1e1f] hover:bg-[#282828] border border-[#383838] rounded-xl text-amber-50 md:gap-3 px-5 py-5 lg:px-5">
              <div class="flex items-center justify-center w-full">
                <img :alt="item.name" loading="lazy" decoding="async" data-nimg="1"
                  class="drop-shadow-xl rounded-xl w-full h-auto" :src="'/img/' + item.imageUrl + '.gif'" />
              </div>

              <div class="w-full flex flex-col gap-2 items-center text-sm md:text-base lg:text-lg flex-1">
                <div class="title-text font-medium text-secondary text-center">
                  {{ item.name }}
                </div>

                <div class="w-full text-left text-[10px] text-[#c1c1c1] md:text-xs lg:text-sm flex-1">
                  {{ item.status }}
                </div>

                <div class="w-full mt-4 text-normal text-sm text-left text-amber-200">
                  {{ item.tech }}
                </div>

                <div class="w-full flex justify-end mt-auto">
                  <div class="flex cursor-pointer items-end gap-2 text-primary">
                    <a v-if="item.github !== 'null'" :href="item.github" target="_blank" rel="noreferrer"
                      title="View GitHub repository" class="transition-all hover:text-accent">
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                        stroke-linejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                        </path>
                      </svg>
                    </a>
                    <a v-if="item.demo !== 'null'" :href="item.demo" target="_blank" rel="noreferrer"
                      title="View finished project" class="transition-all hover:text-accent">
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                        stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
}

svg:hover {
  stroke: #ffdb70;
}

@keyframes fadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Menggunakan animasi pada elemen yang diinginkan */
.fade-zoom-in {
  animation: fadeZoomIn 1s ease-in-out;
}
</style>