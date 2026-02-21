// ShopSaathi - Reusable UI Components
// All components return HTML strings

function Card(content, { className = '', onClick = '', id = '' } = {}) {
  return `<div class="card ${className}" ${id ? `id="${id}"` : ''} ${onClick ? `onclick="${onClick}"` : ''}>${content}</div>`;
}

function StatusBadge(status, label) {
  const color = getStatusColor(status);
  const text = label || getStatusLabel(status);
  return `<span class="badge badge-${color}">${text}</span>`;
}

function AmountDisplay(amount, { size = 'normal', color = '' } = {}) {
  const cls = size === 'large' ? 'amount-large' : 'amount';
  return `<span class="${cls} ${color ? 'text-' + color : ''}">${formatCurrency(amount)}</span>`;
}

function CustomerHeader(customer) {
  if (!customer) return '';
  const payColor = getStatusColor(customer.payment_history_status);
  return `
    <div class="customer-header">
      <div class="customer-name">${customer.name}</div>
      <div class="customer-meta">
        <span class="customer-type">${customer.type}</span>
        <span class="badge badge-${payColor}">${getStatusLabel(customer.payment_history_status)}</span>
      </div>
      <div class="customer-phone" onclick="event.stopPropagation()">
        <a href="tel:${customer.phone}">📞 ${customer.phone}</a>
      </div>
      ${customer.outstanding_dues > 0 ? `<div class="outstanding-dues">बकाया: ${formatCurrency(customer.outstanding_dues)}</div>` : ''}
    </div>`;
}

function SupplierHeader(supplier) {
  if (!supplier) return '';
  const relColor = supplier.reliability_score >= 80 ? 'green' : supplier.reliability_score >= 60 ? 'yellow' : 'red';
  return `
    <div class="supplier-header">
      <div class="supplier-name">${supplier.name}</div>
      <div class="supplier-contact">${supplier.contact_name} | ${supplier.area}</div>
      <div class="supplier-meta">
        <span class="badge badge-${relColor}">${supplier.reliability_score}% on time</span>
        <span class="supplier-products">${supplier.products_supplied.map(p => getProduct(p)?.nameHi || p).join(', ')}</span>
      </div>
    </div>`;
}

function ActionButton(label, onClick, { type = 'primary', icon = '', small = false, disabled = false } = {}) {
  return `<button class="btn btn-${type} ${small ? 'btn-sm' : ''}"
    onclick="${onClick}" ${disabled ? 'disabled' : ''}>
    ${icon ? icon + ' ' : ''}${label}
  </button>`;
}

function CallButton(phone, name, { small = false } = {}) {
  return `<button class="btn btn-call ${small ? 'btn-sm' : ''}"
    onclick="event.stopPropagation(); showToast('📞 Calling ${name}...')">
    📞 Call
  </button>`;
}

function PipelineStage(currentStage, stages = ORDER_STAGES) {
  const currentIdx = stages.indexOf(currentStage);
  return `
    <div class="pipeline">
      ${stages.map((stage, i) => `
        <div class="pipeline-stage ${i <= currentIdx ? 'pipeline-active' : ''} ${i === currentIdx ? 'pipeline-current' : ''}">
          <div class="pipeline-dot"></div>
          <div class="pipeline-label">${ORDER_STAGE_LABELS[stage] || stage}</div>
        </div>
      `).join('')}
    </div>`;
}

function TabBar(tabs, activeTab, onTabClick) {
  return `
    <div class="tab-bar">
      ${tabs.map(tab => `
        <button class="tab ${tab.id === activeTab ? 'tab-active' : ''}"
          onclick="${onTabClick}('${tab.id}')">
          ${tab.label}
          ${tab.count !== undefined ? `<span class="tab-count">${tab.count}</span>` : ''}
        </button>
      `).join('')}
    </div>`;
}

function Modal(title, content, { id = 'modal', onClose = 'closeModal()' } = {}) {
  return `
    <div class="modal-overlay" id="${id}" onclick="if(event.target===this)${onClose}">
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" onclick="${onClose}">&times;</button>
        </div>
        <div class="modal-body">${content}</div>
      </div>
    </div>`;
}

function BottomNav(items, activeItem) {
  return `
    <nav class="bottom-nav">
      ${items.map(item => `
        <a class="nav-item ${item.id === activeItem ? 'nav-active' : ''}"
          href="#${item.route}" onclick="AppState.activeNav='${item.id}'">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `).join('')}
    </nav>`;
}

