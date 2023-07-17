<?php
	$_OPTIMIZATION["title"] = $contentData["SiteTitle"].$contentData["PlayTitle"];
	$_OPTIMIZATION["description"] = $contentData["PlayDescription"];
	$_OPTIMIZATION["keywords"] = $contentData["PlayKeywords"];
?>
      <div class="main">
         <section>
            <div class="play" style="background-image: url(img/play-bg.png);">
               <div class="container">
                  <div class="play-inner">
                     <div class="play-title title">
                        <p>CANVA<span class="green">ISLAND</span></p>
                        <p>CANVAISLAND</p>
                     </div>
                     <div class="play-text">Connect your wallet or enter as Guest</div>
                     <div class="play-items">
                        <div class="play-item">
                           <div class="play-item-title">Play using your wallet</div>
                           <div class="play-item-img">
                              <img src="img/play-item-1.png" alt="">
                           </div>
                           <div class="play-item-text">Connect your account to fully enjoy
                              CanvaIsland!</div>
                           <div class="play-item-btn btn green">
                              <span>Connect</span>
                           </div>
                        </div>
                        <div class="play-item">
                           <div class="play-item-title">Play as guest</div>
                           <div class="play-item-img">
                              <img src="img/play-item-2.png" alt="">
                           </div>
                           <div class="play-item-text">Your information will be locally stored
                              and your experience limited.</div>
							<a href="<?=$contentData["links"]["quest_play"];?>">
							<div class="play-item-btn btn green">
                              <span>Continue</span>
                           </div>
						   </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
		 
		<?php include("inc/socials.php"); ?>

      </div>
