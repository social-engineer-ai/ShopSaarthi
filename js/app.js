// ShopSaathi - App Router & Global State

const AppState = {
  role: null, // 'nephew', 'father', 'admin'
  activeNav: '',
  currentScreen: '',
  inquiryState: {}, // for multi-step wizard
  orderTab: 'all',
  collectionTab: 'today',
  supplierPaymentTab: 'pending',
  adminTab: 'pricing',
  callTab: 'all'
};

const NAV_CONFIG = {
  nephew: [
    { id: 'inquiries', route: 'inquiries', icon: '📋', label: 'पूछताछ' },
    { id: 'orders', route: 'orders', icon: '📦', label: 'ऑर्डर' },
    { id: 'suppliers', route: 'suppliers', icon: '🏭', label: 'सप्लायर' },
    { id: 'collections', route: 'collections', icon: '💰', label: 'वसूली' },
    { id: 'more', route: 'more', icon: '☰', label: 'और' }
  ],
  father: [
    { id: 'dashboard', route: 'dashboard', icon: '📊', label: 'डैशबोर्ड' },
    { id: 'workers', route: 'workers', icon: '👷', label: 'कर्मचारी' },
    { id: 'tasks', route: 'tasks', icon: '✅', label: 'काम' }
  ],
  admin: [
    { id: 'admin', route: 'admin', icon: '⚙️', label: 'Admin Panel' }
  ]
};

// ─── ROUTER ───────────────────────────────────────
function getHash() {
  return window.location.hash.slice(1) || '';
}

function navigateTo(route) {
  window.location.hash = '#' + route;
}

function handleRoute() {
  if (!AppState.role) {
    renderRoleSelector();
    return;
  }

  const hash = getHash();
  const [screen, ...params] = hash.split('/');
  AppState.currentScreen = screen;

  const container = document.getElementById('screen-container');
  if (!container) return;

  let html = '';

  switch (screen) {
    // Nephew screens
    case 'inquiries':
      AppState.activeNav = 'inquiries';
      html = renderInquiryList();
      break;
    case 'new-inquiry':
      html = renderNewInquiry();
      break;
    case 'orders':
      AppState.activeNav = 'orders';
      html = renderOrders();
      break;
    case 'order-detail':
      html = renderOrderDetail(params[0]);
      break;
    case 'suppliers':
      AppState.activeNav = 'suppliers';
      html = renderSupplierList();
      break;
    case 'supplier-detail':
      html = renderSupplierDetail(params[0]);
      break;
    case 'collections':
      AppState.activeNav = 'collections';
      html = renderCollections();
      break;
    case 'supplier-payments':
      html = renderSupplierPayments();
      break;
    case 'more':
      AppState.activeNav = 'more';
      html = renderMoreMenu();
      break;
    case 'inventory':
      html = renderInventory();
      break;
    case 'calls':
      html = renderCalls();
      break;

    // Father screens
    case 'dashboard':
      AppState.activeNav = 'dashboard';
      html = renderDashboard();
      break;
    case 'workers':
      AppState.activeNav = 'workers';
      html = renderWorkers();
      break;
    case 'tasks':
      AppState.activeNav = 'tasks';
      html = renderTasks();
      break;

    // Admin
    case 'admin':
      AppState.activeNav = 'admin';
      html = renderAdmin();
      break;

    // WhatsApp gallery
    case 'whatsapp':
      html = renderWhatsApp();
      break;

    default:
      // Default screen per role
      if (AppState.role === 'nephew') navigateTo('orders');
      else if (AppState.role === 'father') navigateTo('dashboard');
      else if (AppState.role === 'admin') navigateTo('admin');
      return;
  }

  container.innerHTML = html;
  renderNav();
  window.scrollTo(0, 0);
}

// ─── ROLE SELECTOR ────────────────────────────────
function renderRoleSelector() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="role-selector">
      <h1>🏪 ShopSaathi</h1>
      <p>Building Materials Shop Management</p>
      <div class="role-buttons">
        <button class="role-btn" onclick="selectRole('nephew')">
          👨‍💼 Nephew (भतीजा)
          <span class="role-desc">Customer inquiries, orders, supplier calls</span>
        </button>
        <button class="role-btn" onclick="selectRole('father')">
          👨‍🦳 Father (पापा)
          <span class="role-desc">Dashboard, workers, tasks</span>
        </button>
        <button class="role-btn" onclick="selectRole('admin')">
          ⚙️ Admin
          <span class="role-desc">Configuration, pricing, settings</span>
        </button>
      </div>
    </div>`;
}

function selectRole(role) {
  AppState.role = role;
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="screen-container"></div>
    <div id="nav-container"></div>
    <button class="feedback-btn" onclick="openFeedback()" title="Feedback">💬</button>`;

  // Navigate to default screen
  if (role === 'nephew') navigateTo('orders');
  else if (role === 'father') navigateTo('dashboard');
  else if (role === 'admin') navigateTo('admin');
}

// ─── NAVIGATION ───────────────────────────────────
function renderNav() {
  const navContainer = document.getElementById('nav-container');
  if (!navContainer) return;
  const items = NAV_CONFIG[AppState.role] || [];
  navContainer.innerHTML = BottomNav(items, AppState.activeNav);
}

