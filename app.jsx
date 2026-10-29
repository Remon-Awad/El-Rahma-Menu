/* =====================================================================
   app.jsx  —  React (بيتحوّل في المتصفح بواسطة Babel، من غير import/export)
   البيانات جاية من script.js:  RESTAURANT, MENU_DATA
   ===================================================================== */

const { useState, useMemo, useEffect, useRef } = React;

const R = window.RESTAURANT;
const MENU = window.MENU_DATA;
const ORDER_TYPES = ['توصيل للمنزل', 'استلام من المطعم'];
const TICKER = ['🍕 بيتزا', '🥧 فطير', '🌮 كريب', '🍝 مكرونة', '🌯 حواوشي', '🚀 صواريخ', '🧇 وافل'];
// شريط التصنيفات: "ترشيحاتنا" الأول، وبعدها أقسام المنيو
const CHIPS = [{ id: 'featured', title: 'ترشيحاتنا', icon: '⭐' }].concat(MENU);

/* ---------- رسومات SVG صغيرة (زي غلاف المنيو الورقي) ---------- */
function Leaf({ className }) {
  return (
    <svg className={'deco leaf ' + (className || '')} viewBox="0 0 90 60" aria-hidden="true">
      <path d="M4 56C6 22 38 2 86 6 84 40 52 62 4 56Z" fill="#3a9a3f" />
      <path d="M6 54C30 38 55 22 80 10" stroke="#1f5b24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Strawberry({ className }) {
  return (
    <svg className={'deco berry ' + (className || '')} viewBox="0 0 60 72" aria-hidden="true">
      <path d="M30 68C9 55 1 34 8 22 14 12 24 14 30 18 36 14 46 12 52 22 59 34 51 55 30 68Z" fill="#d62828" />
      <path d="M15 15l15 7 15-7-5 9-10-4-10 4z" fill="#2f7d32" />
      <g fill="#ffd21f">
        <circle cx="21" cy="32" r="1.8" /><circle cx="33" cy="30" r="1.8" /><circle cx="42" cy="38" r="1.8" />
        <circle cx="27" cy="44" r="1.8" /><circle cx="37" cy="50" r="1.8" /><circle cx="19" cy="52" r="1.8" />
      </g>
    </svg>
  );
}

function Splash({ className }) {
  return (
    <svg className={'deco blob ' + (className || '')} viewBox="0 0 120 110" aria-hidden="true">
      <path
        d="M4 62C8 36 30 22 46 34 50 10 78 2 90 24 108 20 120 44 104 62 116 82 96 102 76 94 66 110 40 108 34 90 14 98 -2 80 4 62Z"
        fill="#3b8ee0"
      />
      <g fill="#fff" opacity=".55">
        <circle cx="38" cy="44" r="6" /><circle cx="70" cy="30" r="4" /><circle cx="88" cy="60" r="5" /><circle cx="52" cy="78" r="4" />
      </g>
    </svg>
  );
}

function Fork() {
  return (
    <svg className="cut" viewBox="0 0 24 80" aria-hidden="true">
      <g fill="#c9241d">
        <rect x="3" y="2" width="4" height="26" rx="2" />
        <rect x="10" y="2" width="4" height="26" rx="2" />
        <rect x="17" y="2" width="4" height="26" rx="2" />
        <path d="M3 24h18v4a9 9 0 0 1-6 8.5V78H9V36.5A9 9 0 0 1 3 28z" />
      </g>
    </svg>
  );
}

function Knife() {
  return (
    <svg className="cut" viewBox="0 0 24 80" aria-hidden="true">
      <path d="M9 2C17 4 21 14 21 34v6h-6v38H9z" fill="#2f7d32" />
    </svg>
  );
}

/* ---------- الهيرو (ستايل غلاف المنيو الورقي) ---------- */
function Hero() {
  function goMenu() {
    const el = document.getElementById('menu-start');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <header className="hero">
      <div className="menu-badge">
        <Fork />
        <div className="menu-badge__box">
          <strong>MENU</strong>
          <span>كريب و بيتزا</span>
        </div>
        <Knife />
      </div>

      <div className="label-strip" dir="ltr">
        <span>CREPE</span><i>.</i><span>PASTA</span><i>.</i><span>PIZZA</span><i>.</i><span>HAWAWSHI</span>
      </div>

      <div className="logo-stage">
        <Splash className="blob--l" />
        <Splash className="blob--r" />
        <Leaf className="leaf--1" />
        <Leaf className="leaf--2" />
        <Leaf className="leaf--3" />
        <Strawberry className="berry--1" />
        <div className="logo">
          <small className="logo__pre">بيتزا</small>
          <span className="logo__name">{R.name}</span>
          <small className="logo__post" dir="ltr">PIZZA</small>
        </div>
      </div>

      <div className="fast">
        <p className="fast__text">أسرع توصيل في مصر</p>
        <span className="ribbon" dir="ltr">Home Delivery</span>
        <p className="fast__hook">جوعان؟ اختار وجبتك واطلبها في ثواني</p>
        <button className="cta" onClick={goMenu}>
          اطلب دلوقتي
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M12 4v15m0 0l-6-6m6 6l6-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="band">
        <p className="band__title">{R.delivery}</p>
        <div className="band__phones">
          {R.phones.map(function (p) {
            return (
              <a key={p} className="band__phone" href={'tel:' + p} dir="ltr">
                <span className="band__icon" aria-hidden="true">📞</span>{p}
              </a>
            );
          })}
        </div>
        <p className="band__order">{R.orderLine}</p>
        {R.branches.map(function (b) {
          return <p key={b} className="band__branch">{b}</p>;
        })}
        <div className="band__feedback">
          <a href={'tel:' + R.feedbackPhone} dir="ltr">{R.feedbackPhone}</a>
          <span>رأيك يهمنا</span>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {TICKER.concat(TICKER).map(function (t, i) { return <span key={i}>{t}</span>; })}
        </div>
      </div>
    </header>
  );
}

/* ---------- شريط البحث + التصنيفات (ثابت فوق) ---------- */
function Toolbar({ query, setQuery, active, onJump }) {
  const navRef = useRef(null);

  // يخلّي التصنيف الحالي في نص الشريط وإحنا بننزل
  useEffect(function () {
    const nav = navRef.current;
    if (!nav) return;
    const chip = nav.querySelector('.chip.is-active');
    if (!chip) return;
    const n = nav.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    nav.scrollBy({ left: (c.left + c.width / 2) - (n.left + n.width / 2), behavior: 'smooth' });
  }, [active]);

  return (
    <div className="toolbar">
      <div className="toolbar__search">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M16.5 16.5 L21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={function (e) { setQuery(e.target.value); }}
          placeholder="دوّر على صنف... مثلاً: سجق، جمبري، كريب"
          aria-label="ابحث في المنيو"
        />
        {query && (
          <button className="toolbar__clear" onClick={function () { setQuery(''); }} aria-label="مسح البحث">✕</button>
        )}
      </div>

      {!query && (
        <nav className="chips" ref={navRef} aria-label="تصنيفات المنيو">
          {CHIPS.map(function (cat) {
            return (
              <button
                key={cat.id}
                className={'chip' + (active === cat.id ? ' is-active' : '')}
                onClick={function () { onJump(cat.id); }}
              >
                <span aria-hidden="true">{cat.icon}</span> {cat.title}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

/* ---------- زرار السعر (بيضيف للطلب) ---------- */
function PricePill({ item, index, qty, onAdd }) {
  const price = item.prices[index];
  const label = item.single ? 'السعر' : item.labels[index];
  const kind = item.single ? 'single' : String(index);

  return (
    <button
      className={'pill pill--' + kind}
      onClick={function () { onAdd(item, index); }}
      aria-label={'أضف ' + item.name + (item.single ? '' : ' ' + label) + ' بسعر ' + price + ' جنيه'}
    >
      {qty > 0 && <span className="pill__qty">{qty}</span>}
      <span className="pill__label">{label}</span>
      <span className="pill__price">{price}<small>ج</small></span>
    </button>
  );
}

/* ---------- كارت الصنف ---------- */
function ItemCard({ item, cart, onAdd }) {
  return (
    <article className="item reveal">
      <div className="item__info">
        <h3 className="item__name">
          {item.name}
          {item.tag && <span className="tag">{item.tag}</span>}
        </h3>
        {item.desc && <p className="item__desc">{item.desc}</p>}
      </div>
      <div className="item__prices">
        {item.prices.map(function (price, i) {
          if (price == null) return null;
          const entry = cart[item.id + '|' + i];
          return (
            <PricePill
              key={i}
              item={item}
              index={i}
              qty={entry ? entry.qty : 0}
              onAdd={onAdd}
            />
          );
        })}
      </div>
    </article>
  );
}

/* ---------- عنوان القسم (شريط أصفر بأطراف مقصوصة + شارة) ---------- */
function Heading({ icon, title }) {
  return (
    <div className="heading">
      <span className="heading__badge" aria-hidden="true">{icon}</span>
      <h2 className="heading__text">{title}</h2>
    </div>
  );
}

/* ---------- ترشيحات الرحمة (الأطباق اللي باسم المطعم) ---------- */
function FeaturedCard({ item, cart, onAdd }) {
  return (
    <article className="fcard reveal">
      <div className="fcard__top">
        <span className="fcard__icon" aria-hidden="true">{item.catIcon}</span>
        <span className="fcard__cat">{item.catTitle}</span>
      </div>
      <h3 className="fcard__name">{item.name}</h3>
      {item.desc && <p className="fcard__desc">{item.desc}</p>}
      <div className="item__prices">
        {item.prices.map(function (price, i) {
          if (price == null) return null;
          const entry = cart[item.id + '|' + i];
          return <PricePill key={i} item={item} index={i} qty={entry ? entry.qty : 0} onAdd={onAdd} />;
        })}
      </div>
    </article>
  );
}

function FeaturedSection({ cart, onAdd }) {
  const items = MENU.reduce(function (acc, cat) {
    return acc.concat(cat.items.filter(function (i) { return i.featured; }));
  }, []);
  if (items.length === 0) return null;

  return (
    <section className="cat" id="cat-featured" data-id="featured">
      <div className="cat__head">
        <Heading icon="⭐" title="ترشيحات الرحمة" />
        <div className="cat__meta"><span className="meta-chip">أطباق باسم المطعم</span></div>
      </div>
      <div className="rail">
        {items.map(function (item) {
          return <FeaturedCard key={item.id} item={item} cart={cart} onAdd={onAdd} />;
        })}
      </div>
    </section>
  );
}

/* ---------- قسم كامل ---------- */
function Section({ cat, cart, onAdd }) {
  const prices = [];
  cat.items.forEach(function (it) {
    it.prices.forEach(function (p) { if (p != null) prices.push(p); });
  });
  const minPrice = prices.length ? Math.min.apply(null, prices) : null;

  return (
    <section className="cat" id={'cat-' + cat.id} data-id={cat.id}>
      <div className="cat__head">
        <Heading icon={cat.icon} title={cat.title} />
        <div className="cat__meta">
          {minPrice != null && <span className="meta-chip meta-chip--price">ابتداءً من {minPrice} ج</span>}
          <span className="meta-chip">{cat.items.length} صنف</span>
        </div>
        {cat.note && <p className="cat__note">{cat.note}</p>}
      </div>
      <div className="cat__grid">
        {cat.items.map(function (item) {
          return <ItemCard key={item.id} item={item} cart={cart} onAdd={onAdd} />;
        })}
      </div>
    </section>
  );
}

/* ---------- شريط الاتصال السريع (بيظهر لما تنزل، ولو مفيش طلب) ---------- */
function QuickBar() {
  return (
    <div className="quickbar">
      <a className="quickbar__btn quickbar__btn--call" href={'tel:' + R.phones[0]}>
        <span aria-hidden="true">📞</span> اتصل واطلب
      </a>
      <a className="quickbar__btn quickbar__btn--wa" href={window.buildQuickWhatsAppUrl(R.whatsappPhones[0])} target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">💬</span> اطلب واتساب
      </a>
    </div>
  );
}

/* ---------- شريط الفاتورة السفلي (تذكرة بنص مقصوص) ---------- */
function CartBar({ count, total, onOpen }) {
  const [bump, setBump] = useState(false);

  useEffect(function () {
    setBump(true);
    const t = setTimeout(function () { setBump(false); }, 320);
    return function () { clearTimeout(t); };
  }, [count]);

  return (
    <div className={'ticket-wrap' + (bump ? ' is-bump' : '')}>
      <button
        className="ticket"
        onClick={onOpen}
        aria-label={'افتح الفاتورة: ' + count + ' صنف، الإجمالي ' + total + ' جنيه'}
      >
        <span className="ticket__main">
          <span className="ticket__icon" aria-hidden="true">🧾<b className="ticket__count">{count}</b></span>
          <span className="ticket__text">
            <strong>فاتورتك</strong>
            <small>اضغط وشوف التفاصيل</small>
          </span>
        </span>
        <span className="ticket__stub">
          <small>الإجمالي</small>
          <b>{total} ج</b>
        </span>
      </button>
    </div>
  );
}

/* ---------- الفاتورة (نافذة الطلب): إيصال ورق بحواف مسننة ---------- */
function CartSheet({ items, total, onChange, onClear, onClose }) {
  const [type, setType] = useState(ORDER_TYPES[0]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const isDelivery = type === ORDER_TYPES[0];
  const needsAddress = isDelivery && !notes.trim();

  // تاريخ ووقت الفاتورة
  const stamp = useMemo(function () {
    try { return new Date().toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }); }
    catch (e) { return ''; }
  }, []);

  useEffect(function () {
    window.lockBodyScroll(true);
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return function () {
      window.lockBodyScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(function () {
    if (items.length === 0) onClose();
  }, [items.length]);

  const order = { items: items, total: total, type: type, name: name, notes: notes };
  const waLinks = R.whatsappPhones.map(function (phone) {
    return { phone: phone, url: window.buildWhatsAppUrl(order, phone) };
  });

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="فاتورة الطلب">
      <div className="sheet__backdrop" onClick={onClose} />

      <div className="receipt">
        <div className="receipt__paper">
          <div className="receipt__edge receipt__edge--top" aria-hidden="true" />

          <div className="receipt__body">
            <button className="receipt__close" onClick={onClose} aria-label="إغلاق">✕</button>
            <span className="receipt__stamp" aria-hidden="true">طلب جديد</span>

            <header className="receipt__head">
              <span className="receipt__logo" aria-hidden="true">{R.name}</span>
              <h2 className="receipt__title">فاتورة الطلب</h2>
              <p className="receipt__sub">{R.fullName}</p>
              {stamp && <p className="receipt__date">{stamp}</p>}
            </header>

            <div className="receipt__rule" />

            <ul className="rlines">
              {items.map(function (it) {
                return (
                  <li className="rline" key={it.key}>
                    <div className="rline__row">
                      <span className="rline__qty">{it.qty}×</span>
                      <span className="rline__name">
                        {it.name}{it.size && <em> ({it.size})</em>}
                      </span>
                      <span className="rline__dots" aria-hidden="true" />
                      <span className="rline__sum">{it.price * it.qty} ج</span>
                    </div>
                    <div className="rline__ctl">
                      <button onClick={function () { onChange(it.key, -1); }} aria-label="قلّل">−</button>
                      <button onClick={function () { onChange(it.key, 1); }} aria-label="زوّد">+</button>
                      <span className="rline__unit">{it.price} ج للواحدة</span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="receipt__rule receipt__rule--double" />

            <div className="rtotal">
              <span>الإجمالي</span>
              <strong>{total} <small>جنيه</small></strong>
            </div>
            <p className="rnote">غير شامل خدمة التوصيل</p>

            <div className="receipt__rule" />

            <p className="rlabel">نوع الطلب</p>
            <div className="rtype" role="radiogroup" aria-label="نوع الطلب">
              {ORDER_TYPES.map(function (t) {
                return (
                  <button
                    key={t}
                    role="radio"
                    aria-checked={type === t}
                    className={'rtype__opt' + (type === t ? ' is-on' : '')}
                    onClick={function () { setType(t); }}
                  >
                    <span className="rtype__box" aria-hidden="true">{type === t ? '✔' : ''}</span>
                    {t}
                  </button>
                );
              })}
            </div>

            <label className="rfield">
              <span>الاسم (اختياري)</span>
              <input type="text" value={name} onChange={function (e) { setName(e.target.value); }} />
            </label>
            <label className="rfield">
              <span>{isDelivery ? 'العنوان بالتفصيل (المنطقة، الشارع، العمارة، علامة مميزة)' : 'ملاحظات على الطلب (اختياري)'}</span>
              <textarea rows="2" value={notes} onChange={function (e) { setNotes(e.target.value); }} />
            </label>

            {needsAddress ? (
              <div className="rsend-group">
                <button className="rsend rsend--off" disabled>اكتب عنوانك الأول</button>
              </div>
            ) : (
              <div className="rsend-group">
                <p className="rsend-label">ابعت الفاتورة على واتساب:</p>
                {waLinks.map(function (w) {
                  return (
                    <a key={w.phone} className="rsend" href={w.url} target="_blank" rel="noopener noreferrer">
                      <span className="rsend__wa" aria-hidden="true">💬</span>
                      <span>ابعت على <bdi dir="ltr">{w.phone}</bdi></span>
                    </a>
                  );
                })}
              </div>
            )}

            <div className="rlinks">
              <a className="rlink" href={'tel:' + R.phones[0]}>اتصل بينا</a>
              <button className="rlink rlink--danger" onClick={onClear}>امسح الفاتورة</button>
            </div>

            <footer className="receipt__foot">
              <div className="barcode" aria-hidden="true" />
              <p className="receipt__thanks">شكراً لاختياركم الرحمة</p>
              <p className="receipt__small">رأيك يهمنا: <bdi dir="ltr">{R.feedbackPhone}</bdi></p>
            </footer>
          </div>

          <div className="receipt__edge receipt__edge--bottom" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ---------- الفوتر ---------- */
function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__name">{R.fullName}</h2>
      <p className="footer__line">{R.delivery}</p>
      <div className="footer__phones">
        {R.phones.map(function (p) {
          return <a key={p} className="call" href={'tel:' + p} dir="ltr">📞 {p}</a>;
        })}
      </div>
    </footer>
  );
}

/* ---------- التطبيق الرئيسي ---------- */
function App() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('featured');
  const [cart, setCart] = useState({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  /* فلترة المنيو حسب البحث */
  const visible = useMemo(function () {
    const q = window.normalizeAr(query);
    if (!q) return MENU;
    return MENU
      .map(function (cat) {
        const catHit = window.normalizeAr(cat.title).indexOf(q) !== -1;
        const items = catHit ? cat.items : cat.items.filter(function (it) {
          return window.normalizeAr(it.name + ' ' + (it.desc || '')).indexOf(q) !== -1;
        });
        return Object.assign({}, cat, { items: items });
      })
      .filter(function (cat) { return cat.items.length > 0; });
  }, [query]);

  /* بيعرف احنا واقفين عند أنهي قسم */
  useEffect(function () {
    if (query) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.dataset.id);
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    CHIPS.forEach(function (cat) {
      const el = document.getElementById('cat-' + cat.id);
      if (el) io.observe(el);
    });
    return function () { io.disconnect(); };
  }, [query]);

  /* بيقفل شاشة التحميل أول ما المنيو يجهز */
  useEffect(function () { window.hidePreloader(); }, []);

  /* ظهور ناعم للكروت وإنت بتنزل */
  useEffect(function () {
    const nodes = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function (n) { io.observe(n); });
    return function () { io.disconnect(); };
  }, [query]);

  function jumpTo(id) {
    const el = document.getElementById('cat-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* السلة */
  function addToCart(item, sizeIndex) {
    const key = item.id + '|' + sizeIndex;
    const sizeLabel = item.single ? '' : item.labels[sizeIndex];
    setCart(function (c) {
      const old = c[key];
      const next = Object.assign({}, c);
      next[key] = {
        key: key,
        name: item.name,
        size: sizeLabel,
        price: item.prices[sizeIndex],
        qty: (old ? old.qty : 0) + 1
      };
      return next;
    });
    setToast('اتضاف: ' + item.name + (sizeLabel ? ' (' + sizeLabel + ')' : ''));
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(function () { setToast(''); }, 1600);
  }

  function changeQty(key, delta) {
    setCart(function (c) {
      const old = c[key];
      if (!old) return c;
      const next = Object.assign({}, c);
      const qty = old.qty + delta;
      if (qty <= 0) delete next[key];
      else next[key] = Object.assign({}, old, { qty: qty });
      return next;
    });
  }

  function clearCart() {
    setCart({});
    setSheetOpen(false);
  }

  const items = Object.values(cart);
  const count = items.reduce(function (n, i) { return n + i.qty; }, 0);
  const total = items.reduce(function (n, i) { return n + i.qty * i.price; }, 0);

  useEffect(function () {
    document.body.classList.toggle('has-cart', count > 0);
  }, [count > 0]);

  return (
    <React.Fragment>
      <Hero />
      <Toolbar query={query} setQuery={setQuery} active={active} onJump={jumpTo} />

      <div className="menu-wrap" id="menu-start">
        <main className="menu">
          {query && visible.length > 0 && (
            <p className="results-note">نتايج البحث عن «{query}»</p>
          )}

          {!query && count === 0 && (
            <p className="hint"><span aria-hidden="true">👆</span> اضغط على السعر تضيف للطلب، وابعته واتساب في ثواني</p>
          )}

          {!query && <FeaturedSection cart={cart} onAdd={addToCart} />}

          {visible.map(function (cat) {
            return <Section key={cat.id} cat={cat} cart={cart} onAdd={addToCart} />;
          })}

          {visible.length === 0 && (
            <div className="empty">
              <p className="empty__title">مفيش صنف بالاسم ده</p>
              <p>جرّب كلمة تانية، أو كلّمنا ونعملهولك على مزاجك.</p>
              <a className="call" href={'tel:' + R.phones[0]} dir="ltr">📞 {R.phones[0]}</a>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {toast && <div className="toast" role="status">{toast}</div>}

      {count === 0 && <QuickBar />}

      {count > 0 && <CartBar count={count} total={total} onOpen={function () { setSheetOpen(true); }} />}

      {sheetOpen && (
        <CartSheet
          items={items}
          total={total}
          onChange={changeQty}
          onClear={clearCart}
          onClose={function () { setSheetOpen(false); }}
        />
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);