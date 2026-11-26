(() => {
  let started = false;

  function start() {
    if (started || location.hash !== '#mirror-dungeon') return;
    started = true;

    const { packs, gifts } = window.mirrorDungeonCatalog;
    const { decks, variants } = window.mirrorDungeonRoutes;
    const byId = id => document.getElementById(id);
    const search = byId('md-query');
    const results = byId('md-results');
    const variantsGroup = byId('md-variants');
    const phases = [
      { start: 1, end: 5, name: '하드' },
      { start: 6, end: 10, name: '평행중첩' },
      { start: 11, end: 15, name: 'EXTREME' }
    ];
    const imageRoot = 'mirror-dungeon/images';
    const names = Object.entries(packs).sort(([, a], [, b]) => a.name.localeCompare(b.name, 'ko'));
    const normalize = value => value.normalize('NFKC').toLowerCase().replace(/[\s·.]/g, '');
    const escape = value => String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
    let deck = decks[0];
    let floor = 4;
    let chosen;
    let lookup;

    function art(id) {
      const dir = `${imageRoot}/packs`;
      const foreground = packs[id].boss ? `<img src="${dir}/${id}_boss.webp" alt="" decoding="async">` : '';
      return `<span class="md-art" aria-hidden="true"><img src="${dir}/${id}.webp" alt="" decoding="async">${foreground}</span>`;
    }

    function icon(id, small = false) {
      return `<img class="md-gift-icon${small ? ' md-mini' : ''}" src="${imageRoot}/gifts/${id}.webp" alt="" decoding="async">`;
    }

    function chip(item) {
      return `<button class="md-chip" type="button" data-deck="${item.id}" aria-pressed="false">${escape(item.name)}</button>`;
    }

    byId('md-decks').innerHTML = decks.map(chip).join('') +
      '<button class="md-chip" id="md-mixed-toggle" type="button" aria-controls="md-variants" aria-expanded="false">혼합 덱</button>';
    variantsGroup.innerHTML = variants.map(chip).join('');
    byId('md-floors').innerHTML = phases.map(({ start, end, name }) => {
      const buttons = Array.from({ length: end - start + 1 }, (_, i) => {
        const number = start + i;
        return `<button class="md-floor" type="button" data-floor="${number}" aria-label="${number}층" aria-pressed="false">${number}F</button>`;
      });
      return `<section class="md-phase"><h3>${name}<span>${start}~${end}층</span></h3><div>${buttons.join('')}</div></section>`;
    }).join('');

    function renderDeck() {
      for (const button of document.querySelectorAll('.md-guide [data-deck]')) {
        button.setAttribute('aria-pressed', String(button.dataset.deck === deck.id));
      }
      const targets = deck.targets.map(id => `<li>${icon(id, true)}${escape(gifts[id])}</li>`).join('');
      byId('md-checkpoint').innerHTML = `<h3>10층까지 준비</h3>
        <p>시작 키워드 <strong>${escape(deck.start)}</strong></p>
        <p>${escape(deck.team)}</p><ul class="md-targets" aria-label="준비할 기프트">${targets}</ul>
        <a href="${deck.source}">편성·기프트 참고</a>`;
      const recipeList = byId('md-recipes');
      recipeList.open = false;
      recipeList.innerHTML = '<summary>핵심 기프트 합성식과 발동 조건</summary>' + deck.recipes.map(({ id, materials, note }) => {
        const formulas = materials.map(recipe => `<p>${recipe.map(material =>
          `<span class="md-ingredient">${icon(material, true)}${escape(gifts[material])}</span>`
        ).join(' + ')}</p>`).join('');
        return `<div><h3 class="md-recipe-name">${icon(id, true)}${escape(gifts[id])}</h3>
          ${formulas}<p>${escape(note)}</p><a href="https://limbus.haneuk.com/gifts/${id}">기프트 정보</a></div>`;
      }).join('');
    }

    function renderPack(entry) {
      if (!entry) {
        byId('md-pack').innerHTML = '<div class="md-empty"><p>현재 편성에서 지정한 팩이 없습니다. 상대하기 쉬운 팩을 골라 코스트와 필요한 공통 기프트를 모으세요.</p></div>';
        return;
      }
      const { id, why, note } = entry;
      const pack = packs[id];
      const cards = entry.gifts.map(gift => `<li class="md-gift"><span class="md-rank">${escape(gift.priority)}</span>
        ${icon(gift.id)}<strong>${escape(gifts[gift.id])}</strong><small>${escape(gift.way)}</small></li>`).join('');
      byId('md-pack').innerHTML = `<div class="md-feature">${art(id)}<div>
        <p class="md-meta">${escape(pack.label)}</p><h3>${escape(pack.name)}</h3><p>${escape(why)}</p>
        <a href="https://limbus.haneuk.com/cardpacks/${id}">팩 등장 조건과 상세 정보</a></div>
        ${cards ? `<ul class="md-gifts" aria-label="이 팩에서 챙길 기프트">${cards}</ul>` : ''}</div>
        ${note ? `<p class="md-note">${escape(note)}</p>` : ''}
        ${floor >= 11 ? '<p class="md-note">후반 팩은 후보입니다. 현재 체력·정신력과 보스 상성을 먼저 봅니다.</p>' : ''}`;
    }

    function floorRoutes() {
      return deck.routes.filter(entry => packs[entry.id].floors.includes(floor) && (floor >= 11 || entry.rank !== '후반 후보'));
    }

    function renderFloor() {
      const phase = phases.find(item => floor <= item.end);
      const goal = floor >= 11 ? '보스 상성과 장기 전투 확인' : floor >= 6 ? '핵심 기프트 완성' : '재료와 코스트 확보';
      byId('md-floor-title').innerHTML = `<span>${floor}F</span>${goal}`;
      byId('md-mode').textContent = phase.name;
      for (const button of byId('md-floors').querySelectorAll('button')) {
        button.setAttribute('aria-pressed', String(Number(button.dataset.floor) === floor));
      }
      const available = floorRoutes();
      if (lookup && !available.some(entry => entry.id === lookup)) {
        const pack = packs[lookup];
        const onRoute = pack.floors.includes(floor);
        available.push({
          id: lookup, rank: '검색 결과', gifts: [],
          why: onRoute ? '현재 덱의 추천 루트 밖에 있는 팩입니다.' : '현재 하드 루트의 이 층에서는 등장하지 않는 팩입니다.',
          note: ''
        });
      }
      const selected = available.find(entry => entry.id === chosen) ?? available[0];
      chosen = selected?.id;
      byId('md-packs').innerHTML = available.map(entry =>
        `<button class="md-pack-button" type="button" aria-pressed="${entry.id === chosen}" data-pack="${entry.id}">${art(entry.id)}
          <span><span class="md-rank">${escape(entry.rank)}</span><strong>${escape(packs[entry.id].name)}</strong></span></button>`
      ).join('');
      renderPack(selected);
    }

    function clearPack() { chosen = undefined; lookup = undefined; }

    function pickDeck(button) {
      const next = [...decks, ...variants].find(item => item.id === button.dataset.deck);
      if (!next || next === deck) return;
      deck = next;
      clearPack();
      renderDeck();
      renderFloor();
    }

    const mixed = byId('md-mixed-toggle');
    mixed.addEventListener('click', () => {
      variantsGroup.hidden = !variantsGroup.hidden;
      mixed.setAttribute('aria-expanded', String(!variantsGroup.hidden));
      if (!variantsGroup.hidden) variantsGroup.querySelector('[aria-pressed="true"], button').focus();
    });
    for (const group of [byId('md-decks'), variantsGroup]) {
      group.addEventListener('click', event => {
        const button = event.target.closest('[data-deck]');
        if (button) pickDeck(button);
      });
    }
    byId('md-floors').addEventListener('click', event => {
      const button = event.target.closest('[data-floor]');
      if (!button) return;
      floor = Number(button.dataset.floor);
      clearPack();
      renderFloor();
      if (matchMedia('(max-width: 760px)').matches && event.detail > 0) byId('md-floor-title').scrollIntoView({block: 'start'});
    });
    byId('md-packs').addEventListener('click', event => {
      const button = event.target.closest('[data-pack]');
      if (!button || Number(button.dataset.pack) === chosen) return;
      chosen = Number(button.dataset.pack);
      renderFloor();
      byId('md-packs').querySelector(`[data-pack="${chosen}"]`)?.focus({preventScroll: true});
    });

    function dismissSearch() {
      results.hidden = true;
      byId('md-result-count').textContent = '';
    }

    function showResults() {
      const query = normalize(search.value);
      if (!query) {
        dismissSearch();
        return;
      }
      const found = names.filter(([, pack]) => normalize(pack.name).includes(query));
      byId('md-result-count').textContent = `${found.length}개 검색 결과`;
      results.hidden = false;
      results.innerHTML = found.length ? found.slice(0, 10).map(([id, pack]) =>
        `<li><button type="button" data-result="${id}">${art(id)}<span>${escape(pack.name)}</span></button></li>`
      ).join('') + (found.length > 10 ? '<li><small>이름을 더 입력하면 결과가 좁혀집니다.</small></li>' : '') :
        '<li><p>일치하는 테마팩이 없습니다.</p></li>';
    }

    search.addEventListener('input', showResults);
    search.addEventListener('focus', showResults);
    byId('md-search').addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        search.value = '';
        dismissSearch();
        search.focus();
      }
      if (event.key === 'ArrowDown' && event.target === search && !results.hidden) {
        const first = results.querySelector('button');
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    results.addEventListener('click', event => {
      const button = event.target.closest('[data-result]');
      if (!button) return;
      chosen = lookup = Number(button.dataset.result);
      const floors = packs[lookup].floors;
      if (floors.length && !floors.includes(floor)) floor = floors[0];
      search.value = '';
      dismissSearch();
      renderFloor();
      byId('md-floor-title').focus();
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('#md-search')) dismissSearch();
    });
    renderDeck();
    renderFloor();
  }

  window.addEventListener('hashchange', start);
  start();
})();
