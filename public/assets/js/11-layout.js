var wpAjaxUrl = "";
var flBuilderUrl = "";
var FLBuilderLayoutConfig = {
    anchorLinkAnimations: { duration: 1000, easing: "swing", offset: -10 },
    paths: {
        pluginUrl: "",
        wpAjaxUrl: "",
    },
    breakpoints: { small: 768, medium: 992, large: 1200 },
    waypoint: { offset: 80 },
    emptyColWidth: "0%",
};
(function ($) {
    if (typeof FLBuilderLayout != "undefined") {
        return;
    }
    FLBuilderLayout = {
        init: function () {
            FLBuilderLayout._destroy();
            FLBuilderLayout._initClasses();
            FLBuilderLayout._initBackgrounds();
            FLBuilderLayout._initRowShapeLayerHeight();
            if (0 === $(".fl-builder-edit").length) {
                FLBuilderLayout._initModuleAnimations();
                FLBuilderLayout._initAnchorLinks();
                FLBuilderLayout._initHash();
                FLBuilderLayout._initForms();
                FLBuilderLayout._reorderMenu();
            } else {
                FLBuilderLayout._initNestedColsWidth();
            }
        },
        refreshGalleries: function (element) {
            var $element =
                    "undefined" == typeof element ? $("body") : $(element),
                mfContent = $element.find(".fl-mosaicflow-content"),
                wmContent = $element.find(".fl-gallery"),
                mfObject = null;
            if (mfContent) {
                mfObject = mfContent.data("mosaicflow");
                if (mfObject) {
                    mfObject.columns = $([]);
                    mfObject.columnsHeights = [];
                    mfContent.data("mosaicflow", mfObject);
                    mfContent.mosaicflow("refill");
                }
            }
            if (wmContent) {
                wmContent.trigger("refreshWookmark");
            }
        },
        refreshGridLayout: function (element) {
            var $element =
                    "undefined" == typeof element ? $("body") : $(element),
                msnryContent = $element.find(".masonry");
            if (msnryContent.length) {
                msnryContent.masonry("layout");
            }
        },
        reloadSlider: function (content) {
            var $content =
                "undefined" == typeof content ? $("body") : $(content);
            if ($content.find(".bx-viewport > div").length > 0) {
                $.each(
                    $content.find(".bx-viewport > div"),
                    function (key, slider) {
                        setTimeout(function () {
                            $(slider).data("bxSlider").reloadSlider();
                        }, 100);
                    }
                );
            }
        },
        resizeAudio: function (element) {
            var $element =
                    "undefined" == typeof element ? $("body") : $(element),
                audioPlayers = $element.find(".wp-audio-shortcode.mejs-audio"),
                player = null,
                mejsPlayer = null,
                rail = null,
                railWidth = 400;
            if (audioPlayers.length && typeof mejs !== "undefined") {
                audioPlayers.each(function () {
                    player = $(this);
                    mejsPlayer = mejs.players[player.attr("id")];
                    rail = player.find(".mejs-controls .mejs-time-rail");
                    var innerMejs = player.find(".mejs-inner"),
                        total = player.find(".mejs-controls .mejs-time-total");
                    if (typeof mejsPlayer !== "undefined") {
                        railWidth = Math.ceil(player.width() * 0.8);
                        if (innerMejs.length) {
                            rail.css("width", railWidth + "px!important");
                            mejsPlayer.options.autosizeProgress = !0;
                            setTimeout(function () {
                                mejsPlayer.setControlsSize();
                            }, 50);
                            player.find(".mejs-inner").css({
                                visibility: "visible",
                                height: "inherit",
                            });
                        }
                    }
                });
            }
        },
        preloadAudio: function (element) {
            var $element =
                    "undefined" == typeof element ? $("body") : $(element),
                contentWrap = $element.closest(".fl-accordion-item"),
                audioPlayers = $element.find(".wp-audio-shortcode.mejs-audio");
            if (
                !contentWrap.hasClass("fl-accordion-item-active") &&
                audioPlayers.find(".mejs-inner").length
            ) {
                audioPlayers
                    .find(".mejs-inner")
                    .css({ visibility: "hidden", height: 0 });
            }
        },
        resizeSlideshow: function () {
            if (typeof YUI !== "undefined") {
                YUI().use("node-event-simulate", function (Y) {
                    Y.one(window).simulate("resize");
                });
            }
        },
        reloadGoogleMap: function (element) {
            var $element =
                    "undefined" == typeof element ? $("body") : $(element),
                googleMap = $element.find('iframe[src*="google.com/maps"]');
            if (googleMap.length) {
                googleMap.attr("src", function (i, val) {
                    return val;
                });
            }
        },
        _destroy: function () {
            var win = $(window);
            win.off("scroll.fl-bg-parallax");
            win.off("resize.fl-bg-video");
        },
        _isTouch: function () {
            if (
                "ontouchstart" in window ||
                (window.DocumentTouch && document instanceof DocumentTouch)
            ) {
                return !0;
            }
            return !1;
        },
        _isMobile: function () {
            return /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi|webOS/i.test(
                navigator.userAgent
            );
        },
        _initClasses: function () {
            var body = $("body"),
                ua = navigator.userAgent;
            if (
                !body.hasClass("archive") &&
                $(".fl-builder-content-primary").length > 0
            ) {
                body.addClass("fl-builder");
            }
            if (FLBuilderLayout._isTouch()) {
                body.addClass("fl-builder-touch");
            }
            if (FLBuilderLayout._isMobile()) {
                body.addClass("fl-builder-mobile");
            }
            if ($(window).width() < FLBuilderLayoutConfig.breakpoints.small) {
                body.addClass("fl-builder-breakpoint-small");
            }
            if (
                $(window).width() > FLBuilderLayoutConfig.breakpoints.small &&
                $(window).width() < FLBuilderLayoutConfig.breakpoints.medium
            ) {
                body.addClass("fl-builder-breakpoint-medium");
            }
            if (
                $(window).width() > FLBuilderLayoutConfig.breakpoints.medium &&
                $(window).width() < FLBuilderLayoutConfig.breakpoints.large
            ) {
                body.addClass("fl-builder-breakpoint-large");
            }
            if ($(window).width() > FLBuilderLayoutConfig.breakpoints.large) {
                body.addClass("fl-builder-breakpoint-default");
            }
            if (ua.indexOf("Trident/7.0") > -1 && ua.indexOf("rv:11.0") > -1) {
                body.addClass("fl-builder-ie-11");
            }
        },
        _initBackgrounds: function () {
            var win = $(window);
            if (
                $(".fl-row-bg-parallax").length > 0 &&
                !FLBuilderLayout._isMobile()
            ) {
                FLBuilderLayout._scrollParallaxBackgrounds();
                FLBuilderLayout._initParallaxBackgrounds();
                win.on(
                    "resize.fl-bg-parallax",
                    FLBuilderLayout._initParallaxBackgrounds
                );
                win.on(
                    "scroll.fl-bg-parallax",
                    FLBuilderLayout._scrollParallaxBackgrounds
                );
            }
            if ($(".fl-bg-video").length > 0) {
                FLBuilderLayout._initBgVideos();
                FLBuilderLayout._resizeBgVideos();
                var resizeBGTimer = null;
                win.on("resize.fl-bg-video", function (e) {
                    clearTimeout(resizeBGTimer);
                    resizeBGTimer = setTimeout(function () {
                        FLBuilderLayout._resizeBgVideos(e);
                    }, 100);
                });
            }
        },
        _initParallaxBackgrounds: function () {
            $(".fl-row-bg-parallax").each(
                FLBuilderLayout._initParallaxBackground
            );
        },
        _initParallaxBackground: function () {
            var row = $(this),
                content = row.find("> .fl-row-content-wrap"),
                winWidth = $(window).width(),
                screenSize = "",
                imageSrc = { default: "", medium: "", responsive: "" };
            imageSrc.default = row.data("parallax-image") || "";
            imageSrc.medium =
                row.data("parallax-image-medium") || imageSrc.default;
            imageSrc.responsive =
                row.data("parallax-image-responsive") || imageSrc.medium;
            if (winWidth > FLBuilderLayoutConfig.breakpoints.medium) {
                screenSize = "default";
            } else if (
                winWidth > FLBuilderLayoutConfig.breakpoints.small &&
                winWidth <= FLBuilderLayoutConfig.breakpoints.medium
            ) {
                screenSize = "medium";
            } else if (winWidth <= FLBuilderLayoutConfig.breakpoints.small) {
                screenSize = "responsive";
            }
            content.css(
                "background-image",
                "url(" + imageSrc[screenSize] + ")"
            );
            row.data("current-image-loaded", screenSize);
        },
        _scrollParallaxBackgrounds: function () {
            $(".fl-row-bg-parallax").each(
                FLBuilderLayout._scrollParallaxBackground
            );
        },
        _scrollParallaxBackground: function () {
            var win = $(window),
                row = $(this),
                content = row.find("> .fl-row-content-wrap"),
                speed = row.data("parallax-speed"),
                offset = content.offset(),
                yPos = -((win.scrollTop() - offset.top) / speed),
                initialOffset =
                    row.data("parallax-offset") != null
                        ? row.data("parallax-offset")
                        : 0,
                totalOffset = yPos - initialOffset;
            content.css("background-position", "center " + totalOffset + "px");
        },
        _initBgVideos: function () {
            $(".fl-bg-video").each(FLBuilderLayout._initBgVideo);
        },
        _initBgVideo: function () {
            var wrap = $(this),
                width = wrap.data("width"),
                height = wrap.data("height"),
                mp4 = wrap.data("mp4"),
                youtube = wrap.data("youtube"),
                vimeo = wrap.data("vimeo"),
                mp4Type = wrap.data("mp4-type"),
                webm = wrap.data("webm"),
                webmType = wrap.data("webm-type"),
                fallback = wrap.data("fallback"),
                loaded = wrap.data("loaded"),
                videoMobile = wrap.data("video-mobile"),
                fallbackTag = "",
                videoTag = null,
                mp4Tag = null,
                webmTag = null;
            if (loaded) {
                return;
            }
            videoTag = $("<video autoplay loop muted playsinline></video>");
            if ("undefined" != typeof fallback && "" != fallback) {
                videoTag.attr(
                    "poster",
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                );
                videoTag.css({
                    backgroundImage: 'url("' + fallback + '")',
                    backgroundColor: "transparent",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                });
            }
            if ("undefined" != typeof mp4 && "" != mp4) {
                mp4Tag = $("<source />");
                mp4Tag.attr("src", mp4);
                mp4Tag.attr("type", mp4Type);
                videoTag.append(mp4Tag);
            }
            if ("undefined" != typeof webm && "" != webm) {
                webmTag = $("<source />");
                webmTag.attr("src", webm);
                webmTag.attr("type", webmType);
                videoTag.append(webmTag);
            }
            if (
                !FLBuilderLayout._isMobile() ||
                (FLBuilderLayout._isMobile() && "yes" == videoMobile)
            ) {
                if ("undefined" != typeof youtube) {
                    FLBuilderLayout._initYoutubeBgVideo.apply(this);
                } else if ("undefined" != typeof vimeo) {
                    FLBuilderLayout._initVimeoBgVideo.apply(this);
                } else {
                    wrap.append(videoTag);
                }
            } else {
                videoTag.attr("src", "");
                wrap.append(videoTag);
            }
            wrap.data("loaded", !0);
        },
        _initYoutubeBgVideo: function () {
            var playerWrap = $(this),
                videoId = playerWrap.data("video-id"),
                videoPlayer = playerWrap.find(".fl-bg-video-player"),
                enableAudio = playerWrap.data("enable-audio"),
                audioButton = playerWrap.find(".fl-bg-video-audio"),
                startTime =
                    "undefined" !== typeof playerWrap.data("start")
                        ? playerWrap.data("start")
                        : 0,
                startTime =
                    "undefined" !== typeof playerWrap.data("t") &&
                    startTime === 0
                        ? playerWrap.data("t")
                        : startTime,
                endTime =
                    "undefined" !== typeof playerWrap.data("end")
                        ? playerWrap.data("end")
                        : 0,
                loop =
                    "undefined" !== typeof playerWrap.data("loop")
                        ? playerWrap.data("loop")
                        : 1,
                stateCount = 0,
                player,
                fallback_showing;
            if (videoId) {
                fallback = playerWrap.data("fallback") || !1;
                if (fallback) {
                    playerWrap.find("iframe").remove();
                    fallbackTag = $("<div></div>");
                    fallbackTag.addClass("fl-bg-video-fallback");
                    fallbackTag.css(
                        "background-image",
                        "url(" + playerWrap.data("fallback") + ")"
                    );
                    fallbackTag.css("background-size", "cover");
                    fallbackTag.css("transition", "background-image 1s");
                    playerWrap.append(fallbackTag);
                    fallback_showing = !0;
                }
                FLBuilderLayout._onYoutubeApiReady(function (YT) {
                    setTimeout(function () {
                        player = new YT.Player(videoPlayer[0], {
                            videoId: videoId,
                            events: {
                                onReady: function (event) {
                                    if (
                                        "no" === enableAudio ||
                                        FLBuilderLayout._isMobile()
                                    ) {
                                        event.target.mute();
                                    } else if (
                                        "yes" === enableAudio &&
                                        event.target.isMuted
                                    ) {
                                        event.target.unMute();
                                    }
                                    playerWrap.data("YTPlayer", player);
                                    FLBuilderLayout._resizeYoutubeBgVideo.apply(
                                        playerWrap
                                    );
                                    event.target.playVideo();
                                    if (
                                        audioButton.length > 0 &&
                                        !FLBuilderLayout._isMobile()
                                    ) {
                                        audioButton.on(
                                            "click",
                                            {
                                                button: audioButton,
                                                player: player,
                                            },
                                            FLBuilderLayout._toggleBgVideoAudio
                                        );
                                    }
                                },
                                onStateChange: function (event) {
                                    if (event.data === 1) {
                                        if (fallback_showing) {
                                            $(".fl-bg-video-fallback").css(
                                                "background-image",
                                                "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                                            );
                                        }
                                    }
                                    if (stateCount < 4) {
                                        stateCount++;
                                    }
                                    if (
                                        stateCount > 1 &&
                                        (-1 === event.data ||
                                            2 === event.data) &&
                                        "yes" === enableAudio
                                    ) {
                                        player.mute();
                                        player.playVideo();
                                        audioButton.show();
                                    }
                                    if (
                                        event.data === YT.PlayerState.ENDED &&
                                        1 === loop
                                    ) {
                                        if (startTime > 0) {
                                            player.seekTo(startTime);
                                        } else {
                                            player.playVideo();
                                        }
                                    }
                                },
                                onError: function (event) {
                                    console.info("YT Error: " + event.data);
                                    FLBuilderLayout._onErrorYoutubeVimeo(
                                        playerWrap
                                    );
                                },
                            },
                            playerVars: {
                                playsinline: FLBuilderLayout._isMobile()
                                    ? 1
                                    : 0,
                                controls: 0,
                                showinfo: 0,
                                rel: 0,
                                start: startTime,
                                end: endTime,
                            },
                        });
                    }, 1);
                });
            }
        },
        _onErrorYoutubeVimeo: function (playerWrap) {
            fallback = playerWrap.data("fallback") || !1;
            if (!fallback) {
                return !1;
            }
            playerWrap.find("iframe").remove();
            fallbackTag = $("<div></div>");
            fallbackTag.addClass("fl-bg-video-fallback");
            fallbackTag.css(
                "background-image",
                "url(" + playerWrap.data("fallback") + ")"
            );
            playerWrap.append(fallbackTag);
        },
        _onYoutubeApiReady: function (callback) {
            if (window.YT && YT.loaded) {
                callback(YT);
            } else {
                setTimeout(function () {
                    FLBuilderLayout._onYoutubeApiReady(callback);
                }, 350);
            }
        },
        _initVimeoBgVideo: function () {
            var playerWrap = $(this),
                videoId = playerWrap.data("video-id"),
                videoPlayer = playerWrap.find(".fl-bg-video-player"),
                enableAudio = playerWrap.data("enable-audio"),
                audioButton = playerWrap.find(".fl-bg-video-audio"),
                player,
                width = playerWrap.outerWidth(),
                ua = navigator.userAgent;
            if (typeof Vimeo !== "undefined" && videoId) {
                player = new Vimeo.Player(videoPlayer[0], {
                    id: videoId,
                    loop: !0,
                    title: !1,
                    portrait: !1,
                    background: !0,
                    autopause: !1,
                    muted: !0,
                });
                playerWrap.data("VMPlayer", player);
                if ("no" === enableAudio) {
                    player.setVolume(0);
                } else if ("yes" === enableAudio) {
                    if (
                        ua.indexOf("Safari") > -1 ||
                        ua.indexOf("Chrome") > -1 ||
                        ua.indexOf("Firefox") > -1
                    ) {
                        player.setVolume(0);
                        audioButton.show();
                    } else {
                        player.setVolume(1);
                    }
                }
                player.play().catch(function (error) {
                    FLBuilderLayout._onErrorYoutubeVimeo(playerWrap);
                });
                if (audioButton.length > 0) {
                    audioButton.on(
                        "click",
                        { button: audioButton, player: player },
                        FLBuilderLayout._toggleBgVideoAudio
                    );
                }
            }
        },
        _toggleBgVideoAudio: function (e) {
            var player = e.data.player,
                control = e.data.button.find(".fl-audio-control");
            if (control.hasClass("fa-volume-off")) {
                control.removeClass("fa-volume-off").addClass("fa-volume-up");
                e.data.button.find(".fa-times").hide();
                if ("function" === typeof player.unMute) {
                    player.unMute();
                } else {
                    player.setVolume(1);
                }
            } else {
                control.removeClass("fa-volume-up").addClass("fa-volume-off");
                e.data.button.find(".fa-times").show();
                if ("function" === typeof player.unMute) {
                    player.mute();
                } else {
                    player.setVolume(0);
                }
            }
        },
        _videoBgSourceError: function (e) {
            var source = $(e.target),
                wrap = source.closest(".fl-bg-video"),
                vid = wrap.find("video"),
                fallback = wrap.data("fallback"),
                fallbackTag = "";
            source.remove();
            if (vid.find("source").length) {
                return;
            } else if ("" !== fallback) {
                fallbackTag = $("<div></div>");
                fallbackTag.addClass("fl-bg-video-fallback");
                fallbackTag.css("background-image", "url(" + fallback + ")");
                wrap.append(fallbackTag);
                vid.remove();
            }
        },
        _resizeBgVideos: function () {
            $(".fl-bg-video").each(function () {
                FLBuilderLayout._resizeBgVideo.apply(this);
                if ($(this).parent().find("img").length > 0) {
                    $(this)
                        .parent()
                        .imagesLoaded(
                            $.proxy(FLBuilderLayout._resizeBgVideo, this)
                        );
                }
            });
        },
        _resizeBgVideo: function () {
            if (
                0 === $(this).find("video").length &&
                0 === $(this).find("iframe").length
            ) {
                return;
            }
            var wrap = $(this),
                wrapHeight = wrap.outerHeight(),
                wrapWidth = wrap.outerWidth(),
                vid = wrap.find("video"),
                vidHeight = wrap.data("height"),
                vidWidth = wrap.data("width"),
                newWidth = wrapWidth,
                newHeight = Math.round((vidHeight * wrapWidth) / vidWidth),
                newLeft = 0,
                newTop = 0,
                iframe = wrap.find("iframe"),
                isRowFullHeight = $(this)
                    .closest(".fl-row-bg-video")
                    .hasClass("fl-row-full-height"),
                vidCSS = {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                };
            if (vid.length) {
                if (
                    vidHeight === "" ||
                    typeof vidHeight === "undefined" ||
                    vidWidth === "" ||
                    typeof vidWidth === "undefined"
                ) {
                    vid.css({
                        left: "0px",
                        top: "0px",
                        width: newWidth + "px",
                    });
                    vid.on(
                        "loadedmetadata",
                        FLBuilderLayout._resizeOnLoadedMeta
                    );
                    return;
                }
                if (!isRowFullHeight) {
                    if (newHeight < wrapHeight) {
                        newHeight = wrapHeight;
                        newLeft = -((newWidth - wrapWidth) / 2);
                        newWidth = vidHeight
                            ? Math.round((vidWidth * wrapHeight) / vidHeight)
                            : newWidth;
                    } else {
                        newTop = -((newHeight - wrapHeight) / 2);
                    }
                    vidCSS = {
                        left: newLeft + "px",
                        top: newTop + "px",
                        height: newHeight + "px",
                        width: newWidth + "px",
                    };
                }
                vid.css(vidCSS);
            } else if (iframe.length) {
                if (typeof wrap.data("youtube") !== "undefined") {
                    FLBuilderLayout._resizeYoutubeBgVideo.apply(this);
                }
            }
        },
        _resizeOnLoadedMeta: function () {
            var video = $(this),
                wrapHeight = video.parent().outerHeight(),
                wrapWidth = video.parent().outerWidth(),
                vidWidth = video[0].videoWidth,
                vidHeight = video[0].videoHeight,
                newHeight = Math.round((vidHeight * wrapWidth) / vidWidth),
                newWidth = wrapWidth,
                newLeft = 0,
                newTop = 0;
            if (newHeight < wrapHeight) {
                newHeight = wrapHeight;
                newWidth = Math.round((vidWidth * wrapHeight) / vidHeight);
                newLeft = -((newWidth - wrapWidth) / 2);
            } else {
                newTop = -((newHeight - wrapHeight) / 2);
            }
            video.parent().data("width", vidWidth);
            video.parent().data("height", vidHeight);
            video.css({
                left: newLeft + "px",
                top: newTop + "px",
                width: newWidth + "px",
                height: newHeight + "px",
            });
        },
        _resizeYoutubeBgVideo: function () {
            var wrap = $(this),
                wrapWidth = wrap.outerWidth(),
                wrapHeight = wrap.outerHeight(),
                player = wrap.data("YTPlayer"),
                video = player ? player.getIframe() : null,
                aspectRatioSetting = "16:9",
                aspectRatioArray = aspectRatioSetting.split(":"),
                aspectRatio = aspectRatioArray[0] / aspectRatioArray[1],
                ratioWidth = wrapWidth / aspectRatio,
                ratioHeight = wrapHeight * aspectRatio,
                isWidthFixed = wrapWidth / wrapHeight > aspectRatio,
                width = isWidthFixed ? wrapWidth : ratioHeight,
                height = isWidthFixed ? ratioWidth : wrapHeight;
            if (video) {
                $(video).width(width).height(height);
            }
        },
        _initModuleAnimations: function () {
            if (typeof jQuery.fn.waypoint !== "undefined") {
                $(".fl-animation").each(function () {
                    var node = $(this),
                        nodeTop = node.offset().top,
                        winHeight = $(window).height(),
                        bodyHeight = $("body").height(),
                        waypoint = FLBuilderLayoutConfig.waypoint,
                        offset = "80%";
                    if (typeof waypoint.offset !== undefined) {
                        offset = FLBuilderLayoutConfig.waypoint.offset + "%";
                    }
                    if (bodyHeight - nodeTop < winHeight * 0.2) {
                        offset = "100%";
                    }
                    node.waypoint({
                        offset: offset,
                        handler: FLBuilderLayout._doModuleAnimation,
                    });
                });
            }
        },
        _doModuleAnimation: function () {
            var module =
                    "undefined" == typeof this.element
                        ? $(this)
                        : $(this.element),
                delay = parseFloat(module.data("animation-delay")),
                duration = parseFloat(module.data("animation-duration"));
            if (!isNaN(duration)) {
                module.css("animation-duration", duration + "s");
            }
            if (!isNaN(delay) && delay > 0) {
                setTimeout(function () {
                    module.addClass("fl-animated");
                }, delay * 1000);
            } else {
                setTimeout(function () {
                    module.addClass("fl-animated");
                }, 1);
            }
        },
        _initHash: function () {
            var hash = window.location.hash.replace("#", "").split("/").shift(),
                element = null,
                tabs = null,
                responsiveLabel = null,
                tabIndex = null,
                label = null;
            if ("" !== hash) {
                try {
                    element = $("#" + hash);
                    if (element.length > 0) {
                        if (element.hasClass("fl-accordion-item")) {
                            setTimeout(function () {
                                element
                                    .find(".fl-accordion-button")
                                    .trigger("click");
                            }, 100);
                        }
                        if (element.hasClass("fl-tabs-panel")) {
                            setTimeout(function () {
                                tabs = element.closest(".fl-tabs");
                                responsiveLabel = element.find(
                                    ".fl-tabs-panel-label"
                                );
                                tabIndex = responsiveLabel.data("index");
                                label = tabs.find(
                                    ".fl-tabs-labels .fl-tabs-label[data-index=" +
                                        tabIndex +
                                        "]"
                                );
                                label[0].click();
                                FLBuilderLayout._scrollToElement(element);
                            }, 100);
                        }
                    }
                } catch (e) {}
            }
        },
        _initAnchorLinks: function () {
            $("a").each(FLBuilderLayout._initAnchorLink);
        },
        _initAnchorLink: function () {
            var link = $(this),
                href = link.attr("href"),
                loc = window.location,
                id = null,
                element = null,
                flNode = !1;
            if (
                "undefined" != typeof href &&
                href.indexOf("#") > -1 &&
                link.closest("svg").length < 1
            ) {
                if (
                    loc.pathname.replace(/^\//, "") ==
                        this.pathname.replace(/^\//, "") &&
                    loc.hostname == this.hostname
                ) {
                    try {
                        id = href.split("#").pop();
                        if (!id) {
                            return;
                        }
                        element = $("#" + id);
                        if (element.length > 0) {
                            flNode =
                                element.hasClass("fl-row") ||
                                element.hasClass("fl-col") ||
                                element.hasClass("fl-module");
                            if (
                                !element.hasClass("fl-no-scroll") &&
                                (link.hasClass("fl-scroll-link") || flNode)
                            ) {
                                $(link).on(
                                    "click",
                                    FLBuilderLayout._scrollToElementOnLinkClick
                                );
                            }
                            if (element.hasClass("fl-accordion-item")) {
                                $(link).on(
                                    "click",
                                    FLBuilderLayout._scrollToAccordionOnLinkClick
                                );
                            }
                            if (element.hasClass("fl-tabs-panel")) {
                                $(link).on(
                                    "click",
                                    FLBuilderLayout._scrollToTabOnLinkClick
                                );
                            }
                        }
                    } catch (e) {}
                }
            }
        },
        _scrollToElementOnLinkClick: function (e, callback) {
            var element = $("#" + $(this).attr("href").split("#").pop());
            FLBuilderLayout._scrollToElement(element, callback);
            e.preventDefault();
        },
        _scrollSpy: function () {
            var sections = [];
            var $menuLinks = $("#menu-menu-utama a[href^='#']");

            // Ambil semua target ID
            $menuLinks.each(function () {
                var id = $(this).attr("href").split("#")[1];
                var $target = $("#" + id);
                if ($target.length) {
                    sections.push({
                        id: id,
                        top: $target.offset().top,
                        height: $target.outerHeight(),
                    });
                }
            });

            // Scroll listener
            $(window).on("scroll", function () {
                var scrollPos =
                    $(document).scrollTop() +
                    FLBuilderLayoutConfig.anchorLinkAnimations.offset;
                // pastikan offset negatif bisa dipakai

                var currentSectionId = null;

                for (var i = 0; i < sections.length; i++) {
                    var s = sections[i];
                    if (scrollPos >= s.top && scrollPos < s.top + s.height) {
                        currentSectionId = s.id;
                        break;
                    }
                }

                // Update menu
                if (currentSectionId) {
                    $("#menu-menu-utama li").removeClass("current-menu-item");
                    $('#menu-menu-utama a[href="#' + currentSectionId + '"]')
                        .parent()
                        .addClass("current-menu-item");
                }
            });
        },
        _scrollToElement: function (element, callback) {
            var config = FLBuilderLayoutConfig.anchorLinkAnimations,
                dest = 0,
                win = $(window),
                doc = $(document);

            if (element.length > 0) {
                if (
                    "fixed" === element.css("position") ||
                    "fixed" === element.parent().css("position")
                ) {
                    dest = element.position().top;
                } else if (element.offset().top > doc.height() - win.height()) {
                    dest = doc.height() - win.height();
                } else {
                    dest = element.offset().top - config.offset;
                }

                $("html, body").animate(
                    { scrollTop: dest },
                    config.duration,
                    config.easing,
                    function () {
                        if ("undefined" != typeof callback) {
                            callback();
                        }

                        // === Tambahan: Aktifkan menu ===
                        if (undefined !== element.attr("id")) {
                            var id = element.attr("id");

                            // Hapus semua class active dari menu
                            $("#menu-menu-utama li").removeClass(
                                "current-menu-item"
                            );

                            // Tambahkan class active ke item yang cocok
                            $('#menu-menu-utama a[href="#' + id + '"]')
                                .parent()
                                .addClass("current-menu-item");

                            // Update URL hash
                            if (history.pushState) {
                                history.pushState(null, null, "#" + id);
                            } else {
                                window.location.hash = id;
                            }
                        }
                    }
                );
            }
        },
        _scrollToAccordionOnLinkClick: function (e) {
            var element = $("#" + $(this).attr("href").split("#").pop());
            if (element.length > 0) {
                var callback = function () {
                    if (element) {
                        element.find(".fl-accordion-button").trigger("click");
                        element = !1;
                    }
                };
                FLBuilderLayout._scrollToElementOnLinkClick.call(
                    this,
                    e,
                    callback
                );
            }
        },
        _scrollToTabOnLinkClick: function (e) {
            var element = $("#" + $(this).attr("href").split("#").pop()),
                tabs = null,
                label = null,
                responsiveLabel = null;
            if (element.length > 0) {
                tabs = element.closest(".fl-tabs");
                responsiveLabel = element.find(".fl-tabs-panel-label");
                tabIndex = responsiveLabel.data("index");
                label = tabs.find(
                    ".fl-tabs-labels .fl-tabs-label[data-index=" +
                        tabIndex +
                        "]"
                );
                if (responsiveLabel.is(":visible")) {
                    var callback = function () {
                        if (element) {
                            responsiveLabel.trigger(
                                $.Event("click", { which: 1 })
                            );
                        }
                    };
                    FLBuilderLayout._scrollToElementOnLinkClick.call(
                        this,
                        e,
                        callback
                    );
                } else {
                    label[0].click();
                    FLBuilderLayout._scrollToElement(element);
                }
                e.preventDefault();
            }
        },
        _initForms: function () {
            if (!FLBuilderLayout._hasPlaceholderSupport) {
                $(".fl-form-field input").each(
                    FLBuilderLayout._initFormFieldPlaceholderFallback
                );
            }
            $(".fl-form-field input").on(
                "focus",
                FLBuilderLayout._clearFormFieldError
            );
        },
        _hasPlaceholderSupport: function () {
            var input = document.createElement("input");
            return "undefined" != input.placeholder;
        },
        _initFormFieldPlaceholderFallback: function () {
            var field = $(this),
                val = field.val(),
                placeholder = field.attr("placeholder");
            if ("undefined" != placeholder && "" === val) {
                field.val(placeholder);
                field.on(
                    "focus",
                    FLBuilderLayout._hideFormFieldPlaceholderFallback
                );
                field.on(
                    "blur",
                    FLBuilderLayout._showFormFieldPlaceholderFallback
                );
            }
        },
        _hideFormFieldPlaceholderFallback: function () {
            var field = $(this),
                val = field.val(),
                placeholder = field.attr("placeholder");
            if (val == placeholder) {
                field.val("");
            }
        },
        _showFormFieldPlaceholderFallback: function () {
            var field = $(this),
                val = field.val(),
                placeholder = field.attr("placeholder");
            if ("" === val) {
                field.val(placeholder);
            }
        },
        _clearFormFieldError: function () {
            var field = $(this);
            field.removeClass("fl-form-error");
            field.siblings(".fl-form-error-message").hide();
        },
        _initRowShapeLayerHeight: function () {
            FLBuilderLayout._adjustRowShapeLayerHeight();
            $(window).on("resize", FLBuilderLayout._adjustRowShapeLayerHeight);
        },
        _initNestedColsWidth: function () {
            var nestedCols = $(".fl-col-has-cols");
            if (nestedCols.length <= 0) {
                return;
            }
            $(nestedCols).each(function (index, col) {
                if ($(col).width() <= 0) {
                    $(col).css("width", FLBuilderLayoutConfig.emptyColWidth);
                }
            });
        },
        _adjustRowShapeLayerHeight: function () {
            var rowShapeLayers = $(".fl-builder-shape-layer");
            $(rowShapeLayers).each(function (index) {
                var rowShapeLayer = $(this),
                    shape = $(rowShapeLayer).find("svg"),
                    height = shape.height(),
                    excludeShapes =
                        ".fl-builder-shape-circle, .fl-builder-shape-dot-cluster, .fl-builder-shape-topography, .fl-builder-shape-rect";
                if (!rowShapeLayer.is(excludeShapes)) {
                    $(shape).css("height", Math.ceil(height));
                }
            });
        },
        _string_to_slug: function (str) {
            str = str.replace(/^\s+|\s+$/g, "");
            if ("undefined" == typeof window._fl_string_to_slug_regex) {
                regex = new RegExp("[^a-zA-Z0-9'\":() !.,-_|]", "g");
            } else {
                regex = new RegExp(
                    "[^" +
                        window._fl_string_to_slug_regex +
                        "'\":() !.,-_|\\p{Letter}]",
                    "ug"
                );
            }
            str = str.replace(regex, "").replace(/\s+/g, " ");
            return str;
        },
        _reorderMenu: function () {
            if (
                $("#wp-admin-bar-fl-builder-frontend-edit-link-default li")
                    .length > 1
            ) {
                $("#wp-admin-bar-fl-builder-frontend-duplicate-link")
                    .appendTo(
                        "#wp-admin-bar-fl-builder-frontend-edit-link-default"
                    )
                    .css("padding-top", "5px")
                    .css("border-top", "2px solid #1D2125")
                    .css("margin-top", "5px");
            }
        },
    };
    $(function () {
        FLBuilderLayout.init();
    });
})(jQuery);
(function ($) {
    $(function () {
        var sliderIndex =
                "undefined" === typeof FLBuilder
                    ? false
                    : FLBuilder.getSandbox("sliderIndex"),
            autoPlay = 1,
            dots = 0;
        if (!1 === sliderIndex) {
            $(".fl-node-lh7todf5snuk .fl-content-slider-wrapper").css(
                "opacity",
                "1"
            );
        }
        var slider = $(".fl-node-lh7todf5snuk .fl-content-slider-wrapper")
            .delay(1000)
            .bxSlider({
                adaptiveHeight: !0,
                ariaLive: !1,
                startSlide: sliderIndex ? sliderIndex : 0,
                auto: autoPlay && !1 === sliderIndex ? true : !1,
                autoHover: !0,
                autoControls: !1,
                pause: 5000,
                mode: "horizontal",
                speed: 500,
                controls: !1,
                infiniteLoop: !0,
                pager: dots && !1 === sliderIndex ? true : !1,
                video: !0,
                onSliderLoad: function (currentIndex) {
                    if (!1 !== sliderIndex) {
                        $(
                            ".fl-node-lh7todf5snuk .fl-content-slider-wrapper"
                        ).css("opacity", "1");
                    }
                    $(
                        ".fl-node-lh7todf5snuk .fl-content-slider-wrapper"
                    ).addClass("fl-content-slider-loaded");
                    $(".fl-node-lh7todf5snuk iframe").each(function () {
                        var src = $(this).attr("src");
                        $(this).attr("data-url", src);
                        if (
                            !$(this).is(":visible") ||
                            0 ===
                                $(this).parents(".fl-slide-0:not(.bx-clone)")
                                    .length
                        ) {
                            $(this).attr("src", "");
                        }
                    });
                    $(".fl-slide-0:not(.bx-clone) video[autoplay]").trigger(
                        "play"
                    );
                },
                onSlideBefore: function (ele, oldIndex, newIndex) {
                    this.stopAuto(!0);
                    $(
                        ".fl-node-lh7todf5snuk .fl-content-slider-navigation a"
                    ).addClass("disabled");
                    $(
                        ".fl-node-lh7todf5snuk .bx-controls .bx-pager-link"
                    ).addClass("disabled");
                    this.startAuto(!0);
                },
                onSlideAfter: function (ele, oldIndex, newIndex) {
                    var prevSlide = $(
                            ".fl-node-lh7todf5snuk .fl-slide-" +
                                oldIndex +
                                ":not(.bx-clone)"
                        ),
                        newSlide = $(
                            ".fl-node-lh7todf5snuk .fl-slide-" +
                                newIndex +
                                ":not(.bx-clone)"
                        );
                    if (newSlide.find("iframe:visible").length) {
                        newSlide.find("iframe:visible").each(function () {
                            var src = $(this).attr("data-url");
                            $(this).attr("src", src);
                        });
                    }
                    if (prevSlide.find("iframe:visible").length) {
                        prevSlide.find("iframe:visible").each(function () {
                            var src = $(this).attr("src");
                            $(this).attr("src", "");
                        });
                    }
                    $(
                        ".fl-node-lh7todf5snuk .fl-content-slider-navigation a"
                    ).removeClass("disabled");
                    $(
                        ".fl-node-lh7todf5snuk .bx-controls .bx-pager-link"
                    ).removeClass("disabled");
                    if (prevSlide.find("video").length) {
                        prevSlide.find("video").trigger("pause");
                    }
                    $(
                        ".fl-node-lh7todf5snuk .fl-slide-" +
                            newIndex +
                            ":not(.bx-clone)"
                    )
                        .find("video[autoplay]")
                        .trigger("play");
                },
            });
        slider.data("bxSlider", slider);
        $(".fl-node-lh7todf5snuk .slider-prev").on("click", function (e) {
            e.preventDefault();
            slider.stopAuto(!0);
            slider.goToPrevSlide();
            slider.startAuto(!0);
        });
        $(".fl-node-lh7todf5snuk .slider-next").on("click", function (e) {
            e.preventDefault();
            slider.stopAuto(!0);
            slider.goToNextSlide();
            slider.startAuto(!0);
        });
    });
})(jQuery);
jQuery(function ($) {
    $(function () {
        $(".fl-node-ovfh1ecluwnj .fl-photo-img")
            .on("mouseenter", function (e) {
                $(this)
                    .data("title", $(this).attr("title"))
                    .removeAttr("title");
            })
            .on("mouseleave", function (e) {
                $(this)
                    .attr("title", $(this).data("title"))
                    .data("title", null);
            });
    });
    window._fl_string_to_slug_regex = "a-zA-Z0-9";
});
jQuery(function ($) {
    $(function () {
        $(".fl-node-53dq7mkyj16x .fl-photo-img")
            .on("mouseenter", function (e) {
                $(this)
                    .data("title", $(this).attr("title"))
                    .removeAttr("title");
            })
            .on("mouseleave", function (e) {
                $(this)
                    .attr("title", $(this).data("title"))
                    .data("title", null);
            });
    });
    window._fl_string_to_slug_regex = "a-zA-Z0-9";
});
(function ($) {
    $(function () {
        if (typeof $.fn.magnificPopup !== "undefined") {
            $(
                ".fl-node-jyqkagenxlow .fl-mosaicflow-content, .fl-node-jyqkagenxlow .fl-gallery"
            ).magnificPopup({
                delegate: ".fl-photo-content > a",
                closeBtnInside: !1,
                type: "image",
                gallery: { enabled: !0, navigateByImgClick: !0 },
                image: { titleSrc: function (item) {} },
                callbacks: {
                    open: function () {
                        if (this.items.length > 0) {
                            var parent,
                                item,
                                newIndex = 0,
                                newItems = [],
                                currItem = this.currItem,
                                newCurrItemIndex = -1;
                            $(this.items).each(function (i, data) {
                                item = $(this);
                                if ("undefined" !== typeof this.el) {
                                    item = this.el;
                                }
                                parent = item.parents(".fl-mosaicflow-item");
                                newIndex = $(parent)
                                    .attr("id")
                                    .split("-")
                                    .pop();
                                newIndex = newIndex > 0 ? newIndex - 1 : 0;
                                newItems[newIndex] = this;
                                if (currItem.src === this.src) {
                                    newCurrItemIndex = newIndex;
                                }
                            });
                            this.items = newItems;
                            if (newCurrItemIndex >= 0) {
                                this.goTo(newCurrItemIndex);
                            }
                        }
                    },
                },
            });
        }
        $(".fl-node-jyqkagenxlow .fl-mosaicflow-content")
            .one("mosaicflow-filled", function () {
                var hash = window.location.hash.replace("#", "");
                if (hash != "") {
                    FLBuilderLayout._scrollToElement($("#" + hash));
                }
                if ("undefined" != typeof Waypoint) {
                    Waypoint.refreshAll();
                }
            })
            .mosaicflow({
                itemSelector: ".fl-mosaicflow-item",
                columnClass: "fl-mosaicflow-col",
                minItemWidth: 300,
            });
    });
    jQuery(document).ready(function () {
        setTimeout(function () {
            jQuery(".fl-node-jyqkagenxlow .fl-mosaicflow-content").trigger(
                "resize"
            );
        }, 50);
    });
})(jQuery);
!(function (i) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], i)
        : "undefined" != typeof exports
        ? (module.exports = i(require("jquery")))
        : i(jQuery);
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    ((e = (function () {
        var e = 0;
        return function (t, o) {
            var s,
                n = this;
            (n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow:
                    '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow:
                    '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                i.extend(n, n.initials),
                (n.activeBreakpoint = null),
                (n.animType = null),
                (n.animProp = null),
                (n.breakpoints = []),
                (n.breakpointSettings = []),
                (n.cssTransitions = !1),
                (n.focussed = !1),
                (n.interrupted = !1),
                (n.hidden = "hidden"),
                (n.paused = !0),
                (n.positionProp = null),
                (n.respondTo = null),
                (n.rowCount = 1),
                (n.shouldClick = !0),
                (n.$slider = i(t)),
                (n.$slidesCache = null),
                (n.transformType = null),
                (n.transitionType = null),
                (n.visibilityChange = "visibilitychange"),
                (n.windowWidth = 0),
                (n.windowTimer = null),
                (s = i(t).data("slick") || {}),
                (n.options = i.extend({}, n.defaults, o, s)),
                (n.currentSlide = n.options.initialSlide),
                (n.originalSettings = n.options),
                void 0 !== document.mozHidden
                    ? ((n.hidden = "mozHidden"),
                      (n.visibilityChange = "mozvisibilitychange"))
                    : void 0 !== document.webkitHidden &&
                      ((n.hidden = "webkitHidden"),
                      (n.visibilityChange = "webkitvisibilitychange")),
                (n.autoPlay = i.proxy(n.autoPlay, n)),
                (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
                (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
                (n.changeSlide = i.proxy(n.changeSlide, n)),
                (n.clickHandler = i.proxy(n.clickHandler, n)),
                (n.selectHandler = i.proxy(n.selectHandler, n)),
                (n.setPosition = i.proxy(n.setPosition, n)),
                (n.swipeHandler = i.proxy(n.swipeHandler, n)),
                (n.dragHandler = i.proxy(n.dragHandler, n)),
                (n.keyHandler = i.proxy(n.keyHandler, n)),
                (n.instanceUid = e++),
                (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                n.registerBreakpoints(),
                n.init(!0);
        };
    })()).prototype.activateADA = function () {
        this.$slideTrack
            .find(".slick-active")
            .attr({ "aria-hidden": "false" })
            .find("a, input, button, select")
            .attr({ tabindex: "0" });
    }),
        (e.prototype.addSlide = e.prototype.slickAdd =
            function (e, t, o) {
                var s = this;
                if ("boolean" == typeof t) (o = t), (t = null);
                else if (t < 0 || t >= s.slideCount) return !1;
                s.unload(),
                    "number" == typeof t
                        ? 0 === t && 0 === s.$slides.length
                            ? i(e).appendTo(s.$slideTrack)
                            : o
                            ? i(e).insertBefore(s.$slides.eq(t))
                            : i(e).insertAfter(s.$slides.eq(t))
                        : !0 === o
                        ? i(e).prependTo(s.$slideTrack)
                        : i(e).appendTo(s.$slideTrack),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    s.$slides.each(function (e, t) {
                        i(t).attr("data-slick-index", e);
                    }),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
        (e.prototype.animateHeight = function () {
            var i = this;
            if (
                1 === i.options.slidesToShow &&
                !0 === i.options.adaptiveHeight &&
                !1 === i.options.vertical
            ) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({ height: e }, i.options.speed);
            }
        }),
        (e.prototype.animateSlide = function (e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                !1 === s.transformsEnabled
                    ? !1 === s.options.vertical
                        ? s.$slideTrack.animate(
                              { left: e },
                              s.options.speed,
                              s.options.easing,
                              t
                          )
                        : s.$slideTrack.animate(
                              { top: e },
                              s.options.speed,
                              s.options.easing,
                              t
                          )
                    : !1 === s.cssTransitions
                    ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                      i({ animStart: s.currentLeft }).animate(
                          { animStart: e },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)),
                                      !1 === s.options.vertical
                                          ? ((o[s.animType] =
                                                "translate(" + i + "px, 0px)"),
                                            s.$slideTrack.css(o))
                                          : ((o[s.animType] =
                                                "translate(0px," + i + "px)"),
                                            s.$slideTrack.css(o));
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (e = Math.ceil(e)),
                      !1 === s.options.vertical
                          ? (o[s.animType] =
                                "translate3d(" + e + "px, 0px, 0px)")
                          : (o[s.animType] =
                                "translate3d(0px," + e + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (e.prototype.getNavTarget = function () {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t;
        }),
        (e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t &&
                "object" == typeof t &&
                t.each(function () {
                    var t = i(this).slick("getSlick");
                    t.unslicked || t.slideHandler(e, !0);
                });
        }),
        (e.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            !1 === e.options.fade
                ? (t[e.transitionType] =
                      e.transformType +
                      " " +
                      e.options.speed +
                      "ms " +
                      e.options.cssEase)
                : (t[e.transitionType] =
                      "opacity " + e.options.speed + "ms " + e.options.cssEase),
                !1 === e.options.fade
                    ? e.$slideTrack.css(t)
                    : e.$slides.eq(i).css(t);
        }),
        (e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(),
                i.slideCount > i.options.slidesToShow &&
                    (i.autoPlayTimer = setInterval(
                        i.autoPlayIterator,
                        i.options.autoplaySpeed
                    ));
        }),
        (e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer);
        }),
        (e.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (!1 === i.options.infinite &&
                    (1 === i.direction &&
                    i.currentSlide + 1 === i.slideCount - 1
                        ? (i.direction = 0)
                        : 0 === i.direction &&
                          ((e = i.currentSlide - i.options.slidesToScroll),
                          i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows &&
                ((e.$prevArrow = i(e.options.prevArrow).addClass(
                    "slick-arrow"
                )),
                (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
                e.slideCount > e.options.slidesToShow
                    ? (e.$prevArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      e.$nextArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      e.htmlExpr.test(e.options.prevArrow) &&
                          e.$prevArrow.prependTo(e.options.appendArrows),
                      e.htmlExpr.test(e.options.nextArrow) &&
                          e.$nextArrow.appendTo(e.options.appendArrows),
                      !0 !== e.options.infinite &&
                          e.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"))
                    : e.$prevArrow
                          .add(e.$nextArrow)
                          .addClass("slick-hidden")
                          .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (e.prototype.buildDots = function () {
            var e,
                t,
                o = this;
            if (!0 === o.options.dots) {
                for (
                    o.$slider.addClass("slick-dotted"),
                        t = i("<ul />").addClass(o.options.dotsClass),
                        e = 0;
                    e <= o.getDotCount();
                    e += 1
                )
                    t.append(
                        i("<li />").append(
                            o.options.customPaging.call(this, o, e)
                        )
                    );
                (o.$dots = t.appendTo(o.options.appendDots)),
                    o.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (e.prototype.buildOut = function () {
            var e = this;
            (e.$slides = e.$slider
                .children(e.options.slide + ":not(.slick-cloned)")
                .addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.$slides.each(function (e, t) {
                    i(t)
                        .attr("data-slick-index", e)
                        .data("originalStyling", i(t).attr("style") || "");
                }),
                e.$slider.addClass("slick-slider"),
                (e.$slideTrack =
                    0 === e.slideCount
                        ? i('<div class="slick-track"/>').appendTo(e.$slider)
                        : e.$slides
                              .wrapAll('<div class="slick-track"/>')
                              .parent()),
                (e.$list = e.$slideTrack
                    .wrap('<div class="slick-list"/>')
                    .parent()),
                e.$slideTrack.css("opacity", 0),
                (!0 !== e.options.centerMode &&
                    !0 !== e.options.swipeToSlide) ||
                    (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider)
                    .not("[src]")
                    .addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses(
                    "number" == typeof e.currentSlide ? e.currentSlide : 0
                ),
                !0 === e.options.draggable && e.$list.addClass("draggable");
        }),
        (e.prototype.buildRows = function () {
            var i,
                e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            if (
                ((o = document.createDocumentFragment()),
                (n = l.$slider.children()),
                l.options.rows > 1)
            ) {
                for (
                    r = l.options.slidesPerRow * l.options.rows,
                        s = Math.ceil(n.length / r),
                        i = 0;
                    i < s;
                    i++
                ) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c));
                        }
                        d.appendChild(a);
                    }
                    o.appendChild(d);
                }
                l.$slider.empty().append(o),
                    l.$slider
                        .children()
                        .children()
                        .children()
                        .css({
                            width: 100 / l.options.slidesPerRow + "%",
                            display: "inline-block",
                        });
            }
        }),
        (e.prototype.checkResponsive = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if (
                ("window" === r.respondTo
                    ? (n = a)
                    : "slider" === r.respondTo
                    ? (n = d)
                    : "min" === r.respondTo && (n = Math.min(a, d)),
                r.options.responsive &&
                    r.options.responsive.length &&
                    null !== r.options.responsive)
            ) {
                s = null;
                for (o in r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) &&
                        (!1 === r.originalSettings.mobileFirst
                            ? n < r.breakpoints[o] && (s = r.breakpoints[o])
                            : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s
                    ? null !== r.activeBreakpoint
                        ? (s !== r.activeBreakpoint || t) &&
                          ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s]
                              ? r.unslick(s)
                              : ((r.options = i.extend(
                                    {},
                                    r.originalSettings,
                                    r.breakpointSettings[s]
                                )),
                                !0 === e &&
                                    (r.currentSlide = r.options.initialSlide),
                                r.refresh(e)),
                          (l = s))
                        : ((r.activeBreakpoint = s),
                          "unslick" === r.breakpointSettings[s]
                              ? r.unslick(s)
                              : ((r.options = i.extend(
                                    {},
                                    r.originalSettings,
                                    r.breakpointSettings[s]
                                )),
                                !0 === e &&
                                    (r.currentSlide = r.options.initialSlide),
                                r.refresh(e)),
                          (l = s))
                    : null !== r.activeBreakpoint &&
                      ((r.activeBreakpoint = null),
                      (r.options = r.originalSettings),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e),
                      (l = s)),
                    e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
            }
        }),
        (e.prototype.changeSlide = function (e, t) {
            var o,
                s,
                n,
                r = this,
                l = i(e.currentTarget);
            switch (
                (l.is("a") && e.preventDefault(),
                l.is("li") || (l = l.closest("li")),
                (n = r.slideCount % r.options.slidesToScroll != 0),
                (o = n
                    ? 0
                    : (r.slideCount - r.currentSlide) %
                      r.options.slidesToScroll),
                e.data.message)
            ) {
                case "previous":
                    (s =
                        0 === o
                            ? r.options.slidesToScroll
                            : r.options.slidesToShow - o),
                        r.slideCount > r.options.slidesToShow &&
                            r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 === o ? r.options.slidesToScroll : o),
                        r.slideCount > r.options.slidesToShow &&
                            r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d =
                        0 === e.data.index
                            ? 0
                            : e.data.index ||
                              l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t),
                        l.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (e.prototype.checkNavigable = function (i) {
            var e, t;
            if (
                ((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1])
            )
                i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
            return i;
        }),
        (e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots &&
                null !== e.$dots &&
                (i("li", e.$dots)
                    .off("click.slick", e.changeSlide)
                    .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
                    .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                !0 === e.options.accessibility &&
                    e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow &&
                        e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow &&
                        e.$nextArrow.off("click.slick", e.changeSlide),
                    !0 === e.options.accessibility &&
                        (e.$prevArrow &&
                            e.$prevArrow.off("keydown.slick", e.keyHandler),
                        e.$nextArrow &&
                            e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off(
                    "touchcancel.slick mouseleave.slick",
                    e.swipeHandler
                ),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility &&
                    e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .off("click.slick", e.selectHandler),
                i(window).off(
                    "orientationchange.slick.slick-" + e.instanceUid,
                    e.orientationChange
                ),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off(
                    "dragstart",
                    e.preventDefault
                ),
                i(window).off(
                    "load.slick.slick-" + e.instanceUid,
                    e.setPosition
                );
        }),
        (e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.cleanUpRows = function () {
            var i,
                e = this;
            e.options.rows > 1 &&
                ((i = e.$slides.children().children()).removeAttr("style"),
                e.$slider.empty().append(i));
        }),
        (e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick &&
                (i.stopImmediatePropagation(),
                i.stopPropagation(),
                i.preventDefault());
        }),
        (e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    t.htmlExpr.test(t.options.prevArrow) &&
                        t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    t.htmlExpr.test(t.options.nextArrow) &&
                        t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass(
                            "slick-slide slick-active slick-center slick-visible slick-current"
                        )
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            i(this).attr(
                                "style",
                                i(this).data("originalStyling")
                            );
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                e || t.$slider.trigger("destroy", [t]);
        }),
        (e.prototype.disableTransition = function (i) {
            var e = this,
                t = {};
            (t[e.transitionType] = ""),
                !1 === e.options.fade
                    ? e.$slideTrack.css(t)
                    : e.$slides.eq(i).css(t);
        }),
        (e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
                  t.$slides
                      .eq(i)
                      .animate(
                          { opacity: 1 },
                          t.options.speed,
                          t.options.easing,
                          e
                      ))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions
                ? e.$slides
                      .eq(i)
                      .animate(
                          { opacity: 0, zIndex: e.options.zIndex - 2 },
                          e.options.speed,
                          e.options.easing
                      )
                : (e.applyTransition(i),
                  e.$slides
                      .eq(i)
                      .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (e.prototype.filterSlides = e.prototype.slickFilter =
            function (i) {
                var e = this;
                null !== i &&
                    ((e.$slidesCache = e.$slides),
                    e.unload(),
                    e.$slideTrack.children(this.options.slide).detach(),
                    e.$slidesCache.filter(i).appendTo(e.$slideTrack),
                    e.reinit());
            }),
        (e.prototype.focusHandler = function () {
            var e = this;
            e.$slider
                .off("focus.slick blur.slick")
                .on("focus.slick blur.slick", "*", function (t) {
                    t.stopImmediatePropagation();
                    var o = i(this);
                    setTimeout(function () {
                        e.options.pauseOnFocus &&
                            ((e.focussed = o.is(":focus")), e.autoPlay());
                    }, 0);
                });
        }),
        (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
            function () {
                return this.currentSlide;
            }),
        (e.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else
                    for (; e < i.slideCount; )
                        ++o,
                            (e = t + i.options.slidesToScroll),
                            (t +=
                                i.options.slidesToScroll <=
                                i.options.slidesToShow
                                    ? i.options.slidesToScroll
                                    : i.options.slidesToShow);
            else if (!0 === i.options.centerMode) o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount; )
                    ++o,
                        (e = t + i.options.slidesToScroll),
                        (t +=
                            i.options.slidesToScroll <= i.options.slidesToShow
                                ? i.options.slidesToScroll
                                : i.options.slidesToShow);
            else
                o =
                    1 +
                    Math.ceil(
                        (i.slideCount - i.options.slidesToShow) /
                            i.options.slidesToScroll
                    );
            return o - 1;
        }),
        (e.prototype.getLeft = function (i) {
            var e,
                t,
                o,
                s,
                n = this,
                r = 0;
            return (
                (n.slideOffset = 0),
                (t = n.$slides.first().outerHeight(!0)),
                !0 === n.options.infinite
                    ? (n.slideCount > n.options.slidesToShow &&
                          ((n.slideOffset =
                              n.slideWidth * n.options.slidesToShow * -1),
                          (s = -1),
                          !0 === n.options.vertical &&
                              !0 === n.options.centerMode &&
                              (2 === n.options.slidesToShow
                                  ? (s = -1.5)
                                  : 1 === n.options.slidesToShow && (s = -2)),
                          (r = t * n.options.slidesToShow * s)),
                      n.slideCount % n.options.slidesToScroll != 0 &&
                          i + n.options.slidesToScroll > n.slideCount &&
                          n.slideCount > n.options.slidesToShow &&
                          (i > n.slideCount
                              ? ((n.slideOffset =
                                    (n.options.slidesToShow -
                                        (i - n.slideCount)) *
                                    n.slideWidth *
                                    -1),
                                (r =
                                    (n.options.slidesToShow -
                                        (i - n.slideCount)) *
                                    t *
                                    -1))
                              : ((n.slideOffset =
                                    (n.slideCount % n.options.slidesToScroll) *
                                    n.slideWidth *
                                    -1),
                                (r =
                                    (n.slideCount % n.options.slidesToScroll) *
                                    t *
                                    -1))))
                    : i + n.options.slidesToShow > n.slideCount &&
                      ((n.slideOffset =
                          (i + n.options.slidesToShow - n.slideCount) *
                          n.slideWidth),
                      (r = (i + n.options.slidesToShow - n.slideCount) * t)),
                n.slideCount <= n.options.slidesToShow &&
                    ((n.slideOffset = 0), (r = 0)),
                !0 === n.options.centerMode &&
                n.slideCount <= n.options.slidesToShow
                    ? (n.slideOffset =
                          (n.slideWidth * Math.floor(n.options.slidesToShow)) /
                              2 -
                          (n.slideWidth * n.slideCount) / 2)
                    : !0 === n.options.centerMode && !0 === n.options.infinite
                    ? (n.slideOffset +=
                          n.slideWidth *
                              Math.floor(n.options.slidesToShow / 2) -
                          n.slideWidth)
                    : !0 === n.options.centerMode &&
                      ((n.slideOffset = 0),
                      (n.slideOffset +=
                          n.slideWidth *
                          Math.floor(n.options.slidesToShow / 2))),
                (e =
                    !1 === n.options.vertical
                        ? i * n.slideWidth * -1 + n.slideOffset
                        : i * t * -1 + r),
                !0 === n.options.variableWidth &&
                    ((o =
                        n.slideCount <= n.options.slidesToShow ||
                        !1 === n.options.infinite
                            ? n.$slideTrack.children(".slick-slide").eq(i)
                            : n.$slideTrack
                                  .children(".slick-slide")
                                  .eq(i + n.options.slidesToShow)),
                    (e =
                        !0 === n.options.rtl
                            ? o[0]
                                ? -1 *
                                  (n.$slideTrack.width() -
                                      o[0].offsetLeft -
                                      o.width())
                                : 0
                            : o[0]
                            ? -1 * o[0].offsetLeft
                            : 0),
                    !0 === n.options.centerMode &&
                        ((o =
                            n.slideCount <= n.options.slidesToShow ||
                            !1 === n.options.infinite
                                ? n.$slideTrack.children(".slick-slide").eq(i)
                                : n.$slideTrack
                                      .children(".slick-slide")
                                      .eq(i + n.options.slidesToShow + 1)),
                        (e =
                            !0 === n.options.rtl
                                ? o[0]
                                    ? -1 *
                                      (n.$slideTrack.width() -
                                          o[0].offsetLeft -
                                          o.width())
                                    : 0
                                : o[0]
                                ? -1 * o[0].offsetLeft
                                : 0),
                        (e += (n.$list.width() - o.outerWidth()) / 2))),
                e
            );
        }),
        (e.prototype.getOption = e.prototype.slickGetOption =
            function (i) {
                return this.options[i];
            }),
        (e.prototype.getNavigableIndexes = function () {
            var i,
                e = this,
                t = 0,
                o = 0,
                s = [];
            for (
                !1 === e.options.infinite
                    ? (i = e.slideCount)
                    : ((t = -1 * e.options.slidesToScroll),
                      (o = -1 * e.options.slidesToScroll),
                      (i = 2 * e.slideCount));
                t < i;

            )
                s.push(t),
                    (t = o + e.options.slidesToScroll),
                    (o +=
                        e.options.slidesToScroll <= e.options.slidesToShow
                            ? e.options.slidesToScroll
                            : e.options.slidesToShow);
            return s;
        }),
        (e.prototype.getSlick = function () {
            return this;
        }),
        (e.prototype.getSlideCount = function () {
            var e,
                t,
                o = this;
            return (
                (t =
                    !0 === o.options.centerMode
                        ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
                        : 0),
                !0 === o.options.swipeToSlide
                    ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                          if (
                              n.offsetLeft - t + i(n).outerWidth() / 2 >
                              -1 * o.swipeLeft
                          )
                              return (e = n), !1;
                      }),
                      Math.abs(
                          i(e).attr("data-slick-index") - o.currentSlide
                      ) || 1)
                    : o.options.slidesToScroll
            );
        }),
        (e.prototype.goTo = e.prototype.slickGoTo =
            function (i, e) {
                this.changeSlide(
                    { data: { message: "index", index: parseInt(i) } },
                    e
                );
            }),
        (e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") ||
                (i(t.$slider).addClass("slick-initialized"),
                t.buildRows(),
                t.buildOut(),
                t.setProps(),
                t.startLoad(),
                t.loadSlider(),
                t.initializeEvents(),
                t.updateArrows(),
                t.updateDots(),
                t.checkResponsive(!0),
                t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (e.prototype.initADA = function () {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount;
                });
            if (e.$slideTrack) {
                e.$slides
                    .add(e.$slideTrack.find(".slick-cloned"))
                    .attr({ "aria-hidden": "true", tabindex: "-1" })
                    .find("a, input, button, select")
                    .attr({ tabindex: "-1" }),
                    null !== e.$dots &&
                        (e.$slides
                            .not(e.$slideTrack.find(".slick-cloned"))
                            .each(function (t) {
                                var s = o.indexOf(t);
                                i(this).attr({
                                    role: "tabpanel",
                                    id: "slick-slide" + e.instanceUid + t,
                                    tabindex: -1,
                                }),
                                    -1 !== s &&
                                        i(this).attr({
                                            "aria-describedby":
                                                "slick-slide-control" +
                                                e.instanceUid +
                                                s,
                                        });
                            }),
                        e.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (s) {
                                var n = o[s];
                                i(this).attr({ role: "presentation" }),
                                    i(this)
                                        .find("button")
                                        .first()
                                        .attr({
                                            role: "tab",
                                            id:
                                                "slick-slide-control" +
                                                e.instanceUid +
                                                s,
                                            "aria-controls":
                                                "slick-slide" +
                                                e.instanceUid +
                                                n,
                                            "aria-label": s + 1 + " of " + t,
                                            "aria-selected": null,
                                            tabindex: "-1",
                                        });
                            })
                            .eq(e.currentSlide)
                            .find("button")
                            .attr({ "aria-selected": "true", tabindex: "0" })
                            .end());
                for (
                    var s = e.currentSlide, n = s + e.options.slidesToShow;
                    s < n;
                    s++
                )
                    e.$slides.eq(s).attr("tabindex", 0);
                e.activateADA();
            }
        }),
        (e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow
                    .off("click.slick")
                    .on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow
                    .off("click.slick")
                    .on("click.slick", { message: "next" }, i.changeSlide),
                !0 === i.options.accessibility &&
                    (i.$prevArrow.on("keydown.slick", i.keyHandler),
                    i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots &&
                (i("li", e.$dots).on(
                    "click.slick",
                    { message: "index" },
                    e.changeSlide
                ),
                !0 === e.options.accessibility &&
                    e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots &&
                    !0 === e.options.pauseOnDotsHover &&
                    i("li", e.$dots)
                        .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
                        .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
        }),
        (e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover &&
                (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
        }),
        (e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on(
                    "touchstart.slick mousedown.slick",
                    { action: "start" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchmove.slick mousemove.slick",
                    { action: "move" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchend.slick mouseup.slick",
                    { action: "end" },
                    e.swipeHandler
                ),
                e.$list.on(
                    "touchcancel.slick mouseleave.slick",
                    { action: "end" },
                    e.swipeHandler
                ),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                !0 === e.options.accessibility &&
                    e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .on("click.slick", e.selectHandler),
                i(window).on(
                    "orientationchange.slick.slick-" + e.instanceUid,
                    i.proxy(e.orientationChange, e)
                ),
                i(window).on(
                    "resize.slick.slick-" + e.instanceUid,
                    i.proxy(e.resize, e)
                ),
                i("[draggable!=true]", e.$slideTrack).on(
                    "dragstart",
                    e.preventDefault
                ),
                i(window).on(
                    "load.slick.slick-" + e.instanceUid,
                    e.setPosition
                ),
                i(e.setPosition);
        }),
        (e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.show(), i.$nextArrow.show()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.show();
        }),
        (e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && !0 === e.options.accessibility
                    ? e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "next" : "previous",
                          },
                      })
                    : 39 === i.keyCode &&
                      !0 === e.options.accessibility &&
                      e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "previous" : "next",
                          },
                      }));
        }),
        (e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s =
                            i(this).attr("data-sizes") ||
                            n.$slider.attr("data-sizes"),
                        r = document.createElement("img");
                    (r.onload = function () {
                        e.animate({ opacity: 0 }, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                e
                                    .attr("src", t)
                                    .animate({ opacity: 1 }, 200, function () {
                                        e.removeAttr(
                                            "data-lazy data-srcset data-sizes"
                                        ).removeClass("slick-loading");
                                    }),
                                n.$slider.trigger("lazyLoaded", [n, e, t]);
                        });
                    }),
                        (r.onerror = function () {
                            e
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                                n.$slider.trigger("lazyLoadError", [n, e, t]);
                        }),
                        (r.src = t);
                });
            }
            var t,
                o,
                s,
                n = this;
            if (
                (!0 === n.options.centerMode
                    ? !0 === n.options.infinite
                        ? (s =
                              (o =
                                  n.currentSlide +
                                  (n.options.slidesToShow / 2 + 1)) +
                              n.options.slidesToShow +
                              2)
                        : ((o = Math.max(
                              0,
                              n.currentSlide - (n.options.slidesToShow / 2 + 1)
                          )),
                          (s =
                              n.options.slidesToShow / 2 +
                              1 +
                              2 +
                              n.currentSlide))
                    : ((o = n.options.infinite
                          ? n.options.slidesToShow + n.currentSlide
                          : n.currentSlide),
                      (s = Math.ceil(o + n.options.slidesToShow)),
                      !0 === n.options.fade &&
                          (o > 0 && o--, s <= n.slideCount && s++)),
                (t = n.$slider.find(".slick-slide").slice(o, s)),
                "anticipated" === n.options.lazyLoad)
            )
                for (
                    var r = o - 1,
                        l = s,
                        d = n.$slider.find(".slick-slide"),
                        a = 0;
                    a < n.options.slidesToScroll;
                    a++
                )
                    r < 0 && (r = n.slideCount - 1),
                        (t = (t = t.add(d.eq(r))).add(d.eq(l))),
                        r--,
                        l++;
            e(t),
                n.slideCount <= n.options.slidesToShow
                    ? e(n.$slider.find(".slick-slide"))
                    : n.currentSlide >= n.slideCount - n.options.slidesToShow
                    ? e(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(0, n.options.slidesToShow)
                      )
                    : 0 === n.currentSlide &&
                      e(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(-1 * n.options.slidesToShow)
                      );
        }),
        (e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(),
                i.$slideTrack.css({ opacity: 1 }),
                i.$slider.removeClass("slick-loading"),
                i.initUI(),
                "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (e.prototype.next = e.prototype.slickNext =
            function () {
                this.changeSlide({ data: { message: "next" } });
            }),
        (e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition();
        }),
        (e.prototype.pause = e.prototype.slickPause =
            function () {
                var i = this;
                i.autoPlayClear(), (i.paused = !0);
            }),
        (e.prototype.play = e.prototype.slickPlay =
            function () {
                var i = this;
                i.autoPlay(),
                    (i.options.autoplay = !0),
                    (i.paused = !1),
                    (i.focussed = !1),
                    (i.interrupted = !1);
            }),
        (e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked ||
                (t.$slider.trigger("afterChange", [t, e]),
                (t.animating = !1),
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                (t.swipeLeft = null),
                t.options.autoplay && t.autoPlay(),
                !0 === t.options.accessibility &&
                    (t.initADA(),
                    t.options.focusOnChange &&
                        i(t.$slides.get(t.currentSlide))
                            .attr("tabindex", 0)
                            .focus()));
        }),
        (e.prototype.prev = e.prototype.slickPrev =
            function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
        (e.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t,
                o,
                s,
                n,
                r,
                l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length
                ? ((t = d.first()),
                  (o = t.attr("data-lazy")),
                  (s = t.attr("data-srcset")),
                  (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
                  ((r = document.createElement("img")).onload = function () {
                      s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                          t
                              .attr("src", o)
                              .removeAttr("data-lazy data-srcset data-sizes")
                              .removeClass("slick-loading"),
                          !0 === l.options.adaptiveHeight && l.setPosition(),
                          l.$slider.trigger("lazyLoaded", [l, t, o]),
                          l.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      e < 3
                          ? setTimeout(function () {
                                l.progressiveLazyLoad(e + 1);
                            }, 500)
                          : (t
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                            l.$slider.trigger("lazyLoadError", [l, t, o]),
                            l.progressiveLazyLoad());
                  }),
                  (r.src = o))
                : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (e.prototype.refresh = function (e) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite &&
                    s.currentSlide > o &&
                    (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                i.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                e ||
                    s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (e.prototype.registerBreakpoints = function () {
            var e,
                t,
                o,
                s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
                        for (t = n[e].breakpoint; o >= 0; )
                            s.breakpoints[o] &&
                                s.breakpoints[o] === t &&
                                s.breakpoints.splice(o, 1),
                                o--;
                        s.breakpoints.push(t),
                            (s.breakpointSettings[t] = n[e].settings);
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (e.prototype.reinit = function () {
            var e = this;
            (e.$slides = e.$slideTrack
                .children(e.options.slide)
                .addClass("slick-slide")),
                (e.slideCount = e.$slides.length),
                e.currentSlide >= e.slideCount &&
                    0 !== e.currentSlide &&
                    (e.currentSlide =
                        e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect &&
                    i(e.$slideTrack)
                        .children()
                        .on("click.slick", e.selectHandler),
                e.setSlideClasses(
                    "number" == typeof e.currentSlide ? e.currentSlide : 0
                ),
                e.setPosition(),
                e.focusHandler(),
                (e.paused = !e.options.autoplay),
                e.autoPlay(),
                e.$slider.trigger("reInit", [e]);
        }),
        (e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth &&
                (clearTimeout(e.windowDelay),
                (e.windowDelay = window.setTimeout(function () {
                    (e.windowWidth = i(window).width()),
                        e.checkResponsive(),
                        e.unslicked || e.setPosition();
                }, 50)));
        }),
        (e.prototype.removeSlide = e.prototype.slickRemove =
            function (i, e, t) {
                var o = this;
                if (
                    ((i =
                        "boolean" == typeof i
                            ? !0 === (e = i)
                                ? 0
                                : o.slideCount - 1
                            : !0 === e
                            ? --i
                            : i),
                    o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                )
                    return !1;
                o.unload(),
                    !0 === t
                        ? o.$slideTrack.children().remove()
                        : o.$slideTrack
                              .children(this.options.slide)
                              .eq(i)
                              .remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
        (e.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                !1 === o.transformsEnabled
                    ? o.$slideTrack.css(s)
                    : ((s = {}),
                      !1 === o.cssTransitions
                          ? ((s[o.animType] =
                                "translate(" + e + ", " + t + ")"),
                            o.$slideTrack.css(s))
                          : ((s[o.animType] =
                                "translate3d(" + e + ", " + t + ", 0px)"),
                            o.$slideTrack.css(s)));
        }),
        (e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical
                ? !0 === i.options.centerMode &&
                  i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(
                      i.$slides.first().outerHeight(!0) * i.options.slidesToShow
                  ),
                  !0 === i.options.centerMode &&
                      i.$list.css({
                          padding: i.options.centerPadding + " 0px",
                      })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                !1 === i.options.vertical && !1 === i.options.variableWidth
                    ? ((i.slideWidth = Math.ceil(
                          i.listWidth / i.options.slidesToShow
                      )),
                      i.$slideTrack.width(
                          Math.ceil(
                              i.slideWidth *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ))
                    : !0 === i.options.variableWidth
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)),
                      i.$slideTrack.height(
                          Math.ceil(
                              i.$slides.first().outerHeight(!0) *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ));
            var e =
                i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth &&
                i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (e.prototype.setFade = function () {
            var e,
                t = this;
            t.$slides.each(function (o, s) {
                (e = t.slideWidth * o * -1),
                    !0 === t.options.rtl
                        ? i(s).css({
                              position: "relative",
                              right: e,
                              top: 0,
                              zIndex: t.options.zIndex - 2,
                              opacity: 0,
                          })
                        : i(s).css({
                              position: "relative",
                              left: e,
                              top: 0,
                              zIndex: t.options.zIndex - 2,
                              opacity: 0,
                          });
            }),
                t.$slides
                    .eq(t.currentSlide)
                    .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (e.prototype.setHeight = function () {
            var i = this;
            if (
                1 === i.options.slidesToShow &&
                !0 === i.options.adaptiveHeight &&
                !1 === i.options.vertical
            ) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e);
            }
        }),
        (e.prototype.setOption = e.prototype.slickSetOption =
            function () {
                var e,
                    t,
                    o,
                    s,
                    n,
                    r = this,
                    l = !1;
                if (
                    ("object" === i.type(arguments[0])
                        ? ((o = arguments[0]),
                          (l = arguments[1]),
                          (n = "multiple"))
                        : "string" === i.type(arguments[0]) &&
                          ((o = arguments[0]),
                          (s = arguments[1]),
                          (l = arguments[2]),
                          "responsive" === arguments[0] &&
                          "array" === i.type(arguments[1])
                              ? (n = "responsive")
                              : void 0 !== arguments[1] && (n = "single")),
                    "single" === n)
                )
                    r.options[o] = s;
                else if ("multiple" === n)
                    i.each(o, function (i, e) {
                        r.options[i] = e;
                    });
                else if ("responsive" === n)
                    for (t in s)
                        if ("array" !== i.type(r.options.responsive))
                            r.options.responsive = [s[t]];
                        else {
                            for (e = r.options.responsive.length - 1; e >= 0; )
                                r.options.responsive[e].breakpoint ===
                                    s[t].breakpoint &&
                                    r.options.responsive.splice(e, 1),
                                    e--;
                            r.options.responsive.push(s[t]);
                        }
                l && (r.unload(), r.reinit());
            }),
        (e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(),
                i.setHeight(),
                !1 === i.options.fade
                    ? i.setCSS(i.getLeft(i.currentSlide))
                    : i.setFade(),
                i.$slider.trigger("setPosition", [i]);
        }),
        (e.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
                "top" === i.positionProp
                    ? i.$slider.addClass("slick-vertical")
                    : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition &&
                    void 0 === e.MozTransition &&
                    void 0 === e.msTransition) ||
                    (!0 === i.options.useCSS && (i.cssTransitions = !0)),
                i.options.fade &&
                    ("number" == typeof i.options.zIndex
                        ? i.options.zIndex < 3 && (i.options.zIndex = 3)
                        : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform &&
                    ((i.animType = "OTransform"),
                    (i.transformType = "-o-transform"),
                    (i.transitionType = "OTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.MozTransform &&
                    ((i.animType = "MozTransform"),
                    (i.transformType = "-moz-transform"),
                    (i.transitionType = "MozTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.MozPerspective &&
                        (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"),
                    (i.transformType = "-webkit-transform"),
                    (i.transitionType = "webkitTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.msTransform &&
                    ((i.animType = "msTransform"),
                    (i.transformType = "-ms-transform"),
                    (i.transitionType = "msTransition"),
                    void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform &&
                    !1 !== i.animType &&
                    ((i.animType = "transform"),
                    (i.transformType = "transform"),
                    (i.transitionType = "transition")),
                (i.transformsEnabled =
                    i.options.useTransform &&
                    null !== i.animType &&
                    !1 !== i.animType);
        }),
        (e.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s,
                n = this;
            if (
                ((t = n.$slider
                    .find(".slick-slide")
                    .removeClass("slick-active slick-center slick-current")
                    .attr("aria-hidden", "true")),
                n.$slides.eq(i).addClass("slick-current"),
                !0 === n.options.centerMode)
            ) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                (e = Math.floor(n.options.slidesToShow / 2)),
                    !0 === n.options.infinite &&
                        (i >= e && i <= n.slideCount - 1 - e
                            ? n.$slides
                                  .slice(i - e + r, i + e + 1)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + i),
                              t
                                  .slice(o - e + 1 + r, o + e + 2)
                                  .addClass("slick-active")
                                  .attr("aria-hidden", "false")),
                        0 === i
                            ? t
                                  .eq(t.length - 1 - n.options.slidesToShow)
                                  .addClass("slick-center")
                            : i === n.slideCount - 1 &&
                              t
                                  .eq(n.options.slidesToShow)
                                  .addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center");
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow
                    ? n.$slides
                          .slice(i, i + n.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= n.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = n.slideCount % n.options.slidesToShow),
                      (o =
                          !0 === n.options.infinite
                              ? n.options.slidesToShow + i
                              : i),
                      n.options.slidesToShow == n.options.slidesToScroll &&
                      n.slideCount - i < n.options.slidesToShow
                          ? t
                                .slice(o - (n.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + n.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false"));
            ("ondemand" !== n.options.lazyLoad &&
                "anticipated" !== n.options.lazyLoad) ||
                n.lazyLoad();
        }),
        (e.prototype.setupInfinite = function () {
            var e,
                t,
                o,
                s = this;
            if (
                (!0 === s.options.fade && (s.options.centerMode = !1),
                !0 === s.options.infinite &&
                    !1 === s.options.fade &&
                    ((t = null), s.slideCount > s.options.slidesToShow))
            ) {
                for (
                    o =
                        !0 === s.options.centerMode
                            ? s.options.slidesToShow + 1
                            : s.options.slidesToShow,
                        e = s.slideCount;
                    e > s.slideCount - o;
                    e -= 1
                )
                    (t = e - 1),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    (t = e),
                        i(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        i(this).attr("id", "");
                    });
            }
        }),
        (e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), (e.interrupted = i);
        }),
        (e.prototype.selectHandler = function (e) {
            var t = this,
                o = i(e.target).is(".slick-slide")
                    ? i(e.target)
                    : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            s || (s = 0),
                t.slideCount <= t.options.slidesToShow
                    ? t.slideHandler(s, !1, !0)
                    : t.slideHandler(s);
        }),
        (e.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l,
                d = null,
                a = this;
            if (
                ((e = e || !1),
                !(
                    (!0 === a.animating && !0 === a.options.waitForAnimate) ||
                    (!0 === a.options.fade && a.currentSlide === i)
                ))
            )
                if (
                    (!1 === e && a.asNavFor(i),
                    (o = i),
                    (d = a.getLeft(o)),
                    (r = a.getLeft(a.currentSlide)),
                    (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
                    !1 === a.options.infinite &&
                        !1 === a.options.centerMode &&
                        (i < 0 ||
                            i > a.getDotCount() * a.options.slidesToScroll))
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else if (
                    !1 === a.options.infinite &&
                    !0 === a.options.centerMode &&
                    (i < 0 || i > a.slideCount - a.options.slidesToScroll)
                )
                    !1 === a.options.fade &&
                        ((o = a.currentSlide),
                        !0 !== t
                            ? a.animateSlide(r, function () {
                                  a.postSlide(o);
                              })
                            : a.postSlide(o));
                else {
                    if (
                        (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        (s =
                            o < 0
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? a.slideCount -
                                      (a.slideCount % a.options.slidesToScroll)
                                    : a.slideCount + o
                                : o >= a.slideCount
                                ? a.slideCount % a.options.slidesToScroll != 0
                                    ? 0
                                    : o - a.slideCount
                                : o),
                        (a.animating = !0),
                        a.$slider.trigger("beforeChange", [
                            a,
                            a.currentSlide,
                            s,
                        ]),
                        (n = a.currentSlide),
                        (a.currentSlide = s),
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor &&
                            (l = (l = a.getNavTarget()).slick("getSlick"))
                                .slideCount <= l.options.slidesToShow &&
                            l.setSlideClasses(a.currentSlide),
                        a.updateDots(),
                        a.updateArrows(),
                        !0 === a.options.fade)
                    )
                        return (
                            !0 !== t
                                ? (a.fadeSlideOut(n),
                                  a.fadeSlide(s, function () {
                                      a.postSlide(s);
                                  }))
                                : a.postSlide(s),
                            void a.animateHeight()
                        );
                    !0 !== t
                        ? a.animateSlide(d, function () {
                              a.postSlide(s);
                          })
                        : a.postSlide(s);
                }
        }),
        (e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.hide(), i.$nextArrow.hide()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (e.prototype.swipeDirection = function () {
            var i,
                e,
                t,
                o,
                s = this;
            return (
                (i = s.touchObject.startX - s.touchObject.curX),
                (e = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(e, i)),
                (o = Math.round((180 * t) / Math.PI)) < 0 &&
                    (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o <= 360 && o >= 315
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o >= 135 && o <= 225
                    ? !1 === s.options.rtl
                        ? "right"
                        : "left"
                    : !0 === s.options.verticalSwiping
                    ? o >= 35 && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (e.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
                return (o.scrolling = !1), !1;
            if (
                ((o.interrupted = !1),
                (o.shouldClick = !(o.touchObject.swipeLength > 10)),
                void 0 === o.touchObject.curX)
            )
                return !1;
            if (
                (!0 === o.touchObject.edgeHit &&
                    o.$slider.trigger("edge", [o, o.swipeDirection()]),
                o.touchObject.swipeLength >= o.touchObject.minSwipe)
            ) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide + o.getSlideCount()
                              )
                            : o.currentSlide + o.getSlideCount()),
                            (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide - o.getSlideCount()
                              )
                            : o.currentSlide - o.getSlideCount()),
                            (o.currentDirection = 1);
                }
                "vertical" != t &&
                    (o.slideHandler(e),
                    (o.touchObject = {}),
                    o.$slider.trigger("swipe", [o, t]));
            } else
                o.touchObject.startX !== o.touchObject.curX &&
                    (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (e.prototype.swipeHandler = function (i) {
            var e = this;
            if (
                !(
                    !1 === e.options.swipe ||
                    ("ontouchend" in document && !1 === e.options.swipe) ||
                    (!1 === e.options.draggable &&
                        -1 !== i.type.indexOf("mouse"))
                )
            )
                switch (
                    ((e.touchObject.fingerCount =
                        i.originalEvent && void 0 !== i.originalEvent.touches
                            ? i.originalEvent.touches.length
                            : 1),
                    (e.touchObject.minSwipe =
                        e.listWidth / e.options.touchThreshold),
                    !0 === e.options.verticalSwiping &&
                        (e.touchObject.minSwipe =
                            e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (e.prototype.swipeMove = function (i) {
            var e,
                t,
                o,
                s,
                n,
                r,
                l = this;
            return (
                (n =
                    void 0 !== i.originalEvent
                        ? i.originalEvent.touches
                        : null),
                !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                    ((e = l.getLeft(l.currentSlide)),
                    (l.touchObject.curX =
                        void 0 !== n ? n[0].pageX : i.clientX),
                    (l.touchObject.curY =
                        void 0 !== n ? n[0].pageY : i.clientY),
                    (l.touchObject.swipeLength = Math.round(
                        Math.sqrt(
                            Math.pow(
                                l.touchObject.curX - l.touchObject.startX,
                                2
                            )
                        )
                    )),
                    (r = Math.round(
                        Math.sqrt(
                            Math.pow(
                                l.touchObject.curY - l.touchObject.startY,
                                2
                            )
                        )
                    )),
                    !l.options.verticalSwiping && !l.swiping && r > 4
                        ? ((l.scrolling = !0), !1)
                        : (!0 === l.options.verticalSwiping &&
                              (l.touchObject.swipeLength = r),
                          (t = l.swipeDirection()),
                          void 0 !== i.originalEvent &&
                              l.touchObject.swipeLength > 4 &&
                              ((l.swiping = !0), i.preventDefault()),
                          (s =
                              (!1 === l.options.rtl ? 1 : -1) *
                              (l.touchObject.curX > l.touchObject.startX
                                  ? 1
                                  : -1)),
                          !0 === l.options.verticalSwiping &&
                              (s =
                                  l.touchObject.curY > l.touchObject.startY
                                      ? 1
                                      : -1),
                          (o = l.touchObject.swipeLength),
                          (l.touchObject.edgeHit = !1),
                          !1 === l.options.infinite &&
                              ((0 === l.currentSlide && "right" === t) ||
                                  (l.currentSlide >= l.getDotCount() &&
                                      "left" === t)) &&
                              ((o =
                                  l.touchObject.swipeLength *
                                  l.options.edgeFriction),
                              (l.touchObject.edgeHit = !0)),
                          !1 === l.options.vertical
                              ? (l.swipeLeft = e + o * s)
                              : (l.swipeLeft =
                                    e +
                                    o * (l.$list.height() / l.listWidth) * s),
                          !0 === l.options.verticalSwiping &&
                              (l.swipeLeft = e + o * s),
                          !0 !== l.options.fade &&
                              !1 !== l.options.touchMove &&
                              (!0 === l.animating
                                  ? ((l.swipeLeft = null), !1)
                                  : void l.setCSS(l.swipeLeft))))
            );
        }),
        (e.prototype.swipeStart = function (i) {
            var e,
                t = this;
            if (
                ((t.interrupted = !0),
                1 !== t.touchObject.fingerCount ||
                    t.slideCount <= t.options.slidesToShow)
            )
                return (t.touchObject = {}), !1;
            void 0 !== i.originalEvent &&
                void 0 !== i.originalEvent.touches &&
                (e = i.originalEvent.touches[0]),
                (t.touchObject.startX = t.touchObject.curX =
                    void 0 !== e ? e.pageX : i.clientX),
                (t.touchObject.startY = t.touchObject.curY =
                    void 0 !== e ? e.pageY : i.clientY),
                (t.dragging = !0);
        }),
        (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
            function () {
                var i = this;
                null !== i.$slidesCache &&
                    (i.unload(),
                    i.$slideTrack.children(this.options.slide).detach(),
                    i.$slidesCache.appendTo(i.$slideTrack),
                    i.reinit());
            }),
        (e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow &&
                    e.htmlExpr.test(e.options.prevArrow) &&
                    e.$prevArrow.remove(),
                e.$nextArrow &&
                    e.htmlExpr.test(e.options.nextArrow) &&
                    e.$nextArrow.remove(),
                e.$slides
                    .removeClass(
                        "slick-slide slick-active slick-visible slick-current"
                    )
                    .attr("aria-hidden", "true")
                    .css("width", "");
        }),
        (e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy();
        }),
        (e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    !i.options.infinite &&
                    (i.$prevArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    i.$nextArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    0 === i.currentSlide
                        ? (i.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$nextArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : i.currentSlide >=
                              i.slideCount - i.options.slidesToShow &&
                          !1 === i.options.centerMode
                        ? (i.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : i.currentSlide >= i.slideCount - 1 &&
                          !0 === i.options.centerMode &&
                          (i.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false")));
        }),
        (e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay &&
                (document[i.hidden]
                    ? (i.interrupted = !0)
                    : (i.interrupted = !1));
        }),
        (i.fn.slick = function () {
            var i,
                t,
                o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++)
                if (
                    ("object" == typeof s || void 0 === s
                        ? (o[i].slick = new e(o[i], s))
                        : (t = o[i].slick[s].apply(o[i].slick, n)),
                    void 0 !== t)
                )
                    return t;
            return o;
        });
});
jQuery(function ($) {
    $(".testimoni-2yerdfm3hv98").slick({
        dots: !0,
        infinite: !1,
        arrows: !1,
        autoplay: !0,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: !0,
                    dots: !0,
                },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    });
});
