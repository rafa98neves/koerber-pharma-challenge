<template>
  <div class="about">
    <h1 class="about__title blue">Don't forget that this is what we are looking for 😉</h1>

    <ul class="about__list">
      <li>Nice user experience - <strong>polish and an eye for design: focus on making it look good.</strong></li>
      <li>Clean project setup and well documented</li>
      <li>Elegant/fast way to upload data</li>
      <li>Ability to dive into a new topic, extract the important points and then code it up.</li>
      <li>Make it snappy</li>
      <li>Fulfill the exercise expectations</li>
      <li>Write clear and well-structured code. You won’t work alone. It should be easy to understand and modify your code.</li>
      <li>Send working instructions. Do you imagine you buy a product that you need to install by yourself and when you follow the instructions provided, it does not work? It would be frustrating.</li>
      <li>Write clear and well-structured code. You won’t work alone. It should be easy to understand and modify your code.</li>
      <li><strong>We expect a README file in the repository.</strong> This README must explain very clearly the instructions for us to start the application without any type of debugging or complication. The instructions must work out of the box. <strong>This is one of the most important part of the problem.</strong> You need to think always about who is going to use it and try to reduce frustration.</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}

.about__title{
  margin-bottom: 30px;
}

.about__list{
  font-size: 16px;
}

strong {
  font-weight: bold;
  color: rgb(185, 185, 185);
}
</style>