// ─── MORE MENU (Nephew) ───────────────────────────
function renderMoreMenu() {
  return `
    ${HeaderBar('और विकल्प', { subtitle: 'More Options' })}
    <div style="padding: 16px;">
      ${Card(`
        <div style="display: flex; align-items: center; gap: 12px; font-size: 16px;">
          <span style="font-size: 24px;">📦</span>
          <div><strong>Inventory (माल)</strong><div style="font-size:12px;color:var(--gray-500)">Cement stock management</div></div>
        </div>
      `, { onClick: "navigateTo('inventory')" })}
      ${Card(`
        <div style="display: flex; align-items: center; gap: 12px; font-size: 16px;">
          <span style="font-size: 24px;">✅</span>
          <div><strong>Tasks (काम)</strong><div style="font-size:12px;color:var(--gray-500)">Assigned tasks & reminders</div></div>
        </div>
      `, { onClick: "navigateTo('tasks')" })}
      ${Card(`
        <div style="display: flex; align-items: center; gap: 12px; font-size: 16px;">
          <span style="font-size: 24px;">📞</span>
          <div><strong>Call Intelligence</strong><div style="font-size:12px;color:var(--gray-500)">Call recordings & summaries</div></div>
        </div>
      `, { onClick: "navigateTo('calls')" })}
      ${Card(`
        <div style="display: flex; align-items: center; gap: 12px; font-size: 16px;">
          <span style="font-size: 24px;">💸</span>
          <div><strong>Supplier Payments</strong><div style="font-size:12px;color:var(--gray-500)">Outgoing payments tracking</div></div>
        </div>
      `, { onClick: "navigateTo('supplier-payments')" })}
      ${Card(`
        <div style="display: flex; align-items: center; gap: 12px; font-size: 16px;">
          <span style="font-size: 24px;">💬</span>
          <div><strong>WhatsApp Messages</strong><div style="font-size:12px;color:var(--gray-500)">Message templates gallery</div></div>
        </div>
      `, { onClick: "navigateTo('whatsapp')" })}
    </div>
    <div style="padding: 16px; text-align: center;">
      <button class="btn btn-secondary btn-block" onclick="switchRole()">🔄 Switch Role</button>
    </div>`;
}

function switchRole() {
  AppState.role = null;
  window.location.hash = '';
  renderRoleSelector();
}

// ─── ORDER ACTIONS ────────────────────────────────
function advanceOrder(orderId) {
  event.stopPropagation();
  const order = getOrder(orderId);
  if (!order) return;
  const idx = ORDER_STAGES.indexOf(order.status);
  if (idx < ORDER_STAGES.length - 1) {
    order.status = ORDER_STAGES[idx + 1];
    const tsKey = ORDER_STAGES[idx + 1] + '_at';
    if (!order.pipeline_timestamps) order.pipeline_timestamps = {};
    order.pipeline_timestamps[tsKey] = new Date().toISOString();
    showToast(`✅ ${order.order_id}: ${getStatusLabel(order.status)}`);
    handleRoute();
  }
}

function sendToNephew(taskId) {
  event.stopPropagation();
  showToast('📱 WhatsApp message sent to Nephew');
}

function sendReminder(assignmentId) {
  event.stopPropagation();
  showToast('📱 Reminder sent to Nephew via WhatsApp');
}

function assignWorkerToCollection(taskId) {
  event.stopPropagation();
  const workers = AppData.workers.filter(w => isWorkerPresent(w.worker_id) && !getWorkerAssignment(w.worker_id));
  if (workers.length === 0) {
    showToast('❌ कोई worker उपलब्ध नहीं');
    return;
  }
  showModal('Worker चुनें', `
    ${workers.map(w => `
      <div class="list-item" onclick="closeModal(); showToast('✅ ${w.name} को assign किया')">
        <strong>${w.name}</strong> — ${w.type}
      </div>
    `).join('')}
  `);
}

function assignWork(workerId) {
  event.stopPropagation();
  const worker = getWorker(workerId);
  const activeOrders = getActiveOrders().filter(o => !['closed', 'inquiry'].includes(o.status));
  showModal(`${worker.name} को काम दो`, `
    <p style="margin-bottom:12px; color: var(--gray-500)">ऑर्डर चुनें:</p>
    ${activeOrders.map(o => {
      const c = getCustomer(o.customer_id);
      return `<div class="list-item" onclick="closeModal(); showToast('✅ ${worker.name} को ${o.order_id} assign किया')">
        <div>
          <strong>${c?.name || o.order_id}</strong>
          <div style="font-size:12px;color:var(--gray-500)">${o.products.map(p => getProduct(p.product_id)?.nameHi).join(', ')} | ${formatCurrency(o.total_amount)}</div>
        </div>
      </div>`;
    }).join('')}
  `);
}

// ─── INIT ─────────────────────────────────────────
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
  if (getHash() && AppState.role) {
    handleRoute();
  } else {
    renderRoleSelector();
  }
});
