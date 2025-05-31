<section id="testimoni" class="fl-row fl-row-full-width fl-row-bg-none fl-node-m7nd4otep5qb fl-row-default-height fl-row-align-center" data-node="m7nd4otep5qb">
  <div class="fl-row-content-wrap" style="padding-bottom: 0;">
    <div class="fl-row-content fl-row-fixed-width fl-node-content">

      <div class="fl-col-group fl-node-5uwya69qkldg fl-col-group-equal-height fl-col-group-align-center" data-node="5uwya69qkldg">
        <div class="fl-col fl-node-j2o8pl5unirf fl-col-bg-color" data-node="j2o8pl5unirf">
          <div class="fl-col-content fl-node-content">
            <div class="fl-module fl-module-heading fl-node-1872sjtoxy5v" data-node="1872sjtoxy5v">
              <div class="fl-module-content fl-node-content">
                <h2 class="fl-heading">
                  <span class="fl-heading-text">Testimonial</span>
                </h2>
              </div>
            </div>
            <div class="fl-module fl-module-v-testimoni fl-node-2yerdfm3hv98" data-node="2yerdfm3hv98">
              <div class="fl-module-content fl-node-content">

                <div class="testimoni-2yerdfm3hv98">
                  @foreach ($data as $index => $testimoni)
                  <div class="testimoni-list p-2 slick-slide" data-slick-index="{{ $index }}" aria-hidden="false" style="width: 367px;" tabindex="-1" role="tabpanel" id="slick-slide0{{ $index }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="text-bs-primary bi bi-quote" viewBox="0 0 16 16">
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"></path>
                    </svg>
                    <div class="testimoni-description mb-3">{{ $testimoni['description'] }}</div>
                    <div class="d-flex align-items-center">
                      <div class="me-2">
                        <div data-bg="{{ $testimoni['avatar'] }}" class="foto-testimoni rocket-lazyload" style=""></div>
                      </div>
                      <div class="">
                        <div class="text-dark fw-bold">{{ $testimoni['name'] }}</div>
                        <small class="text-secondary">{{ $testimoni['role'] }}</small>
                      </div>
                    </div>
                  </div>
                  @endforeach
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>