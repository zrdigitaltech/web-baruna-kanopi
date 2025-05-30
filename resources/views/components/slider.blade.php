<div class="fl-row fl-row-full-width fl-row-bg-none fl-node-xdtgnc830h1l fl-row-default-height fl-row-align-center">
  <div class="fl-row-content-wrap">
    <div class="fl-row-content fl-row-full-width fl-node-content">

      <div class="fl-col-group fl-node-0etia45r6nyh">
        <div class="fl-col fl-node-mry7x6bnlov2 fl-col-bg-color">
          <div class="fl-col-content fl-node-content">
            <div class="fl-module fl-module-content-slider fl-node-lh7todf5snuk">
              <div class="fl-module-content fl-node-content">
                <div class="fl-content-slider">
                  <div class="bx-wrapper" style="max-width: 100%; margin: 0px auto;">
                    <div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative;"> {{-- height: 550px; --}}
                      <div class="fl-content-slider-wrapper fl-content-slider-loaded" style="opacity: 1; width: 2215%; position: relative; transition-duration: 0s; transform: translate3d(-1437px, 0px, 0px);">
                        @foreach ($data as $index => $item)
                        @php
                        $slideClass = $index % 2; // hasilnya 0,1,0,1,...
                        @endphp
                        <div class="fl-slide fl-slide-{{ $slideClass }} fl-slide-text-center " style="float: left; list-style: none; position: relative; width: 1437px;" aria-hidden="false">
                          <div class="fl-slide-mobile-photo">
                            <img
                              src="{{ $item['image'] }}"
                              srcset="
                                  {{ $item['image'] }} 1280w, 
                                  {{ $item['image'] }} 800w, 
                                  {{ $item['image'] }} 768w, 
                                  {{ $item['image'] }} 300w, 
                                  {{ $item['image'] }} 150w
                              "
                              sizes="(max-width: 1280px) 100vw, 1280px"
                              alt="barunakanopi.com" />
                          </div>
                          <div class="fl-slide-bg-photo"></div>
                          <div class="fl-slide-foreground clearfix">
                            <div class="fl-slide-content-wrap">
                              <div class="fl-slide-content">
                                <h2 class="fl-slide-title">"{{ $item['title'] }}"</h2>
                                <div class="fl-slide-text">
                                  <p>"{{ $item['deskripsi'] }}"</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        @endforeach
                      </div>
                    </div>
                  </div>
                  <div class="fl-content-slider-navigation" aria-label="content slider buttons">
                    <a class="slider-prev" href="#" aria-label="previous" role="button">
                      <div class="fl-content-slider-svg-container"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
                          <path d="M398.572,104.287L246.857,256.001l151.715,151.714c3.617,3.618,5.428,7.904,5.428,12.856c0,4.953-1.811,9.238-5.428,12.857 l-47.428,47.428c-3.619,3.619-7.904,5.428-12.857,5.428s-9.238-1.809-12.857-5.428l-212-212c-3.619-3.618-5.428-7.904-5.428-12.856 c0-4.953,1.81-9.238,5.428-12.857l212-212c3.619-3.618,7.904-5.428,12.857-5.428s9.238,1.81,12.857,5.428l47.428,47.429 C402.189,82.19,404,86.476,404,91.428c0,4.953-1.811,9.238-5.428,12.857V104.287z"></path>
                        </svg>
                      </div>
                    </a>
                    <a class="slider-next" href="#" aria-label="next" role="button">
                      <div class="fl-content-slider-svg-container"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
                          <path d="M113.428,407.713l151.715-151.714L113.428,104.285c-3.617-3.618-5.428-7.904-5.428-12.856c0-4.953,1.811-9.238,5.428-12.857 l47.428-47.428c3.619-3.619,7.904-5.428,12.857-5.428s9.238,1.809,12.857,5.428l212,212c3.619,3.618,5.429,7.904,5.429,12.856 c0,4.953-1.81,9.238-5.429,12.857l-212,212c-3.619,3.618-7.904,5.428-12.857,5.428s-9.238-1.81-12.857-5.428l-47.428-47.429 c-3.617-3.618-5.428-7.904-5.428-12.856c0-4.953,1.811-9.238,5.428-12.857V407.713z"></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div class="fl-clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>