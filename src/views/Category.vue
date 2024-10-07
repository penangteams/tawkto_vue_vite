<script setup>
import { useRoute } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import {fetchCatDatas, fetchArtDatas,fetchCatDetail} from "@/services"

const route = useRoute();
const catId = route.params.catid;

const dates_diff = ref(0);
const ICON = ref("circle");
const ICON_sn = ref("sticky-note");
const ICON_cv = ref("chevron-right");

const cat = ref({});
const artData = ref([]);
const catData = ref([])

onMounted(async () => {
const catDataResponse = await fetchCatDatas()
//filter unwanted data
const result1 = catDataResponse.filter(item => !item.title.includes("script") && !item.id.includes(catId) );
catData.value = result1;

const artDataResponse = await fetchArtDatas();
//filter unwanted data
const result2 = artDataResponse.filter((item) =>
  item.status.includes("published"),
);
artData.value = result2;

cat.value = await fetchCatDetail(catId)
dates_diff.value = find_diff_days(cat.value.updatedOn);
ICON.value = cat.value.icon;

});
 
function find_diff_days(iso_d) {
  let date1 = parseISOString(iso_d); //date in json data
  let date2 = new Date();
  let Difference_In_Time = date2.getTime() - date1.getTime();
  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

//used in fn find_diff_days()
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
</script>

<template>
  <div class="flex ml-10">
    <router-link :to="{ name: 'home' }" class="text-[#03a84e] ml-2 mr-3 text-md"
      >All categories</router-link>

 <ficon class="text-black ml-1 mt-2 text-sm self-auto" :icon="ICON_cv" />
    <p class="text-sm mt-1 ml-3">{{ cat.title }}</p>
  </div>
  <div class="grid grid-cols-3 gap-2 my-7 ml-10">
    <div class="rounded overflow-hidden shadow-lg w-full max-h-80">
      <div class="px-6 py-2 flex-col items-center">
        <span class="flex items-center justify-center">
          <ficon class="text-[#03a84e] ml-1 text-7xl self-auto" :icon="ICON" />
        </span>

        <div class="font-bold text-xl text-center py-1 mt-4 mb-2">
          {{ cat.title }}
        </div>
        <p class="text-gray-700 text-sm text-center">
          last update {{ dates_diff }} days ago
        </p>
      </div>
      <hr />
      <p class="text-gray-700 text-sm text-center mb-4 ml-20 w-60 mt-10">
        {{ cat.description }}
      </p>
    </div>

    <div class="col-span-2">
      <span
        v-for="(art, index) in artData"
        :key="index"
        class="grid grid-cols-10 gap-2 mb-2 rounded overflow-hidden shadow-md py-3 w-3/4">
        <span class="flex items-center justify-center col-span-1">
          <ficon
            class="text-[#03a84e] ml-1 text-3xl self-auto"
            :icon="ICON_sn" />
        </span>
        <div class="flex-col items-center justify-start col-span-7">
          <div class="text-2xl font-[400]">{{ art?.title }}</div>
          <div class="text-sm">
            Updated {{ " " }}{{ parseISOString(art?.updatedOn).toDateString() }}
          </div>
        </div>
        <span class="flex items-center justify-center col-span-2">
          <ficon
            class="text-[#03a84e] ml-1 text-xl self-auto"
            :icon="ICON_cv"/>
        </span>
      </span>
    </div>
  </div>

  <p class="text-center text-xl">Other categories</p>
  <div class="h-10">
  <Splide :options="{ perPage: 4 }" aria-label="Categories">
  <span v-for="(cat, index) in catData" :key="index">
    <SplideSlide class="min-h-40">
      <router-link :to="{ path: '/cat/'+ `${cat.id}`}">
        <div class="rounded overflow-hidden shadow-lg">
          <div class="px-6 py-2 flex-col items-center">
            <span class="flex items-center justify-center">
              <ficon
                class="text-[#03a84e] ml-1 text-4xl self-auto"
                :icon="cat.icon"
              />
            </span>

            <div class="font-bold text-sm text-center py-1 mt-4 mb-2">
              {{cat.title}}
            </div>
            <p class="text-gray-700 text-sm text-center py-1">
              {{cat.totalArticle}}{{" "}}articles
            </p>
            <p class="text-gray-700 text-sm text-center mb-4">
              last update {{find_diff_days(cat.updatedOn)}} days ago
            </p>
          </div>
        </div>
      </router-link>
    </SplideSlide>
       </span>
  </Splide>
  </div>
</template>

<style scoped></style>
