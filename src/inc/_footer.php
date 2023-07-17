   </main>
   
   <footer>
      <div class="footer">
         <div class="container">
            <div class="footer-inner">
               <div class="footer-top">
                  <div class="footer-l">
                     <div class="footer-l-top">
                        <div class="footer-l-top-text" id="tokenPrice">
                           <img src="img/header-submenu-r-bottom.png" alt="">
                           <span class="green">1 CANVA<?=$contentData["TokenName"];?> =</span>
                           <span>$ ---</span>
                        </div>
						<a href="<?=$contentData["links"]["buy_token"];?>" target="_blank">
							<div class="footer-l-top-btn btn green">
							   <span>BUY CANVA<?=$contentData["TokenName"];?></span>
							</div>
						</a>
                     </div>
                     <div class="footer-l-bottom">
                        <div class="footer-l-bottom-items">
                           <div class="footer-l-bottom-item">
                              <span>Max supply:</span>
                              <span>1 000 000 000</span>
                           </div>
                           <div class="footer-l-bottom-item" id="totalSuplay">
                              <span>Total supply:</span>
                              <span>0</span>
                           </div>
                           <div class="footer-l-bottom-item" id="marketCup">
                              <span>Market Cap:</span>
                              <span>-</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="footer-r">
                     <div class="footer-menu">
                        <div class="footer-menu-col">
                           <div class="footer-menu-title">About
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                 fill="none">
                                 <g clip-path="url(#clip0_0_163)">
                                    <path
                                       d="M6.50014 7.11049L10.5458 3.14775C10.7261 2.97107 11.0146 2.97287 11.1949 3.15136L11.9034 3.85989C12.0837 4.04198 12.0837 4.33405 11.9016 4.51434L6.82647 9.557C6.73633 9.64715 6.61914 9.69222 6.50015 9.69222C6.38116 9.69222 6.26397 9.64715 6.17383 9.557L1.09871 4.51434C0.916618 4.33405 0.916618 4.04198 1.0969 3.85989L1.80544 3.15136C1.98573 2.97287 2.27419 2.97107 2.45448 3.14775L6.50014 7.11049Z"
                                       fill="white"></path>
                                 </g>
                                 <defs>
                                    <clipPath id="clip0_0_163">
                                       <rect width="12" height="12" fill="white" transform="translate(0.5)"></rect>
                                    </clipPath>
                                 </defs>
                              </svg>
                           </div>
                           <div class="footer-menu-links">
                              <a href="/token" class="footer-menu-link">About <?=$contentData["TokenName"];?> Token</a>
							  <a href="/wallet" class="footer-menu-link">Mobile app</a>
							  <a href="https://docs.canvaisland.com/" class="footer-menu-link">White paper</a>
                           </div>
                        </div>
                        <div class="footer-menu-col">
                           <div class="footer-menu-title">Game
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                 fill="none">
                                 <g clip-path="url(#clip0_0_163)">
                                    <path
                                       d="M6.50014 7.11049L10.5458 3.14775C10.7261 2.97107 11.0146 2.97287 11.1949 3.15136L11.9034 3.85989C12.0837 4.04198 12.0837 4.33405 11.9016 4.51434L6.82647 9.557C6.73633 9.64715 6.61914 9.69222 6.50015 9.69222C6.38116 9.69222 6.26397 9.64715 6.17383 9.557L1.09871 4.51434C0.916618 4.33405 0.916618 4.04198 1.0969 3.85989L1.80544 3.15136C1.98573 2.97287 2.27419 2.97107 2.45448 3.14775L6.50014 7.11049Z"
                                       fill="white"></path>
                                 </g>
                                 <defs>
                                    <clipPath id="clip0_0_163">
                                       <rect width="12" height="12" fill="white" transform="translate(0.5)"></rect>
                                    </clipPath>
                                 </defs>
                              </svg>
                           </div>
                           <div class="footer-menu-links">
                              <a href="/play" class="footer-menu-link">Play</a>
							  <a href="/island" class="footer-menu-link">Islands</a>
							  <a href="/avatars" class="footer-menu-link">Avatars</a>
                           </div>
                        </div>
                        <div class="footer-menu-col">
                           <div class="footer-menu-title">Follow us
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                 fill="none">
                                 <g clip-path="url(#clip0_0_163)">
                                    <path
                                       d="M6.50014 7.11049L10.5458 3.14775C10.7261 2.97107 11.0146 2.97287 11.1949 3.15136L11.9034 3.85989C12.0837 4.04198 12.0837 4.33405 11.9016 4.51434L6.82647 9.557C6.73633 9.64715 6.61914 9.69222 6.50015 9.69222C6.38116 9.69222 6.26397 9.64715 6.17383 9.557L1.09871 4.51434C0.916618 4.33405 0.916618 4.04198 1.0969 3.85989L1.80544 3.15136C1.98573 2.97287 2.27419 2.97107 2.45448 3.14775L6.50014 7.11049Z"
                                       fill="white"></path>
                                 </g>
                                 <defs>
                                    <clipPath id="clip0_0_163">
                                       <rect width="12" height="12" fill="white" transform="translate(0.5)"></rect>
                                    </clipPath>
                                 </defs>
                              </svg>
                           </div>
                           <div class="footer-menu-links">
                              <a href="<?=$contentData["links"]["telegram"];?>" class="footer-menu-link">Telegram Announcement</a>
                              <a href="<?=$contentData["links"]["telegram_chat"];?>" class="footer-menu-link">Telegram Community</a>
                              <a href="<?=$contentData["links"]["twitter"];?>" class="footer-menu-link">Twitter</a>
                              <a href="<?=$contentData["links"]["discord"];?>" class="footer-menu-link">Discord</a>
                              <a href="<?=$contentData["links"]["instagram"];?>" class="footer-menu-link">Instagram</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </footer>
   <script src="libs/jquery/jquery-3.6.0.min.js"></script>
   <script src="libs/jquery/jquery-ui.min.js"></script>
   <script src="libs/jquery/jquery.maskedinput.min.js"></script>
   <script src="libs/ion/ion.rangeSlider.min.js"></script>
   <script src="libs/fancybox/fancybox.umd.js"></script>
   <script src="libs/swiper/swiper-bundle.min.js"></script>
   <script src="js/main.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
   <script src="js/footerSuplay.js"></script>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(94250895, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/94250895" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
</body>

</html>