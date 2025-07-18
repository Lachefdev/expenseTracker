<template>
  <header>
    <router-link to="/limits">
      <img
        id="goalImg"
        src="../public/icons/goal.svg"
      />
    </router-link>

    <router-link to="/overview">
      <img
        id="overviewImg"
        src="../public/icons/chart.svg"
      />
    </router-link>

    <router-link to="/settings">
      <img
        id="settingsImg"
        src="../public/icons/settings.svg"
      />
    </router-link>
  </header>

  <router-view></router-view>
</template>

<script setup></script>