function HeaderBar(title, { subtitle = '', backRoute = '', actions = '' } = {}) {
  return `
    <header class="header-bar">
      <div class="header-left">
        ${backRoute ? `<button class="btn-back" onclick="navigateTo('${backRoute}')">&larr;</button>` : ''}
        <div>
          <h1 class="header-title">${title}</h1>
          ${subtitle ? `<div class="header-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
      ${actions ? `<div class="header-actions">${actions}</div>` : ''}
    </header>`;
}

function TimeRemaining(deadline) {
  if (!deadline) return '';
  const now = new Date('2026-02-20T11:30:00');
  const dl = new Date(deadline);
  const diff = dl - now;
  const mins = Math.round(diff / 60000);

  if (mins < -60) {
    const hrs = Math.abs(Math.round(mins / 60));
    return `<span class="time-remaining text-red">${hrs} घंटे लेट</span>`;
  } else if (mins < 0) {
    return `<span class="time-remaining text-red">${Math.abs(mins)} मिनट लेट</span>`;
  } else if (mins < 30) {
    return `<span class="time-remaining text-yellow">${mins} मिनट बाकी</span>`;
  } else if (mins < 60) {
    return `<span class="time-remaining text-green">${mins} मिनट बाकी</span>`;
  } else {
    const hrs = Math.round(mins / 60);
    return `<span class="time-remaining text-green">${hrs} घंटे बाकी</span>`;
  }
}

function WhatsAppBubble(message, { type = 'received', time = '' } = {}) {
  return `
    <div class="wa-bubble wa-${type}">
      <div class="wa-text">${message.replace(/\n/g, '<br>')}</div>
      ${time ? `<div class="wa-time">${time}</div>` : ''}
    </div>`;
}

function FormDropdown(label, id, options, { value = '', onChange = '' } = {}) {
  return `
    <div class="form-group">
      <label class="form-label">${label}</label>
      <select class="form-select" id="${id}" ${onChange ? `onchange="${onChange}"` : ''}>
        <option value="">-- चुनें --</option>
        ${options.map(opt => `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`).join('')}
      </select>
    </div>`;
}

function FormNumberInput(label, id, { value = '', unit = '', placeholder = '', onChange = '' } = {}) {
  return `
    <div class="form-group">
      <label class="form-label">${label}</label>
      <div class="input-with-unit">
        <input type="number" class="form-input" id="${id}" value="${value}" placeholder="${placeholder}"
          ${onChange ? `oninput="${onChange}"` : ''}>
        ${unit ? `<span class="input-unit">${unit}</span>` : ''}
      </div>
    </div>`;
}

function FormTextInput(label, id, { value = '', placeholder = '', type = 'text' } = {}) {
  return `
    <div class="form-group">
      <label class="form-label">${label}</label>
      <input type="${type}" class="form-input" id="${id}" value="${value}" placeholder="${placeholder}">
    </div>`;
}

function FormTextarea(label, id, { value = '', placeholder = '', rows = 3 } = {}) {
  return `
    <div class="form-group">
      <label class="form-label">${label}</label>
      <textarea class="form-input form-textarea" id="${id}" rows="${rows}" placeholder="${placeholder}">${value}</textarea>
    </div>`;
}

function StatCard(label, value, { color = '', icon = '' } = {}) {
  return `
    <div class="stat-card">
      ${icon ? `<div class="stat-icon">${icon}</div>` : ''}
      <div class="stat-value ${color ? 'text-' + color : ''}">${value}</div>
      <div class="stat-label">${label}</div>
    </div>`;
}

function EmptyState(message, { icon = '📋', action = '' } = {}) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <div class="empty-text">${message}</div>
      ${action}
    </div>`;
}

function ListItem(content, { onClick = '', className = '' } = {}) {
  return `<div class="list-item ${className}" ${onClick ? `onclick="${onClick}"` : ''}>${content}</div>`;
}

function SectionTitle(title, { action = '' } = {}) {
  return `
    <div class="section-title">
      <h2>${title}</h2>
      ${action}
    </div>`;
}

function Toast(message) {
  return `<div class="toast" id="toast">${message}</div>`;
}

function showToast(message) {
  let toast = document.getElementById('toast-container');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-container';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<div class="toast show">${message}</div>`;
  setTimeout(() => { toast.innerHTML = ''; }, 2500);
}

function closeModal() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(m => m.remove());
}

function showModal(title, content) {
  const el = document.createElement('div');
  el.innerHTML = Modal(title, content);
  document.body.appendChild(el.firstElementChild);
}

function ConfirmDialog(message, onConfirm) {
  showModal('पुष्टि करें', `
    <p>${message}</p>
    <div class="modal-actions">
      ${ActionButton('हाँ', `${onConfirm}; closeModal()`, { type: 'primary' })}
      ${ActionButton('नहीं', 'closeModal()', { type: 'secondary' })}
    </div>
  `);
}

