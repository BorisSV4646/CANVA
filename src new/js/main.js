$(document).ready(function () {
  $(
    ".nametoken-diagram-img path, .nametoken-diagram-img circle, .token-about-diagram path, .token-about-diagram circle"
  ).hover(
    function () {
      $(".nametoken-diagram-img path, .nametoken-diagram-img cricle").addClass(
        "disabled"
      );
      $(".nametoken-diagram-item").addClass("disabled");
      $(".token-about-diagram-item").addClass("disabled");
      $(".token-about-diagram path, .token-about-diagram circle").addClass(
        "disabled"
      );
      $(this).removeClass("disabled");
      $(
        `.nametoken-diagram-item[data-id="${$(this).attr("data-target")}"]`
      ).removeClass("disabled");
      $(
        `.token-about-diagram-item[data-id="${$(this).attr("data-target")}"]`
      ).removeClass("disabled");
    },
    function () {
      $(
        ".nametoken-diagram-img path, .nametoken-diagram-img cirlce"
      ).removeClass("disabled");
      $(".nametoken-diagram-item").removeClass("disabled");
      $(".token-about-diagram-item").removeClass("disabled");
      $(".token-about-diagram path, .token-about-diagram cirlce").removeClass(
        "disabled"
      );
    }
  );

  $(".nametoken-diagram-item, .token-about-diagram-item").hover(
    function () {
      $(".nametoken-diagram-img path, .nametoken-diagram-img circle").addClass(
        "disabled"
      );
      $(".nametoken-diagram-item").addClass("disabled");
      $(".token-about-diagram-item").addClass("disabled");
      $(".token-about-diagram path, .token-about-diagram circle").addClass(
        "disabled"
      );
      $(this).removeClass("disabled");
      $(
        `.nametoken-diagram-img path[data-target="${$(this).attr("data-id")}"]`
      ).removeClass("disabled");
      $(
        `.token-about-diagram path[data-target="${$(this).attr("data-id")}"]`
      ).removeClass("disabled");
      $(
        `.nametoken-diagram-img circle[data-target="${$(this).attr(
          "data-id"
        )}"]`
      ).removeClass("disabled");
      $(
        `.token-about-diagram circle[data-target="${$(this).attr("data-id")}"]`
      ).removeClass("disabled");
    },
    function () {
      $(".nametoken-diagram-img path").removeClass("disabled");
      $(".nametoken-diagram-img circle").removeClass("disabled");
      $(".token-about-diagram path").removeClass("disabled");
      $(".token-about-diagram circle").removeClass("disabled");
      $(".nametoken-diagram-item").removeClass("disabled");
      $(".token-about-diagram-item").removeClass("disabled");
    }
  );
  function successModalOpen() {
    $(".status-popup.success").addClass("db");
    setTimeout(function () {
      $(".status-popup.success").addClass("active");
      setTimeout(function () {
        $(".status-popup.success .status-popup-load-line").addClass("active");
        setTimeout(function () {
          $(".status-popup.success").removeClass("active");
          setTimeout(function () {
            $(".status-popup.success").removeClass("db");
          }, 500);
        }, 2000);
      }, 500);
    }, 10);
  }
  function copyModalOpen() {
    $(".status-popup.copy").addClass("db");
    setTimeout(function () {
      $(".status-popup.copy").addClass("active");
      setTimeout(function () {
        $(".status-popup.copy .status-popup-load-line").addClass("active");
        setTimeout(function () {
          $(".status-popup.copy").removeClass("active");
          setTimeout(function () {
            $(".status-popup.copy").removeClass("db");
          }, 500);
        }, 2000);
      }, 500);
    }, 10);
  }
  function errorModalOpen() {
    $(".status-popup.error").addClass("db");
    setTimeout(function () {
      $(".status-popup.error").addClass("active");
      setTimeout(function () {
        $(".status-popup.error .status-popup-load-line").addClass("active");
        setTimeout(function () {
          $(".status-popup.error").removeClass("active");
          setTimeout(function () {
            $(".status-popup.error").removeClass("db");
          }, 500);
        }, 2000);
      }, 500);
    }, 10);
  }
  function warningModalOpen() {
    $(".status-popup.warning").addClass("db");
    setTimeout(function () {
      $(".status-popup.warning").addClass("active");
      setTimeout(function () {
        $(".status-popup.warning .status-popup-load-line").addClass("active");
        setTimeout(function () {
          $(".status-popup.warning").removeClass("active");
          setTimeout(function () {
            $(".status-popup.warning").removeClass("db");
          }, 500);
        }, 2000);
      }, 500);
    }, 10);
  }

  $(".status-popup-close").click(function () {
    $(this).parents(".status-popup").removeClass("active");
    setTimeout(function () {
      $(this).parents(".status-popup").removeClass("db");
    }, 500);
  });

  setTimeout(function () {
    successModalOpen();
    setTimeout(function () {
      copyModalOpen();
    }, 200);
    setTimeout(function () {
      errorModalOpen();
    }, 400);
    setTimeout(function () {
      warningModalOpen();
    }, 600);
  }, 1000);

  $(".header-burger").click(function () {
    const thisBlock = $(this);
    if (thisBlock.hasClass("active")) {
      $(".header-c").removeClass("active");
      $(".header").removeClass("dark");
      thisBlock.removeClass("rotate");
      setTimeout(function () {
        thisBlock.removeClass("active");
      }, 300);
    } else {
      thisBlock.addClass("active");
      $(".header-c").addClass("active");
      $(".header").addClass("dark");
      setTimeout(function () {
        thisBlock.addClass("rotate");
      }, 300);
    }
  });

  var scrollVal = $(window).scrollTop();
  if (scrollVal > 50) {
    $(".header").addClass("darktr");
  } else {
    $(".header").removeClass("darktr");
  }

  $(window).scroll(function () {
    var scrollVal = $(window).scrollTop();
    if (scrollVal > 50) {
      $(".header").addClass("darktr");
    } else {
      $(".header").removeClass("darktr");
    }
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".header").length) {
      $(".header").removeClass("dark");
      $(".header-submenu-wrapper").slideUp(300);
      $(".header-menu-item").removeClass("active");
    }
    e.stopPropagation();
  });

  $(".header-menu-item-link-wrapper").click(function () {
    if ($(this).parents(".header-menu-item").hasClass("active")) {
      if ($(window).width() > "768") {
        $(".header").removeClass("dark");
      }
      $(this)
        .parents(".header-menu-item")
        .find(".header-submenu-wrapper")
        .slideUp(300);
      $(this).parents(".header-menu-item").removeClass("active");
    } else {
      $(".header-menu-item").find(".header-submenu-wrapper").slideUp(300);
      $(".header-menu-item").removeClass("active");
      if ($(window).width() > "768") {
        $(".header").addClass("dark");
      }
      $(this)
        .parents(".header-menu-item")
        .find(".header-submenu-wrapper")
        .slideToggle(300);
      $(this).parents(".header-menu-item").addClass("active");
    }
  });

  $(".footer-menu-title").click(function () {
    if ($(window).width() <= "501") {
      if ($(this).hasClass("active")) {
        $(this)
          .parents(".footer-menu-col")
          .find(".footer-menu-links")
          .slideUp(300);
        $(this).removeClass("active");
      } else {
        $(this)
          .parents(".footer-menu-col")
          .find(".footer-menu-links")
          .slideToggle(300);
        $(this).addClass("active");
      }
    }
  });

  $(".map-bottom-item-top").click(function () {
    if ($(this).hasClass("active")) {
      $(this)
        .parents(".map-bottom-item")
        .find(".map-bottom-item-bottom")
        .slideUp(300);
      $(this).removeClass("active");
    } else {
      $(this)
        .parents(".map-bottom-item")
        .find(".map-bottom-item-bottom")
        .slideToggle(300);
      $(this).addClass("active");
    }
  });

  $(".staking-item-details-top").click(function () {
    $(".staking-item").removeClass("active");
    if ($(this).hasClass("active")) {
      $(this)
        .parents(".staking-item-details")
        .find(".staking-item-details-bottom")
        .slideUp(300);
      $(this).removeClass("active");
    } else {
      $(this).parents(".staking-item").addClass("active");
      $(this)
        .parents(".staking-item-details")
        .find(".staking-item-details-bottom")
        .slideToggle(300);
      $(this).addClass("active");
    }
  });

  $(".referral-asked-item-top").click(function () {
    if ($(this).hasClass("active")) {
      $(this)
        .parents(".referral-asked-item")
        .find(".referral-asked-item-bottom")
        .slideUp(300);
      $(this).removeClass("active");
    } else {
      $(this)
        .parents(".referral-asked-item")
        .find(".referral-asked-item-bottom")
        .slideToggle(300);
      $(this).addClass("active");
    }
  });

  const roadmapSlider = new Swiper(".roadmap-body-slider", {
    direction: "horizontal",
    slidesPerView: 1,
    initialSlide: 1,
  });

  const roadmapMobSlider = new Swiper(".roadmap-body-mob-slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 20,
  });

  const mainBottomSlider = new Swiper(".main-bottom-block-slider", {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      1: {
        slidesPerView: 1,
      },
      421: {
        slidesPerView: 2,
      },
      551: {
        slidesPerView: 3,
      },
      769: {
        slidesPerView: 4,
      },
      1001: {
        slidesPerView: 5,
      },
    },
    speed: 1000,
    slidesPerView: 5,
    spaceBetween: 30,
  });

  setTimeout(function () {
    if ($(".landstype-slide").length) {
      $(".landstype-bottom-l p:first-child").text(
        $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
          "data-text"
        )
      );
      $(".landstype-bottom-l p:last-child")
        .find("span.green")
        .text(
          $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
            "data-num-1"
          )
        );
      $(".landstype-bottom-l p:last-child")
        .find("span.full")
        .text(
          $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
            "data-num-2"
          )
        );
    }
  }, 100);

  for (let i = 0; i < $(".swap-block-field-row-bottom").length; i++) {
    if ($(".swap-block-field-row-bottom").eq(i).hasClass("disabled")) {
      $(".swap-block-field-row-bottom")
        .eq(i)
        .find("input")
        .attr("disabled", "disabled");
    }
  }

  for (let i = 0; i < $(".referral-table-search").length; i++) {
    if ($(".referral-table-search").eq(i).hasClass("disabled")) {
      $(".referral-table-search")
        .eq(i)
        .find("input")
        .attr("disabled", "disabled");
    }
  }

  for (let i = 0; i < $(".swap-modal-search").length; i++) {
    if ($(".swap-modal-search").eq(i).hasClass("disabled")) {
      $(".swap-modal-search").eq(i).find("input").attr("disabled", "disabled");
    }
  }

  for (let i = 0; i < $(".staking-modal-field").length; i++) {
    if ($(".staking-modal-field").eq(i).hasClass("disabled")) {
      $(".staking-modal-field")
        .eq(i)
        .find("input")
        .attr("disabled", "disabled");
    }
  }

  $(".referral-table-search").click(function () {
    if (!$(this).hasClass("disabled")) {
      $(this).find("input").focus();
      $(this).addClass("active");
    }
  });
  $(".referral-table-search input").blur(function () {
    $(".referral-table-search").removeClass("active");
  });

  $(".staking-modal-field").click(function () {
    if (!$(this).hasClass("disabled")) {
      $(this).find("input").focus();
      $(this).addClass("active");
    }
  });
  $(".staking-modal-field input").blur(function () {
    $(".staking-modal-field").removeClass("active");
  });

  $(".swap-modal-search").click(function () {
    if (!$(this).hasClass("disabled")) {
      $(this).find("input").focus();
      $(this).addClass("active");
    }
  });
  $(".swap-modal-search input").blur(function () {
    $(".swap-modal-search").removeClass("active");
  });

  $(".swap-block-field-row-bottom").click(function () {
    if (!$(this).hasClass("disabled")) {
      $(this).find("input").focus();
      $(this).addClass("active");
    }
  });
  $(".swap-block-field-row-bottom-input input").blur(function () {
    $(".swap-block-field-row-bottom").removeClass("active");
  });

  const landstypeSlider = new Swiper(".landstype-slider", {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    loopedSlides: 2,
    navigation: {
      nextEl: ".landstype-slider-next",
      prevEl: ".landstype-slider-prev",
    },
  });

  landstypeSlider.on("slideChange", function () {
    setTimeout(function () {
      $(".landstype-bottom-l p:first-child").text(
        $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
          "data-text"
        )
      );
      $(".landstype-bottom-l p:last-child")
        .find("span.green")
        .text(
          $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
            "data-num-1"
          )
        );
      $(".landstype-bottom-l p:last-child")
        .find("span.full")
        .text(
          $(".swiper-slide.swiper-slide-active .landstype-slide").attr(
            "data-num-2"
          )
        );
    }, 100);
  });

  const swapCommonSlider = new Swiper(".swap-modal-common-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
  });

  let swapRow;

  $(".staking-modal-close, .staking-modal-bg").click(function () {
    $(".staking-modal-wrapper").removeClass("active");
  });

  $(".staking-modal-btn").click(function () {
    if ($(this).hasClass("cancel")) {
      $(".staking-modal-wrapper").removeClass("active");
    }
  });

  $(".open-staking").click(function () {
    $(".staking-item").removeClass("active");
    $(this).parents(".staking-item").addClass("active");
    $(".staking-modal-wrapper").addClass("active");
  });

  $(".staking-item-center-row-link, .staking-item-btn").click(function () {
    $(".staking-item").removeClass("active");
    $(this).parents(".staking-item").addClass("active");
  });

  $(".swap-modal-close, .swap-modal-bg").click(function () {
    $(".swap-modal-wrapper").removeClass("active");
    swapRow = "";
  });

  $(".swap-block-field-row-top-l").click(function () {
    $(".swap-modal-wrapper").addClass("active");
    swapRow = $(this);
  });

  $(".swap-modal-item").click(function () {
    if (swapRow.find(".swap-block-field-row-top-text-icon img").length) {
      swapRow
        .find(".swap-block-field-row-top-text-icon img")
        .attr("src", $(this).find(".swap-modal-item-l img").attr("src"));
    } else {
      swapRow.find(".swap-block-field-row-top-text-icon").append("<img>");
      swapRow
        .find(".swap-block-field-row-top-text-icon img")
        .attr("src", $(this).find(".swap-modal-item-l img").attr("src"));
    }
    swapRow
      .find(".swap-block-field-row-top-text span:last-child")
      .text($(this).find(".swap-modal-item-l span").text());
    $(".swap-modal-wrapper").removeClass("active");
    swapRow = "";
  });

  if ($("#slider1").length) {
    let slider1 = document.getElementById("slider1");
    let selector1 = document.getElementById("selector1");
    let rangeLine1 = document.getElementById("range-line1");
    selector1.style.left = slider1.value + "%";
    rangeLine1.style.width = slider1.value + "%";
    slider1.oninput = function () {
      selector1.style.left = this.value + "%";
      rangeLine1.style.width = this.value + "%";
    };
  }
});
