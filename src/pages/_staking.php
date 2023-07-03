<?php
	$_OPTIMIZATION["title"] = $contentData["SiteTitle"].$contentData["StakingTitle"];
	$_OPTIMIZATION["description"] = $contentData["StakingDescription"];
	$_OPTIMIZATION["keywords"] = $contentData["StakingKeywords"];
?>
  <div class="main">
         <section>
            <div class="swap-banner" style="background-image: url(img/swap-banner-bg.png);">
               <div class="container">
                  <div class="swap-banner-inner">
                     <div class="swap-banner-title title">
                        <p>Staking</p>
                        <p>Staking</p>
                     </div>
                     <div class="swap-banner-text">Stake $CNV to earn more $CNV</div>
                  </div>
               </div>
            </div>
         </section>
         <section>
            <div class="staking">
               <div class="container" >
                  <div class="staking-inner" >
                     <div class="staking-items" >
                        <div class="staking-item" >
                           <div class="staking-item-top">
                              <div class="staking-item-top-l">
                                 <div class="staking-item-top-icon-1">
                                    <img src="img/header-submenu-r-bottom.png" alt="">
                                 </div>
                                 <div class="staking-item-top-icon-2">
                                    <img src="img/header-submenu-r-bottom.png" alt="">
                                 </div>
                              </div>
                              <div class="staking-item-top-r">CNV/CNV</div>
                           </div>
                           <div class="staking-item-info">
                              <div class="staking-item-info-row">
                                 <p>APR 
                                    <span class="info">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                       viewBox="0 0 18 18" fill="none">
                                          <path
                                             d="M9 2.25C5.27783 2.25 2.25 5.27783 2.25 9C2.25 12.7222 5.27783 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.27783 12.7222 2.25 9 2.25ZM9 3.375C12.1135 3.375 14.625 5.88647 14.625 9C14.625 12.1135 12.1135 14.625 9 14.625C5.88647 14.625 3.375 12.1135 3.375 9C3.375 5.88647 5.88647 3.375 9 3.375ZM9 5.625C7.76294 5.625 6.75 6.63794 6.75 7.875H7.875C7.875 7.24658 8.37158 6.75 9 6.75C9.62842 6.75 10.125 7.24658 10.125 7.875C10.125 8.30567 9.84814 8.68799 9.43945 8.82422L9.21094 8.89453C8.75171 9.04614 8.4375 9.4856 8.4375 9.9668V10.6875H9.5625V9.9668L9.79102 9.89648C10.6567 9.60864 11.25 8.78686 11.25 7.875C11.25 6.63794 10.2371 5.625 9 5.625ZM8.4375 11.25V12.375H9.5625V11.25H8.4375Z"
                                             fill="white" fill-opacity="0.43" />
                                       </svg>
                                       <span class="info-block up">Content text</span>
                                    </span>
                                 </p>
                                 <p>
                                    <span class="per">365%</span>
                                 </p>
                              </div>
                              <div class="staking-item-info-row">
                                 <p>Earn</p>
                                 <p>CNV</p>
                              </div>
                              <div class="staking-item-info-bottom" id="timeStake">
                                 <p>20% unstaking fee until</p>
                                 <p>40d: 00h: 00m: 00s</p>
                              </div>
                           </div>
                           <div class="staking-item-center">
                              <div class="staking-item-center-row">
                                 <div class="staking-item-center-row-l" id="harvestBalance">
                                    <p>Earned:</p>
                                    <p>0.000</p>
                                 </div>
                                 <div class="staking-item-center-row-r">
                                    <div class="staking-item-center-row-btn btn disabled" id="harvest">
                                       <span>Harvest</span>
                                    </div>
                                 </div>
                              </div>
                              <div class="staking-item-center-row">
                                 <div class="staking-item-center-row-l" id="balanceStaked">
                                    <p>CNV Staked:</p>
                                    <p>0.000</p>
                                 </div>
                                 <!-- <div class="staking-item-center-row-r">
                                    <a href="#" class="staking-item-center-row-link">Mint</a>
                                 </div> -->
                              </div>
                           </div>
                           <div class="staking-item-btns">
                              <div class="staking-item-btn btn colorless">
                                 <span>Unstake</span>
                              </div>
                              <div class="staking-item-btn btn green open-staking">
                                 <span>Stake</span>
                              </div>
                           </div>
                           <div class="staking-item-details">
                              <div class="staking-item-details-top">Details <svg xmlns="http://www.w3.org/2000/svg"
                                    width="11" height="11" viewBox="0 0 11 11" fill="none">
                                    <g clip-path="url(#clip0_43_8389)">
                                       <path
                                          d="M5.49996 6.42545L8.87135 3.12317C9.02159 2.97593 9.26198 2.97743 9.41222 3.12617L10.0027 3.71662C10.1529 3.86836 10.1529 4.11175 10.0012 4.26199L5.77189 8.46421C5.69678 8.53933 5.59912 8.57689 5.49996 8.57689C5.4008 8.57689 5.30314 8.53933 5.22803 8.46421L0.998761 4.26199C0.847019 4.11175 0.847019 3.86836 0.997257 3.71662L1.5877 3.12617C1.73795 2.97743 1.97833 2.97593 2.12857 3.12317L5.49996 6.42545Z"
                                          fill="white" />
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_43_8389">
                                          <rect width="10" height="10" fill="white" transform="translate(0.5 0.5)" />
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </div>
                              <div class="staking-item-details-bottom">
                                 <div class="staking-item-details-bottom-top">
                                    <p>Total Staked</p>
                                    <p>10,283.9043</p>
                                 </div>
                                 <div class="staking-item-details-bottom-center">
                                    <a href="https://sepolia.etherscan.io/address/0xa43fa2cff564f70376b422aa3d3b45f63fcdbca2">View contract <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                          height="18" viewBox="0 0 18 18" fill="none">
                                          <path
                                             d="M15.5887 1.7942C15.5663 1.7949 15.544 1.79686 15.5219 1.80006H12.0004C11.784 1.797 11.5827 1.91069 11.4737 2.09758C11.3646 2.28448 11.3646 2.51564 11.4737 2.70253C11.5827 2.88943 11.784 3.00311 12.0004 3.00005H14.1519L7.97617 9.17583C7.81943 9.32632 7.75628 9.54979 7.8111 9.76006C7.86591 9.97032 8.03012 10.1345 8.24038 10.1893C8.45064 10.2442 8.67411 10.181 8.82461 10.0243L15.0004 3.84849V6.00005C14.9973 6.21643 15.111 6.4177 15.2979 6.52678C15.4848 6.63587 15.716 6.63587 15.9029 6.52678C16.0898 6.4177 16.2034 6.21643 16.2004 6.00005V2.47622C16.2246 2.30138 16.1705 2.12475 16.0527 1.99335C15.9348 1.86195 15.7651 1.7891 15.5887 1.7942ZM3.60039 4.20006C2.94455 4.20006 2.40039 4.74422 2.40039 5.40006V14.4001C2.40039 15.0559 2.94455 15.6001 3.60039 15.6001H12.6004C13.2562 15.6001 13.8004 15.0559 13.8004 14.4001V8.40005V6.85318L12.6004 8.05318V9.60006V14.4001H3.60039V5.40006H8.40039H9.60039H9.94727L11.1473 4.20006H9.60039H8.40039L3.60039 4.20006Z"
                                             fill="#BAD34A" />
                                       </svg>
                                    </a>
                                    <a href="0x5Ec8d136E4F4E5fBA63Fb1aC7679ee8C4fA3Ace7" id="addTokenButton">Add CNV <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          viewBox="0 0 24 24" fill="none">
                                          <path d="M21.9206 1.67773L13.3145 8.05582L14.9132 4.29701L21.9206 1.67773Z"
                                             fill="#E17726" />
                                          <path d="M2.08789 1.67773L10.609 8.11535L9.08677 4.29701L2.08789 1.67773Z"
                                             fill="#E27625" />
                                          <path
                                             d="M18.8247 16.4663L16.5371 19.97L21.4354 21.3221L22.8301 16.5428L18.8247 16.4663Z"
                                             fill="#E27625" />
                                          <path
                                             d="M1.17773 16.5428L2.5639 21.3221L7.46228 19.97L5.18317 16.4663L1.17773 16.5428Z"
                                             fill="#E27625" />
                                          <path
                                             d="M7.19922 10.5476L5.83008 12.6055L10.6859 12.8267L10.5158 7.59668L7.19922 10.5476Z"
                                             fill="#E27625" />
                                          <path
                                             d="M16.8096 10.5476L13.4335 7.53711L13.3145 12.8266L18.1703 12.6055L16.8096 10.5476Z"
                                             fill="#E27625" />
                                          <path d="M7.46289 19.97L10.3884 18.5498L7.87106 16.5769L7.46289 19.97Z"
                                             fill="#E27625" />
                                          <path d="M13.6113 18.5498L16.5367 19.97L16.1285 16.5769L13.6113 18.5498Z"
                                             fill="#E27625" />
                                          <path
                                             d="M16.5367 19.97L13.6113 18.5498L13.8409 20.4547L13.8154 21.2541L16.5367 19.97Z"
                                             fill="#D5BFB2" />
                                          <path
                                             d="M7.46289 19.97L10.1843 21.2541L10.1672 20.4547L10.3884 18.5498L7.46289 19.97Z"
                                             fill="#D5BFB2" />
                                          <path d="M10.2349 15.3182L7.80273 14.6039L9.52053 13.813L10.2349 15.3182Z"
                                             fill="#233447" />
                                          <path d="M13.7637 15.3182L14.478 13.813L16.2128 14.6039L13.7637 15.3182Z"
                                             fill="#233447" />
                                          <path d="M7.4627 19.97L7.8879 16.4663L5.18359 16.5428L7.4627 19.97Z"
                                             fill="#CC6228" />
                                          <path d="M16.1113 16.4663L16.5365 19.97L18.8241 16.5428L16.1113 16.4663Z"
                                             fill="#CC6228" />
                                          <path
                                             d="M18.1703 12.6052L13.3145 12.8263L13.7652 15.3181L14.4795 13.8129L16.2144 14.6037L18.1703 12.6052Z"
                                             fill="#CC6228" />
                                          <path
                                             d="M7.80302 14.6037L9.52086 13.8129L10.2352 15.3181L10.6859 12.8263L5.83008 12.6052L7.80302 14.6037Z"
                                             fill="#CC6228" />
                                          <path d="M5.83008 12.6052L7.87106 16.5767L7.80302 14.6037L5.83008 12.6052Z"
                                             fill="#E27525" />
                                          <path d="M16.2139 14.6037L16.1289 16.5767L18.1699 12.6052L16.2139 14.6037Z"
                                             fill="#E27525" />
                                          <path
                                             d="M10.687 12.8264L10.2363 15.3181L10.8061 18.2605L10.9252 14.3827L10.687 12.8264Z"
                                             fill="#E27525" />
                                          <path
                                             d="M13.3136 12.8264L13.084 14.3742L13.1946 18.2605L13.7644 15.3181L13.3136 12.8264Z"
                                             fill="#E27525" />
                                          <path
                                             d="M13.7651 15.3184L13.1953 18.2608L13.612 18.5499L16.1292 16.577L16.2143 14.604L13.7651 15.3184Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M7.80273 14.604L7.87076 16.577L10.388 18.5499L10.8047 18.2608L10.2349 15.3184L7.80273 14.604Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M13.8155 21.2539L13.841 20.4545L13.6284 20.2674H10.3713L10.1672 20.4545L10.1843 21.2539L7.46289 19.9697L8.41533 20.7521L10.3458 22.0873H13.6539L15.5843 20.7521L16.5368 19.9697L13.8155 21.2539Z"
                                             fill="#C0AC9D" />
                                          <path
                                             d="M13.6121 18.5496L13.1954 18.2605H10.8058L10.3891 18.5496L10.168 20.4545L10.3721 20.2674H13.6292L13.8418 20.4545L13.6121 18.5496Z"
                                             fill="#161616" />
                                          <path
                                             d="M22.277 8.47228L22.9998 4.95157L21.9198 1.67749L13.6113 7.84298L16.8088 10.5473L21.316 11.8654L22.311 10.7004L21.8773 10.3857L22.5746 9.75639L22.0474 9.33968L22.7362 8.82095L22.277 8.47228Z"
                                             fill="#763E1A" />
                                          <path
                                             d="M1 4.95157L1.73134 8.47228L1.26363 8.82095L1.95247 9.33968L1.4252 9.75639L2.12254 10.3857L1.68883 10.7004L2.6838 11.8654L7.19949 10.5473L10.3885 7.84298L2.08854 1.67749L1 4.95157Z"
                                             fill="#763E1A" />
                                          <path
                                             d="M21.3164 11.8657L16.8092 10.5476L18.1699 12.6056L16.1289 16.577L18.8247 16.543H22.8301L21.3164 11.8657Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M7.19865 10.5474L2.68297 11.8655L1.17773 16.5428H5.18317L7.87045 16.5768L5.82948 12.6054L7.19865 10.5474Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M13.3144 12.8265L13.6121 7.84309L14.9132 4.29688H9.08789L10.389 7.84309L10.6867 12.8265L10.7972 14.3912L10.8057 18.2606H13.1954L13.2039 14.3912L13.3144 12.8265Z"
                                             fill="#F5841F" />
                                       </svg>
                                    </a>
                                 </div>
                                 <!-- <div class="staking-item-details-bottom-bottom">
                                    <a href="#">Add USDT <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          viewBox="0 0 24 24" fill="none">
                                          <path d="M21.9206 1.67773L13.3145 8.05582L14.9132 4.29701L21.9206 1.67773Z"
                                             fill="#E17726" />
                                          <path d="M2.08789 1.67773L10.609 8.11535L9.08677 4.29701L2.08789 1.67773Z"
                                             fill="#E27625" />
                                          <path
                                             d="M18.8247 16.4663L16.5371 19.97L21.4354 21.3221L22.8301 16.5428L18.8247 16.4663Z"
                                             fill="#E27625" />
                                          <path
                                             d="M1.17773 16.5428L2.5639 21.3221L7.46228 19.97L5.18317 16.4663L1.17773 16.5428Z"
                                             fill="#E27625" />
                                          <path
                                             d="M7.19922 10.5476L5.83008 12.6055L10.6859 12.8267L10.5158 7.59668L7.19922 10.5476Z"
                                             fill="#E27625" />
                                          <path
                                             d="M16.8096 10.5476L13.4335 7.53711L13.3145 12.8266L18.1703 12.6055L16.8096 10.5476Z"
                                             fill="#E27625" />
                                          <path d="M7.46289 19.97L10.3884 18.5498L7.87106 16.5769L7.46289 19.97Z"
                                             fill="#E27625" />
                                          <path d="M13.6113 18.5498L16.5367 19.97L16.1285 16.5769L13.6113 18.5498Z"
                                             fill="#E27625" />
                                          <path
                                             d="M16.5367 19.97L13.6113 18.5498L13.8409 20.4547L13.8154 21.2541L16.5367 19.97Z"
                                             fill="#D5BFB2" />
                                          <path
                                             d="M7.46289 19.97L10.1843 21.2541L10.1672 20.4547L10.3884 18.5498L7.46289 19.97Z"
                                             fill="#D5BFB2" />
                                          <path d="M10.2349 15.3182L7.80273 14.6039L9.52053 13.813L10.2349 15.3182Z"
                                             fill="#233447" />
                                          <path d="M13.7637 15.3182L14.478 13.813L16.2128 14.6039L13.7637 15.3182Z"
                                             fill="#233447" />
                                          <path d="M7.4627 19.97L7.8879 16.4663L5.18359 16.5428L7.4627 19.97Z"
                                             fill="#CC6228" />
                                          <path d="M16.1113 16.4663L16.5365 19.97L18.8241 16.5428L16.1113 16.4663Z"
                                             fill="#CC6228" />
                                          <path
                                             d="M18.1703 12.6052L13.3145 12.8263L13.7652 15.3181L14.4795 13.8129L16.2144 14.6037L18.1703 12.6052Z"
                                             fill="#CC6228" />
                                          <path
                                             d="M7.80302 14.6037L9.52086 13.8129L10.2352 15.3181L10.6859 12.8263L5.83008 12.6052L7.80302 14.6037Z"
                                             fill="#CC6228" />
                                          <path d="M5.83008 12.6052L7.87106 16.5767L7.80302 14.6037L5.83008 12.6052Z"
                                             fill="#E27525" />
                                          <path d="M16.2139 14.6037L16.1289 16.5767L18.1699 12.6052L16.2139 14.6037Z"
                                             fill="#E27525" />
                                          <path
                                             d="M10.687 12.8264L10.2363 15.3181L10.8061 18.2605L10.9252 14.3827L10.687 12.8264Z"
                                             fill="#E27525" />
                                          <path
                                             d="M13.3136 12.8264L13.084 14.3742L13.1946 18.2605L13.7644 15.3181L13.3136 12.8264Z"
                                             fill="#E27525" />
                                          <path
                                             d="M13.7651 15.3184L13.1953 18.2608L13.612 18.5499L16.1292 16.577L16.2143 14.604L13.7651 15.3184Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M7.80273 14.604L7.87076 16.577L10.388 18.5499L10.8047 18.2608L10.2349 15.3184L7.80273 14.604Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M13.8155 21.2539L13.841 20.4545L13.6284 20.2674H10.3713L10.1672 20.4545L10.1843 21.2539L7.46289 19.9697L8.41533 20.7521L10.3458 22.0873H13.6539L15.5843 20.7521L16.5368 19.9697L13.8155 21.2539Z"
                                             fill="#C0AC9D" />
                                          <path
                                             d="M13.6121 18.5496L13.1954 18.2605H10.8058L10.3891 18.5496L10.168 20.4545L10.3721 20.2674H13.6292L13.8418 20.4545L13.6121 18.5496Z"
                                             fill="#161616" />
                                          <path
                                             d="M22.277 8.47228L22.9998 4.95157L21.9198 1.67749L13.6113 7.84298L16.8088 10.5473L21.316 11.8654L22.311 10.7004L21.8773 10.3857L22.5746 9.75639L22.0474 9.33968L22.7362 8.82095L22.277 8.47228Z"
                                             fill="#763E1A" />
                                          <path
                                             d="M1 4.95157L1.73134 8.47228L1.26363 8.82095L1.95247 9.33968L1.4252 9.75639L2.12254 10.3857L1.68883 10.7004L2.6838 11.8654L7.19949 10.5473L10.3885 7.84298L2.08854 1.67749L1 4.95157Z"
                                             fill="#763E1A" />
                                          <path
                                             d="M21.3164 11.8657L16.8092 10.5476L18.1699 12.6056L16.1289 16.577L18.8247 16.543H22.8301L21.3164 11.8657Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M7.19865 10.5474L2.68297 11.8655L1.17773 16.5428H5.18317L7.87045 16.5768L5.82948 12.6054L7.19865 10.5474Z"
                                             fill="#F5841F" />
                                          <path
                                             d="M13.3144 12.8265L13.6121 7.84309L14.9132 4.29688H9.08789L10.389 7.84309L10.6867 12.8265L10.7972 14.3912L10.8057 18.2606H13.1954L13.2039 14.3912L13.3144 12.8265Z"
                                             fill="#F5841F" />
                                       </svg>
                                    </a>
                                 </div> -->
                              </div>
                           </div>
                        </div>
                        
                     <div class="staking-pagination pagination">
                        <a href="#" class="pagination-item" >
                           <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                                 fill="none">
                                 <path
                                    d="M7.33341 8.99875L13.2775 15.0673C13.5425 15.3377 13.5398 15.7704 13.2721 16.0408L12.2093 17.1036C11.9362 17.3741 11.4981 17.3741 11.2276 17.1009L3.66364 9.48824C3.52843 9.35302 3.46082 9.17724 3.46082 8.99876C3.46082 8.82027 3.52843 8.64449 3.66364 8.50927L11.2276 0.896598C11.4981 0.623462 11.9362 0.623462 12.2093 0.893891L13.2721 1.95669C13.5398 2.22713 13.5425 2.65982 13.2775 2.93025L7.33341 8.99875Z"
                                    fill="white" fill-opacity="0.34" />
                              </svg>
                           </span>
                        </a>
                        <a href="#" class="pagination-item">
                           <span>1</span>
                        </a>
                        <a href="#" class="pagination-item">
                           <span>2</span>
                        </a>
                        <a href="#" class="pagination-item">
                           <span>3</span>
                        </a>
                        <p class="pagination-item">
                           <span>...</span>
                        </p>
                        <a href="#" class="pagination-item">
                           <span>34</span>
                        </a>
                        <a href="#" class="pagination-item">
                           <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                                 fill="none">
                                 <path
                                    d="M10.6666 9.00125L4.72248 2.93274C4.45746 2.6623 4.46016 2.22961 4.72789 1.95918L5.79069 0.896378C6.06383 0.62594 6.50192 0.62594 6.77236 0.899084L14.3364 8.51176C14.4716 8.64698 14.5392 8.82276 14.5392 9.00124C14.5392 9.17973 14.4716 9.35551 14.3364 9.49073L6.77236 17.1034C6.50193 17.3765 6.06383 17.3765 5.79069 17.1061L4.72789 16.0433C4.46016 15.7729 4.45746 15.3402 4.72248 15.0697L10.6666 9.00125Z"
                                    fill="white" fill-opacity="0.34" />
                              </svg>
                           </span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>

	<?php include("inc/socials.php"); ?>

         <section>
            <div class="staking-modal-wrapper">
               <div class="staking-modal-bg"></div>
               <div class="staking-modal-block">
                  <div class="staking-modal-top">
                     <div class="staking-modal-title">Token Staking Pool</div>
                     <div class="staking-modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                           <path
                              d="M4.99107 3.99016C4.58415 3.99027 4.21786 4.23692 4.06474 4.61393C3.91162 4.99094 4.00219 5.42314 4.29381 5.70696L10.5868 11.9999L4.29381 18.2929C4.03257 18.5437 3.92734 18.9162 4.0187 19.2666C4.11006 19.6171 4.38373 19.8907 4.73417 19.9821C5.08461 20.0734 5.45706 19.9682 5.70788 19.707L12.0009 13.414L18.2938 19.707C18.5446 19.9682 18.9171 20.0735 19.2675 19.9821C19.618 19.8907 19.8916 19.6171 19.983 19.2666C20.0744 18.9162 19.9691 18.5437 19.7079 18.2929L13.4149 11.9999L19.7079 5.70697C20.0036 5.41948 20.0926 4.9799 19.9318 4.60006C19.7711 4.22021 19.3936 3.97802 18.9813 3.99018C18.7215 3.99792 18.4749 4.1065 18.2938 4.29291L12.0008 10.5859L5.70787 4.29291C5.5196 4.09938 5.26107 3.99017 4.99107 3.99016Z"
                              fill="white" />
                        </svg>
                     </div>
                  </div>
                  <div class="staking-modal-tabs">
                     <div class="staking-modal-tab active">Stake token</div>
                     <div class="staking-modal-tab">Unstake token</div>
                  </div>
                  <div class="staking-modal-field-wrapper">
                     <div class="staking-modal-field-top">
                        <p>Stake</p>
                        <p>Balance: <span id="balanceUser">0</span></p>
                     </div>
                     <div class="staking-modal-field">
                        <div class="staking-modal-field-l">
                           <img src="img/staking-icon.png" alt="">
                           <input type="text" id="myInputStake" placeholder="0" value="0">
                        </div>
                        <div class="staking-modal-field-r" id="priceStaking">~0 USD</div>
                     </div>
                  </div>
                  <div class="staking-modal-range-block">
                     <div class="staking-modal-range-wrapper">
                        <div class="staking-modal-range-greyline"></div>
                        <input type="range" id="slider1" min="0" max="100" step="1" value="0" >
                        <div id="selector1" class="staking-modal-range-thumb" style="left: 60%;"></div>
                        <div id="range-line1" class="staking-modal-range-line" style="width: 60%;"></div>
                     </div>
                     <div class="staking-modal-range-values">
                        <p>0%</p>
                        <p>25%</p>
                        <p>50%</p>
                        <p>75%</p>
                        <p>100%</p>
                     </div>
                  </div>
                  <div class="staking-modal-btns">
                     <div class="staking-modal-btn btn disabled">
                        <span>cancel</span>
                     </div>
                     <div class="staking-modal-btn btn green">
                        <span>confirm</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
      <script src="js/stakingPool.js"></script>
   </main>