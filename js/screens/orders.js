// Module 2: Order Management

function renderOrders() {
  const tabs = [
    { id: 'all', label: 'सभी', count: getActiveOrders().length },
    { id: 'inquiry', label: 'पूछताछ', count: AppData.orders.filter(o => o.status === 'inquiry').length },
    { id: 'confirmed', label: 'कन्फर्म', count: AppData.orders.filter(o => ['confirmed', 'supplier_contacted', 'supplier_committed'].includes(o.status)).length },
    { id: 'delivery', label: 'डिलीवरी', count: AppData.orders.filter(o => o.status === 'out_for_delivery').length },
    { id: 'payment', label: 'पेमेंट', count: AppData.orders.filter(o => ['delivered', 'payment_pending'].includes(o.status)).length },
    { id: 'closed', label: 'पूरा', count: AppData.orders.filter(o => o.status === 'closed').length }
  ];

  let orders = [];
  switch (AppState.orderTab) {
    case 'inquiry': orders = AppData.orders.filter(o => o.status === 'inquiry'); break;
    case 'confirmed': orders = AppData.orders.filter(o => ['confirmed', 'supplier_contacted', 'supplier_committed'].includes(o.status)); break;
    case 'delivery': orders = AppData.orders.filter(o => o.status === 'out_for_delivery'); break;
    case 'payment': orders = AppData.orders.filter(o => ['delivered', 'payment_pending'].includes(o.status)); break;
    case 'closed': orders = AppData.orders.filter(o => o.status === 'closed'); break;
    default: orders = getActiveOrders(); break;
  }

  return `
    ${HeaderBar('📦 Orders', { subtitle: `${getActiveOrders().length} active orders`, actions: AppState.role === 'nephew' ? ActionButton('+ नया', "navigateTo('new-inquiry')", { type: 'success', small: true }) : '' })}
    ${TabBar(tabs, AppState.orderTab, 'setOrderTab')}
    <div id="order-list">
      ${orders.length > 0 ? orders.map(o => OrderCard(o)).join('') : EmptyState('कोई ऑर्डर नहीं', { icon: '📦' })}
    </div>
  `;
}

function setOrderTab(tabId) {
  AppState.orderTab = tabId;
  handleRoute();
}

