<script setup></script>

<template>
  <div class="my-8">
    <p class="text-center text-3xl font-semibold">
      Knowledge base doesn't have to be boring
    </p>
    <p class="text-center text-md my-2">
      Everything you need to Manage your Messaging
    </p>
    <div class="my-8 flex justify-center">
      <input
        class="w-2/4 py-2 px-3 border"
        id="username"
        type="text"
        placeholder="Search for answers"
      /><ficon
        class="bg-[#03a84e] py-2 px-2 text-white ml-1 text-2xl"
        icon="search"
      />
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