function OrderCard(order) {
  const customer = getCustomer(order.customer_id);
  const payColor = order.payment_status === 'collected' ? 'green' : order.payment_status === 'overdue' ? 'red' : 'yellow';
  const isOverdue = order.delivery_deadline_agreed && new Date(order.delivery_deadline_agreed) < new Date('2026-02-20T11:30:00') && !['delivered', 'closed', 'payment_pending'].includes(order.status);

  return Card(`
    <div class="order-card-header">
      <div>
        <strong>${customer?.name || 'Unknown'}</strong>
        <div class="order-id">${order.order_id}</div>
      </div>
      <div class="order-amount">
        ${AmountDisplay(order.total_amount, { color: payColor })}
        ${StatusBadge(order.status)}
      </div>
    </div>
    <div class="order-products">
      ${order.products.map(p => {
        const prod = getProduct(p.product_id);
        return `<span class="product-tag">${prod?.nameHi || p.product_id} × ${p.quantity} ${p.unit}</span>`;
      }).join(' ')}
    </div>
    <div class="order-delivery">
      <span>📍 ${order.delivery_address}</span>
      ${order.delivery_deadline_agreed ? `<div>⏰ ${formatTime(order.delivery_deadline_agreed)} ${TimeRemaining(order.delivery_deadline_agreed)}</div>` : ''}
    </div>
    ${order.worker_assigned_id ? `<div class="order-worker">👷 ${getWorker(order.worker_assigned_id)?.name || 'Worker'}</div>` : ''}
    <div class="order-actions">
      ${['inquiry', 'confirmed', 'supplier_contacted', 'supplier_committed'].includes(order.status) ?
        ActionButton('अगला चरण →', `advanceOrder('${order.order_id}')`, { type: 'primary', small: true }) : ''}
      ${customer ? CallButton(customer.phone, customer.name, { small: true }) : ''}
    </div>
  `, { className: isOverdue ? 'card-urgent' : '', onClick: `navigateTo('order-detail/${order.order_id}')` });
}

function CollectionCard(task) {
  const customer = getCustomer(task.customer_id);
  const isOverdue = task.status === 'overdue';
  return Card(`
    <div class="collection-header">
      <div>
        <strong>${customer?.name || 'Unknown'}</strong>
        <div class="collection-method">${task.collection_method}</div>
      </div>
      <div>
        ${AmountDisplay(task.amount_pending, { size: 'large', color: isOverdue ? 'red' : '' })}
      </div>
    </div>
    ${isOverdue ? `<div class="overdue-badge">⚠️ बकाया</div>` : ''}
    <div class="collection-actions">
      ${CallButton(customer?.phone || '', customer?.name || '', { small: true })}
      ${ActionButton('Nephew को भेजो', `sendToNephew('${task.collection_task_id}')`, { type: 'secondary', small: true })}
      ${ActionButton('Worker भेजो', `assignWorkerToCollection('${task.collection_task_id}')`, { type: 'secondary', small: true })}
    </div>
  `, { className: isOverdue ? 'card-urgent' : '' });
}

function WorkerCard(worker) {
  const present = isWorkerPresent(worker.worker_id);
  const assignment = getWorkerAssignment(worker.worker_id);

  return Card(`
    <div class="worker-header">
      <div class="worker-name-status">
        <strong>${worker.name}</strong>
        <span class="badge badge-${present ? 'green' : 'gray'}">${present ? 'हाज़िर' : 'अनुपस्थित'}</span>
      </div>
      <div class="worker-type">${worker.type} | ${formatCurrency(worker.daily_wage_rate)}/दिन</div>
    </div>
    ${assignment ? `
      <div class="worker-assignment">
        <div>📋 ${assignment.type === 'delivery' ? 'डिलीवरी' : assignment.type === 'collection' ? 'वसूली' : 'काम'}</div>
        ${assignment.order_id ? `<div>Order: ${assignment.order_id}</div>` : ''}
        <div>वापसी: ${formatTime(assignment.expected_return_time)}</div>
        ${assignment.expected_amount ? `<div>रकम: ${formatCurrency(assignment.expected_amount)}</div>` : ''}
      </div>
      ${ActionButton('Nephew को reminder', `sendReminder('${assignment.assignment_id}')`, { type: 'warning', small: true })}
    ` : present ? `
      <div class="worker-available">✅ उपलब्ध</div>
      ${ActionButton('काम दो', `assignWork('${worker.worker_id}')`, { type: 'primary', small: true })}
    ` : ''}
  `, { className: present ? '' : 'card-muted' });
}
