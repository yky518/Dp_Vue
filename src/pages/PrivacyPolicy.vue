<template>
  <div id="privacy_policy">
    <div class="header">
      <Header></Header>
    </div>
    <div id="body">
      <div class="container">
        <h1 class="text-left">Privacy Policy</h1>
        <p>
          The DPLibrary operates
          <a href="" target="_blank">http://dplibrary.deepmd.net/#/home</a>
          as a public service. This Privacy Policy explains
          our policies regarding the collection, use and disclosure of your personal Information we collect when you visit the DPLibrary.
        </p>
        <p>
          We use your Personal Information only for providing and improving the DPLibrary. By visiting the DPLibrary, you agree to the collection and use of information according to this policy.
        </p>

        <h2 class="text-left">Information Collection And Use</h2>
        <p>
          While using the DPLibrary, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally
          identifiable information includes your email address. This allows you to review previous projects and share your original work.
        </p>

        <h2>Log Data</h2>
        <p>
          We collect your log data for internal purpose only to help us count the number of visitors and improve the performance of DPLibrary – organization, system performance and fixing bugs.
          This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.
        </p>

        <h2>
          Communications
        </h2>
        <p>
          The DPLibrary will not sell your information or data to any third parties. We may use your Personal Information to contact you with the updated version of the projects, or the discussion of your original
          contribution to the DPLibrary.
        </p>

        <h2>
          Cookies
        </h2>
        <p>
          Like many other sites, we use cookies in the DPLibrary to improve the efficiency and quality. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Note that if you do not accept cookies, you may not be able to log into the DPLibrary.
        </p>

        <h2>Security</h2>
        <p>
          The DPLibrary is operated by the DeePMD group, and is sponsored by BIBDR (Beijing Institute Of Big Data Research). The security of your Personal Information is important to us. We strive to use commercially acceptable means to protect your Personal Information.
        </p>

        <h2>
          Changes To This Privacy Policy
        </h2>

        <p>
          We reserve the right to update our Privacy Policy occasionally. If we make any changes to this Privacy Policy, we will notify you either through the email address when you registered, or by placing a notice on the homepage.
        </p>

        <h2>
          Contact Us
        </h2>

        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>



<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
    export default {
        name: "PrivacyPolicy",
      components:{
        Header,
        Footer
      }
    }
</script>

<style scoped>
  #body{
    min-height: 900px;
  }
  .header{
    height: 100px;
    background: url("../assets/images/详情页头图.png");
    background-size:100% 100%;
  }
  .container{
    width: 1400px;
    margin: auto;
  }
  p{
    font-size: 24px;
    text-align: justify;
  }

  h2{
    font-size: 30px;
  }
</style>
