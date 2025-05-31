<section id="portofolio" class="fl-row fl-row-full-width fl-row-bg-color fl-node-1nkivub8tzof fl-row-default-height fl-row-align-center fl-row-has-layers" data-node="1nkivub8tzof">
  <div class="fl-row-content-wrap">
    <div class="fl-builder-layer fl-builder-shape-layer fl-builder-top-edge-layer fl-builder-shape-wavy">
      <svg class="fl-builder-layer-align-top-center" viewBox="0 0 800 102" preserveAspectRatio="none" style="height: 50px;">

        <defs>
        </defs>

        <g class="fl-shape-content">
          <path class="fl-shape" d="M0,0 L800,0 C717.140625,0 726.058594,62.0585937 669.660156,62.0585937 C613.261719,62.0585937 604.234948,10.4922726 561.091797,10.4922726 C517.948646,10.4922726 522.667969,72.7050942 462.202976,54.171875 C401.737983,35.6386558 410.177721,100 372.386628,100 C334.595534,100 319.909894,54.171875 292.280298,54.171875 C264.650702,54.171875 259.270492,78.4116686 220.022711,72.7050942 C180.774931,66.9985197 179.391645,18.53125 120.752463,33.0078125 C62.1132812,47.484375 94.9472656,0 0,0 Z"></path>
        </g>
      </svg>
    </div>
    <div class="fl-builder-layer fl-builder-shape-layer fl-builder-bottom-edge-layer fl-builder-shape-wavy">
      <svg class="fl-builder-layer-align-bottom-center" viewBox="0 0 800 102" preserveAspectRatio="none" style="height: 50px;">

        <defs>
        </defs>

        <g class="fl-shape-content">
          <path class="fl-shape" d="M0,0 L800,0 C717.140625,0 726.058594,62.0585937 669.660156,62.0585937 C613.261719,62.0585937 604.234948,10.4922726 561.091797,10.4922726 C517.948646,10.4922726 522.667969,72.7050942 462.202976,54.171875 C401.737983,35.6386558 410.177721,100 372.386628,100 C334.595534,100 319.909894,54.171875 292.280298,54.171875 C264.650702,54.171875 259.270492,78.4116686 220.022711,72.7050942 C180.774931,66.9985197 179.391645,18.53125 120.752463,33.0078125 C62.1132812,47.484375 94.9472656,0 0,0 Z"></path>
        </g>
      </svg>
    </div>
    <div class="fl-row-content fl-row-fixed-width fl-node-content">

      <div class="fl-col-group fl-node-gmtor3c8e42w" data-node="gmtor3c8e42w">
        <div class="fl-col fl-node-nvlagx26e4ij fl-col-bg-color" data-node="nvlagx26e4ij">
          <div class="fl-col-content fl-node-content">
            <div class="fl-module fl-module-heading fl-node-jzkq5tabxu0w" data-node="jzkq5tabxu0w">
              <div class="fl-module-content fl-node-content">
                <h2 class="fl-heading">
                  <span class="fl-heading-text">Portofolio</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fl-col-group fl-node-ohux0klvij7a" data-node="ohux0klvij7a">
        <div class="fl-col fl-node-8xk54ydve6uz fl-col-bg-color" data-node="8xk54ydve6uz">
          <div class="fl-col-content fl-node-content">
            <div class="fl-module fl-module-vel-gallery fl-node-jyqkagenxlow" data-node="jyqkagenxlow">
              <div class="fl-module-content fl-node-content">
                <div class="fl-mosaicflow m-0" id="jyqkagenxlow">
                  <div class="fl-mosaicflow-content" style="visibility: visible;">
                    <div class="row m-0">
                      @foreach ($data as $item)
                      <div class="col-6 col-sm-4 p-2">
                        <div class="fl-photo fl-photo-align-center fl-photo-crop-1" itemscope="" itemtype="https://schema.org/ImageObject">
                          <div class="fl-photo-content fl-photo-img-jpg">
                            <a href="{{ $item['image'] }}" target="_self" itemprop="url">
                              <img decoding="async" class="fl-photo-img wp-image-125" src="{{ $item['image'] }}" alt="barunakanopi.com" itemprop="image" title="barunakanopi.com" data-lazy-src="{{ $item['image'] }}"><noscript><img decoding="async" class="fl-photo-img wp-image-125" src="{{ $item['image'] }}" alt="barunakanopi.com" itemprop="image" title="barunakanopi.com" loading='lazy' /></noscript>
                            </a>
                          </div>
                        </div>
                      </div>
                      @endforeach
                    </div>
                    <div style="visibility: hidden; width: 100%;"></div>
                    <div class="fl-mosaicflow-col" style="width: 33.3333%;"></div>
                    <div class="fl-mosaicflow-col" style="width: 33.3333%;"></div>
                    <div class="fl-mosaicflow-col" style="width: 33.3333%;"></div>
                  </div>
                  <div class="fl-clear"></div>
                </div>
              </div>
            </div>
            {{-- <div class="fl-module fl-module-button fl-node-10v9bmh7oijq" data-node="10v9bmh7oijq">
                      <div class="fl-module-content fl-node-content">
                        <div class="fl-button-wrap fl-button-width-auto fl-button-center">
                          <a href="/project" target="_self" class="fl-button">
                            <span class="fl-button-text">Lihat Semua</span>
                          </a>
                        </div>
                      </div>
                    </div> --}}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>