<template>
  <div class="sbuttons">
    <a href="tel:+917676642258" class="sbutton call" tooltip="Call">
      <Icon name="fa6-solid:phone" />
    </a>

    <a href="mailto:info@aaaedu.in" class="sbutton mail" tooltip="Email">
      <Icon name="fa6-solid:envelope" />
    </a>

    <a href="https://api.whatsapp.com/send?phone=7676642258" target="_blank" class="sbutton whatsapp" tooltip="WhatsApp">
      <Icon name="fa6-brands:whatsapp" />
    </a>

    <a href="https://www.facebook.com/www.aaaedu.in/" target="_blank" class="sbutton fb" tooltip="Facebook">
      <Icon name="fa6-brands:facebook-f" />
    </a>

    <a href="https://twitter.com/academy_arjunaa" target="_blank" class="sbutton twitt" tooltip="Twitter">
      <Icon name="fa6-brands:twitter" />
    </a>

    <a href="https://www.instagram.com/arjunaa_academy_for_achievers/" target="_blank" class="sbutton insta" tooltip="Instagram">
      <Icon name="fa6-brands:instagram" />
    </a>

    <a href="https://in.linkedin.com/company/arjunaa-academy-for-achievers" target="_blank" class="sbutton linkedin" tooltip="Linkedin">
      <Icon name="fa6-brands:linkedin" />
    </a>

    <a href="https://www.youtube.com/channel/UCcPOkcZ_YGpTMcVnLJQYLPA" target="_blank" class="sbutton youtube" tooltip="Youtube">
      <Icon name="fa6-brands:youtube" />
    </a>

    <a target="_blank" class="sbutton mainsbutton" tooltip="Connect With Us">
      <Icon name="fa6-solid:headset" />
    </a>
  </div>
</template>

<style scoped>
.sbuttons {
  bottom: 1%;
  position: fixed;
  margin: 1em;
  left: 0;
  z-index:999;
}
.sbutton {
  display: flex;
  flex-wrap:wrap;
  align-items: center;
  justify-content:center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  text-align: center;
  color: white;
  margin: 20px auto 0;
  box-shadow: 0px 5px 11px -2px rgba(0, 0, 0, 0.18), 0px 4px 12px -7px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  -webkit-transition: all .1s ease-out;
  transition: all .1s ease-out;
  position: relative;
}
.sbutton > svg {
  font-size: 25px;
  transition: all .2s ease-in-out;
  transition-delay: 2s;
}
.sbutton:active,
.sbutton:focus,
.sbutton:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
}
.sbutton:not(:last-child) {
  width: 45px;
  height: 45px;
  margin: 20px auto 0;
  opacity: 0;
}
.sbutton:not(:last-child) > i {
  font-size: 25px;
  line-height: 60px;
  transition: all .3s ease-in-out;
}
.sbuttons:hover .sbutton:not(:last-child) {
  opacity: 1;
  width: 45px;
  height: 45px;
  margin: 15px auto 0;
}
.sbutton:nth-last-child(1) {
  -webkit-transition-delay: 25ms;
  transition-delay: 25ms;
}
.sbutton:not(:last-child):nth-last-child(2) {
  -webkit-transition-delay: 20ms;
  transition-delay: 20ms;
}
.sbutton:not(:last-child):nth-last-child(3) {
  -webkit-transition-delay: 40ms;
  transition-delay: 40ms;
}
.sbutton:not(:last-child):nth-last-child(4) {
  -webkit-transition-delay: 60ms;
  transition-delay: 60ms;
}
.sbutton:not(:last-child):nth-last-child(5) {
  -webkit-transition-delay: 80ms;
  transition-delay: 80ms;
}
.sbutton:not(:last-child):nth-last-child(6) {
  -webkit-transition-delay: 100ms;
  transition-delay: 100ms;
}
.sbutton:not(:last-child):nth-last-child(7) {
  -webkit-transition-delay: 120ms;
  transition-delay: 120ms;
}
.sbutton:not(:last-child):nth-last-child(8) {
  -webkit-transition-delay: 140ms;
  transition-delay: 140ms;
}

[tooltip]:before {
  font-family: 'Roboto';
  font-weight: 600;
  border-radius: 2px;
  background-color: #585858;
  color: #fff;
  content: attr(tooltip);
  font-size: 12px;
  visibility: hidden;
  opacity: 0;
  padding: 5px 7px;
  margin-left: 10px;
  position: absolute;
  left: 100%;
  bottom: 20%;
  white-space: nowrap;
}

[tooltip]:hover:before,
[tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}
.sbutton.mainsbutton {
  background: #eacf6c;
}
.sbutton.youtube {
  background: #F44336;
}
.sbutton.linkedin {
  background: #0072b1;
}
.sbutton.insta {
  background: #C13584;
}
.sbutton.twitt {
  background: #03A9F4;
}
.sbutton.fb {
  background: #3F51B5;
}
.sbutton.whatsapp {
  background: #00e676;
}
.sbutton.call {
  background: #e6b100;
}
.sbutton.mail {
  background: #e66b00;
}
</style>
