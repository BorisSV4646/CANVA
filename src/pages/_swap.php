<?php
	$_OPTIMIZATION["title"] = $contentData["SiteTitle"].$contentData["SwapTitle"];
	$_OPTIMIZATION["description"] = $contentData["SwapDescription"];
	$_OPTIMIZATION["keywords"] = $contentData["SwapKeywords"];
?>
      <div class="main">
         <section>
            <div class="swap-banner" style="background-image: url(img/swap-banner-bg.png);">
               <div class="container">
                  <div class="swap-banner-inner">
                     <div class="swap-banner-title title">
                        <p>Make a <span class="green">Swap</span></p>
                        <p>Make a Swap</p>
                     </div>
                     <!-- <div class="swap-banner-text">Fee reimbursement of 10% is returned in CNV token</div> -->
                  </div>
               </div>
            </div>
         </section>
         <section>
            <div class="swap">
               <div class="container">
                  <div class="swap-inner">
                     <div class="swap-block">
                        <div class="swap-block-title">Swap</div>
                        <div class="swap-block-subtitle">Trade tokens in an instant</div>
                        <div class="swap-block-field-row">
                           <div class="swap-block-field-row-top">
                              <div class="swap-block-field-row-top-l">
                                 <div class="swap-block-field-row-top-text">
                                    <span class="swap-block-field-row-top-text-icon">
                                    </span>
                                    <span>Select</span>
                                 </div>
                                 <div class="swap-block-field-row-top-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                       fill="none">
                                       <path
                                          d="M5.99917 7.11073L10.0448 3.14799C10.2251 2.97131 10.5136 2.97311 10.6939 3.1516L11.4024 3.86013C11.5827 4.04223 11.5827 4.33429 11.4006 4.51458L6.32549 9.55725C6.23535 9.64739 6.11816 9.69246 5.99917 9.69246C5.88018 9.69246 5.76299 9.64739 5.67285 9.55725L0.597732 4.51458C0.415641 4.3343 0.415641 4.04223 0.595927 3.86013L1.30446 3.1516C1.48475 2.97311 1.77321 2.97131 1.9535 3.14799L5.99917 7.11073Z"
                                          fill="white" />
                                    </svg>
                                 </div>
                              </div>
                              <div class="swap-block-field-row-top-r">
                                 <div class="balance">
                                    <span>Balance</span>
                                    <div class="balance-icon">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                          viewBox="0 0 20 20" fill="none">
                                          <path
                                             d="M4.66601 2.66656C3.56937 2.66656 2.66602 3.56992 2.66602 4.66656V15.3332C2.66602 16.4379 3.56135 17.3332 4.66601 17.3332H15.9993C16.736 17.3332 17.3327 16.7366 17.3327 15.9999V6.66656C17.3327 5.9299 16.736 5.33323 15.9993 5.33323H10.666H4.66601C4.28933 5.33323 3.99935 5.04325 3.99935 4.66656C3.99935 4.28988 4.28933 3.9999 4.66601 3.9999H14.666C14.9064 4.0033 15.1301 3.87698 15.2513 3.66932C15.3725 3.46165 15.3725 3.20481 15.2513 2.99715C15.1301 2.78948 14.9064 2.66317 14.666 2.66657L4.66601 2.66656ZM14.666 9.99989C15.4027 9.99989 15.9993 10.5966 15.9993 11.3332C15.9993 12.0699 15.4027 12.6666 14.666 12.6666C13.9293 12.6666 13.3327 12.0699 13.3327 11.3332C13.3327 10.5966 13.9293 9.99989 14.666 9.99989Z"
                                             fill="white" fill-opacity="0.43" />
                                       </svg>
                                    </div>
                                    <span id="balance1">0.00</span>
                                 </div>
                                 <div class="max">max</div>
                              </div>
                           </div>
                           <div class="swap-block-field-row-bottom error">
                              <div class="swap-block-field-row-bottom-input">
                                 <input id="inputSwap" type="text" placeholder="0.0">
                              </div>
                              <div class="swap-block-field-row-bottom-value" id="tokenPrice">~0 USD</div>
                           </div>
                        </div>
                        <div class="swap-block-icon">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M16.2915 16.8025V10.7925C16.2915 10.2425 15.8415 9.79248 15.2915 9.79248C14.7415 9.79248 14.2915 10.2425 14.2915 10.7925V16.8025H12.5015C12.0515 16.8025 11.8315 17.3425 12.1515 17.6525L14.9415 20.4325C15.1415 20.6225 15.4515 20.6225 15.6515 20.4325L18.4415 17.6525C18.7615 17.3425 18.5315 16.8025 18.0915 16.8025H16.2915ZM8.94153 3.1425L6.15153 5.9325C5.83153 6.2425 6.05153 6.7825 6.50153 6.7825H8.29153V12.7925C8.29153 13.3425 8.74153 13.7925 9.29153 13.7925C9.84153 13.7925 10.2915 13.3425 10.2915 12.7925V6.7825H12.0815C12.5315 6.7825 12.7515 6.2425 12.4315 5.9325L9.64153 3.1425C9.45153 2.9525 9.13153 2.9525 8.94153 3.1425Z"
                                 fill="white" fill-opacity="0.43" />
                           </svg>
                        </div>
                        <div class="swap-block-field-row">
                           <div class="swap-block-field-row-top">
                              <div class="swap-block-field-row-top-l two">
                                 <div class="swap-block-field-row-top-text">
                                    <span class="swap-block-field-row-top-text-icon">
                                    </span>
                                    <span>Select</span>
                                 </div>
                                 <div class="swap-block-field-row-top-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                       fill="none">
                                       <path
                                          d="M5.99917 7.11073L10.0448 3.14799C10.2251 2.97131 10.5136 2.97311 10.6939 3.1516L11.4024 3.86013C11.5827 4.04223 11.5827 4.33429 11.4006 4.51458L6.32549 9.55725C6.23535 9.64739 6.11816 9.69246 5.99917 9.69246C5.88018 9.69246 5.76299 9.64739 5.67285 9.55725L0.597732 4.51458C0.415641 4.3343 0.415641 4.04223 0.595927 3.86013L1.30446 3.1516C1.48475 2.97311 1.77321 2.97131 1.9535 3.14799L5.99917 7.11073Z"
                                          fill="white" />
                                    </svg>
                                 </div>
                              </div>
                              <div class="swap-block-field-row-top-r">
                                 <div class="balance">
                                    <span>Balance</span>
                                    <div class="balance-icon">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                          viewBox="0 0 20 20" fill="none">
                                          <path
                                             d="M4.66601 2.66656C3.56937 2.66656 2.66602 3.56992 2.66602 4.66656V15.3332C2.66602 16.4379 3.56135 17.3332 4.66601 17.3332H15.9993C16.736 17.3332 17.3327 16.7366 17.3327 15.9999V6.66656C17.3327 5.9299 16.736 5.33323 15.9993 5.33323H10.666H4.66601C4.28933 5.33323 3.99935 5.04325 3.99935 4.66656C3.99935 4.28988 4.28933 3.9999 4.66601 3.9999H14.666C14.9064 4.0033 15.1301 3.87698 15.2513 3.66932C15.3725 3.46165 15.3725 3.20481 15.2513 2.99715C15.1301 2.78948 14.9064 2.66317 14.666 2.66657L4.66601 2.66656ZM14.666 9.99989C15.4027 9.99989 15.9993 10.5966 15.9993 11.3332C15.9993 12.0699 15.4027 12.6666 14.666 12.6666C13.9293 12.6666 13.3327 12.0699 13.3327 11.3332C13.3327 10.5966 13.9293 9.99989 14.666 9.99989Z"
                                             fill="white" fill-opacity="0.43" />
                                       </svg>
                                    </div>
                                    <span id="balance2">0.00</span>
                                 </div>
                              </div>
                           </div>
                           <div class="swap-block-field-row-bottom disabled">
                              <div class="swap-block-field-row-bottom-input">
                                 <input type="text" placeholder="0.0">
                              </div>
                              <div class="swap-block-field-row-bottom-value"></div>
                           </div>
                        </div>
                        <div class="swap-block-add-info" id="tokenPer"></div>
                        <div class="swap-block-btn btn green">
                           <span>swap</span>
                        </div>
                        <div class="swap-block-bottom">
                           <div class="swap-block-bottom-item">
                              <div class="swap-block-bottom-item-l">Minimum received <svg
                                    xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                                    fill="none">
                                    <path
                                       d="M9 2.25C5.27783 2.25 2.25 5.27783 2.25 9C2.25 12.7222 5.27783 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.27783 12.7222 2.25 9 2.25ZM9 3.375C12.1135 3.375 14.625 5.88647 14.625 9C14.625 12.1135 12.1135 14.625 9 14.625C5.88647 14.625 3.375 12.1135 3.375 9C3.375 5.88647 5.88647 3.375 9 3.375ZM9 5.625C7.76294 5.625 6.75 6.63794 6.75 7.875H7.875C7.875 7.24658 8.37158 6.75 9 6.75C9.62842 6.75 10.125 7.24658 10.125 7.875C10.125 8.30567 9.84814 8.68799 9.43945 8.82422L9.21094 8.89453C8.75171 9.04614 8.4375 9.4856 8.4375 9.9668V10.6875H9.5625V9.9668L9.79102 9.89648C10.6567 9.60864 11.25 8.78686 11.25 7.875C11.25 6.63794 10.2371 5.625 9 5.625ZM8.4375 11.25V12.375H9.5625V11.25H8.4375Z"
                                       fill="white" fill-opacity="0.43" />
                                 </svg></div>
                              <div class="swap-block-bottom-item-r">1658 CAKE</div>
                           </div>
                           <div class="swap-block-bottom-item">
                              <div class="swap-block-bottom-item-l">Price Impact <svg xmlns="http://www.w3.org/2000/svg"
                                    width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                       d="M9 2.25C5.27783 2.25 2.25 5.27783 2.25 9C2.25 12.7222 5.27783 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.27783 12.7222 2.25 9 2.25ZM9 3.375C12.1135 3.375 14.625 5.88647 14.625 9C14.625 12.1135 12.1135 14.625 9 14.625C5.88647 14.625 3.375 12.1135 3.375 9C3.375 5.88647 5.88647 3.375 9 3.375ZM9 5.625C7.76294 5.625 6.75 6.63794 6.75 7.875H7.875C7.875 7.24658 8.37158 6.75 9 6.75C9.62842 6.75 10.125 7.24658 10.125 7.875C10.125 8.30567 9.84814 8.68799 9.43945 8.82422L9.21094 8.89453C8.75171 9.04614 8.4375 9.4856 8.4375 9.9668V10.6875H9.5625V9.9668L9.79102 9.89648C10.6567 9.60864 11.25 8.78686 11.25 7.875C11.25 6.63794 10.2371 5.625 9 5.625ZM8.4375 11.25V12.375H9.5625V11.25H8.4375Z"
                                       fill="white" fill-opacity="0.43" />
                                 </svg></div>
                              <div class="swap-block-bottom-item-r green">
                                 &#60;0.01% </div>
                           </div>
                           <div class="swap-block-bottom-item">
                              <div class="swap-block-bottom-item-l">Trade fee <svg xmlns="http://www.w3.org/2000/svg"
                                    width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                       d="M9 2.25C5.27783 2.25 2.25 5.27783 2.25 9C2.25 12.7222 5.27783 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.27783 12.7222 2.25 9 2.25ZM9 3.375C12.1135 3.375 14.625 5.88647 14.625 9C14.625 12.1135 12.1135 14.625 9 14.625C5.88647 14.625 3.375 12.1135 3.375 9C3.375 5.88647 5.88647 3.375 9 3.375ZM9 5.625C7.76294 5.625 6.75 6.63794 6.75 7.875H7.875C7.875 7.24658 8.37158 6.75 9 6.75C9.62842 6.75 10.125 7.24658 10.125 7.875C10.125 8.30567 9.84814 8.68799 9.43945 8.82422L9.21094 8.89453C8.75171 9.04614 8.4375 9.4856 8.4375 9.9668V10.6875H9.5625V9.9668L9.79102 9.89648C10.6567 9.60864 11.25 8.78686 11.25 7.875C11.25 6.63794 10.2371 5.625 9 5.625ZM8.4375 11.25V12.375H9.5625V11.25H8.4375Z"
                                       fill="white" fill-opacity="0.43" />
                                 </svg></div>
                              <div class="swap-block-bottom-item-r">0.003996 BNB ~ 1.20596 $</div>
                           </div>
                           <!-- <div class="swap-block-bottom-item">
                              <div class="swap-block-bottom-item-l">Fee Return <svg xmlns="http://www.w3.org/2000/svg"
                                    width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                       d="M9 2.25C5.27783 2.25 2.25 5.27783 2.25 9C2.25 12.7222 5.27783 15.75 9 15.75C12.7222 15.75 15.75 12.7222 15.75 9C15.75 5.27783 12.7222 2.25 9 2.25ZM9 3.375C12.1135 3.375 14.625 5.88647 14.625 9C14.625 12.1135 12.1135 14.625 9 14.625C5.88647 14.625 3.375 12.1135 3.375 9C3.375 5.88647 5.88647 3.375 9 3.375ZM9 5.625C7.76294 5.625 6.75 6.63794 6.75 7.875H7.875C7.875 7.24658 8.37158 6.75 9 6.75C9.62842 6.75 10.125 7.24658 10.125 7.875C10.125 8.30567 9.84814 8.68799 9.43945 8.82422L9.21094 8.89453C8.75171 9.04614 8.4375 9.4856 8.4375 9.9668V10.6875H9.5625V9.9668L9.79102 9.89648C10.6567 9.60864 11.25 8.78686 11.25 7.875C11.25 6.63794 10.2371 5.625 9 5.625ZM8.4375 11.25V12.375H9.5625V11.25H8.4375Z"
                                       fill="white" fill-opacity="0.43" />
                                 </svg></div>
                              <div class="swap-block-bottom-item-r">0.47429 BSW ~ 0.05707 $</div>
                           </div> -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

	<?php include("inc/socials.php"); ?>

         <section>
            <div class="swap-modal-wrapper">
               <div class="swap-modal-bg"></div>
               <div class="swap-modal-block">
                  <div class="swap-modal-top">
                     <div class="swap-modal-title">Select a token</div>
                     <div class="swap-modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                           <path
                              d="M4.99107 3.99016C4.58415 3.99027 4.21786 4.23692 4.06474 4.61393C3.91162 4.99094 4.00219 5.42314 4.29381 5.70696L10.5868 11.9999L4.29381 18.2929C4.03257 18.5437 3.92734 18.9162 4.0187 19.2666C4.11006 19.6171 4.38373 19.8907 4.73417 19.9821C5.08461 20.0734 5.45706 19.9682 5.70788 19.707L12.0009 13.414L18.2938 19.707C18.5446 19.9682 18.9171 20.0735 19.2675 19.9821C19.618 19.8907 19.8916 19.6171 19.983 19.2666C20.0744 18.9162 19.9691 18.5437 19.7079 18.2929L13.4149 11.9999L19.7079 5.70697C20.0036 5.41948 20.0926 4.9799 19.9318 4.60006C19.7711 4.22021 19.3936 3.97802 18.9813 3.99018C18.7215 3.99792 18.4749 4.1065 18.2938 4.29291L12.0008 10.5859L5.70787 4.29291C5.5196 4.09938 5.26107 3.99017 4.99107 3.99016Z"
                              fill="white" />
                        </svg>
                     </div>
                  </div>
                  <div class="swap-modal-search">
                     <input type="text" placeholder="Search name or paste address">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                           d="M10.4004 2.40002C5.99159 2.40002 2.40039 5.99122 2.40039 10.4C2.40039 14.8088 5.99159 18.4 10.4004 18.4C12.3176 18.4 14.0783 17.7192 15.4582 16.5891L20.2348 21.3656C20.4354 21.5746 20.7334 21.6588 21.0137 21.5857C21.2941 21.5126 21.513 21.2937 21.5861 21.0134C21.6592 20.733 21.575 20.435 21.366 20.2344L16.5894 15.4578C17.7196 14.0779 18.4004 12.3172 18.4004 10.4C18.4004 5.99122 14.8092 2.40002 10.4004 2.40002ZM10.4004 4.00002C13.9445 4.00002 16.8004 6.85593 16.8004 10.4C16.8004 13.9441 13.9445 16.8 10.4004 16.8C6.85629 16.8 4.00039 13.9441 4.00039 10.4C4.00039 6.85593 6.85629 4.00002 10.4004 4.00002Z"
                           fill="white" />
                     </svg>
                  </div>
                  <div class="swap-modal-common">
                     <div class="swap-modal-common-title">Common tokens</div>
                     <div class="swap-modal-common-slider swiper">
                        <div class="swiper-wrapper">
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/eth-icon.png" alt="">
                                 <span>ETH</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/bnb-icon.png" alt="">
                                 <span>BNB</span>
                              </div>
                           </div>
                           <!-- <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/eth-icon.png" alt="">
                                 <span>ETH</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/usdc-icon.png" alt="">
                                 <span>USDC</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/bnb-icon.png" alt="">
                                 <span>BNB</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/busd-icon.png" alt="">
                                 <span>BUSD</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/eth-icon.png" alt="">
                                 <span>ETH</span>
                              </div>
                           </div>
                           <div class="swiper-slide">
                              <div class="swap-modal-common-slide">
                                 <img src="img/usdc-icon.png" alt="">
                                 <span>USDC</span>
                              </div>
                           </div> -->
                        </div>
                     </div>
                  </div>
                  <div class="swap-modal-body-title">Token name</div>
                  <div class="swap-modal-body">
                     <div class="swap-modal-items">
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l one">
                              <img src="img/eth-icon.png" alt="">
                              <span>eth</span>
                           </div>
                           <div class="swap-modal-item-r" id="balanceEth">
                              0
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l two">
                              <img src="img/bnb-icon.png" alt="">
                              <span>bnb</span>
                           </div>
                           <div class="swap-modal-item-r" id="balanceBnb">
                              0
                           </div>
                        </div>
                        <!-- <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/eth-icon.png" alt="">
                              <span>eth</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/usdc-icon.png" alt="">
                              <span>usdc</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/bnb-icon.png" alt="">
                              <span>bnb</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/busd-icon.png" alt="">
                              <span>busd</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/eth-icon.png" alt="">
                              <span>eth</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/usdc-icon.png" alt="">
                              <span>usdc</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/bnb-icon.png" alt="">
                              <span>bnb</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/busd-icon.png" alt="">
                              <span>busd</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/eth-icon.png" alt="">
                              <span>eth</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/usdc-icon.png" alt="">
                              <span>usdc</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/bnb-icon.png" alt="">
                              <span>bnb</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/busd-icon.png" alt="">
                              <span>busd</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div>
                        <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/eth-icon.png" alt="">
                              <span>eth</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div> -->
                        <!-- <div class="swap-modal-item">
                           <div class="swap-modal-item-l">
                              <img src="img/usdc-icon.png" alt="">
                              <span>usdc</span>
                           </div>
                           <div class="swap-modal-item-r">
                              11.2321
                           </div>
                        </div> -->
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="js/swapPage.js"></script>
      <script src="js/main.js"></script>

   </main>