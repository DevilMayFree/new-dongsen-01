// 圖片LazyLoad
function LazyLoad() {
    function onEnterView(entries, observer) {
        for (let entry of entries) {
            const img = entry.target;
            if (entry.isIntersecting && img.getAttribute('data-src')) {
                function imgLoaded() {
                    img.classList.replace('lazy', 'loaded');
                    img.removeAttribute('data-src');
                    ArticleImgMaxWidth($(img));
                    observer.unobserve(img);
                }
                img.src = img.getAttribute('data-src');
                img.complete ? imgLoaded() : img.onload = imgLoaded;
            }
        }
    }
    const watcher = new IntersectionObserver(onEnterView, {
        rootMargin: '1000px 0px'
    });
    const lazyImages = document.querySelectorAll('img.lazy');
    for (let image of lazyImages) {
        watcher.observe(image);
    }
}
function ArticleImgMaxWidth(el) {
    if ($('div.article').length) {
        el.each(function () {
            if ($(this).height() >= $(this).width()) {
                if (window.innerWidth > 767) {
                    $(this).attr('style', 'max-width: 75%').closest('.img_box, figure').find('.img_caption, figcaption').attr('style', 'max-width: 75%');
                } else {
                    $(this).attr('style', 'max-width: none;').closest('.img_box, figure').find('.img_caption, figcaption').attr('style', 'max-width: none;');
                }
            }
        });
    }
}