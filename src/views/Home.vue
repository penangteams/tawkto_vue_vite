<script setup>
import { ref, onMounted} from 'vue'
import {fetchCatDatas} from "@/services"

const catData = ref([])

onMounted(async () => {
const catDataResponse = await fetchCatDatas()
//filter unwanted data
const result1 = catDataResponse.filter(item => !item.title.includes("script"));
//now sort by order
const result2 = result1.sort(Sort);
catData.value = result2

});

function find_diff_days(iso_d){
let date1 = parseISOString(iso_d); //date in json data
let date2 = new Date()
let Difference_In_Time =
    date2.getTime() - date1.getTime();
// Calculating the no. of days between
// two dates
let Difference_In_Days =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));
return Difference_In_Days;
}

//used in fn find_diff_days()
function parseISOString(s) {

  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
function Sort(item1, item2){
  if (item1.order > item2.order)
    return 1;
  else if (item1.order < item2.order)
    return -1;
  else
    return 0;
}
</script>
<template>
  <div class="grid grid-cols-3 gap-2 my-7 mx-20">
    <span v-for="(cat, index) in catData" :key="index">
      <router-link :to="{ path: '/cat/'+ `${cat.id}`}">
        <div class="rounded overflow-hidden shadow-lg min-h-40">
          <div class="px-6 py-2 flex-col items-center">
            <span class="flex items-center justify-center">
              <ficon
                class="text-[#03a84e] ml-1 text-7xl self-auto"
                :icon="cat.icon"
              />
            </span>

            <div class="font-bold text-xl text-center py-1 mt-4 mb-2">
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
    </span>
  </div>
</template>

<style scoped></style>
