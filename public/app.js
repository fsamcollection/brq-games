(async function () {
  const fmt = (n, c='SAR') => new Intl.NumberFormat('ar-SA', { style: 'currency', currency: c }).format(n);
  const q = new URLSearchParams(location.search);
  const slug = q.get('slug');

  if (location.pathname.endsWith('/game.html')) {
    const res = await fetch(`/api/products/${slug}`);
    if (!res.ok) { document.body.innerHTML = '<div class="max-w-xl mx-auto p-6">لم يتم العثور على اللعبة.</div>'; return; }
    const game = await res.json();
    document.getElementById('gameName').textContent = game.name;
    window.__placeholder = game.placeholder;
    const imgEl = document.getElementById('gameImage');
    imgEl.src = game.image || game.placeholder;
    imgEl.alt = game.name;

    const wrap = document.getElementById('packages');
    wrap.innerHTML = '';
    const pricedPackages = game.packages.filter(p => game.prices[p.id] != null);
    if (pricedPackages.length === 0) {
      wrap.innerHTML = '<div class="text-sm text-red-600">لا توجد باقات متاحة حاليًا لهذه اللعبة.</div>';
    } else {
      pricedPackages.forEach((p, i) => {
        const price = game.prices[p.id];
        const card = document.createElement('label');
        card.className = 'border rounded-2xl p-4 cursor-pointer flex items-center justify-between hover:shadow';
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <input type="radio" name="packageId" value="${p.id}" ${i===0?'checked':''} class="accent-indigo-600"/>
            <div>
              <div class="font-bold">${p.label}</div>
              <div class="text-sm text-slate-500">${fmt(price, game.currency)}</div>
            </div>
          </div>`;
        wrap.appendChild(card);
      });
    }

    document.getElementById('orderForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const packageId = fd.get('packageId');
      const payload = {
        productId: game.id,
        packageId,
        playerId: document.getElementById('playerId').value.trim(),
        serverRegion: document.getElementById('serverRegion').value.trim(),
        email: document.getElementById('email').value.trim()
      };
      const res2 = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res2.json();
      const el = document.getElementById('result');
      if (res2.ok) el.textContent = `تم إنشاء الطلب #${data.orderId}. الحالة: ${data.status}.`;
      else el.textContent = `تعذّر إنشاء الطلب: ${data.message || 'مشكلة غير معروفة'}`;
    });

  } else {
    const res = await fetch('/api/products');
    const games = await res.json();
    const grid = document.getElementById('gamesGrid');
    const search = document.getElementById('search');

    const render = (list) => {
      grid.innerHTML = '';
      list.forEach(g => {
        const card = document.createElement('a');
        card.href = `/game.html?slug=${g.slug}`;
        card.className = 'group block bg-white rounded-2xl overflow-hidden border hover:shadow';
        const imgSrc = g.image || g.placeholder;
        card.innerHTML = `
          <div class="h-44 w-full overflow-hidden">
            <img src="${imgSrc}" alt="${g.name}" class="w-full h-full object-cover group-hover:scale-105 transition" onerror="this.onerror=null; this.src='${g.placeholder}';"/>
          </div>
          <div class="p-4">
            <div class="font-extrabold mb-1">${g.name}</div>
            <div class="text-sm text-slate-500">ابدأ من ${fmt(g.startPrice)}</div>
          </div>`;
        grid.appendChild(card);
      });
    };
    render(games);
    search.addEventListener('input', (e) => {
      const term = e.target.value.trim();
      if (!term) return render(games);
      const filtered = games.filter(g => g.name.includes(term) || g.slug.includes(term));
      render(filtered);
    });
  }
})();