function renderOrderDetail(orderId) {
  const order = getOrder(orderId);
  if (!order) return HeaderBar('Order Not Found') + EmptyState('ऑर्डर नहीं मिला');

  const customer = getCustomer(order.customer_id);
  const payColor = order.payment_status === 'collected' ? 'green' : order.payment_status === 'overdue' ? 'red' : 'yellow';

  // Build timeline
  const timeline = [];
  const ts = order.pipeline_timestamps || {};
  if (ts.created_at) timeline.push({ time: ts.created_at, label: 'ऑर्डर बनाया' });
  if (ts.confirmed_at) timeline.push({ time: ts.confirmed_at, label: 'कन्फर्म किया' });
  if (ts.supplier_contacted_at) timeline.push({ time: ts.supplier_contacted_at, label: 'सप्लायर से बात की' });
  if (ts.supplier_committed_at) timeline.push({ time: ts.supplier_committed_at, label: 'सप्लायर ने commit किया' });
  if (ts.out_for_delivery_at) timeline.push({ time: ts.out_for_delivery_at, label: 'डिलीवरी के लिए निकला' });
  if (ts.delivered_at) timeline.push({ time: ts.delivered_at, label: 'डिलीवर हो गया' });
  if (ts.closed_at) timeline.push({ time: ts.closed_at, label: 'पूरा हुआ ✅' });

  // Related calls
  const calls = AppData.callRecordings.filter(c => c.order_id === orderId);

  return `
    ${HeaderBar(order.order_id, { subtitle: customer?.name || '', backRoute: 'orders' })}

    <!-- Pipeline -->
    <div style="padding: 8px 16px; background: var(--white);">
      ${PipelineStage(order.status)}
    </div>

    <!-- Order Summary -->
    ${Card(`
      ${customer ? CustomerHeader(customer) : ''}
      <div class="info-row"><span class="info-label">ऑर्डर वैल्यू</span><span class="info-value text-${payColor}">${formatCurrency(order.total_amount)}</span></div>
      <div class="info-row"><span class="info-label">Payment</span><span class="info-value">${order.payment_type} ${StatusBadge(order.payment_status)}</span></div>
      <div class="info-row"><span class="info-label">Delivery</span><span class="info-value">${order.delivery_deadline_agreed ? formatTime(order.delivery_deadline_agreed) + ' ' + formatDate(order.delivery_deadline_agreed) : 'TBD'}</span></div>
      <div class="info-row"><span class="info-label">📍 Address</span><span class="info-value" style="max-width:200px">${order.delivery_address}</span></div>
      ${order.worker_assigned_id ? `<div class="info-row"><span class="info-label">👷 Worker</span><span class="info-value">${getWorker(order.worker_assigned_id)?.name || ''}</span></div>` : ''}
    `)}

    <!-- Products -->
    ${SectionTitle('📦 Products')}
    ${Card(order.products.map(p => {
      const prod = getProduct(p.product_id);
      const sup = p.supplier_id ? getSupplier(p.supplier_id) : null;
      return `
        <div style="padding: 8px 0; border-bottom: 1px solid var(--gray-100);">
          <div style="display:flex; justify-content:space-between;">
            <strong>${prod?.nameHi || p.product_id}</strong>
            <span>${p.quantity} ${p.unit} × ${formatCurrency(p.quoted_price)}</span>
          </div>
          ${sup ? `
            <div style="font-size:12px; color:var(--gray-500); margin-top:4px;">
              🏭 ${sup.name} ${p.supplier_committed_time ? '| ⏰ ' + p.supplier_committed_time : ''}
              ${StatusBadge(p.delivery_status)}
              ${CallButton(sup.phone, sup.name, { small: true })}
            </div>
          ` : '<div style="font-size:12px; color:var(--gray-400);">सप्लायर not assigned</div>'}
        </div>`;
    }).join(''))}

    <!-- Timeline -->
    ${SectionTitle('📅 Timeline')}
    <div class="timeline" style="padding: 0 32px;">
      ${timeline.map(t => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div>${t.label}</div>
            <div class="timeline-time">${formatTime(t.time)} | ${formatDate(t.time)}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Call Recordings -->
    ${calls.length > 0 ? `
      ${SectionTitle('📞 Call Recordings')}
      ${calls.map(c => `
        <div class="call-card">
          <div class="call-header">
            <span class="call-contact">${c.contact_name}</span>
            <span class="call-time">${formatTime(c.call_datetime)}</span>
          </div>
          <div class="call-duration">${Math.floor(c.duration_seconds / 60)}:${(c.duration_seconds % 60).toString().padStart(2, '0')} min</div>
          <div class="call-summary">${c.summary_text}</div>
          <div style="margin-top:8px;">
            ${c.confirmed_by_nephew ? '<span class="badge badge-green">✅ Confirmed</span>' : '<span class="badge badge-yellow">⏳ Pending confirmation</span>'}
          </div>
        </div>
      `).join('')}
    ` : ''}

    <!-- Actions -->
    <div style="padding: 16px; display:flex; gap:12px; flex-wrap: wrap;">
      ${['inquiry', 'confirmed', 'supplier_contacted', 'supplier_committed', 'out_for_delivery'].includes(order.status) ?
        ActionButton('अगला चरण →', `advanceOrder('${order.order_id}'); navigateTo('order-detail/${order.order_id}')`, { type: 'primary' }) : ''}
      ${customer ? ActionButton('📞 Customer को Call', `showToast('📞 Calling ${customer.name}...')`, { type: 'call' }) : ''}
      ${ActionButton('⚠️ Escalate', `showToast('🚨 Owner को alert भेजा')`, { type: 'danger', small: true })}
    </div>
    ${order.notes ? Card(`<div style="font-size:13px; color:var(--gray-600);">📝 ${order.notes}</div>`) : ''}
    <div style="height: 80px;"></div>
  `;
}
