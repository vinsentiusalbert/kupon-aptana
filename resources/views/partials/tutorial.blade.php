<dialog id="intro-tour" aria-labelledby="tour-title" aria-describedby="tour-description">
    <div class="tour-spotlight" aria-hidden="true"></div>
    <section class="tour-card">
        <div class="tour-topline">
            <span class="tour-kicker">KENALI MYADS</span>
            <button type="button" id="tour-skip" class="back">Lewati <span data-icon="close"></span></button>
        </div>
        <div class="tour-symbol" aria-hidden="true"></div>
        <p id="tour-section" class="tour-section"></p>
        <h2 id="tour-title"></h2>
        <p id="tour-description"></p>
        <div class="tour-progress" role="progressbar" aria-label="Kemajuan tutorial" aria-valuemin="1" aria-valuemax="7">
            <span></span>
        </div>
        <div class="tour-bottomline">
            <span id="tour-counter" aria-live="polite" aria-atomic="true"></span>
            <div class="tour-buttons">
                <button type="button" id="tour-back" class="secondary">Kembali</button>
                <button type="button" id="tour-next" class="primary">Lanjut</button>
            </div>
        </div>
    </section>
</dialog>
