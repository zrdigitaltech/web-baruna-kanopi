<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  @include('partials.head')
</head>

<body>
  <!-- Google Tag Manager (noscript) -->
  <!-- End Google Tag Manager (noscript) -->
  <div class="site" id="page">
    @include('partials.header')
    <div class="justg-top-content"></div>

    <div id="wrapper-content">
      <div class="fl-builder-content fl-builder-content-11 fl-builder-content-primary fl-builder-global-templates-locked">
        @yield('content')
      </div>
    </div>

    @include('partials.footer')
  </div>

  <script type="speculationrules">
    {"prefetch":[{"source":"document","where":{"and":[{"href_matches":"\/*"},{"not":{"href_matches":["\/wp-*.php","\/wp-admin\/*","\/wp-content\/uploads\/*","\/wp-content\/*","\/wp-content\/plugins\/*","\/wp-content\/themes\/velocity-child\/*","\/wp-content\/themes\/velocity\/*","\/*\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\"nofollow\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
</script>
  <div class="floating-footer float-wa-right float-scrolltop-right"></div>
  <div class="floating-footer float-wa-right float-scrolltop-right">
    <div class="whatsapp-floating floating-button right scroll-active scroll-right ">
      <a href="https://wa.me/6281347152882?text=Halo.." class="text-white" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
        </svg>
        <span class="d-none d-md-inline-block">Butuh Bantuan?</span>
      </a>
    </div>
    <div class="scroll-to-top floating-button right" style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
      </svg>
    </div>
  </div>

  <script src="{{ asset('assets/js/jquery.easing.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.fitvids.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.bxslider.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.wookmark.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.mosaicflow.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.imagesloaded.min.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.magnificpopup.min.js') }}"></script>
  <script src="{{ asset('assets/js/11-layout.js') }}"></script>
  <script src="{{ asset('assets/js/jquery.ba-throttle-debounce.min.js') }}"></script>
  <script src="{{ asset('assets/js/29f07c8e71da65aa6e649d8f8c494d51-layout-bundle.js') }}"></script>

  <script id="rocket_lazyload_css-js-extra">
    var rocket_lazyload_css_data = {
      "threshold": "300"
    };
  </script>
  <script id="rocket_lazyload_css-js-after">
    ! function o(n, c, a) {
      function s(t, e) {
        if (!c[t]) {
          if (!n[t]) {
            var r = "function" == typeof require && require;
            if (!e && r) return r(t, !0);
            if (u) return u(t, !0);
            throw (r = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", r
          }
          r = c[t] = {
            exports: {}
          }, n[t][0].call(r.exports, function(e) {
            return s(n[t][1][e] || e)
          }, r, r.exports, o, n, c, a)
        }
        return c[t].exports
      }
      for (var u = "function" == typeof require && require, e = 0; e < a.length; e++) s(a[e]);
      return s
    }({
      1: [function(e, t, r) {
        "use strict";
        ! function() {
          const r = "undefined" == typeof rocket_pairs ? [] : rocket_pairs,
            e = "undefined" == typeof rocket_excluded_pairs ? [] : rocket_excluded_pairs;
          e.map(t => {
            var e = t.selector;
            const r = document.querySelectorAll(e);
            r.forEach(e => {
              e.setAttribute("data-rocket-lazy-bg-".concat(t.hash), "excluded")
            })
          });
          const o = document.querySelector("#wpr-lazyload-bg");
          var t = rocket_lazyload_css_data.threshold || 300;
          const n = new IntersectionObserver(e => {
            e.forEach(t => {
              if (t.isIntersecting) {
                const e = r.filter(e => t.target.matches(e.selector));
                e.map(t => {
                  t && (o.innerHTML += t.style, t.elements.forEach(e => {
                    n.unobserve(e), e.setAttribute("data-rocket-lazy-bg-".concat(t.hash), "loaded")
                  }))
                })
              }
            })
          }, {
            rootMargin: t + "px"
          });

          function c() {
            0 < (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).length && r.forEach(t => {
              try {
                const e = document.querySelectorAll(t.selector);
                e.forEach(e => {
                  "loaded" !== e.getAttribute("data-rocket-lazy-bg-".concat(t.hash)) && "excluded" !== e.getAttribute("data-rocket-lazy-bg-".concat(t.hash)) && (n.observe(e), (t.elements || (t.elements = [])).push(e))
                })
              } catch (e) {
                console.error(e)
              }
            })
          }
          c();
          const a = function() {
            const o = window.MutationObserver;
            return function(e, t) {
              if (e && 1 === e.nodeType) {
                const r = new o(t);
                return r.observe(e, {
                  attributes: !0,
                  childList: !0,
                  subtree: !0
                }), r
              }
            }
          }();
          t = document.querySelector("body"), a(t, c)
        }()
      }, {}]
    }, {}, [1]);
    //# sourceMappingURL=lazyload-css.min.js.map
  </script>
  <script src="{{ asset('assets/js/custom.js') }}"></script>
  {{-- <script id="justg-scripts-js-extra">
    var opt = {
      "ajaxUrl": "https:\/\/galaxykanopi.com\/wp-admin\/admin-ajax.php",
      "ajaxPost": "https:\/\/galaxykanopi.com\/wp-admin\/admin-post.php",
      "restUrl": "https:\/\/galaxykanopi.com\/wp-json\/",
      "restUrlProduct": "https:\/\/galaxykanopi.com\/wp-json\/wp\/v2\/product",
      "shopName": "galaxy-steel",
      "inWishlist": "Already in wishlist",
      "removeWishlist": "Remove from wishlist",
      "buttonText": "Details",
      "error": "Something went wrong, could not add to wishlist",
      "noWishlist": "No wishlist found"
    };
  </script> --}}
  {{-- <script src="{{ asset('assets/js/theme.min.js') }}"></script> --}}
  <script>
    window.lazyLoadOptions = [{
      elements_selector: "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]",
      data_src: "lazy-src",
      data_srcset: "lazy-srcset",
      data_sizes: "lazy-sizes",
      class_loading: "lazyloading",
      class_loaded: "lazyloaded",
      threshold: 300,
      callback_loaded: function(element) {
        if (element.tagName === "IFRAME" && element.dataset.rocketLazyload == "fitvidscompatible") {
          if (element.classList.contains("lazyloaded")) {
            if (typeof window.jQuery != "undefined") {
              if (jQuery.fn.fitVids) {
                jQuery(element).parent().fitVids()
              }
            }
          }
        }
      }
    }, {
      elements_selector: ".rocket-lazyload",
      data_src: "lazy-src",
      data_srcset: "lazy-srcset",
      data_sizes: "lazy-sizes",
      class_loading: "lazyloading",
      class_loaded: "lazyloaded",
      threshold: 300,
    }];
    window.addEventListener('LazyLoad::Initialized', function(e) {
      var lazyLoadInstance = e.detail.instance;
      if (window.MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
          var image_count = 0;
          var iframe_count = 0;
          var rocketlazy_count = 0;
          mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
              if (typeof mutation.addedNodes[i].getElementsByTagName !== 'function') {
                continue
              }
              if (typeof mutation.addedNodes[i].getElementsByClassName !== 'function') {
                continue
              }
              images = mutation.addedNodes[i].getElementsByTagName('img');
              is_image = mutation.addedNodes[i].tagName == "IMG";
              iframes = mutation.addedNodes[i].getElementsByTagName('iframe');
              is_iframe = mutation.addedNodes[i].tagName == "IFRAME";
              rocket_lazy = mutation.addedNodes[i].getElementsByClassName('rocket-lazyload');
              image_count += images.length;
              iframe_count += iframes.length;
              rocketlazy_count += rocket_lazy.length;
              if (is_image) {
                image_count += 1
              }
              if (is_iframe) {
                iframe_count += 1
              }
            }
          });
          if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
            lazyLoadInstance.update()
          }
        });
        var b = document.getElementsByTagName("body")[0];
        var config = {
          childList: !0,
          subtree: !0
        };
        observer.observe(b, config)
      }
    }, !1)
  </script>
  <script src="{{ asset('assets/js/lazyload.min.js') }}"></script>
  {{-- <script>
    function lazyLoadThumb(e, alt) {
      var t = '<img data-lazy-src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"><noscript><img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" alt="" width="480" height="360"></noscript>',
        a = '<button class="play" aria-label="play Youtube video"></button>';
      t = t.replace('alt=""', 'alt="' + alt + '"');
      return t.replace("ID", e) + a
    }

    function lazyLoadYoutubeIframe() {
      var e = document.createElement("iframe"),
        t = "ID?autoplay=1";
      t += 0 === this.parentNode.dataset.query.length ? '' : '&' + this.parentNode.dataset.query;
      e.setAttribute("src", t.replace("ID", this.parentNode.dataset.src)), e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "1"), e.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"), this.parentNode.parentNode.replaceChild(e, this.parentNode)
    }
    document.addEventListener("DOMContentLoaded", function() {
      var e, t, p, a = document.getElementsByClassName("rll-youtube-player");
      for (t = 0; t < a.length; t++) e = document.createElement("div"), e.setAttribute("data-id", a[t].dataset.id), e.setAttribute("data-query", a[t].dataset.query), e.setAttribute("data-src", a[t].dataset.src), e.innerHTML = lazyLoadThumb(a[t].dataset.id, a[t].dataset.alt), a[t].appendChild(e), p = e.querySelector('.play'), p.onclick = lazyLoadYoutubeIframe
    });
  </script> --}}


</body>

</html>