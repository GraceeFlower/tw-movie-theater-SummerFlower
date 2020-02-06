const detailPage = document.getElementsByClassName('detail-page-content')[0];

function renderMovieDetail(movie) {
  detailPage.innerHTML = `
    <h1 class="movie-title-and-date">${movie.title}-${movie.original_title}(${movie.year})</h1>
    <div class="movie-poster-and-detail">
      <div class="movie-poster"><img src="${movie.images.small}" alt=""/></div>
      <div class="movie-detail">
        <div><span class="detail-name">导演：</span><span class="detail-text">${composeName(movie.directors)}</div>
        <div><span class="detail-name">主演：</span><span class="detail-text">${composeName(movie.casts)}</div>
        <div><span class="detail-name">类型：</span><span class="detail-text">${movie.genres.join(',')}</div>
        <div><span class="detail-name">制作国家/地区：</span><span class="detail-text">${movie.countries.join(',')}</div>
        <div><span class="detail-name">语言：</span><span class="detail-text">${movie.languages.join(',')}</div>
        <div><span class="detail-name">片长：</span><span class="detail-text">${movie.durations.join(',')}</div>
        <div><span class="detail-name">上映时间：</span><span class="detail-text">${movie.pubdates.join(',')}</div>
        <div><span class="detail-name">豆瓣评分：</span><span class="detail-text">${judgeAverage(movie.rating.average)}</div>
      </div>
      <div class="movie-video"><h5>电影路径</h5><ul>${renderMovieVideo(movie.videos)}</ul></div>
    </div>
    <div class="movie-story-intro">
      <div class="item-title">剧情介绍</div>
      <p>${movie.summary}</p>
    </div>
    <div class="movie-reviews">
      <div class="item-title">豆瓣热评Top5</div>
      <div class="comment-list">${renderComment(movie.popular_reviews.slice(0, 5))}</div>
    </div>
  `
}

function composeName(nameArr) {
  let res = [];
  nameArr.forEach(item => res.push(item.name));
  return res.join(',');
}

function renderMovieVideo(video) {
  if (!video.length) {
    return 'Sorry，暂时没有观影路径哦~';
  }
  return video.reduce((whole, item) => whole += 
    `<li>
      <a href="${item.sample_link}">${item.source.name}</a>
      <span class="${item.need_pay ? 'paying-movie' : 'free-movie'}">${item.need_pay ? '¥付费' : '免费'}</span>
    </li>`
    , '');
}

function renderComment(comment) {
  return comment.reduce((whole, item) => whole += `
  <div class="commenter-info">
    <img src="${item.author.avatar}" alt="${item.author.uid}" />
    <span class="commenter-name">${item.author.name}</span>
    <span class="comment-title">#${item.title}#</span>
    <div class="comment-text">${item.summary}</div>
  </div>`, '');
}

const similarMovie = document.getElementsByClassName('similar-movie-recommend')[0];

function renderSimilarMovie() {
  similarMovie.innerHTML = `<div class="item-title">相似电影</div><ul class="similar-movie-list"></ul>`;
  const similarList = document.getElementsByClassName('similar-movie-list')[0];
  let randomSimilarIndex = relatedMovie.length > 12 ? Math.floor(Math.random() * (relatedMovie.length - 12)) : 0;
  if (0 === relatedMovie.length) {
    similarList.innerHTML = "暂时没有哦～";
  } else {
    similarList.innerHTML = relatedMovie.slice(randomSimilarIndex, randomSimilarIndex + 12).reduce((pre, cur) => pre +=
      `<li id='${cur.id}'>
        <div class="similar-movie-cover"><img src='${cur.images.small}' alt='${cur.title}'/></div>
        <div class="similar-movie-name">${cur.title}</div>
        <div class="similar-movie-average">${judgeAverage(cur.rating.average)}</div>
      </li>`
      , '');
  }
  
  similarList.addEventListener("click", function (event) {
    let target = event.target;
    if ('similar-movie-list' !== target.className) {
      if ("similar-movie-cover" === target.parentNode.className) {
        window.location.href = `./movieDetails.html?id=${target.parentNode.parentNode.id}`;
      } else if ("similar-movie-list" === target.parentNode.parentNode.className) {
        window.location.href = `./movieDetails.html?id=${target.parentNode.id}`;
      }
    }
  })
}
